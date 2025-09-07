"use client";
import { useMe } from "@/hooks/useMe";

import { useAuthStore } from "@/store/authStore";
import { error } from "console";

export default function Me() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data, isLoading, isError } = useMe();

  if (!accessToken) return <p>Token tabilmadi</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div>
      <h2>Profil</h2>
      <p>{accessToken}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
