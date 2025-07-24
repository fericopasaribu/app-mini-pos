"use client";

import { CUSTOM_TEXT } from "@/constants/CustomText";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CustomError } from "./CustomError";

interface CustomImageUploadProps {
  onChange: (file: File | null) => void;
  initialUrl?: string;
  resetKey?: string;
}

export default function CustomImageUpload({
  onChange,
  initialUrl,
  resetKey,
}: CustomImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialUrl) {
      setPreviewUrl(null);
      setIsImageLoaded(false);
      setError(null);
      return;
    }

    const img = new window.Image();
    img.src = initialUrl;
    img.onload = () => {
      setPreviewUrl(initialUrl);
      setIsImageLoaded(true);
      setError(null);
    };
    img.onerror = () => {
      setPreviewUrl(null);
      setIsImageLoaded(false);
      setError(null);
    };
  }, [initialUrl, resetKey]);

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const isSizeValid = file.size <= CUSTOM_TEXT.size_2MB;

      if (!isSizeValid) {
        setError(CUSTOM_TEXT.info_error_size);
        setPreviewUrl(null);
        setIsImageLoaded(false);
        onChange(null);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setError(null);

      const img = new window.Image();
      img.src = objectUrl;
      img.onload = () => {
        setPreviewUrl(objectUrl);
        setIsImageLoaded(true);
      };
      img.onerror = () => {
        setPreviewUrl(null);
        setIsImageLoaded(false);
      };

      onChange(file);
    },
    [onChange]
  );

  const onDropRejected = useCallback(() => {
    setError(CUSTOM_TEXT.info_error_format);
    setPreviewUrl(null);
    setIsImageLoaded(false);
    onChange(null);
  }, [onChange]);  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-md mx-auto mb-5">
      <div
        {...getRootProps()}
        className={`border border-[var(--color-border)] rounded-full cursor-pointer transition w-56 h-56 mx-auto ${
          isDragActive
            ? "border-[var(--color-success)] bg-teal-50"
            : error
            ? "border-[var(--color-error)]"
            : "border-[var(--color-border)]"
        }`}>
        <input {...getInputProps()} />

        <div className="relative w-full h-full aspect-square z-1">
          {previewUrl && isImageLoaded ? (
            <Image
              priority
              src={previewUrl}
              alt="Preview"
              fill
              sizes="300px"
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-[var(--color-border)] italic">
              {CUSTOM_TEXT.info_pilih_file}
            </div>
          )}
        </div>
      </div>

      {error && (
        <CustomError
          value={error}
          className="flex justify-center mt-1.5 mb-0 not-italic"
        />
      )}
    </div>
  );
}
