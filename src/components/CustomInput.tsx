"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CustomInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  readOnly?: boolean;
  showSearchIcon?: boolean;
}

export function CustomInput({
  value,
  onChange,
  placeholder = "",
  className = "",
  maxLength = 0,
  readOnly = false,
  showSearchIcon = false,
}: CustomInputProps) {
  const displayValue =
    maxLength > 0 ? value.slice(0, maxLength) : value || placeholder;

  if (readOnly) {
    return (
      <div
        className={`flex items-center justify-between border rounded-md px-3 py-0 bg-gray-100 text-[var(--color-error)] ${
          showSearchIcon && "cursor-pointer"
        } ${className}`}>
        <div className="flex-1 truncate">
          {value?.trim() ? (
            displayValue
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        {showSearchIcon && (
          <Search className="w-4 h-4 ml-2 text-gray-500 hover:text-gray-700 cursor-pointer" />
        )}
      </div>
    );
  }

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={className}
      maxLength={maxLength}
    />
  );
}
