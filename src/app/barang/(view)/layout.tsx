import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import ViewBarangPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_tampil_data} ${CUSTOM_TEXT.menu_barang}`,
  description: "Panel untuk menampilkan data barang",
};

export default function ViewBarangLayout() {
  return <ViewBarangPage />;
}
