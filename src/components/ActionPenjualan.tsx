"use client";

import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import { Pencil } from "lucide-react";
import { mutate } from "swr";
import { CustomDeleteAlert } from "./CustomDeleteAlert";
import CustomToast from "./CustomToast";
import { Button } from "./ui/button";

interface Props {
  id: number;
  kode: string;
  kode_barang: string;
  nama_barang: string;
  harga: number;
  jumlah: number;
}

export default function ActionPenjualan({
  id,
  kode,
  kode_barang,
  nama_barang,
  harga,
  jumlah,
}: Props) {
  const handleEdit = () => {
    const dataEdit = {
      id_barang: id,
      kode_barang,
      nama: nama_barang,
      harga,
      jumlah,
    };

    if (localStorage.getItem(CUSTOM_TEXT.storage_selected_penjualan)) {
      localStorage.removeItem(CUSTOM_TEXT.storage_selected_penjualan);
    }

    localStorage.setItem(
      CUSTOM_TEXT.storage_selected_penjualan,
      JSON.stringify(dataEdit)
    );

    window.dispatchEvent(new Event(CUSTOM_TEXT.storage_event_edit_penjualan));
  };

  const handleDelete = async () => {
    const response = await axios.delete(`${CUSTOM_TEXT.api_penjualan}/${id}`);
    try {
      if (response.data.meta_data.success) {
        CustomToast({
          type: "success",
          source: `Data ${CUSTOM_TEXT.menu_penjualan}`,
          value: `${kode} (${kode_barang})`,
          message: CUSTOM_TEXT.info_sukses_hapus,
          duration: CUSTOM_TEXT.time_interval,
        });
      } else {
        CustomToast({
          type: "error",
          source: `Data ${CUSTOM_TEXT.menu_penjualan}`,
          value: `${kode} (${kode_barang})`,
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
      await mutate(`${CUSTOM_TEXT.api_search_barang}/${kode}`);
      await mutate(`${CUSTOM_TEXT.api_penjualan}/${kode}`);
    }
  };

  return (
    <div className="area-btn-action">
      <Button
        variant="ghost"
        className="btn-action-edit"
        title={CUSTOM_TEXT.text_ubah_data}
        onClick={handleEdit}>
        <Pencil />
      </Button>

      <CustomDeleteAlert
        source={`Data ${CUSTOM_TEXT.menu_penjualan}`}
        id={id}
        text={`${kode} (${kode_barang})`}
        onDelete={handleDelete}
      />
    </div>
  );
}
