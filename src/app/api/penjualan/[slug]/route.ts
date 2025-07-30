import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;

        const checkData = await prisma.tb_satuan.findUnique({
            where: { id: Number(slug) },
            select: { id: true },
        })

        if (!checkData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Satuan Gagal Dihapus !\nData Satuan Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        await prisma.tb_satuan.delete({
            where: { id: Number(slug) }
        })

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Satuan Berhasil Dihapus",
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

export const GET = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;

        const getData = await prisma.tb_satuan.findUnique({
            where: { id: Number(slug) },
        })

        if (!getData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Satuan Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "",
                status: 200
            },
            result: getData
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

export const PUT = async (request: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;

        const getData = await prisma.tb_satuan.findUnique({
            where: { id: Number(slug) },
            select: { id: true },
        })

        if (!getData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Satuan Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        const formData = await request.formData() as unknown as FormData;

        const namaInput = formData.get("nama")?.toString() ?? "";
        const nama = namaInput.replace(/\s+/g, "").toLowerCase();

        const checkData = await prisma.$queryRaw<{ nama: string }[]>`
  SELECT nama FROM tb_satuan 
  WHERE LOWER(REPLACE(nama, ' ', '')) = ${nama} AND id != ${Number(slug)}`;

        if (checkData.length == 1) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Satuan Gagal Diubah.\nNama Satuan Sudah Digunakan !",
                    status: 409
                },
            },
                { status: 409 })
        }

        await prisma.tb_satuan.update({
            where: {
                id: Number(slug)
            },
            data: {
                nama: namaInput,
            },
        })

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Satuan Berhasil Diubah",
                status: 200
            },
        },
            { status: 200 })
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
