import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import { CustomCard } from "@/components/CustomCard";
import { CUSTOM_TEXT } from "@/constants/CustomText";

export default function RootPage() {
  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard title={`${CUSTOM_TEXT.menu_home}`}>
        Halaman Home 
      </CustomCard>
    </div>
  );
}
