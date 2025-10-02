"use client";
import FormInput from "@/app/components/form-input/FormInput";
import FileUpload from "@/app/components/upload/FileUpload";
import {
  createOpportunitiesSchema,
  OpportunitiesFormValue
} from "@/app/schema/Opportunities";
import BackButton from "@/components/ui/back-button";
import { useRegions } from "@/hooks/useCountries";
import { useUpdateOpportunity } from "@/hooks/useOpportunities";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RegionSelect from "../../form-input/RegionSelect";

type OpportunitiesEditFormProps = {
  data: any;
};

const OpportunitiesEditForm = ({ data }: OpportunitiesEditFormProps) => {
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
  } = useForm<OpportunitiesFormValue>({
    defaultValues: { region_id: "", daǵaza: "", baylanis: "" },
    resolver: zodResolver(createOpportunitiesSchema(t))
  });

  const fileRef = useRef<File | null>(null);

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
        daǵaza: data.content ?? "",
        baylanis: data.contact ?? ""
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

  const updateOpportunityMutation = useUpdateOpportunity(data.id);

  const oneFileSelect = (file: File | null) => {
    fileRef.current = file;
  };

  const onSubmit = (formData: OpportunitiesFormValue) => {
    const form = new FormData();

    form.append("country_id", String(countryId ?? postCountryId));
    form.append("region_id", String(regionId ?? postRegionId));
    form.append("content", formData.daǵaza);
    form.append("contact", formData.baylanis);

    if (fileRef.current) {
      form.append("img", fileRef.current, fileRef.current.name);
    }

    updateOpportunityMutation.mutate(form);
  };

  // Show loading state while initializing
  if (!isInitialized && data) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
        <BackButton />
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          {t("opportunities&grands")}
        </h2>
        <p>Loading...</p>
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
              countryId={postCountryId}
              onRegionChange={(val) => {
                field.onChange(val);
                setLocation(postCountryId ?? null, Number(val));
              }}
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
        <FileUpload
          oneFileSelect={oneFileSelect}
          initialImage={data?.img ?? null}
        />
        {updateOpportunityMutation.isError && (
          <div className="text-red-500">
            <p>
              {t("error")}: {String(updateOpportunityMutation.error)}
            </p>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateOpportunityMutation.error as any)?.response?.data,
                null,
                2
              )}
            </pre>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(
                (updateOpportunityMutation.error as any)?.config,
                null,
                2
              )}
            </pre>
          </div>
        )}
        {updateOpportunityMutation.isSuccess && (
          <p className="text-green-500">{t("vacancy_sent")} ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-primary/70 transition-all"
        >
          {updateOpportunityMutation.isPending ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
};

export default OpportunitiesEditForm;
