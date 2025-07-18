"use client";

import { CUSTOM_TEXT } from "@/constants/CustomText";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CustomHeader() {
  const router = useRouter();

  return (
    <div className="area-header" onClick={() => router.push("/")}>
      <Image
        src={`/${CUSTOM_TEXT.dir_images}/${CUSTOM_TEXT.file_logo}`}
        width={64}
        height={64}
        alt="Logo"
        className="header-image"
        priority
      />
      <div className="header-text">{CUSTOM_TEXT.text_company}</div>
    </div>
  );
}
