"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center gap-1 text-lg my-4 text-muted-foreground hover:text-muted-foreground/80 transition-colors"
    >
      <ChevronLeft size={18} />
      Back
    </button>
  );
};

export default BackButton;
