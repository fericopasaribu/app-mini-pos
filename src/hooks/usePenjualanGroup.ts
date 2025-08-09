import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.result);

export function usePenjualanGroup() {
  const {
    data,
    isLoading,
  } = useSWR(CUSTOM_TEXT.api_penjualan_group, fetcher);

  return {
    data,
    isLoading,
  };
}
