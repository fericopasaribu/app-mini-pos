import { CUSTOM_TEXT } from "@/constants/CustomText";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    const data = await prisma.tb_satuan.findMany({
        orderBy: {
            id: "asc",
        },
    });

    if (data.length === 0) {

        return NextResponse.json({
            meta_data: {
                success: false,
                message: `Data ${CUSTOM_TEXT.menu_satuan} ${CUSTOM_TEXT.error_data_kosong}`,
                status: 404
            },
        },
            { status: 404 })
    }

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
}; 
