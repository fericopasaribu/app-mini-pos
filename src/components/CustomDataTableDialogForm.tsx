"use client";

import { CUSTOM_TEXT } from "@/constants/CustomText";
import { search_barang } from "@/features/search_barang";
import { useSearchBarang } from "@/hooks/useSearchBarang";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { CustomDataTable } from "./CustomDataTable";
import { CustomError } from "./CustomError";
import { CustomInput } from "./CustomInput";
import CustomLoading from "./CustomLoading";

interface CustomDataTableDialogFormProps {
  title: string;
  text: string;
  kode: string;
  isError?: boolean;
}

export function CustomDataTableDialogForm({ 
  title,
  text,
  kode,
  isError = false,
}: CustomDataTableDialogFormProps) {
  const { data, isLoading } = useSearchBarang();

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <div className="w-full">
          <CustomInput
            value={kode}
            readOnly
            className={isError ? "input-error" : "input-text"}
            showSearchIcon
          />
          {isError && (
            <CustomError value={`${text} ${CUSTOM_TEXT.info_wajib_pilih}`} />
          )}
        </div>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-[90vw] max-h-[90vh] sm:max-w-[50%] -translate-x-1/2 -translate-y-1/2">
          <VisuallyHidden>
            <DialogPrimitive.Title className="flex items-center gap-2 mb-4 text-lg font-semibold">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only" />
          </VisuallyHidden>

          <div className="bg-[var(--color-white)] rounded-md p-5 text-justify">
            <CustomLoading isLoading={isLoading}>
              <CustomDataTable
                columns={search_barang}
                data={data ?? []}
                storage={CUSTOM_TEXT.storage_search_barang}
                error={CUSTOM_TEXT.menu_barang}
                text={CUSTOM_TEXT.menu_barang}
              />
            </CustomLoading>

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
