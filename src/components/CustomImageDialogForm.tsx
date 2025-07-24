"use client";

import { CUSTOM_TEXT } from "@/constants/CustomText";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CustomImageDialogFormProps {
  thumbnailSrc: string;
  fullImageSrc: string;
  alt?: string;
  thumbnailClassName?: string;
}

export function CustomImageDialogForm({
  thumbnailSrc,
  fullImageSrc,
  alt = "",
  thumbnailClassName = "rounded-full object-cover w-full h-full lg:w-15 lg:h-15 hover:opacity-80 transition",
}: CustomImageDialogFormProps) {
  const [isImageError, setIsImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isValidImage = (src?: string) => {
    return typeof src === "string" && src.trim() !== "" && !src.endsWith("/");
  };

  useEffect(() => {
    if (!isValidImage(fullImageSrc)) {
      setIsImageError(true);
      return;
    }

    const img = new window.Image();
    img.src = fullImageSrc;

    img.onload = () => {
      setIsImageError(false);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsImageError(true);
      setIsLoaded(false);
    };
  }, [fullImageSrc]);

  if (!isValidImage(thumbnailSrc) || isImageError || !isLoaded) {
    return (
      <div className="w-full max-w-md mx-auto mb-17.5">
        <div className="border border-[var(--color-border)] rounded-full transition w-56 h-56 relative mx-auto">
          <div className="relative w-full h-full aspect-square flex justify-center items-center">
            <Image
              priority
              src={`/${CUSTOM_TEXT.dir_images}/${CUSTOM_TEXT.file_noimage}`}
              alt="No Image"
              fill
              sizes="300px"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <div className="w-full max-w-md mx-auto mb-17.5">
          <div className="border border-[var(--color-border)] rounded-full transition w-56 h-56 relative mx-auto">
            <div className="relative w-full h-full aspect-square flex justify-center items-center cursor-pointer">
              <Image
                priority
                src={thumbnailSrc}
                alt={alt}
                title={CUSTOM_TEXT.text_zoom_foto}
                fill
                sizes="300px"
                className={thumbnailClassName}
              />
            </div>
          </div>
        </div>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-[90vw] max-h-[90vh] sm:max-w-md -translate-x-1/2 -translate-y-1/2">
          <VisuallyHidden>
            <DialogPrimitive.Title className="flex items-center gap-2 mb-4 text-lg font-semibold">
              {alt}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only" />
          </VisuallyHidden>

          <div className="relative">
            <Image
              src={fullImageSrc}
              alt={alt}
              width={500}
              height={500}
              className="rounded-lg object-contain"
            />
            <DialogPrimitive.Close asChild>
              <button className="absolute right-[-1rem] top-[-1rem] rounded-full p-2 border border-[var(--color-border)] text-[var(--color-black)] bg-[var(--color-white)] focus:!ring-0 focus:!ring-[var(--color-sort)] outline-0 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
