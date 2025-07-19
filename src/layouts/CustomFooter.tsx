"use client";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { useRouter } from "next/navigation";

export default function CustomFooter() {
  const router = useRouter();

  const yearNow = new Date().getFullYear();
  const yearApp = CUSTOM_TEXT.app_year;

  const yearFooter =
    Number(yearApp) >= Number(yearNow) ? yearApp : `${yearApp} - ${yearNow}`;

  return (
    <div className="area-footer">
      <div className="footer-text">
        &copy; {`${yearFooter}. `}{" "}
        <span className="text-sky-700 cursor-pointer" onClick={() => router.push("/")}>{`${CUSTOM_TEXT.app_company}`}</span>
      </div>
    </div>
  );
}
