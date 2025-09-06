"use client";
import { useMe } from "@/hooks/useMe";
import { getAccessToken } from "@/lib/auth";

export default function Me() {
  const token = getAccessToken();
  const { data, isLoading, isError } = useMe(token || "");

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi</p>;

  return (
    <div>
      <h2>Profil</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
