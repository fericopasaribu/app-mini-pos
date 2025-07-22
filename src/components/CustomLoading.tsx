import { CUSTOM_TEXT } from "@/constants/CustomText";
import Image from "next/image";

interface CustomLoadingProps {
  isLoading: boolean;
  isError?: boolean;
  children: React.ReactNode;
}

export default function CustomLoading({
  isLoading,
  children,
}: CustomLoadingProps) {
  if (isLoading) {
    return (
      <div className="area-loading">
        <Image
          priority
          src={`/${CUSTOM_TEXT.dir_images}/${CUSTOM_TEXT.file_loading}`}
          alt={CUSTOM_TEXT.text_loading}
          width={50}
          height={50}
        />
      </div>
    );
  }

  return <>{children}</>;
}
