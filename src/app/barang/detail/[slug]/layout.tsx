import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import DetailBarangPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.text_detail_data} ${CUSTOM_TEXT.menu_barang}`,
  description: "Panel untuk menampilkan detail data barang",
};

export default function DetailBarangLayout() {
  return <DetailBarangPage />;
}
