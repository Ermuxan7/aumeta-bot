"use client";
import FormInput from "@/app/components/form-input/FormInput";
import { useCallback, useEffect, useState } from "react";

import RegionSelect from "@/app/components/form-input/RegionSelect";
import {
  createProfileSchema,
  ProfileFormValue
} from "@/app/schema/ProfileFormSchema";
import { useCountries, useRegions } from "@/hooks/useCountries";
import { useGetLanguages } from "@/hooks/useLanguages";
import { useMe, useUpdateProfile } from "@/hooks/useMe";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type ProfileForm = ProfileFormValue;

const MyProfile = () => {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const { data: countries = [], isLoading: isLoadingCountries } =
    useCountries();
  const { data: languages = [], isLoading: isLoadingLanguages } =
    useGetLanguages();
  const updateProfileMutation = useUpdateProfile();
  const { setLocation } = useLocationStore();

  const t = useT();

  const [isInitialized, setIsInitialized] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<ProfileForm>({
    resolver: zodResolver(createProfileSchema(t)),
    defaultValues: {
      full_name: "",
      contact: "",
      company_name: "",
      country_id: 0,
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
    if (
      !me ||
      !countries.length ||
      !languages.length ||
      isLoadingMe ||
      isLoadingCountries ||
      isLoadingLanguages
    ) {
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
    languages,
    reset,
    isInitialized,
    isLoadingMe,
    isLoadingCountries,
    isLoadingLanguages,
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

  // confirm(JSON.stringify(me, null, 2));
  const onSubmit = (data: ProfileForm) => {
    setLocation(
      data.country_id ? Number(data.country_id) : null,
      data.region_id ? Number(data.region_id) : null
    );
    updateProfileMutation.mutate({
      full_name: data.full_name || "",
      contact: data.contact,
      company_name: data.company_name || "",
      country_id: data.country_id ? Number(data.country_id) : null,
      region_id: data.region_id ? Number(data.region_id) : null,
      language_code: data.language_code || "kaa"
    });

    // confirm(JSON.stringify(data, null, 2));
  };

  // Show loading state
  const userHasRegion = me?.data?.location?.region?.id;
  const shouldWaitForRegions = userHasRegion && isLoadingRegions;

  if (
    isLoadingMe ||
    isLoadingCountries ||
    isLoadingLanguages ||
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

  const languageOptions = languages.map((l: any) => ({
    value: l.code,
    label: l.official_name
  }));

  return (
    <div className="max-w-2xl mx-auto mt-2 px-4">
      <h2 className="text-xl font-semibold mb-5">{t("my_profile")}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background px-3 space-y-5"
      >
        <FormInput
          legend={`${t("fullname")} ${t("not_required")}`}
          type="text"
          {...register("full_name")}
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.full_name.message}
          </p>
        )}
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
              isRequired
            />
          )}
        />
        {errors.country_id && (
          <p className="text-red-500 text-sm mt-1">
            {errors.country_id.message}
          </p>
        )}
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
              error={errors.region_id?.message}
            />
          )}
        />
        <Controller
          name="language_code"
          control={control}
          render={({ field }) => (
            <FormInput
              legend={`${t("language")} ${t("not_required")}`}
              as="select"
              options={languageOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.language_code && (
          <p className="text-red-500 text-sm mt-1">
            {errors.language_code.message}
          </p>
        )}
        <FormInput
          legend={`${t("institution_name")} ${t("not_required")}`}
          type="text"
          {...register("company_name")}
        />
        {errors.company_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.company_name.message}
          </p>
        )}
        {/* <FormInput legend="Taraw" as="select" options={sectors} /> */}
        <FormInput
          legend={t("contact")}
          type="text"
          {...register("contact")}
          isRequired
        />
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
        )}
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
