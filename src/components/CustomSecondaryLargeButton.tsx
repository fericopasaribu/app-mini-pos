"use client";

import { LucideIcon } from "lucide-react";

interface CustomSecondaryLargeProps {
  label?: string;
  className?: string;
  icon?: LucideIcon;
  onClick: () => void;
}

export default function CustomSecondaryLargeButton({
  label = "",
  className = "",
  icon: Icon,
  onClick,
}: CustomSecondaryLargeProps) {
  return (
    <button
      className={`${className}`}
      onClick={() => {
        onClick?.();
        location.reload();
      }}>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}
