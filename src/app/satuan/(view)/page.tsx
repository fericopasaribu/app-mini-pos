"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import { CustomCard } from "@/components/CustomCard";
import { CustomDataTable } from "@/components/CustomDataTable";
import CustomLoading from "@/components/CustomLoading";
import CustomPrimaryLargeButton from "@/components/CustomPrimaryLargeButton";
import CustomSecondaryLargeButton from "@/components/CustomSecondaryLargeButton";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { satuan } from "@/features/satuan";
import { useSatuan } from "@/hooks/useSatuan";
import { Plus, RefreshCcw } from "lucide-react";

export default function ViewSatuanPage() {
  const { data, isLoading } = useSatuan();

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_tampil_data} ${CUSTOM_TEXT.menu_satuan}`}>
        <CustomLoading isLoading={isLoading}>
          <div className="area-large-button">
            <CustomPrimaryLargeButton
              path={CUSTOM_TEXT.link_satuan_add}
              label={CUSTOM_TEXT.button_tambah_data}
              className="btn-primary"
              icon={Plus}
            />

            <CustomSecondaryLargeButton
              label={CUSTOM_TEXT.button_refresh_data}
              className="btn-secondary"
              icon={RefreshCcw}
              onClick={() =>
                localStorage.removeItem(CUSTOM_TEXT.storage_satuan)
              }
            />
          </div>

          <CustomDataTable
            columns={satuan}
            data={data ?? []}
            storage={CUSTOM_TEXT.storage_satuan}
            error={CUSTOM_TEXT.menu_satuan}
          />
        </CustomLoading>
      </CustomCard>
    </div>
  );
}
