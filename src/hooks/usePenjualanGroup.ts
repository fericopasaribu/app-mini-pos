import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import useSWR from "swr";

type PenjualanGroup = {
  kode: string;
};

type PenjualanGroupResponse = {
  result: PenjualanGroup[];
};

const fetcher = (url: string) =>
  axios.get<PenjualanGroupResponse>(url).then((res) => res.data.result);

export function usePenjualanGroup() {
  const {
    data,
    isLoading,
  } = useSWR<PenjualanGroup[]>(CUSTOM_TEXT.api_penjualan_group, fetcher);

  return {
    data,
    isLoading,
  };
}
