import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import { CustomCard } from "@/components/CustomCard";
import { CUSTOM_TEXT } from "@/constants/CustomText";

export default function AddSatuanPage() {
  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_tambah_data} ${CUSTOM_TEXT.menu_satuan}`}>
        <p className="text-muted-foreground">Ini Halaman Tambah Data Satuan</p>
      </CustomCard>
    </div>
  );
}
