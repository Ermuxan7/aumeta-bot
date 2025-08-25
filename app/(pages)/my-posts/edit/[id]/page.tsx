"use client";
import { useParams } from "next/navigation";
import React from "react";

const EditPost = () => {
  const params = useParams();
  return (
    <div className="flex items-center justify-center text-5xl">{params.id}</div>
  );
};

export default EditPost;
