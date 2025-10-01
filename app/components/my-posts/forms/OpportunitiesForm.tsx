"use client";
import FormInput from "@/app/components/form-input/FormInput";
import FileUpload from "@/app/components/upload/FileUpload";
import {
  createOpportunitiesSchema,
  OpportunitiesFormValue
} from "@/app/schema/Opportunities";
import BackButton from "@/components/ui/back-button";
import { useUpdateOpportunity } from "@/hooks/useOpportunities";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

type OpportunitiesEditFormProps = {
  data: any;
};

const OpportunitiesEditForm = ({ data }: OpportunitiesEditFormProps) => {
  const t = useT();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<OpportunitiesFormValue>({
    defaultValues: { daǵaza: "", baylanis: "" },
    resolver: zodResolver(createOpportunitiesSchema(t))
  });

  const fileRef = useRef<File | null>(null);

  useEffect(() => {
    if (data) {
      reset({
        daǵaza: data.content ?? "",
        baylanis: data.contact ?? ""
      });
    }
  }, [data, reset]);

  const updateOpportunityMutation = useUpdateOpportunity(data.id);
  const { countryId, regionId } = useLocationStore();

  const oneFileSelect = (file: File | null) => {
    fileRef.current = file;
  };

  const onSubmit = (data: OpportunitiesFormValue) => {
    const formData = new FormData();

    formData.append("country_id", String(countryId));
    formData.append("region_id", String(regionId));
    formData.append("content", data.daǵaza);
    formData.append("contact", data.baylanis);

    if (fileRef.current) {
      formData.append("img", fileRef.current, fileRef.current.name);
    }

    updateOpportunityMutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        {t("opportunities&grands")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormInput
          legend={t("ad_text_or_summary")}
          as="textarea"
          // rows={5}
          placeholder={t(
            "placeholders.opportunities&grands.ad_text_or_summary"
          )}
          registration={register("daǵaza")}
          error={errors.daǵaza?.message}
        />

        <FormInput
          legend={t("contact_or_link")}
          type="text"
          placeholder={t("placeholders.opportunities&grands.contact_or_link")}
          registration={register("baylanis")}
          error={errors.baylanis?.message}
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
