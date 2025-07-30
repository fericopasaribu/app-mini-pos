import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import AddPenjualanPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_tambah_data} ${CUSTOM_TEXT.menu_penjualan}`,
  description: "Panel untuk menambah data penjualan",
};

export default function AddPenjualanLayout() {
  return <AddPenjualanPage />;
}
