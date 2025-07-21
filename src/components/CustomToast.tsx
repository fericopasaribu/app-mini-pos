import { CUSTOM_TEXT } from "@/constants/CustomText";
import { CircleCheck, CircleX } from "lucide-react";
import { toast } from "sonner";

type ToastType = "success" | "error";

interface CustomToastProps {
  type: ToastType;
  source: string;
  value: string;
  message: string;
  duration?: number;
}

export default function CustomToast({
  type,
  source,
  value,
  message,
  duration = CUSTOM_TEXT.time_interval,
}: CustomToastProps) {
  const isSuccess = type === "success";
  const Icon = isSuccess ? CircleCheck : CircleX;
  const iconClass = isSuccess ? "toast-icon-success" : "toast-icon-error";
  return toast.custom(
    () => (
      <div className={isSuccess ? "toast-box-success" : "toast-box-error" }>
        <div className={iconClass}>
          <Icon className="toast-icon" />
        </div>
        <div className="w-full text-center">
          {source} : <span className="text-[var(--color-error)]">{value}</span><br />
          {message}
        </div>
      </div>
    ),
    {
      duration,
      position: "top-right",
    }
  );
}
