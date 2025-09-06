"use client";
import FormInput from "@/app/components/form-input/FormInput";
import {
  VacancySchema,
  VacancyFormValue,
} from "@/app/schema/VacancyFormSchema";
import BackButton from "@/components/ui/back-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useIdVacancy } from "@/hooks/useVacancy";

const PostDetail = () => {
  const params = useParams();
  const vacancyId = params.id as string;

  const { data, error, isPending, isError } = useIdVacancy(vacancyId);

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Xatolik: {error.message}</p>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacancyFormValue>({
    resolver: zodResolver(VacancySchema),
    defaultValues: {
      aymaq: "Tashkent",
      lawazim: "Dizayner",
      mekeme: "Bizler Group",
      manzil: "Tashkent, Amir Temur ko‘shesi",
      talaplar: "2 jıl tájiriybe, Ingliz tili B2",
      májburiyatlar: "Klientlermen islew, dizayn tayyarlaw",
      jumisWaqiti: "9:00 - 18:00",
      ayliq: "$1000",
      baylanis: "example@gmail.com",
      qosimsha: "Bonuslar hám gybrid is sharayati",
    },
  });

  const onSubmit = (data: VacancyFormValue) => {
    console.log("Updated Vacancy Data: ", data);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-2xl font-semibold mb-4">Meniń postım</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormInput
          legend="Aymaq"
          type="text"
          registration={register("aymaq")}
        />
        {errors.aymaq && <p className="text-red-500">{errors.aymaq.message}</p>}

        <FormInput
          legend="Lawazım"
          type="text"
          registration={register("lawazim")}
        />
        {errors.lawazim && (
          <p className="text-red-500">{errors.lawazim.message}</p>
        )}

        <FormInput
          legend="Mekeme"
          type="text"
          registration={register("mekeme")}
        />

        <FormInput
          legend="Mánzil"
          type="text"
          registration={register("manzil")}
        />
        {errors.manzil && (
          <p className="text-red-500">{errors.manzil.message}</p>
        )}

        <FormInput
          legend="Talaplar"
          as="textarea"
          registration={register("talaplar")}
        />
        {errors.talaplar && (
          <p className="text-red-500">{errors.talaplar.message}</p>
        )}

        <FormInput
          legend="Májburiyatlar"
          as="textarea"
          registration={register("májburiyatlar")}
        />
        {errors.májburiyatlar && (
          <p className="text-red-500">{errors.májburiyatlar.message}</p>
        )}

        <FormInput
          legend="Jumıs waqıtı"
          type="text"
          registration={register("jumisWaqiti")}
        />
        {errors.jumisWaqiti && (
          <p className="text-red-500">{errors.jumisWaqiti.message}</p>
        )}

        <FormInput
          legend="Aylıq"
          type="text"
          registration={register("ayliq")}
        />
        {errors.ayliq && <p className="text-red-500">{errors.ayliq.message}</p>}

        <FormInput
          legend="Baylanıs"
          type="text"
          registration={register("baylanis")}
        />
        {errors.baylanis && (
          <p className="text-red-500">{errors.baylanis.message}</p>
        )}

        <FormInput
          legend="Qosımsha"
          as="textarea"
          registration={register("qosimsha")}
        />

        <button
          type="submit"
          className="px-4 py-2 flex justify-center items-center w-full bg-primary text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Saqlaw
        </button>
      </form>
    </div>
  );
};

export default PostDetail;
