"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center gap-1 text-lg my-4 text-gray-500 hover:text-gray-600/60"
    >
      Back
      <ChevronRight size={18} />
    </button>
  );
};

export default BackButton;
