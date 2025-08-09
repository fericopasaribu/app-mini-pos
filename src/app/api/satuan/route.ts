import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const data = await prisma.tb_satuan.findMany({
            orderBy: {
                nama: "asc",
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
                message: error instanceof Error ? error.message : "Unknown error",
                status: 400
            },
        }, {
            status: 400
        })
    }
};

export const POST = async (request: NextRequest) => {
    try {

        const formData = await request.formData() as unknown as FormData;

        const namaInput = formData.get("nama")?.toString() ?? "";
        const nama = namaInput.replace(/\s+/g, "").toLowerCase();

        const checkData = await prisma.$queryRaw<{ nama: string }[]>`
  SELECT nama FROM tb_satuan 
  WHERE LOWER(REPLACE(nama, ' ', '')) = ${nama}`;

        if (checkData.length == 1) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Satuan Gagal Disimpan.\nNama Satuan Sudah Digunakan !",
                    status: 409
                },
            },
                { status: 409 })
        }

        await prisma.tb_satuan.create({
            data: {
                nama: namaInput,
            }
        })

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Satuan Berhasil Disimpan",
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
