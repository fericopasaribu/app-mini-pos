"use client";

import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CustomPrimaryLargeButtonProps {
  label?: string;
  path?: string;
  className?: string;
  icon?: LucideIcon;
}

export default function CustomPrimaryLargeButton({
  label = "",
  path = "",
  className = "",
  icon: Icon,
}: CustomPrimaryLargeButtonProps) {
  const router = useRouter();

  return (
    <button className={`${className}`} onClick={() => router.push(path)}>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}
