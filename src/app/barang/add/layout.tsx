import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import AddBarangPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_tambah_data} ${CUSTOM_TEXT.menu_barang}`,
  description: "Panel untuk menambah data barang",
};

export default function AddBarangLayout() {
  return <AddBarangPage />;
}
