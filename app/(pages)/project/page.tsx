"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  ProjectSchema,
  ProjectFormValue,
} from "@/app/schema/Project.FormSchema";
import BackButton from "@/components/ui/back-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Project = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValue>({
    resolver: zodResolver(ProjectSchema),
  });

  const onSubmit = (data: ProjectFormValue) => {
    console.log("Data: ", data);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-2xl md:text-3xl mb-4">Bir mártelik wazıypa/joybar</h2>
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
          error={errors.qosimsha?.message}
        />
        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Jiberiw
        </button>
      </form>
    </div>
  );
};

export default Project;
