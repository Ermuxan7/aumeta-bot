"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  createProjectSchema,
  ProjectFormValue
} from "@/app/schema/Project.FormSchema";
import BackButton from "@/components/ui/back-button";
import { useIdProject } from "@/hooks/useProject";
import { useT } from "@/hooks/useT";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type ProjectType = {
  data: any;
};

const ProjectEditForm = ({ data }: ProjectType) => {
  const t = useT();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectFormValue>({
    defaultValues: {
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

  useEffect(() => {
    if (data) {
      reset({
        lawazim: data.who_needed ?? "",
        manzil: data.address ?? "",
        talaplar: data.task_description ?? "",
        tólem: data.salary ?? "",
        deadline: data.deadline ?? "",
        baylanis: data.contact ?? "",
        qosimsha: data.additional_info ?? ""
      });
    }
  }, [data, reset]);

  const updateProjectMutation = useIdProject(data.id);
  const { countryId, regionId } = useLocationStore();

  const onSubmit = (data: ProjectFormValue) => {
    const payload = {
      country_id: countryId,
      region_id: regionId,
      who_needed: data.lawazim,
      task_description: data.talaplar,
      deadline: data.deadline,
      salary: data.tólem,
      contact: data.baylanis,
      address: data.manzil,
      additional_info: data.qosimsha
    };

    updateProjectMutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        {t("one_time_job")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
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
