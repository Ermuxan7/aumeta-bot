"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  OpportunitiesSchema,
  OpportunitiesFormValue,
} from "@/app/schema/Opportunities";
import BackButton from "@/components/ui/back-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Opportunities = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpportunitiesFormValue>({
    resolver: zodResolver(OpportunitiesSchema),
  });

  const onSubmit = (data: OpportunitiesFormValue) => {
    console.log("Data: ", data);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-2xl md:text-3xl mb-4">Imkaniyatlar & grantlar</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormInput
          legend="Daǵaza teksti yáki mazmunı"
          as="textarea"
          placeholder="Daǵaza mazmunı"
          registration={register("daǵaza")}
        />
        {errors.daǵaza && (
          <p className="text-red-500">{errors.daǵaza.message}</p>
        )}
        <FormInput
          legend="Baylanıs yáki silteme"
          type="text"
          placeholder="998901234567, ab@email.com, @hr"
          registration={register("baylanis")}
        />
        {errors.baylanis && (
          <p className="text-red-500">{errors.baylanis.message}</p>
        )}
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

export default Opportunities;
