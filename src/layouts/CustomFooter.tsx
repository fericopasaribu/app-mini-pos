import { CUSTOM_TEXT } from "@/constants/CustomText";

export default function CustomFooter() {
  const yearNow = new Date().getFullYear();
  const yearApp = CUSTOM_TEXT.app_year;

  const yearFooter =
    Number(yearApp) >= Number(yearNow) ? yearApp : `${yearApp} - ${yearNow}`;

  return (
    <div className="area-footer">
      <div className="footer-text">
        &copy; {`${yearFooter}. `}{" "}
        <span className="text-sky-700">{`${CUSTOM_TEXT.app_company}`}</span>
      </div>
    </div>
  );
}
