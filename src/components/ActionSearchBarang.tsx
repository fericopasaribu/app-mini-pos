"use client";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  id: number;
  kode: string;
  nama: string;
  harga: number;
}

export default function ActionSearchBarang({ id, kode, nama, harga }: Props) {
  // const router = useRouter();

  const handleSelect = async () => {
    // router.push(`${CUSTOM_TEXT.link_barang_detail}/${id}`);
    // alert("Oke Ndan");
    const data = {
      id,
      kode,
      nama,
      harga,
    };

    if (localStorage.getItem(CUSTOM_TEXT.storage_selected_barang)) {
      localStorage.removeItem(CUSTOM_TEXT.storage_selected_barang);
    }

    localStorage.setItem(
      CUSTOM_TEXT.storage_selected_barang,
      JSON.stringify(data)
    );

    window.dispatchEvent(new Event(CUSTOM_TEXT.storage_event_barang));
  };

  return (
    <div className="area-btn-action">
      <DialogPrimitive.Close asChild>
        <Button
          variant="ghost"
          className="btn-action-detail"
          title={CUSTOM_TEXT.text_detail_data}
          onClick={handleSelect}>
          <Check />
        </Button>
      </DialogPrimitive.Close>
    </div>
  );
}
