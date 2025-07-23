import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
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