import { CUSTOM_TEXT } from "@/constants/CustomText";
import type { Metadata } from "next";
import Error404Page from "./page";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - 404`,
  description: "Panel untuk menampilkan error 404",
};

export default function Error404Layout() {
  return <Error404Page />;
}
