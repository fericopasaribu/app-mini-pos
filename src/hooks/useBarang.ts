import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import useSWR from "swr";

type Barang = {
  id: number;
  kode: string;
  nama: string;
  harga: number;
  nama_satuan: string;
};

type BarangResponse = {
  result: Barang[];
};

const fetcher = (url: string) =>
  axios.get<BarangResponse>(url).then((res) => res.data.result);

export function useBarang() {
  const {
    data,
    isLoading,
  } = useSWR<Barang[]>(CUSTOM_TEXT.api_barang, fetcher);

  return {
    data,
    isLoading,
  };
}
