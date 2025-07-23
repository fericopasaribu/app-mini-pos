-- DropForeignKey
ALTER TABLE "tb_barang" DROP CONSTRAINT "tb_barang_id_satuan_fkey";

-- AddForeignKey
ALTER TABLE "tb_barang" ADD CONSTRAINT "tb_barang_id_satuan_fkey" FOREIGN KEY ("id_satuan") REFERENCES "tb_satuan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
