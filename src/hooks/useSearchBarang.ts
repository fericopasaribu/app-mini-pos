"use client";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

type SearchBarang = {
    id: number;
    kode: string;
    nama: string;
    harga: number;
    nama_satuan: string;
};

type SearchBarangResponse = {
    result: SearchBarang[];
};

const fetcher = (url: string) =>
    axios.get<SearchBarangResponse>(url).then((res) => res.data.result);

export function useSearchBarang() {
    const [kode, setKode] = useState<string | null>(null);

    // Ambil dari localStorage setelah mount (client-side)
    useEffect(() => {
        const storedKode = localStorage.getItem(CUSTOM_TEXT.storage_kode_penjualan);
        if (storedKode) {
            setKode(storedKode);
        }
    }, []);

    const {
        data,
        isLoading,
    } = useSWR<SearchBarang[]>(`${CUSTOM_TEXT.api_search_barang}/${kode}`, fetcher);

    return {
        data,
        isLoading,
    };
}
