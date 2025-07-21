"use client";

import { Input } from "@/components/ui/input";

interface CustomInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  readOnly?: boolean;
}

export function CustomInput({
  value,
  onChange,
  placeholder = "",
  className = "",
  maxLength = 0,
  readOnly = false,
}: CustomInputProps) {
  const displayValue =
    maxLength > 0 ? value.slice(0, maxLength) : value || placeholder;

  if (readOnly) {
    return (
      <div
        className={`flex items-center border rounded-md px-3 py-0 bg-gray-100 text-[var(--color-error)] ${className}`}>
        {value?.trim() ? (
          displayValue
        ) : (
          <span className="text-gray-400">{placeholder}</span>
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
