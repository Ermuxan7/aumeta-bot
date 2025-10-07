"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  InternshipFormValue,
  createInternshipSchema
} from "@/app/schema/InternFormSchema";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useIdInternship } from "@/hooks/useInternship";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
// import { InternshipType } from "@/types/internshipType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RegionSelect from "../../form-input/RegionSelect";

type InternshipType = {
  data: any;
};

const InternshipEditForm = ({ data }: InternshipType) => {
  const t = useT();
  const [isInitialized, setIsInitialized] = useState(false);

  const postCountryId = data?.location?.country?.id ?? null;
  const postRegionId = data?.location?.region?.id ?? null;

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<InternshipFormValue>({
    defaultValues: {
      region_id: "",
      lawazim: "",
      mekeme: "",
      talaplar: "",
      májburiyatlar: "",
      sharayatlar: "",
      manzil: "",
      tolem: "",
      baylanis: "",
      qosimsha: ""
    },
    resolver: zodResolver(createInternshipSchema(t))
  });

  const { setLocation, countryId, regionId } = useLocationStore();

  // Load regions for the post's country
  const { data: regions = [], isLoading: isLoadingRegions } = useRegions(
    postCountryId ?? undefined
  );

  // Initialize form with post data - only once to avoid race conditions
  useEffect(() => {
    if (!data) {
      return;
    }

    // If post has a region, wait for regions to load before initializing
    const postHasRegion = data.location?.region?.id;
    if (postHasRegion && isLoadingRegions) {
      return;
    }

    if (!isInitialized) {
      // Set the location in the store first
      setLocation(postCountryId, postRegionId);

      // Reset form with the post data
      reset({
        region_id: postRegionId?.toString() ?? "",
        lawazim: data.position_title ?? "",
        mekeme: data.organization_name ?? "",
        manzil: data.address ?? "",
        talaplar: data.requirements ?? "",
        májburiyatlar: data.duties ?? "",
        sharayatlar: data.conditions ?? "",
        tolem: data.salary ?? "",
        baylanis: data.contact ?? "",
        qosimsha: data.additional_info ?? ""
      });

      setIsInitialized(true);
    }
  }, [
    data,
    reset,
    setLocation,
    postCountryId,
    postRegionId,
    isLoadingRegions,
    isInitialized
  ]);

  const updateInternshipMutation = useIdInternship(data.id);

  const onSubmit = (formData: InternshipFormValue) => {
    const payload = {
      country_id: countryId ?? postCountryId,
      region_id: regionId ?? postRegionId,
      position_title: formData.lawazim,
      organization_name: formData.mekeme,
      address: formData.manzil,
      requirements: formData.talaplar,
      conditions: formData.sharayatlar,
      duties: formData.májburiyatlar,
      salary: formData.tolem,
      contact: formData.baylanis,
      additional_info: formData.qosimsha
    };

    updateInternshipMutation.mutate(payload);
  };

  // Show loading state while initializing
  if (!isInitialized && data) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
        <BackButton />
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          {t("internship")}
        </h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        {t("internship")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <Controller
          name="region_id"
          control={control}
          render={({ field }) => (
            <RegionSelect
              field={field}
              countryId={postCountryId}
              onRegionChange={(val) => {
                field.onChange(val);
                setLocation(postCountryId ?? null, Number(val));
              }}
              error={errors.region_id?.message}
            />
          )}
        />
        <FormInput
          legend={t("role_name")}
          type="text"
          placeholder={t("placeholders.internship.role_name")}
          registration={register("lawazim")}
          isRequired
        />
        <FormInput
          legend={`${t("institution_name")} ${t("not_required")}`}
          type="text"
          placeholder={t("placeholders.internship.institution_name")}
          registration={register("mekeme")}
        />
        <FormInput
          legend={t("requirements")}
          as="textarea"
          placeholder={t("placeholders.internship.requirements")}
          registration={register("talaplar")}
          isRequired
        />

        <FormInput
          legend={t("responsibilities")}
          as="textarea"
          placeholder={t("placeholders.internship.responsibilities")}
          registration={register("májburiyatlar")}
          isRequired
        />

        <FormInput
          legend={`${t("conditions")} ${t("not_required")}`}
          as="textarea"
          placeholder={t("placeholders.internship.conditions")}
          registration={register("sharayatlar")}
        />
        <FormInput
          legend={t("address&format")}
          type="text"
          placeholder={t("placeholders.internship.address&format")}
          registration={register("manzil")}
          isRequired
        />

        <FormInput
          legend={`${t("salary")} ${t("not_required")}`}
          type="text"
          placeholder={t("placeholders.internship.salary")}
          registration={register("tolem")}
        />
        <FormInput
          legend={t("contact")}
          type="text"
          placeholder={t("placeholders.internship.contact")}
          registration={register("baylanis")}
          isRequired
        />

        <FormInput
          legend={`${t("additional_info")} ${t("not_required")}`}
          as="textarea"
          placeholder={t("placeholders.internship.additional_info")}
          registration={register("qosimsha")}
        />
        {updateInternshipMutation.isSuccess && (
          <p className="text-green-500">{t("vacancy_sent")} ✅</p>
        )}
        {updateInternshipMutation.isError && (
          <div className="text-red-500">
            <p>
              {t("error")}: {String(updateInternshipMutation.error)}
            </p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateInternshipMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateInternshipMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {updateInternshipMutation.isPending ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
};

export default InternshipEditForm;
