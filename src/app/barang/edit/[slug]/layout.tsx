import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import EditBarangPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_ubah_data} ${CUSTOM_TEXT.menu_barang}`,
  description: "Panel untuk mengubah data barang",
};

export default function EditBarangLayout() {
  return <EditBarangPage />;
}
