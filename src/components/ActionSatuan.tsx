"use client";

import { CUSTOM_TEXT } from "@/constants/CustomText";
import { LayoutGrid, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { CustomDeleteAlert } from "./CustomDeleteAlert";
import CustomToast from "./CustomToast";
import axios from "axios";
import { mutate } from "swr";

interface Props {
  id: number;
  nama: string;
}

export default function ActionSatuan({ id, nama }: Props) {
  const router = useRouter();

  const handleDetail = () => router.push(`/detail/${id}`);
  const handleEdit = () => router.push(`/edit/${id}`);

  const handleDelete = async () => {
    const response = await axios.delete(`${CUSTOM_TEXT.api_satuan}/${id}`);
    try {
      if (response.data.meta_data.success) {
        CustomToast({
          type: "success",
          source: `Data ${CUSTOM_TEXT.menu_satuan}`,
          value: nama,
          message: CUSTOM_TEXT.info_sukses_hapus,
          duration: CUSTOM_TEXT.time_interval,
        });
      } else {
        CustomToast({
          type: "error",
          source: `Data ${CUSTOM_TEXT.menu_satuan}`,
          value: nama,
          message: CUSTOM_TEXT.info_gagal_hapus,
          duration: CUSTOM_TEXT.time_interval,
        });
      }
    } catch {
      CustomToast({
        type: "error",
        source: `Data ${CUSTOM_TEXT.menu_satuan}`,
        value: nama,
        message: response.data.meta_data.message.name,
        duration: CUSTOM_TEXT.time_interval,
      });
    } finally {
      await mutate(CUSTOM_TEXT.api_satuan);
    }
  };

  return (
    <div className="area-btn-action">
      <Button
        variant="ghost"
        className="btn-action-detail"
        title={CUSTOM_TEXT.text_detail_data}
        onClick={handleDetail}>
        <LayoutGrid />
      </Button>

      <Button
        variant="ghost"
        className="btn-action-edit"
        title={CUSTOM_TEXT.text_ubah_data}
        onClick={handleEdit}>
        <Pencil />
      </Button>

      <CustomDeleteAlert
        source={`Data ${CUSTOM_TEXT.menu_satuan}`}
        id={id}
        text={nama}
        onDelete={handleDelete}
      />
    </div>
  );
}
