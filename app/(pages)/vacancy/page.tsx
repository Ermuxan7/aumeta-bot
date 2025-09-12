"use client";
import FormInput from "@/app/components/form-input/FormInput";
import BackButton from "@/components/ui/back-button";
import { useMyVacancies } from "@/hooks/useVacancy";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function MyPostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useMyVacancies();

  const vacancy = data?.data.find(
    (item: any) => String(item.id) === String(id)
  );

  const { register } = useForm({
    defaultValues: vacancy,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {String(error)}</p>;
  if (!vacancy) return <p>No data found</p>;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 sm:px-8 md:px-12">
      <BackButton />
      <h2 className="text-xl md:text-3xl font-semibold mb-4">
        Vakansiya Id:{id}
      </h2>

      <form className="space-y-4 mb-8">
        <FormInput
          legend="Aymaq"
          type="text"
          registration={register("location.country")}
          value={`${vacancy.location?.country}, ${vacancy.location?.region}`}
          disabled
        />
        <FormInput
          legend="Lawazım"
          type="text"
          registration={register("position_title")}
          value={vacancy.position_title}
          disabled
        />
        <FormInput
          legend="Mekeme"
          type="text"
          registration={register("organization_name")}
          value={vacancy.organization_name}
          disabled
        />
        <FormInput
          legend="Mánzil"
          type="text"
          registration={register("address")}
          value={vacancy.address}
          disabled
        />
        <FormInput
          legend="Talaplar"
          as="textarea"
          registration={register("requirements")}
          value={vacancy.requirements}
          disabled
        />
        <FormInput
          legend="Májburiyatlar"
          as="textarea"
          registration={register("duties")}
          value={vacancy.duties}
          disabled
        />
        <FormInput
          legend="Jumıs waqıtı"
          type="text"
          registration={register("work_schedule")}
          value={vacancy.work_schedule}
          disabled
        />
        <FormInput
          legend="Aylıq"
          type="text"
          registration={register("salary")}
          value={vacancy.salary}
          disabled
        />
        <FormInput
          legend="Baylanıs"
          type="text"
          registration={register("contact")}
          value={vacancy.contact}
          disabled
        />
        {vacancy.additional_info && (
          <FormInput
            legend="Qosımsha"
            as="textarea"
            registration={register("additional_info")}
            value={vacancy.additional_info}
            disabled
          />
        )}
      </form>
    </div>
  );
}
