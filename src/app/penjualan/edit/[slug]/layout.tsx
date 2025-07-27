import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import EditSatuanPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_ubah_data} ${CUSTOM_TEXT.menu_satuan}`,
  description: "Panel untuk mengubah data satuan",
};

export default function EditSatuanLayout() {
  return <EditSatuanPage />;
}
