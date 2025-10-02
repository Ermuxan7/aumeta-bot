"use client";
import FormInput from "@/app/components/form-input/FormInput";
import RegionSelect from "@/app/components/form-input/RegionSelect";
import {
  VacancyFormValue,
  createVacancySchema
} from "@/app/schema/VacancyFormSchema";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useMe } from "@/hooks/useMe";
import { useT } from "@/hooks/useT";
import { useCreateVacancy } from "@/hooks/useVacancy";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Vacancy = () => {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const createVacancyMutation = useCreateVacancy();
  const { setLocation } = useLocationStore();

  const [isInitialized, setIsInitialized] = useState(false);

  const userCountryId = me?.data?.location?.country?.id ?? null;
  const userRegionId = me?.data?.location?.region?.id ?? null;

  const t = useT();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<VacancyFormValue>({
    resolver: zodResolver(createVacancySchema(t)),
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
    }
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
        mekeme: "",
        manzil: "",
        talaplar: "",
        májburiyatlar: "",
        jumisWaqiti: "",
        ayliq: "",
        baylanis: "",
        qosimsha: ""
      });
      setIsInitialized(true);
    }
  }, [me, isLoadingMe, isLoadingRegions, userRegionId, reset, isInitialized]);

  const onSubmit = (data: VacancyFormValue) => {
    setLocation(
      userCountryId ? Number(userCountryId) : null,
      data.region_id ? Number(data.region_id) : null
    );

    const payload = {
      country_id: userCountryId,
      region_id: data.region_id ? Number(data.region_id) : null,
      position_title: data.lawazim,
      organization_name: data.mekeme,
      address: data.manzil,
      requirements: data.talaplar,
      duties: data.májburiyatlar,
      work_schedule: data.jumisWaqiti,
      salary: data.ayliq,
      contact: data.baylanis,
      additional_info: data.qosimsha
    };

    createVacancyMutation.mutate(payload);
  };

  // Show loading state
  const userHasRegion = me?.data?.location?.region?.id;
  const shouldWaitForRegions = userHasRegion && isLoadingRegions;

  if (isLoadingMe || !isInitialized || shouldWaitForRegions) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
        <BackButton />
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          {t("searching_worker")}
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
        {t("searching_worker")}
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

        {createVacancyMutation.isError && (
          <div className="text-red-500">
            {t("error")}: {String(createVacancyMutation.error)}
          </div>
        )}
        {createVacancyMutation.isSuccess && (
          <p className="text-green-500">{t("vacancy_sent")} ✅</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-primary/70 transition-all"
        >
          {createVacancyMutation.isPending ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
};

export default Vacancy;
