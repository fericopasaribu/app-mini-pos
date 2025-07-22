"use client";

import { LucideIcon } from "lucide-react";

interface CustomButtonProps {
  label?: string;
  className?: string;
  icon?: LucideIcon;
  onClick: () => void;
}

export default function CustomButton({
  label = "",
  className = "",
  icon: Icon,
  onClick,
}: CustomButtonProps) {
  return (
    <button className={`${className}`} onClick={() => onClick()}>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}
