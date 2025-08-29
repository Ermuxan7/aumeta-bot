"use client";
import clsx from "clsx";
import { useState, useRef } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isdragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type.startsWith("image/")) {
        setFile(selected);
      } else {
        alert("Tek súwret júkley alasiz!");
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      if (dropped.type.startsWith("image/")) {
        setFile(dropped);
      } else {
        alert("Tek súwret júkley alasiz!");
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-muted-foreground ml-4">
        <span className="font-semibold">Súwret júklew</span> (shárt emes)
      </p>
      <label
        htmlFor="fileUpload"
        className={clsx(
          "flex items-center justify-center gap-3 md:gap-7 h-20 cursor-pointer bg-background  text-white px-4 py-3 shadow-md rounded-xl border-2 transition-all",
          isdragging
            ? "border-primary bg-primary/10"
            : "border-muted hover:bg-background/90"
        )}
        onClick={handleBrowseClick}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <img src="/camera.svg" alt="upload image" className="size-6" />

        <div className="flex flex-col items-start gap-1">
          <p className="text-foreground font-semibold text-xl md:text-2xl">
            Fayldı júklew
          </p>
          <p className="text-muted-foreground/70 text-xs md:text-md">
            Kerek fayldı belgilep usı jerge júkleń
          </p>
        </div>
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <div className="mt-4 space-y-2">
          <p className="font-semibold text-foreground">📂 Saylanǵan fayl:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>{file.name}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
