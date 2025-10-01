"use client";
import FormInput from "@/app/components/form-input/FormInput";
import RegionSelect from "@/app/components/form-input/RegionSelect";
import {
  ProjectFormValue,
  createProjectSchema
} from "@/app/schema/Project.FormSchema";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useMe } from "@/hooks/useMe";
import { useCreateProject } from "@/hooks/useProject";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Project = () => {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const { setLocation } = useLocationStore();
  const createProjectMutation = useCreateProject();

  const [isInitialized, setIsInitialized] = useState(false);

  const userCountryId = me?.data?.location?.country?.id ?? null;
  const userRegionId = me?.data?.location?.region?.id ?? null;

  const t = useT();

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
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

  const { data: regions = [], isLoading: isLoadingRegions } = useRegions(
    userCountryId ?? undefined
  );

  // Initialize form with user data - only once to avoid race conditions
  useEffect(() => {
    if (!me || isLoadingMe) {
      return;
    }

    // If user has a region, wait for regions to load before initializing
    const userHasRegion = me.data?.location?.region?.id;
    if (userHasRegion && isLoadingRegions) {
      return;
    }

    if (!isInitialized) {
      reset({
        region_id: userRegionId?.toString() ?? "",
        lawazim: "",
        talaplar: "",
        tólem: "",
        deadline: "",
        baylanis: "",
        manzil: "",
        qosimsha: ""
      });
      setIsInitialized(true);
    }
  }, [me, isLoadingMe, isLoadingRegions, userRegionId, reset, isInitialized]);

  const onSubmit = (data: ProjectFormValue) => {
    setLocation(
      userCountryId ?? null,
      data.region_id ? Number(data.region_id) : null
    );
    const payload = {
      country_id: userCountryId,
      region_id: data.region_id ? Number(data.region_id) : null,
      who_needed: data.lawazim,
      task_description: data.talaplar,
      deadline: data.deadline,
      salary: data.tólem,
      contact: data.baylanis,
      address: data.manzil,
      additional_info: data.qosimsha
    };

    createProjectMutation.mutate(payload);
  };

  // Show loading state
  const userHasRegion = me?.data?.location?.region?.id;
  const shouldWaitForRegions = userHasRegion && isLoadingRegions;

  if (isLoadingMe || !isInitialized || shouldWaitForRegions) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
        <BackButton />
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          {t("one_time_job")}
        </h2>
        <div className="space-y-4">
          <p>Loading...</p>
        </div>
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
              countryId={userCountryId}
              onRegionChange={(val) => {
                field.onChange(val);
                setLocation(userCountryId ?? null, Number(val));
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
          error={errors.qosimsha?.message}
        />
        {createProjectMutation.isError && (
          <div className="text-red-500">
            <p>
              {t("error")}: {String(createProjectMutation.error)}
            </p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createProjectMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createProjectMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}
        {createProjectMutation.isSuccess && (
          <p className="text-green-500">{t("vacancy_sent")} ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {createProjectMutation.isPending ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
};

export default Project;
