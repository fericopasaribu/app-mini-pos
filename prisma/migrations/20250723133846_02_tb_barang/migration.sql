/*
  Warnings:

  - You are about to alter the column `nama` on the `tb_satuan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "tb_satuan" ALTER COLUMN "nama" SET DATA TYPE VARCHAR(10);

-- CreateTable
CREATE TABLE "tb_barang" (
    "id" SERIAL NOT NULL,
    "kode" VARCHAR(20) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "harga" INTEGER NOT NULL,
    "foto" VARCHAR(50) NOT NULL,
    "id_satuan" INTEGER NOT NULL,

    CONSTRAINT "tb_barang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_barang_kode_key" ON "tb_barang"("kode");

-- AddForeignKey
ALTER TABLE "tb_barang" ADD CONSTRAINT "tb_barang_id_satuan_fkey" FOREIGN KEY ("id_satuan") REFERENCES "tb_satuan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
