-- CreateTable
CREATE TABLE "public"."tb_penjualan" (
    "id" SERIAL NOT NULL,
    "kode" CHAR(15) NOT NULL,
    "harga" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "id_barang" INTEGER NOT NULL,

    CONSTRAINT "tb_penjualan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."tb_penjualan" ADD CONSTRAINT "tb_penjualan_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "public"."tb_barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
