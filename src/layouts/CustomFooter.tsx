import { CUSTOM_TEXT } from "@/constants/CustomText";

export default function CustomFooter() {
  const yearNow = new Date().getFullYear();
  const yearApp = CUSTOM_TEXT.text_year;

  const yearFooter = Number(yearApp) >= Number(yearNow) ? yearApp : `${yearApp} - ${yearNow}`;
  // const tahunSekarang = yearFooter.toString();

  return (
    <div className="area-footer">
      <div className="footer-text">
        &copy; {`${yearFooter}. `} <span className="text-sky-700">{`${CUSTOM_TEXT.text_company}`}</span> 
      </div>
    </div>
  );
}
