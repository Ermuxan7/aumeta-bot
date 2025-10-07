"use client";
import FormInput from "@/app/components/form-input/FormInput";
import RegionSelect from "@/app/components/form-input/RegionSelect";
import FileUpload from "@/app/components/upload/FileUpload";
import {
  OpportunitiesFormValue,
  createOpportunitiesSchema
} from "@/app/schema/Opportunities";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useMe } from "@/hooks/useMe";
import { useOpportunities } from "@/hooks/useOpportunities";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Opportunities = () => {
  const { data: me, isLoading: isLoadingMe } = useMe();
  const createOpportunityMutation = useOpportunities();
  const { setLocation } = useLocationStore();

  const [isInitialized, setIsInitialized] = useState(false);

  const userCountryId = me?.data?.location?.country?.id ?? null;
  const userRegionId = me?.data?.location?.region?.id ?? null;

  const t = useT();

  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<OpportunitiesFormValue>({
    defaultValues: {
      region_id: "",
      daǵaza: "",
      baylanis: ""
    },
    resolver: zodResolver(createOpportunitiesSchema(t))
  });

  const { data: regions = [], isLoading: isLoadingRegions } = useRegions(
    userCountryId ?? undefined
  );
  const fileRef = useRef<File | null>(null);

  const oneFileSelect = (file: File | null) => {
    fileRef.current = file;
  };

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
        daǵaza: "",
        baylanis: ""
      });
      setIsInitialized(true);
    }
  }, [me, isLoadingMe, isLoadingRegions, userRegionId, reset, isInitialized]);

  const onSubmit = (data: OpportunitiesFormValue) => {
    setLocation(
      userCountryId ? Number(userCountryId) : null,
      data.region_id ? Number(data.region_id) : null
    );

    const formData = new FormData();
    formData.append("country_id", String(userCountryId ?? ""));
    formData.append("region_id", String(data.region_id ?? ""));
    formData.append("content", data.daǵaza);
    formData.append("contact", data.baylanis);

    if (fileRef.current) {
      formData.append("img", fileRef.current, fileRef.current.name);
    }

    createOpportunityMutation.mutate(formData);
  };

  // Show loading state
  const userHasRegion = me?.data?.location?.region?.id;
  const shouldWaitForRegions = userHasRegion && isLoadingRegions;

  if (isLoadingMe || !isInitialized || shouldWaitForRegions) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
        <BackButton />
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          {t("opportunities&grands")}
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
        {t("opportunities&grands")}
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
          legend={t("ad_text_or_summary")}
          as="textarea"
          // rows={5}
          placeholder={t(
            "placeholders.opportunities&grands.ad_text_or_summary"
          )}
          registration={register("daǵaza")}
          error={errors.daǵaza?.message}
          isRequired
        />

        <FormInput
          legend={t("contact_or_link")}
          type="text"
          placeholder={t("placeholders.opportunities&grands.contact_or_link")}
          registration={register("baylanis")}
          error={errors.baylanis?.message}
          isRequired
        />
        <FileUpload oneFileSelect={oneFileSelect} />
        {createOpportunityMutation.isError && (
          <div className="text-red-500">
            <p>
              {t("error")}: {String(createOpportunityMutation.error)}
            </p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createOpportunityMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (createOpportunityMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}
        {createOpportunityMutation.isSuccess && (
          <p className="text-green-500">{t("vacancy_sent")} ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-primary/70 transition-all"
        >
          {createOpportunityMutation.isPending ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
};

export default Opportunities;
