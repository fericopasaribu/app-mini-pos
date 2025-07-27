import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import ViewPenjualanPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_tampil_data} ${CUSTOM_TEXT.menu_penjualan}`,
  description: "Panel untuk menampilkan data penjualan",
};

export default function ViewPenjualanLayout() {
  return <ViewPenjualanPage />;
}
