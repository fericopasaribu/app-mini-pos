import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const prisma = new PrismaClient();

export const DELETE = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;

        const checkData = await prisma.tb_penjualan.findUnique({
            where: { id: Number(slug) },
            select: { id: true },
        })

        if (!checkData) {
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

        await prisma.tb_penjualan.delete({
            where: { id: Number(slug) }
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
                message: error instanceof Error ? error.message : "Unknown error",
                status: 400
            },
        }, {
            status: 400
        })
    }
}

export const GET = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;

        const data = await prisma.vw_penjualan.findMany({
            where: { kode: slug },
            orderBy: {
                tanggal: "desc",
            },
        })
        return NextResponse.json({
            meta_data: {
                success: true,
                message: "",
                status: 200
            },
            result: data
        }, {
            status: 200
        })
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

export const PUT = async (request: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;

        const checkData = await prisma.tb_penjualan.findUnique({
            where: { id: Number(slug) },
            select: { id: true },
        })

        if (!checkData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Penjualan Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        const formData = await request.formData() as unknown as FormData;

        await prisma.tb_penjualan.update({
            where: {
                id: Number(slug)
            },
            data: {
                tanggal: dayjs.utc(formData.get("tanggal")?.toString() || "").toDate(),
                jumlah: Number(formData.get("jumlah")?.toString()),
            },
        })

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Penjualan Berhasil Diubah",
                status: 200
            },
        },
            { status: 200 })
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
