/*
  Warnings:

  - You are about to drop the `tb_penjualan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tb_penjualan" DROP CONSTRAINT "tb_penjualan_id_barang_fkey";

-- DropTable
DROP TABLE "public"."tb_penjualan";
