import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    const data = await prisma.tb_satuan.findMany({
        orderBy: {
            id: "asc",
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
};

export const POST = async (request: NextRequest) => {
    try {

        const formData = await request.formData() as unknown as FormData;

        const namaInput = formData.get("nama")?.toString() ?? "";
        const nama = namaInput.replace(/\s+/g, "").toLowerCase();

        const data = await prisma.$queryRaw<{ nama: string }[]>`
  SELECT nama FROM tb_satuan 
  WHERE LOWER(REPLACE(nama, ' ', '')) = ${nama}
`;

        if (data.length == 1) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Barang Gagal Disimpan.\nKode Barang Sudah Digunakan !",
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
                message: "Data Barang Berhasil Disimpan",
                status: 201
            },
        },
            { status: 201 })

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
