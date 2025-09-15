"use client";
import React, { useEffect } from "react";
import FormInput from "@/app/components/form-input/FormInput";

import { useMe, useUpdateProfile } from "@/hooks/useMe";
import { useCountries, useRegions } from "@/hooks/useCountries";
import { Controller, useForm } from "react-hook-form";
import { useGetLanguages } from "@/hooks/useLanguages";
import { useLocationStore } from "@/store/locationStore";

type ProfileForm = {
  full_name: string;
  contact: string;
  company_name: string;
  country_id: number;
  region_id: number;
  language_code: string;
};

const normalize = (s?: string) =>
  (s ?? "")
    .toString()
    .toLowerCase()
    .replace(/[\s\u00A0]+/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim();

export default function MyProfile() {
  const { data: me } = useMe();
  const { data: countries = [] } = useCountries();
  const { data: languages = [] } = useGetLanguages();
  const updateProfileMutation = useUpdateProfile();
  const { setLocation } = useLocationStore();

  const { register, handleSubmit, reset, control, watch, setValue, getValues } =
    useForm<ProfileForm>({
      defaultValues: {
        full_name: "",
        contact: "",
        company_name: "",
        country_id: 0,
        region_id: 0,
        language_code: "kaa",
      },
    });

  const selectedCountryId = watch("country_id");

  // load regions for the selected country (undefined/0 -> no country selected)
  const { data: regions = [] } = useRegions(selectedCountryId);

  // 1) When `me` and `countries` arrive, set form values (country_id first)
  useEffect(() => {
    if (!me || !countries.length) return;

    // try to find country by name using robust normalization
    const targetCountryName = normalize(me.location?.country);

    let countryObj = countries.find(
      (c: any) => normalize(c.name) === targetCountryName
    );

    // fallback: contains / partial match both ways
    if (!countryObj && targetCountryName) {
      countryObj = countries.find((c: any) => {
        const n = normalize(c.name);
        return (
          n &&
          targetCountryName &&
          (n.includes(targetCountryName) || targetCountryName.includes(n))
        );
      });
    }

    // Reset form values — set country_id so useRegions will fetch regions for that country
    reset(
      {
        full_name: me.full_name ?? "",
        contact: me.contact ?? "",
        company_name: me.company_name ?? "",
        country_id: countryObj?.id ?? 0,
        region_id: 0, // we'll set the correct region once `regions` for that country arrive
        language_code: me.language ?? "kaa",
      },
      { keepDefaultValues: false }
    );
  }, [me, countries, reset]);

  // 2) When regions for selected country arrive, try to set region_id from me.location.region
  useEffect(() => {
    if (!me) return;
    if (!regions || !regions.length) return;

    const targetRegionName = normalize(me.location?.region);
    if (!targetRegionName) return;

    let regionObj = regions.find(
      (r: any) => normalize(r.name) === targetRegionName
    );

    if (!regionObj) {
      regionObj = regions.find((r: any) => {
        const n = normalize(r.name);
        return (
          n &&
          targetRegionName &&
          (n.includes(targetRegionName) || targetRegionName.includes(n))
        );
      });
    }

    if (regionObj) {
      setValue("region_id", regionObj.id);
    }
  }, [me, regions, setValue]);

  // 3) When user manually changes country, clear region_id so UI forces reselect (typical UX)
  useEffect(() => {
    // if country changed by user or by reset above, clear region so select shows the right options
    setValue("region_id", 0);
  }, [selectedCountryId, setValue]);

  const onSubmit = (data: ProfileForm) => {
    setLocation(data.country_id, data.region_id);
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto mt-2 px-4">
      <h2 className="text-xl font-semibold mb-5">Meniń profilim</h2>

      {/* quick debug output */}
      <pre className="mb-4">{JSON.stringify({ me }, null, 2)}</pre>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background px-3 space-y-5"
      >
        <FormInput legend="FAÁ" type="text" {...register("full_name")} />

        <Controller
          name="country_id"
          control={control}
          render={({ field }) => (
            <FormInput
              legend="Jaylasqan mámleket"
              as="select"
              options={countries.map((c: any) => ({
                value: c.id,
                label: c.name,
              }))}
              value={field.value}
              onChange={(e: any) => {
                // FormInput might return event or raw value; support both
                const incoming = e?.target?.value ?? e;
                const numeric = Number(incoming || 0);
                field.onChange(isNaN(numeric) ? 0 : numeric);
              }}
            />
          )}
        />

        <Controller
          name="region_id"
          control={control}
          render={({ field }) => (
            <FormInput
              legend="Region"
              as="select"
              disabled={!watch("country_id") || !regions.length}
              options={regions.map((r: any) => ({
                value: r.id,
                label: r.name,
              }))}
              value={field.value}
              onChange={(e: any) => {
                const incoming = e?.target?.value ?? e;
                const numeric = Number(incoming || 0);
                field.onChange(isNaN(numeric) ? 0 : numeric);
              }}
            />
          )}
        />

        <FormInput
          legend="Mekeme atı"
          type="text"
          {...register("company_name")}
        />

        <FormInput legend="Baylanıs" type="text" {...register("contact")} />

        {updateProfileMutation.isError && (
          <p className="text-red-500">
            {JSON.stringify(
              (updateProfileMutation.error as any).response?.data
            )}
          </p>
        )}
        {updateProfileMutation.isSuccess && (
          <p className="text-green-500">Profil awmetli janalandi ✅</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 mt-1 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {updateProfileMutation.isPending ? "Saqlanbaqda..." : "Saqlaw"}
        </button>
      </form>
    </div>
  );
}
