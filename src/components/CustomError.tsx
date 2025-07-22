"use client";

import { Info } from "lucide-react";

interface CustomErrorProps {
  value: string;
  className?: string;
}

export function CustomError({ value, className}: CustomErrorProps) {
  return <div className={`error-text ${className || ""}`}><Info className="error-icon"/>{value}</div>;
}
