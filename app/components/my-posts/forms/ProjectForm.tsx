"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  ProjectSchema,
  ProjectFormValue,
} from "@/app/schema/Project.FormSchema";
import BackButton from "@/components/ui/back-button";
import { useCreateProject, useIdProject } from "@/hooks/useProject";
import { useLocationStore } from "@/store/locationStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type ProjectType = {
  data: any;
};

const ProjectEditForm = ({ data }: ProjectType) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValue>({
    defaultValues: {
      aymaq: "",
      lawazim: "",
      talaplar: "",
      tólem: "",
      deadline: "",
      baylanis: "",
      manzil: "",
      qosimsha: "",
    },
    resolver: zodResolver(ProjectSchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        aymaq: data.location?.region ?? "",
        lawazim: data.who_needed ?? "",
        manzil: data.address ?? "",
        talaplar: data.task_description ?? "",
        tólem: data.salary ?? "",
        deadline: data.deadline ?? "",
        baylanis: data.contact ?? "",
        qosimsha: data.additional_info ?? "",
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
      additional_info: data.qosimsha,
    };

    updateProjectMutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        Bir mártelik wazıypa/joybar
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormInput
          legend="Aymaq"
          type="text"
          placeholder="Qaraqalpaqstan, Tashkent, Samarqand, Nawayı, Xarezm h.t.b"
          registration={register("aymaq")}
          error={errors.aymaq?.message}
        />
        <FormInput
          legend="Sizge kim kerek?"
          type="text"
          placeholder="Santexnik, Dilmash, Mobilograf, Muzikant"
          registration={register("lawazim")}
          error={errors.lawazim?.message}
        />
        <FormInput
          legend="Ne islew kerek?"
          as="textarea"
          placeholder="Júk tasıw kerek, ońlaw kerek, logotip yáki video túsiriw kerek h.t.b. Tapsırmanı qısqasha jazıń."
          registration={register("talaplar")}
          error={errors.talaplar?.message}
        />
        <FormInput
          legend="Is haqı, tólem"
          type="text"
          placeholder="Kelisimli, $800, 7 mln swm h.t.b"
          registration={register("tólem")}
          error={errors.tólem?.message}
        />
        <FormInput
          legend="Orınlaw múddeti"
          placeholder="Búginge, 18:00 ge yáki 27 avgustqa shekem"
          registration={register("deadline")}
          error={errors.deadline?.message}
        />
        <FormInput
          legend="Baylanıs"
          type="text"
          placeholder="+998901234567, ab@email.com, @user"
          registration={register("baylanis")}
          error={errors.baylanis?.message}
        />
        <FormInput
          legend="Mánzil, lokaciya"
          type="text"
          placeholder="Nókis, A.Dosnazarov 16, online"
          registration={register("manzil")}
          error={errors.manzil?.message}
        />
        <FormInput
          legend="Qosımsha"
          as="textarea"
          placeholder="Qosımsha zat bolsa jazıń"
          registration={register("qosimsha")}
          error={errors.qosimsha?.message}
        />
        {updateProjectMutation.isError && (
          <div className="text-red-500">
            <p>Qatelik: {String(updateProjectMutation.error)}</p>
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
          <p className="text-green-500">Vakansiya jiberildi ✅</p>
        )}
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          {updateProjectMutation.isPending ? "Jiberilmekte" : "Jiberiw"}
        </button>
      </form>
    </div>
  );
};

export default ProjectEditForm;
