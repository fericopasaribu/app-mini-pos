import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import AddSatuanPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_tambah_data} ${CUSTOM_TEXT.menu_satuan}`,
  description: "Panel untuk menambah data satuan",
};

export default function AddSatuanLayout() {
  return <AddSatuanPage />;
}
