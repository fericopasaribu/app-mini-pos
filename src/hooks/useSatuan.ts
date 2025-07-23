import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import useSWR from "swr";

type Satuan = {
  id: number;
  nama: string;
};

type SatuanResponse = {
  result: Satuan[];
};

const fetcher = (url: string) =>
  axios.get<SatuanResponse>(url).then((res) => res.data.result);

export function useSatuan() {
  const {
    data,
    isLoading,
  } = useSWR<Satuan[]>(CUSTOM_TEXT.api_satuan, fetcher);

  return {
    data,
    isLoading,
  };
}
