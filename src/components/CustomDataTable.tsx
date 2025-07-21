"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomInput } from "./CustomInput";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  storage: string;
  error: string;
}

function getPaginationRange(
  current: number,
  total: number
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
  const firstPages = [1];
  const lastPages = [total];
  const middlePages = Math.floor(total / 2);

  if (current <= middlePages) {
    pages.push(...firstPages);
    if (current > 1 && current < total) pages.push(current);
    pages.push("ellipsis");
    pages.push(...lastPages);
  } else {
    pages.push(...firstPages);
    pages.push("ellipsis");
    if (current > 1 && current < total) pages.push(current);
    pages.push(...lastPages);
  }

  return [...new Set(pages)];
}

export function CustomDataTable<TData, TValue>({
  columns,
  data,
  storage,
  error
}: DataTableProps<TData, TValue>) {
  const [isClient, setIsClient] = useState(false);
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = JSON.parse(
      localStorage.getItem(storage) || "{}"
    );
    setSorting(saved?.sorting ?? []);
    setPagination(saved?.pagination ?? { pageIndex: 0, pageSize: 10 });
    setFilter(saved?.globalFilter ?? "");
  }, [storage]);

  useEffect(() => {
    if (!isClient) return;
    const currentState = { globalFilter: filter, sorting, pagination };
    localStorage.setItem(
      storage,
      JSON.stringify(currentState)
    );
  }, [filter, sorting, pagination, isClient, storage]);

  // Filtering
  const filteredData = data.filter((item) =>
    Object.values(item as Record<string, unknown>)
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  // Sorting
  const sortedData = [...filteredData];

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

  // Pagination
  const paginatedData = sortedData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting, globalFilter: filter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    onPaginationChange: setPagination,
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
  });

  const pageSize = pagination.pageSize;
  const pageIndex = pagination.pageIndex;
  const total = filteredData.length;
  const pageCount = table.getPageCount();

  return (
    <div className="space-y-4">
      <div className="area-search">
        <CustomInput
          placeholder={CUSTOM_TEXT.text_cari_data}
          value={filter}
          onChange={(value) => {
            setFilter(value);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          className="input-search-text"
          maxLength={100}
        />
        {total > 0 && (
          <Select
            value={String(pageSize)}
            onValueChange={(value) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(value),
                pageIndex: 0,
              }))
            }>
            <SelectTrigger className="input-select w-full sm:w-[184px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="input-select-content">
              {[10, 50, data.length].map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  className="input-select-item">
                  {size === data.length ? "Seluruh" : `${size}`} Data
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Table */}
      {total > 0 || !filter ? (
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
          </Table>
        </div>
      ) : (
        <div className="table-error">
          <CircleX className="mr-2" /> {`Data ${error} ${CUSTOM_TEXT.info_data_kosong}`}
        </div>
      )}

      {/* Pagination */}
      {total > 0 && (
        <div className="pagination-area">
          <div className="pagination-info">
            <span>
              {`Data ${pageIndex * pageSize + 1} - ${Math.min(
                (pageIndex + 1) * pageSize,
                total
              )} dari ${total} Data`}
            </span>
          </div>

          <div className="pagination-control">
            {/* <Button
              variant="outline"
              size="icon"
              className="pagination-nav"
              onClick={() => table.setPageIndex(0)}
              disabled={pageIndex === 0}>
              &laquo;
            </Button> */}
            <Button
              variant="outline"
              size="icon"
              className="pagination-nav"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              &lsaquo;
            </Button>

            {getPaginationRange(pageIndex + 1, pageCount).map((item, index) =>
              typeof item === "number" ? (
                <Button
                  key={index}
                  variant={item === pageIndex + 1 ? "default" : "outline"}
                  size="icon"
                  className="pagination-page"
                  onClick={() => table.setPageIndex(item - 1)}
                  disabled={item === pageIndex + 1}>
                  {item}
                </Button>
              ) : (
                <span key={index} className="pagination-ellipsis">
                  ...
                </span>
              )
            )}

            <Button
              variant="outline"
              size="icon"
              className="pagination-nav"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              &rsaquo;
            </Button>
            {/* <Button
              variant="outline"
              size="icon"
              className="pagination-nav"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={pageIndex === pageCount - 1}>
              &raquo;
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
}
