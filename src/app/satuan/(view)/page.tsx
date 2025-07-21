"use client";
import { CustomBreadcrumb } from "@/components/CustomBreadCrumb";
import { CustomCard } from "@/components/CustomCard";
import { CustomDataTable } from "@/components/CustomDataTable";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { satuan } from "@/features/satuan";
import axios from "axios";
import useSWR from "swr";

export default function ViewSatuanPage() {
  // const [data, setData] = useState<tb_satuan[]>([]);

  type Satuan = {
    id: number;
    nama: string;
  };

  type SatuanResponse = {
    result: Satuan[];
  };

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data } = useSWR<SatuanResponse>(CUSTOM_TEXT.api_satuan, fetcher);

  return (
    <div className="area-content">
      <CustomBreadcrumb />
      <CustomCard
        title={`${CUSTOM_TEXT.text_tampil_data} ${CUSTOM_TEXT.menu_satuan}`}>
        <CustomDataTable
          columns={satuan}
          data={data?.result ?? []}
          storage={CUSTOM_TEXT.storage_satuan}
          error={CUSTOM_TEXT.menu_satuan}
        />
      </CustomCard>
    </div>
  );
}
