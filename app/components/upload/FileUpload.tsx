"use client";
import React, { useState, DragEvent, useRef } from "react";

const FileUpload = () => {
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col">
      {/* Asosiy bosiladigan label */}
      <div
        className="flex items-center justify-center gap-5 md:gap-7 h-25 cursor-pointer bg-muted text-white px-4 py-2 shadow-md rounded-lg hover:bg-muted/80 transition-all"
        onClick={() => setOpenDrop(!openDrop)}
      >
        <div className="flex items-center justify-center bg-background p-3 rounded-full border border-white">
          <img src="/cloud-add.svg" alt="upload image" className="size-8" />
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <p className="text-foreground font-bold text-xl md:text-2xl">
            Upload files
          </p>
          <p className="text-muted-foreground/70 text-xs md:text-md">
            Select and upload the files of your choice
          </p>
        </div>
      </div>

      {openDrop && (
        <div
          className={`border-t-2 ${
            dragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground"
          } bg-muted h-56 flex flex-col items-center justify-center gap-6 text-center text-muted-foreground/70 px-4 py-6 transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <img src="/cloud-add.svg" alt="upload image" className="size-12" />
            <p>
              Choose a file or drag & drop it here
              <br />
              JPEG, PNG, PDF, and MP4 formats, up to 50MB
            </p>
          </div>
          <button
            className="text-muted font-semibold bg-white hover:bg-white/90 rounded-md w-34 py-2"
            onClick={handleBrowseClick}
          >
            Browse file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) =>
              e.target.files && setFiles(Array.from(e.target.files))
            }
          />
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="font-semibold text-foreground">📂 Selected files:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
