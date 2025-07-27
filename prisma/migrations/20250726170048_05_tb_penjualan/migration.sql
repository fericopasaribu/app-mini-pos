/*
  Warnings:

  - You are about to drop the `tb_penjualan_detail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `harga` to the `tb_penjualan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_barang` to the `tb_penjualan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlah` to the `tb_penjualan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `tb_penjualan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_penjualan_detail" DROP CONSTRAINT "tb_penjualan_detail_id_barang_fkey";

-- DropForeignKey
ALTER TABLE "tb_penjualan_detail" DROP CONSTRAINT "tb_penjualan_detail_id_penjualan_fkey";

-- AlterTable
ALTER TABLE "tb_penjualan" ADD COLUMN     "harga" INTEGER NOT NULL,
ADD COLUMN     "id_barang" INTEGER NOT NULL,
ADD COLUMN     "jumlah" INTEGER NOT NULL,
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "tb_penjualan_detail";

-- AddForeignKey
ALTER TABLE "tb_penjualan" ADD CONSTRAINT "tb_penjualan_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "tb_barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
