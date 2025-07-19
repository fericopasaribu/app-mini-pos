import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import ViewSatuanPage from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.menu_satuan}`,
  description: "Panel untuk menampilkan data satuan",
};

export default function ViewSatuanLayout() {
  return <ViewSatuanPage />;
}
