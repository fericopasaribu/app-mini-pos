"use client";

import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import { LayoutGrid, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { CustomDeleteAlert } from "./CustomDeleteAlert";
import CustomToast from "./CustomToast";
import { Button } from "./ui/button";

interface Props {
  id: number;
  kode: string;
}

export default function ActionBarang({ id, kode }: Props) {
  const router = useRouter();

  const handleDetail = () =>
    router.push(`${CUSTOM_TEXT.link_barang_detail}/${id}`);
  const handleEdit = () => router.push(`${CUSTOM_TEXT.link_barang_edit}/${id}`);

  const handleDelete = async () => {
    const response = await axios.delete(`${CUSTOM_TEXT.api_barang}/${id}`);
    try {
      if (response.data.meta_data.success) {
        CustomToast({
          type: "success",
          source: `Data ${CUSTOM_TEXT.menu_barang}`,
          value: kode,
          message: CUSTOM_TEXT.info_sukses_hapus,
          duration: CUSTOM_TEXT.time_interval,
        });
      } else {
        CustomToast({
          type: "error",
          source: `Data ${CUSTOM_TEXT.menu_barang}`,
          value: kode,
          message: CUSTOM_TEXT.info_gagal_hapus,
          duration: CUSTOM_TEXT.time_interval,
        });
      }
    } catch {
      CustomToast({
        type: "error",
        source: "Message",
        value: CUSTOM_TEXT.info_error_server,
        message: "",
        duration: CUSTOM_TEXT.time_interval,
      });
    } finally {
      await mutate(CUSTOM_TEXT.api_barang);
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
        source={`Data ${CUSTOM_TEXT.menu_barang}`}
        id={id}
        text={kode}
        onDelete={handleDelete}
      />
    </div>
  );
}
