"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import { CustomCard } from "@/components/CustomCard";
import { CustomDataTable } from "@/components/CustomDataTable";
import CustomLoading from "@/components/CustomLoading";
import CustomPrimaryLargeButton from "@/components/CustomPrimaryLargeButton";
import CustomSecondaryLargeButton from "@/components/CustomSecondaryLargeButton";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { penjualan_group } from "@/features/penjualan_group";
import { usePenjualanGroup } from "@/hooks/usePenjualanGroup";
import { formatCode } from "@/lib/scripts";

import { Plus, RefreshCcw } from "lucide-react";

export default function ViewPenjualanPage() {
  const { data, isLoading } = usePenjualanGroup();

  const handleCodeStorage = () => {
    if (localStorage.getItem(CUSTOM_TEXT.storage_kode_penjualan)) {
      localStorage.removeItem(CUSTOM_TEXT.storage_kode_penjualan);
    }

    localStorage.setItem(CUSTOM_TEXT.storage_kode_penjualan, formatCode("PJ"));
  };

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_tampil_data} ${CUSTOM_TEXT.menu_penjualan}`}>
        <CustomLoading isLoading={isLoading}>
          <div className="area-large-button">
            <CustomPrimaryLargeButton
              path={CUSTOM_TEXT.link_penjualan_add}
              label={CUSTOM_TEXT.button_tambah_data}
              className="btn-primary"
              icon={Plus}
              onClick={handleCodeStorage}
            />

            <CustomSecondaryLargeButton
              label={CUSTOM_TEXT.button_refresh_data}
              className="btn-secondary"
              icon={RefreshCcw}
              onClick={() =>
                localStorage.removeItem(CUSTOM_TEXT.storage_penjualan_group)
              }
            />
          </div>

          <CustomDataTable
            columns={penjualan_group}
            data={data ?? []}
            storage={CUSTOM_TEXT.storage_penjualan_group}
            error={CUSTOM_TEXT.menu_penjualan}
            text={CUSTOM_TEXT.menu_penjualan}
          />
        </CustomLoading>
      </CustomCard>
    </div>
  );
}
