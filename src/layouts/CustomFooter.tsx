import { CUSTOM_TEXT } from "@/constants/CustomText";

export default function CustomFooter() {
  return (
    <div className="area-footer">
      <div className="text-footer">
        &copy; {`${CUSTOM_TEXT.text_year} - ${CUSTOM_TEXT.text_company}`}
      </div>
    </div>
  );
}
