"use client";

interface CustomLabelProps {
  value: string;
  required?: boolean;
  
}

export function CustomLabel({ value, required = false }: CustomLabelProps) {
  return <label>{value} {required && <span className="text-sm text-[var(--color-error)]">*</span>}</label>;
}
