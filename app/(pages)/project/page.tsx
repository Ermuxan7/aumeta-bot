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
        />
        {errors.aymaq && <p className="text-red-500">{errors.aymaq.message}</p>}
        <FormInput
          legend="Sizge kim kerek?"
          type="text"
          placeholder="Santexnik, Dilmash, Mobilograf, Muzikant"
          registration={register("lawazim")}
        />
        {errors.lawazim && (
          <p className="text-red-500">{errors.lawazim.message}</p>
        )}
        <FormInput
          legend="Ne islew kerek?"
          type="text"
          placeholder="Júk tasıw kerek, ońlaw kerek, logotip yáki video túsiriw kerek h.t.b. Tapsırmanı qısqasha jazıń."
          registration={register("talaplar")}
        />
        {errors.talaplar && (
          <p className="text-red-500">{errors.talaplar.message}</p>
        )}
        <FormInput
          legend="Is haqı, tólem"
          type="text"
          placeholder="Kelisimli, $800, 7 mln swm h.t.b"
          registration={register("tólem")}
        />
        {errors.tólem && <p className="text-red-500">{errors.tólem.message}</p>}
        <FormInput
          legend="Orınlaw múddeti"
          as="textarea"
          placeholder="Búginge, 18:00 ge yáki 27 avgustqa shekem"
          registration={register("deadline")}
        />
        <FormInput
          legend="Baylanıs"
          type="text"
          placeholder="+998901234567, ab@email.com, @user"
          registration={register("baylanis")}
        />
        {errors.baylanis && (
          <p className="text-red-500">{errors.baylanis.message}</p>
        )}
        <FormInput
          legend="Mánzil, lokaciya"
          type="text"
          placeholder="Nókis, A.Dosnazarov 16, online"
          registration={register("manzil")}
        />
        {errors.manzil && (
          <p className="text-red-500">{errors.manzil.message}</p>
        )}
        <FormInput
          legend="Qosımsha"
          as="textarea"
          placeholder="Qosımsha zat bolsa jazıń"
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
