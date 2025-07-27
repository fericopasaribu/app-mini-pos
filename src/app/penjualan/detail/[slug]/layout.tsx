import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import DetailSatuanPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_detail_data} ${CUSTOM_TEXT.menu_satuan}`,
  description: "Panel untuk menampilkan detail data satuan",
};

export default function DetailSatuanLayout() {
  return <DetailSatuanPage />;
}
