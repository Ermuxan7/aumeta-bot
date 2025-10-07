"use client";
import FormInput from "@/app/components/form-input/FormInput";
import RegionSelect from "@/app/components/form-input/RegionSelect";
import {
  InternshipFormValue,
  createInternshipSchema
} from "@/app/schema/InternFormSchema";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useCreateInternship } from "@/hooks/useInternship";
import { useMe } from "@/hooks/useMe";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Internship = () => {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const createInternshipMutation = useCreateInternship();
  const { setLocation } = useLocationStore();

  const [isInitialized, setIsInitialized] = useState(false);

  const userCountryId = me?.data?.location?.country?.id ?? null;
  const userRegionId = me?.data?.location?.region?.id ?? null;

  const t = useT();

  const {
    register,
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<InternshipFormValue>({
    defaultValues: {
      region_id: "",
      lawazim: "",
      mekeme: "",
      manzil: "",
      talaplar: "",
      májburiyatlar: "",
      sharayatlar: "",
      tolem: "",
      baylanis: "",
      qosimsha: ""
    },
    resolver: zodResolver(createInternshipSchema(t))
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
        sharayatlar: "",
        tolem: "",
        baylanis: "",
        qosimsha: ""
      });
      setIsInitialized(true);
    }
  }, [me, isLoadingMe, isLoadingRegions, userRegionId, reset, isInitialized]);

  const onSubmit = (data: InternshipFormValue) => {
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
      conditions: data.sharayatlar,
      duties: data.májburiyatlar,
      salary: data.tolem,
      contact: data.baylanis,
      additional_info: data.qosimsha
    };

    createInternshipMutation.mutate(payload);
  };

  // Show loading state
  const userHasRegion = me?.data?.location?.region?.id;
  const shouldWaitForRegions = userHasRegion && isLoadingRegions;

  if (isLoadingMe || !isInitialized || shouldWaitForRegions) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
        <BackButton />
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          {t("internship")}
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
        {t("internship")}
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
        {errors.lawazim && (
          <p className="text-red-500">{errors.lawazim.message}</p>
        )}
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
        {errors.talaplar && (
          <p className="text-red-500">{errors.talaplar.message}</p>
        )}
        <FormInput
          legend={t("responsibilities")}
          as="textarea"
          placeholder={t("placeholders.internship.responsibilities")}
          registration={register("májburiyatlar")}
          isRequired
        />
        {errors.májburiyatlar && (
          <p className="text-red-500">{errors.májburiyatlar.message}</p>
        )}
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
        {errors.manzil && (
          <p className="text-red-500">{errors.manzil.message}</p>
        )}
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
        {errors.baylanis && (
          <p className="text-red-500">{errors.baylanis.message}</p>
        )}
        <FormInput
          legend={`${t("additional_info")} ${t("not_required")}`}
          as="textarea"
          placeholder={t("placeholders.internship.additional_info")}
          registration={register("qosimsha")}
        />
        {createInternshipMutation.isSuccess && (
          <p className="text-green-500">{t("vacancy_sent")} ✅</p>
        )}
        {createInternshipMutation.isError && (
          <div className="text-red-500">
            <p>
              {t("error")}: {String(createInternshipMutation.error)}
            </p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createInternshipMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createInternshipMutation.error as any)?.config,
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
          {createInternshipMutation.isPending ? <>{t("sending")}</> : t("send")}
        </button>
      </form>
    </div>
  );
};

export default Internship;
