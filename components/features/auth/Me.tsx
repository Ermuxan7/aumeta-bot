"use client";

import { useMe } from "@/hooks/useMe";

export default function Me({ token }: { token: string }) {
  const { data, isLoading, isError } = useMe(token);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi</p>;

  return (
    <div>
      <h2>Profil</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
