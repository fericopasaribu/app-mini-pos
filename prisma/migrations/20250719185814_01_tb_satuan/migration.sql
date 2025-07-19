-- CreateTable
CREATE TABLE "tb_satuan" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,

    CONSTRAINT "tb_satuan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_satuan_nama_key" ON "tb_satuan"("nama");
