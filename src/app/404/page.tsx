import { CUSTOM_TEXT } from "@/constants/CustomText";
import Image from "next/image";
import React from "react";

export default function Error404() {
  return (
    <div className="area-content flex justify-center items-center">
      <Image
        priority
        src={`/${CUSTOM_TEXT.dir_images}/${CUSTOM_TEXT.file_404}`}
        alt={CUSTOM_TEXT.text_loading}
        width={600}
        height={600}          
      />
    </div>
  );
}
