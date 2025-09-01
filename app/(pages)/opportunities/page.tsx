"use client";
import FormInput from "@/app/components/form-input/FormInput";
import FileUpload from "@/app/components/upload/FileUpload";
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
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        Imkaniyatlar & grantlar
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormInput
          legend="Daǵaza teksti yáki mazmunı"
          as="textarea"
          // rows={5}
          placeholder="Daǵaza mazmunı"
          registration={register("daǵaza")}
          error={errors.daǵaza?.message}
        />

        <FormInput
          legend="Baylanıs yáki silteme"
          type="text"
          placeholder="998901234567, ab@email.com, @hr"
          registration={register("baylanis")}
          error={errors.baylanis?.message}
        />
        <FileUpload />
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
