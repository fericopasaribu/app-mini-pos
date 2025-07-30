import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;

        const checkData = await prisma.tb_penjualan.findMany({
            where: { kode: slug },
            select: { kode: true },
        })

        if (checkData.length == 0) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Penjualan Gagal Dihapus !\nData Penjualan Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        await prisma.tb_penjualan.deleteMany({
            where: { kode: slug }
        })

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Penjualan Berhasil Dihapus",
                status: 200
            },
        }, {
            status: 200
        })
    }
    catch (error: unknown) {
        return NextResponse.json({
            meta_data: {
                success: false,
                message: error,
                status: 400
            },
        }, {
            status: 400
        })
    }
}
