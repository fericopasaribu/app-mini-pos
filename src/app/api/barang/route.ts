import { CUSTOM_TEXT } from "@/constants/CustomText";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const data = await prisma.vw_barang.findMany({
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
        const file = formData.get("foto") as File | null

        const checkData = await prisma.tb_barang.findUnique({
            where: {
                kode: formData.get("kode")?.toString(),
            },
            select: { id: true },
        })

        if (checkData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Barang Gagal Disimpan.\nKode Barang Sudah Digunakan !",
                    status: 409
                },
            },
                { status: 409 })
        }

        let fileName = ""

        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer())
            const uploadDir = path.join(process.cwd(), CUSTOM_TEXT.dir_uploads)

            // upload image        
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir)
            }

            fileName = `${Date.now()}.webp` // hasil kompres jadi .webp

            const outputPath = path.join(uploadDir, fileName)

            // kompres menggunakan sharp
            await sharp(buffer)
                .resize(300) // atur lebar max 300px (tinggi otomatis)
                .webp({ quality: 75 }) // kompres ke webp, kualitas 0-100
                .toFile(outputPath)

        }

        await prisma.tb_barang.create({
            data: {
                kode: formData.get("kode")?.toString() || "",
                nama: formData.get("nama")?.toString() || "",
                harga: Number(formData.get("harga")?.toString()),
                foto: fileName,
                id_satuan: Number(formData.get("id_satuan")?.toString()),
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
                message: error instanceof Error ? error.message : "Unknown error",
                status: 400
            },
        }, {
            status: 400
        })
    }
}
