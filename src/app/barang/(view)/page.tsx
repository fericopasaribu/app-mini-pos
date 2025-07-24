"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import { CustomCard } from "@/components/CustomCard";
import { CustomDataTable } from "@/components/CustomDataTable";
import CustomLoading from "@/components/CustomLoading";
import CustomPrimaryLargeButton from "@/components/CustomPrimaryLargeButton";
import CustomSecondaryLargeButton from "@/components/CustomSecondaryLargeButton";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { barang } from "@/features/barang";

import { useBarang } from "@/hooks/useBarang";
import { Plus, RefreshCcw } from "lucide-react";

export default function ViewBarangPage() {
  const { data, isLoading } = useBarang();

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_tampil_data} ${CUSTOM_TEXT.menu_barang}`}>
        <CustomLoading isLoading={isLoading}>
          <div className="area-large-button">
            <CustomPrimaryLargeButton
              path={CUSTOM_TEXT.link_barang_add}
              label={CUSTOM_TEXT.button_tambah_data}
              className="btn-primary"
              icon={Plus}
            />

            <CustomSecondaryLargeButton
              label={CUSTOM_TEXT.button_refresh_data}
              className="btn-secondary"
              icon={RefreshCcw}
              onClick={() =>
                localStorage.removeItem(CUSTOM_TEXT.storage_barang)
              }
            />
          </div>

          <CustomDataTable
            columns={barang}
            data={data ?? []}
            storage={CUSTOM_TEXT.storage_barang}
            error={CUSTOM_TEXT.menu_barang}
            text={CUSTOM_TEXT.menu_barang}
          />
        </CustomLoading>
      </CustomCard>
    </div>
  );
}
