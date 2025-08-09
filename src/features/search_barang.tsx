"use client";

import ActionSearchBarang from "@/components/ActionSearchBarang";
import { Button } from "@/components/ui/button";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { formatNumber } from "@/lib/scripts";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

type SearchBarang = {
  id: number;
  kode: string;
  nama: string;
  harga: number;
};

export const search_barang: ColumnDef<SearchBarang>[] = [
  {
    id: "pilih",
    header: () => <div className="text-center">{CUSTOM_TEXT.tabel_pilih}</div>,
    cell: ({ row }) => {
      const { id, kode, nama, harga } = row.original;
      return (
        <ActionSearchBarang id={id} kode={kode} nama={nama} harga={harga} />
      );
    },
    meta: { align: "center", width: "w-[8%]" },
  },

  {
    accessorKey: "kode",
    header: ({ column }) => {
      const sort = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="table-th-title p-7 text-[1em]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {CUSTOM_TEXT.tabel_kode}
          <div className="table-th-sort">
            {sort === "asc" ? (
              <>
                <ArrowUp className="table-th-sort-active" />
                <ArrowDown className="table-th-sort-inactive" />
              </>
            ) : sort === "desc" ? (
              <>
                <ArrowUp className="table-th-sort-inactive" />
                <ArrowDown className="table-th-sort-active" />
              </>
            ) : (
              <>
                <ArrowUp className="table-th-sort-inactive" />
                <ArrowDown className="table-th-sort-inactive" />
              </>
            )}
          </div>
        </Button>
      );
    },
    meta: { align: "center", width: "w-[27%]" },
  },

  {
    accessorKey: "nama",
    header: ({ column }) => {
      const sort = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="table-th-title p-7 text-[1em]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {CUSTOM_TEXT.tabel_barang}
          <div className="table-th-sort">
            {sort === "asc" ? (
              <>
                <ArrowUp className="table-th-sort-active" />
                <ArrowDown className="table-th-sort-inactive" />
              </>
            ) : sort === "desc" ? (
              <>
                <ArrowUp className="table-th-sort-inactive" />
                <ArrowDown className="table-th-sort-active" />
              </>
            ) : (
              <>
                <ArrowUp className="table-th-sort-inactive" />
                <ArrowDown className="table-th-sort-inactive" />
              </>
            )}
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const nama = row.getValue("nama") as string;
      return (
        <div className="truncate max-w-[600px] text-ellipsis overflow-hidden">
          {nama}
        </div>
      );
    },
    meta: { align: "justify", width: "w-[47%]" },
  },

  {
    accessorKey: "harga",
    header: ({ column }) => {
      const sort = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="table-th-title p-7 text-[1em]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {CUSTOM_TEXT.tabel_harga}
          <div className="table-th-sort">
            {sort === "asc" ? (
              <>
                <ArrowUp className="table-th-sort-active" />
                <ArrowDown className="table-th-sort-inactive" />
              </>
            ) : sort === "desc" ? (
              <>
                <ArrowUp className="table-th-sort-inactive" />
                <ArrowDown className="table-th-sort-active" />
              </>
            ) : (
              <>
                <ArrowUp className="table-th-sort-inactive" />
                <ArrowDown className="table-th-sort-inactive" />
              </>
            )}
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("harga");
      return formatNumber(Number(value));
    },

    meta: { align: "right", width: "w-[18%]" },
  },
];
