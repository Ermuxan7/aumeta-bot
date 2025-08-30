"use client";
import clsx from "clsx";
import { X } from "lucide-react";
import { useState, useRef } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isdragging, setIsDragging] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
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

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
          "flex items-center justify-center gap-3 md:gap-5 h-20 cursor-pointer bg-background  text-white px-4 py-3 shadow-md rounded-xl border-2 transition-all",
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
        <img
          src="/camera.svg"
          alt="upload image"
          className="size-6 md:size-10"
        />

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
          <div className="relative inline-block">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-60 md:w-full h-30 md:h-60 object-cover rounded-lg border"
              onClick={() => setOpen(true)}
            />
            <div className="absolute right-2 top-2 bg-muted/70 hover:bg-muted p-0.5 rounded-full">
              <X className="size-4" onClick={handleRemove} />
            </div>
          </div>
          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview large"
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
                />
                <X
                  className="absolute -top-4 -right-4 cursor-pointer bg-muted rounded-full p-1 shadow"
                  size={28}
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
