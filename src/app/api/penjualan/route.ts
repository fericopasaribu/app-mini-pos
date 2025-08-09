import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
    try {

        const formData = await request.formData() as unknown as FormData;

        const checkData = await prisma.tb_penjualan.findMany({
            where: {
                kode: formData.get("kode")?.toString(),
                id_barang: Number(formData.get("id_barang")?.toString())
            },
            select: { id: true },
        })

        if (checkData.length != 0) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Penjualan Gagal Disimpan.\nKode Penjualan Sudah Digunakan !",
                    status: 409
                },
            },
                { status: 409 })
        }

        await prisma.tb_penjualan.create({
            data: {
                kode: formData.get("kode")?.toString() || "",
                // tanggal: dayjs.utc(formData.get("tanggal")?.toString() || "").toDate(), 
                tanggal: dayjs.utc(formData.get("tanggal")?.toString() || "").toDate(), 
                jumlah: Number(formData.get("jumlah")?.toString()),
                harga: Number(formData.get("harga")?.toString()),
                id_barang: Number(formData.get("id_barang")?.toString()),
            }
        })

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Penjualan Berhasil Disimpan",
                status: 201
            },
        },
            { status: 201 })

    }
    catch (error: unknown) {
        return NextResponse.json({
            meta_data: {
                success: false,
                message: error instanceof Error ? error.message : "Unknown error",
                status: 400
            },
        }, {
            status: 400
        })
    }
}
