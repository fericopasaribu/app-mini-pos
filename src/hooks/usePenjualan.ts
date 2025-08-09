"use client"
import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.result);

export function usePenjualan() {
  const [kode, setKode] = useState<string | null>(null);

  useEffect(() => {
    const storedKode = localStorage.getItem(CUSTOM_TEXT.storage_kode_penjualan);
    if (storedKode) {
      setKode(storedKode);
    }
  }, []);

  const {
    data,
  } = useSWR(kode ? `${CUSTOM_TEXT.api_penjualan}/${kode}` : null, fetcher);

  return {
    data,
  };
}
