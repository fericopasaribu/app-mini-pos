"use client";

import axios from "axios";
import { Check, ChevronDown, Info } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { cn } from "@/lib/utils";
import { CustomError } from "./CustomError";

interface Source {
  id: number;
  nama: string;
}

interface CustomComboBoxProps {
  text: string;
  value: number | null;
  api: string;
  onChange: (id: number | null) => void;
  isError?: boolean;
}

export function CustomCombobox({
  text,
  value,
  api,
  onChange,
  isError = false,
}: CustomComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Source[]>([]);

  // Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(api);
        setItems(res.data?.result ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [api]);

  const selectedItem = items.find((item) => item.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={`cursor-pointer h-12 w-full hover:bg-transparent transition duration-300 focus:!border-transparent focus:!ring-2 data-[state=open]:ring-2 data-[state=open]:!border-transparent text-base my-2.5 ${
          isError
            ? "!border-[var(--color-error)] focus:!ring-[var(--color-error)] data-[state=open]:ring-[var(--color-error)]"
            : "!border-[var(--color-border)] focus:!ring-[var(--color-sort)] data-[state=open]:ring-[var(--color-sort)]"
        }`}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between truncate ${
            isError && "!border-[var(--color-error)]"
          }`}>
          <span className="truncate block">
            {selectedItem ? selectedItem.nama : `Pilih ${text}`}
          </span>
          <ChevronDown className="ml-0 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={10}
        align="start"
        className="sm:min-w-[500] sm:w-[--radix-popover-trigger-width] p-0 border-[var(--color-border)]">
        <div className="overflow-y-auto max-h-75 m-0 rounded-md">
          {" "}
          <Command className="pt-1">
            <CommandInput
              className="text-base"
              placeholder={`Cari ${text}...`}
            />
            <CommandEmpty className="text-sm text-[var(--color-error)]">
              <div className="flex items-center justify-center pt-3 pb-2">
                <Info className="error-icon" />{" "}
                {`${text} ${CUSTOM_TEXT.info_data_kosong}`}
              </div>
            </CommandEmpty>

            <CommandGroup className="!p-1">
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.nama}
                  onSelect={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                  className={`flex items-center w-full !p-3 text-base text-justify cursor-pointer text-[var(--color-black)] 
                    ${
                      value === item.id
                        ? "bg-sky-700 text-[var(--color-white)] hover:!bg-sky-700 hover:!text-[var(--color-white)]"
                        : "bg-[var(--color-white)] text-[var(--color-black)] hover:!bg-[var(--color-inactive)]"
                    }`}>
                  <span>{item.nama}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.id
                        ? "!text-[var(--color-white)] opacity-100"
                        : "!text-[var(--color-black)] opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </div>
      </PopoverContent>
      {isError && (
        <CustomError value={`${text} ${CUSTOM_TEXT.info_wajib_pilih}`} />
      )}
    </Popover>
  );
}
