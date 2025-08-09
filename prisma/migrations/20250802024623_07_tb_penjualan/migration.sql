/*
  Warnings:

  - You are about to alter the column `kode` on the `tb_penjualan` table. The data in that column could be lost. The data in that column will be cast from `Char(20)` to `Char(15)`.

*/
-- AlterTable
ALTER TABLE "public"."tb_penjualan" ALTER COLUMN "kode" SET DATA TYPE CHAR(15);
