"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/scripts";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CustomDataTableDetail<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // Sorting
  const sortedData = [...data];

  if (sorting.length > 0) {
    const sort = sorting[0];
    const { id, desc } = sort;

    sortedData.sort((a: TData, b: TData) => {
      const aValue = a[id as keyof TData];
      const bValue = b[id as keyof TData];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return desc
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return desc ? bValue - aValue : aValue - bValue;
      }

      return 0;
    });
  }

  const table = useReactTable({
    data: sortedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const total = data.length;

  const grand_total = data.reduce((acc, item) => {
    const value = (item as Record<string, unknown>)["total"];
    const numeric = typeof value === "number" ? value : Number(value);
    return acc + (isNaN(numeric) ? 0 : numeric);
  }, 0);

  return (
    <div className="space-y-4">
      {/* Table */}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.columnDef.meta?.width,
                        cell.column.columnDef.meta?.align === "center"
                          ? "text-center"
                          : cell.column.columnDef.meta?.align === "right"
                          ? "text-right"
                          : "text-left"
                      )}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    className={cn(column.meta?.width, "h-12")}
                  />
                ))}
              </TableRow>
            )}
          </TableBody>

          <tfoot>
            <TableRow className="border-0 border-t-1 h-13 hover:bg-transparent">
              <TableCell
                colSpan={columns.length - 1}
                className="text-right font-semibold border-r-1">
                Total
              </TableCell>
              <TableCell className="text-right font-semibold text-[var(--color-error)]">
                {grand_total == 0 ? "" : formatNumber(grand_total)}
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="pagination-area">
          <div className="pagination-info">
            <span>{`Jumlah Data : ${total}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
