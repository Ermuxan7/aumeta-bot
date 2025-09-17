"use client";
import { useEffect } from "react";
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
  country_id: string;
  region_id: string;
  language_code: string;
};

const MyProfile = () => {
  const { data: me } = useMe();
  const { data: countries = [] } = useCountries();
  // const { data: languages = [] } = useGetLanguages();
  const updateProfileMutation = useUpdateProfile();
  const { setLocation } = useLocationStore();

  const { register, handleSubmit, reset, control, watch, setValue } =
    useForm<ProfileForm>({
      defaultValues: {
        full_name: "",
        contact: "",
        company_name: "",
        country_id: "",
        region_id: "",
        language_code: "kaa",
      },
    });

  const countryIdValue = watch("country_id");
  const selectedCountryId = countryIdValue ? Number(countryIdValue) : 0;

  const { data: regions = [] } = useRegions(selectedCountryId);

  useEffect(() => {
    if (!me || !countries.length) return;
    reset({
      full_name: me.data?.full_name ?? "",
      contact: me.data?.contact ?? "",
      company_name: me.data?.company_name ?? "",
      country_id: me.data?.location?.country?.id?.toString() ?? "",
      region_id: "",
      language_code: me.data?.language ?? "kaa",
    });
  }, [me, countries, reset]);

  useEffect(() => {
    if (regions.length && me?.data?.location?.region?.id) {
      setValue("region_id", me.data.location.region.id.toString());
    }
  }, [regions, me, setValue]);

  const onSubmit = (data: ProfileForm) => {
    setLocation(
      data.country_id ? Number(data.country_id) : 0,
      data.region_id ? Number(data.region_id) : 0
    );
    updateProfileMutation.mutate({
      ...data,
      country_id: data.country_id ? Number(data.country_id) : null,
      region_id: data.region_id ? Number(data.region_id) : null,
    });
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
                value: c.id.toString(),
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
              disabled={!selectedCountryId || !regions.length}
              options={regions.map((r: any) => ({
                value: r.id.toString(),
                label: r.name,
              }))}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {/* <Controller
          name="language_code"
          control={control}
          render={({ field }) => (
            <FormInput
              legend="Til"
              as="select"
              options={languages.map((l: any) => ({
                value: l.code,
                label: l.official_name,
              }))}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        /> */}
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
