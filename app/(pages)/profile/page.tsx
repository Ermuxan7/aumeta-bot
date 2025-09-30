"use client";
import FormInput from "@/app/components/form-input/FormInput";
import { useCallback, useEffect, useState } from "react";

import RegionSelect from "@/app/components/form-input/RegionSelect";
import { useCountries, useRegions } from "@/hooks/useCountries";
import { useMe, useUpdateProfile } from "@/hooks/useMe";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { Controller, useForm } from "react-hook-form";

type ProfileForm = {
  full_name: string;
  contact: string;
  company_name: string;
  country_id: string;
  region_id: string;
  language_code: string;
};

const MyProfile = () => {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const { data: countries = [], isLoading: isLoadingCountries } =
    useCountries();
  // const { data: languages = [] } = useGetLanguages();
  const updateProfileMutation = useUpdateProfile();
  const { setLocation } = useLocationStore();

  const t = useT();

  const [isInitialized, setIsInitialized] = useState(false);

  const { register, handleSubmit, reset, control, watch, setValue, getValues } =
    useForm<ProfileForm>({
      defaultValues: {
        full_name: "",
        contact: "",
        company_name: "",
        country_id: "",
        region_id: "",
        language_code: "kaa"
      }
    });

  const countryIdValue = watch("country_id");
  const selectedCountryId = countryIdValue ? Number(countryIdValue) : null;

  const { data: regions = [], isLoading: isLoadingRegions } =
    useRegions(selectedCountryId);

  // Initialize form with user data - only once to avoid race conditions
  useEffect(() => {
    if (!me || !countries.length || isLoadingMe || isLoadingCountries) {
      return;
    }

    // If user has a region, wait for regions to load before initializing
    const userHasRegion = me.data?.location?.region?.id;
    if (userHasRegion && isLoadingRegions) {
      return;
    }

    if (!isInitialized) {
      const userCountryId = me.data?.location?.country?.id?.toString() ?? "";
      const userRegionId = me.data?.location?.region?.id?.toString() ?? "";

      reset({
        full_name: me.data?.full_name ?? "",
        contact: me.data?.contact ?? "",
        company_name: me.data?.company_name ?? "",
        country_id: userCountryId,
        region_id: userRegionId,
        language_code: me.data?.language ?? "kaa"
      });

      setIsInitialized(true);
    }
  }, [
    me,
    countries,
    reset,
    isInitialized,
    isLoadingMe,
    isLoadingCountries,
    isLoadingRegions
  ]);

  // Handle country change
  const handleCountryChange = useCallback(
    (countryId: string | number) => {
      // Reset region when country changes
      setValue("region_id", "");
      const newCountryId = countryId ? Number(countryId) : null;
      setLocation(newCountryId, null);
      return countryId;
    },
    [setValue, setLocation]
  );

  // Handle region change
  const handleRegionChange = useCallback(
    (regionId: string | number) => {
      const regionIdNumber = regionId ? Number(regionId) : null;
      setLocation(selectedCountryId, regionIdNumber);
      return regionId;
    },
    [setLocation, selectedCountryId]
  );

  const onSubmit = (data: ProfileForm) => {
    setLocation(
      data.country_id ? Number(data.country_id) : null,
      data.region_id ? Number(data.region_id) : null
    );
    updateProfileMutation.mutate({
      ...data,
      country_id: data.country_id ? Number(data.country_id) : null,
      region_id: data.region_id ? Number(data.region_id) : null
    });
  };

  // Show loading state
  const userHasRegion = me?.data?.location?.region?.id;
  const shouldWaitForRegions = userHasRegion && isLoadingRegions;

  if (
    isLoadingMe ||
    isLoadingCountries ||
    !isInitialized ||
    shouldWaitForRegions
  ) {
    return (
      <div className="max-w-2xl mx-auto mt-2 px-4">
        <h2 className="text-xl font-semibold mb-5">{t("my_profile")}</h2>
        <div className="bg-background px-3 space-y-5">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const countryOptions = countries.map((c: any) => ({
    value: c.id.toString(),
    label: c.name
  }));

  return (
    <div className="max-w-2xl mx-auto mt-2 px-4">
      <h2 className="text-xl font-semibold mb-5">{t("my_profile")}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background px-3 space-y-5"
      >
        <FormInput
          legend={t("fullname")}
          type="text"
          {...register("full_name")}
        />
        <Controller
          name="country_id"
          control={control}
          render={({ field }) => (
            <FormInput
              legend={t("located_country")}
              as="select"
              options={countryOptions}
              value={field.value}
              onChange={(val) => {
                const newVal = handleCountryChange(val);
                field.onChange(newVal);
              }}
            />
          )}
        />
        <Controller
          name="region_id"
          control={control}
          render={({ field }) => (
            <RegionSelect
              field={field}
              countryId={selectedCountryId}
              onRegionChange={(val) => {
                field.onChange(val);
                handleRegionChange(val);
              }}
            />
          )}
        />
        {/* <Controller
          name="language_code"
          control={control}
          render={({ field }) => (
            <FormInput
              legend={t("language")}
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
          legend={t("institution_name")}
          type="text"
          {...register("company_name")}
        />
        {/* <FormInput legend="Taraw" as="select" options={sectors} /> */}
        <FormInput legend={t("contact")} type="text" {...register("contact")} />
        {updateProfileMutation.isError && (
          <p className="text-red-500">
            {JSON.stringify(
              (updateProfileMutation.error as any).response?.data
            )}
          </p>
        )}
        {updateProfileMutation.isSuccess && (
          <p className="text-green-500">{t("profile_updated")} ✅</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 mt-1 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {updateProfileMutation.isPending ? t("saving") : t("save")}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
