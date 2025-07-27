import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const data = await prisma.vw_penjualan_group.findMany({
            orderBy: {
                tanggal: "desc",
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