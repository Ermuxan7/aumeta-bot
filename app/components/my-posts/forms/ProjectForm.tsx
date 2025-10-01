"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  createProjectSchema,
  ProjectFormValue
} from "@/app/schema/Project.FormSchema";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useIdProject } from "@/hooks/useProject";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RegionSelect from "../../form-input/RegionSelect";

type ProjectType = {
  data: any;
};

const ProjectEditForm = ({ data }: ProjectType) => {
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
  } = useForm<ProjectFormValue>({
    defaultValues: {
      region_id: "",
      lawazim: "",
      talaplar: "",
      tólem: "",
      deadline: "",
      baylanis: "",
      manzil: "",
      qosimsha: ""
    },
    resolver: zodResolver(createProjectSchema(t))
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
        lawazim: data.who_needed ?? "",
        manzil: data.address ?? "",
        talaplar: data.task_description ?? "",
        tólem: data.salary ?? "",
        deadline: data.deadline ?? "",
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

  const updateProjectMutation = useIdProject(data.id);

  const onSubmit = (formData: ProjectFormValue) => {
    const payload = {
      country_id: countryId ?? postCountryId,
      region_id: regionId ?? postRegionId,
      who_needed: formData.lawazim,
      task_description: formData.talaplar,
      deadline: formData.deadline,
      salary: formData.tólem,
      contact: formData.baylanis,
      address: formData.manzil,
      additional_info: formData.qosimsha
    };

    updateProjectMutation.mutate(payload);
  };

  // Show loading state while initializing
  if (!isInitialized && data) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
        <BackButton />
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          {t("one_time_job")}
        </h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        {t("one_time_job")}
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
            />
          )}
        />
        <FormInput
          legend={t("who_you_need")}
          type="text"
          placeholder={t("placeholders.one_time_job.who_you_need")}
          registration={register("lawazim")}
          error={errors.lawazim?.message}
        />
        <FormInput
          legend={t("what_to_do")}
          as="textarea"
          placeholder={t("placeholders.one_time_job.what_to_do")}
          registration={register("talaplar")}
          error={errors.talaplar?.message}
        />
        <FormInput
          legend={t("salary_income")}
          type="text"
          placeholder={t("placeholders.one_time_job.salary_income")}
          registration={register("tólem")}
          error={errors.tólem?.message}
        />
        <FormInput
          legend={t("deadline")}
          placeholder={t("placeholders.one_time_job.deadline")}
          registration={register("deadline")}
          error={errors.deadline?.message}
        />
        <FormInput
          legend={t("contact")}
          type="text"
          placeholder={t("placeholders.one_time_job.contact")}
          registration={register("baylanis")}
          error={errors.baylanis?.message}
        />
        <FormInput
          legend={t("address_location")}
          type="text"
          placeholder={t("placeholders.one_time_job.address_location")}
          registration={register("manzil")}
          error={errors.manzil?.message}
        />
        <FormInput
          legend={t("additional_info")}
          as="textarea"
          placeholder={t("placeholders.one_time_job.additional_info")}
          registration={register("qosimsha")}
          error={errors.qosimsha?.message}
        />
        {updateProjectMutation.isError && (
          <div className="text-red-500">
            <p>
              {t("error")}: {String(updateProjectMutation.error)}
            </p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateProjectMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateProjectMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}
        {updateProjectMutation.isSuccess && (
          <p className="text-green-500">{t("vacancy_sent")} ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {updateProjectMutation.isPending ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
};

export default ProjectEditForm;
