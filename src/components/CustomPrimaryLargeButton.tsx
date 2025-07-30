"use client";

import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CustomPrimaryLargeButtonProps {
  label?: string;
  path?: string;
  className?: string;
  icon?: LucideIcon;
  onClick?: () => void;
}

export default function CustomPrimaryLargeButton({
  label = "",
  path = "",
  className = "",
  icon: Icon,
  onClick,
}: CustomPrimaryLargeButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick(); // jalankan fungsi tambahan
    if (path) router.push(path); // tetap navigasi jika path ada
  };

  return (
    <button className={`${className}`} onClick={handleClick}>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}
