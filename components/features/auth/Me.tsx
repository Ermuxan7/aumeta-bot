"use client";
import { useMe } from "@/hooks/useMe";

import { useAuthStore } from "@/store/authStore";

export default function Me() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data, isLoading, isError } = useMe();

  if (!accessToken) return <p>Token tabilmadi</p>;
  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi</p>;

  return (
    <div>
      <h2>Profil</h2>
      <p>{accessToken}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
