import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import DetailPenjualanPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_detail_data} ${CUSTOM_TEXT.menu_penjualan}`,
  description: "Panel untuk menampilkan detail data penjualan",
};

export default function DetailPenjualanLayout() {
  return <DetailPenjualanPage />;
}
