import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    align?: "left" | "center" | "right" | "justify";
    width?: string;
  }
}