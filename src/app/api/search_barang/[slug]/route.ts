import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;
        
        const data = await prisma.vw_barang.findMany({
            where: {
                NOT: {
                    id: {
                        in: (
                            await prisma.tb_penjualan.findMany({
                                where: {
                                    kode: slug,
                                },
                                select: {
                                    id_barang: true,
                                },
                            })
                        ).map((item) => item.id_barang),
                    },
                },
            },
            orderBy: {
                kode: "asc",
            },
        });

        return NextResponse.json(
            {
                meta_data: {
                    success: true,
                    message: "",
                    status: 200
                },
                result: data,
            },
            { status: 200 }
        );
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
};
