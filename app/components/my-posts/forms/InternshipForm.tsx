"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  InternshipFormValue,
  createInternshipSchema
} from "@/app/schema/InternFormSchema";
import BackButton from "@/components/ui/back-button";
import { useIdInternship } from "@/hooks/useInternship";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
// import { InternshipType } from "@/types/internshipType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type InternshipType = {
  data: any;
};

const InternshipEditForm = ({ data }: InternshipType) => {
  const t = useT();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<InternshipFormValue>({
    defaultValues: {
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

  useEffect(() => {
    if (data) {
      reset({
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
    }
  }, [data, reset]);

  const updateInternshipMutation = useIdInternship(data.id);
  const { countryId, regionId } = useLocationStore();

  const onSubmit = (data: InternshipFormValue) => {
    const payload = {
      country_id: countryId,
      region_id: regionId,
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

    updateInternshipMutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        {t("internship")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormInput
          legend={t("role_name")}
          type="text"
          placeholder={t("placeholders.internship.role_name")}
          registration={register("lawazim")}
        />
        <FormInput
          legend={t("institution_name")}
          type="text"
          placeholder={t("placeholders.internship.institution_name")}
          registration={register("mekeme")}
        />
        <FormInput
          legend={t("requirements")}
          as="textarea"
          placeholder={t("placeholders.internship.requirements")}
          registration={register("talaplar")}
        />

        <FormInput
          legend={t("responsibilities")}
          as="textarea"
          placeholder={t("placeholders.internship.responsibilities")}
          registration={register("májburiyatlar")}
        />

        <FormInput
          legend={t("conditions")}
          as="textarea"
          placeholder={t("placeholders.internship.conditions")}
          registration={register("sharayatlar")}
        />
        <FormInput
          legend={t("address&format")}
          type="text"
          placeholder={t("placeholders.internship.address&format")}
          registration={register("manzil")}
        />

        <FormInput
          legend={t("salary")}
          type="text"
          placeholder={t("placeholders.internship.salary")}
          registration={register("tolem")}
        />
        <FormInput
          legend={t("contact")}
          type="text"
          placeholder={t("placeholders.internship.contact")}
          registration={register("baylanis")}
        />

        <FormInput
          legend={t("additional_info")}
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
