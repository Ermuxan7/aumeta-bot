"use client";
import { useMyVacancies } from "@/hooks/useVacancy";
import { useParams } from "next/navigation";

export default function MyPostDetail() {
  const { id, form } = useParams<{ id: string; form: string }>();
  const { data, isLoading, isError, error } = useMyVacancies();

  const vacancy = data?.data.find(
    (item: any) => String(item.id) === String(id)
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {String(error)}</p>;
  if (!vacancy) return <p>No data found</p>;

  // 🔹 Backend ma’lumotlari sizdagi form input field lar bilan bir xil
  return (
    <div className="w-full max-w-5xl mx-auto mt-6 px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl font-semibold mb-4">{vacancy.position_title}</h2>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Mekeme:</strong> {vacancy.organization_name}
        </p>
        <p>
          <strong>Aymaq:</strong> {vacancy.location?.country},{" "}
          {vacancy.location?.region}
        </p>
        <p>
          <strong>Manzil:</strong> {vacancy.address}
        </p>
        <p>
          <strong>Talaplar:</strong> {vacancy.requirements}
        </p>
        <p>
          <strong>Majburiyatlar:</strong> {vacancy.duties}
        </p>
        <p>
          <strong>Jumıs waqıtı:</strong> {vacancy.work_schedule}
        </p>
        <p>
          <strong>Aylıq:</strong> {vacancy.salary}
        </p>
        <p>
          <strong>Baylanıs:</strong> {vacancy.contact}
        </p>
        {vacancy.additional_info && (
          <p>
            <strong>Qosımsha:</strong> {vacancy.additional_info}
          </p>
        )}
      </div>
    </div>
  );
}
