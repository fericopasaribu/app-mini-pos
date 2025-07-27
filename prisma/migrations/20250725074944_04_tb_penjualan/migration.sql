-- CreateTable
CREATE TABLE "tb_penjualan" (
    "id" SERIAL NOT NULL,
    "kode" CHAR(20) NOT NULL,

    CONSTRAINT "tb_penjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_penjualan_detail" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "id_barang" INTEGER NOT NULL,
    "id_penjualan" INTEGER NOT NULL,

    CONSTRAINT "tb_penjualan_detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_penjualan_kode_key" ON "tb_penjualan"("kode");

-- AddForeignKey
ALTER TABLE "tb_penjualan_detail" ADD CONSTRAINT "tb_penjualan_detail_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "tb_barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_penjualan_detail" ADD CONSTRAINT "tb_penjualan_detail_id_penjualan_fkey" FOREIGN KEY ("id_penjualan") REFERENCES "tb_penjualan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
