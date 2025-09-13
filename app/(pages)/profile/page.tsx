"use client";
import { useState, FormEvent, useEffect } from "react";
import FormInput from "@/app/components/form-input/FormInput";
import Me from "@/components/features/auth/Me";
import { useMe, useUpdateProfile } from "@/hooks/useMe";
import { useCountries, useRegions } from "@/hooks/useCountries";
import { Controller, useForm } from "react-hook-form";

type ProfileForm = {
  full_name: string;
  contact: string;
  company_name: string;
  country_id: number;
  region_id: number;
  language_code: string;
};

const MyProfile = () => {
  const { data: me } = useMe();
  const { data: countries = [] } = useCountries();
  const updateProfileMutation = useUpdateProfile();

  const { register, handleSubmit, reset, control, watch, setValue } =
    useForm<ProfileForm>({
      defaultValues: {
        full_name: "",
        contact: "",
        company_name: "",
        country_id: 0,
        region_id: 0,
        language_code: "uz",
      },
    });

  const selectedCountryId = watch("country_id");

  const { data: regions = [] } = useRegions(selectedCountryId);

  useEffect(() => {
    if (!me || !countries.length) return;

    const countryObj = countries.find(
      (c: any) => c.name === me.location?.country
    );
    const countryId = countryObj?.id ?? 0;

    reset((prev) => ({
      ...prev,
      full_name: me.full_name ?? "",
      contact: me.contact ?? "",
      company_name: me.company_name ?? "",
      country_id: countryId,
      language_code: me.language ?? "uz",
    }));
  }, [me, countries, reset]);

  useEffect(() => {
    if (!me || !regions.length) return;
    const regionObj = regions.find((r: any) => r.name === me.location?.region);
    if (regionObj) {
      setValue("region_id", regionObj.id);
    }
  }, [me, regions, setValue]);

  const onSubmit = (data: ProfileForm) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto mt-2 px-4">
      <h2 className="text-xl font-semibold mb-5">Meniń profilim</h2>

      <pre>{JSON.stringify(me, null, 2)}</pre>

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
              onChange={field.onChange}
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
              onChange={field.onChange}
            />
          )}
        />
        <FormInput
          legend="Mekeme atı"
          type="text"
          {...register("company_name")}
        />
        {/* <FormInput legend="Taraw" as="select" options={sectors} /> */}
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
};

export default MyProfile;
