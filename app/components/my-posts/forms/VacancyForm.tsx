"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  createVacancySchema,
  VacancyFormValue
} from "@/app/schema/VacancyFormSchema";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useT } from "@/hooks/useT";
import { useIdUpdateVacancy } from "@/hooks/useVacancy";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RegionSelect from "../../form-input/RegionSelect";

type VacancyFormProps = {
  data: any;
};

const VacancyEditForm = ({ data }: VacancyFormProps) => {
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
  } = useForm<VacancyFormValue>({
    defaultValues: {
      region_id: "",
      lawazim: "",
      mekeme: "",
      manzil: "",
      talaplar: "",
      májburiyatlar: "",
      jumisWaqiti: "",
      ayliq: "",
      baylanis: "",
      qosimsha: ""
    },
    resolver: zodResolver(createVacancySchema(t))
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
        jumisWaqiti: data.work_schedule ?? "",
        ayliq: data.salary ?? "",
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

  const updateVacancyMutation = useIdUpdateVacancy(data.id);

  const onSubmit = (formData: VacancyFormValue) => {
    const payload = {
      country_id: countryId ?? postCountryId,
      region_id: regionId ?? postRegionId,
      position_title: formData.lawazim,
      organization_name: formData.mekeme,
      address: formData.manzil,
      requirements: formData.talaplar,
      duties: formData.májburiyatlar,
      work_schedule: formData.jumisWaqiti,
      salary: formData.ayliq,
      contact: formData.baylanis,
      additional_info: formData.qosimsha
    };

    updateVacancyMutation.mutate(payload);
  };

  // Show loading state while initializing
  if (!isInitialized && data) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
        <BackButton />
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          {t("searching_worker")}
        </h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        {t("searching_worker")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <Controller
          name="region_id"
          control={control}
          render={({ field }) => {
            return (
              <RegionSelect
                field={field}
                countryId={postCountryId}
                onRegionChange={(val) => {
                  field.onChange(val);
                  setLocation(postCountryId ?? null, Number(val));
                }}
              />
            );
          }}
        />
        <FormInput
          legend={t("role_name")}
          type="text"
          placeholder={t("placeholders.vacancy.role_name")}
          registration={register("lawazim")}
          error={errors.lawazim?.message}
          isRequired
        />
        <FormInput
          legend={`${t("institution_name")} ${t("not_required")}`}
          type="text"
          placeholder={t("placeholders.vacancy.institution_name")}
          registration={register("mekeme")}
          error={errors.mekeme?.message}
        />
        <FormInput
          legend={t("address")}
          type="text"
          placeholder={t("placeholders.vacancy.address")}
          registration={register("manzil")}
          error={errors.manzil?.message}
          isRequired
        />
        <FormInput
          legend={t("requirements")}
          as="textarea"
          placeholder={t("placeholders.vacancy.requirements")}
          registration={register("talaplar")}
          error={errors.talaplar?.message}
          isRequired
        />
        <FormInput
          legend={`${t("responsibilities")} ${t("not_required")}`}
          as="textarea"
          placeholder={t("placeholders.vacancy.responsibilities")}
          registration={register("májburiyatlar")}
          error={errors.májburiyatlar?.message}
        />
        <FormInput
          legend={t("working_hours")}
          type="text"
          placeholder={t("placeholders.vacancy.working_hours")}
          registration={register("jumisWaqiti")}
          error={errors.jumisWaqiti?.message}
          isRequired
        />
        <FormInput
          legend={t("monthly_salary")}
          type="text"
          placeholder={t("placeholders.vacancy.monthly_salary")}
          registration={register("ayliq")}
          error={errors.ayliq?.message}
          isRequired
        />
        <FormInput
          legend={t("contact")}
          type="text"
          placeholder={t("placeholders.vacancy.contact")}
          registration={register("baylanis")}
          error={errors.baylanis?.message}
          isRequired
        />
        <FormInput
          legend={`${t("additional_info")} ${t("not_required")}`}
          as="textarea"
          placeholder={t("placeholders.vacancy.additional_info")}
          registration={register("qosimsha")}
          error={errors.qosimsha?.message}
        />

        {updateVacancyMutation.isError && (
          <div className="text-red-500">
            <p>
              {t("error")}: {String(updateVacancyMutation.error)}
            </p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateVacancyMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateVacancyMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}

        {updateVacancyMutation.isSuccess && (
          <p className="text-green-500">{t("vacancy_sent")} ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-primary/70 transition-all"
        >
          {updateVacancyMutation.isPending ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
};

export default VacancyEditForm;
