"use client";

import ActionSatuan from "@/components/ActionSatuan";
import { Button } from "@/components/ui/button";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

type Satuan = {
  id: number;
  nama: string;
};

export const satuan: ColumnDef<Satuan>[] = [
  {
    id: "aksi",
    header: () => <div className="text-center">{CUSTOM_TEXT.tabel_aksi}</div>,
    cell: ({ row }) => {
      const { id, nama } = row.original;
      return <ActionSatuan id={id} nama={nama} />;
    },
    meta: { align: "center", width: "w-[12%]" },
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
          {CUSTOM_TEXT.tabel_satuan}
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
    meta: { align: "justify", width: "w-[88%]" },
  },
];
