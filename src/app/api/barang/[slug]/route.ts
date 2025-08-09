import { CUSTOM_TEXT } from "@/constants/CustomText";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

const prisma = new PrismaClient();

export const DELETE = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    try {
        const { slug } = await props.params;

        const checkData = await prisma.tb_barang.findUnique({
            where: { id: Number(slug) },
            select: { id: true, foto: true },
        })

        if (!checkData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Barang Gagal Dihapus !\nData Barang Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        const uploadDir = path.join(process.cwd(), CUSTOM_TEXT.dir_uploads)
        const fileName = checkData.foto

        if (fileName) {
            const filePath = path.join(uploadDir, fileName)

            if (fs.existsSync(filePath)) {
                await unlink(filePath)
            }
        }

        await prisma.tb_barang.delete({
            where: { id: Number(slug) }
        })

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Barang Berhasil Dihapus",
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

        const getData = await prisma.vw_barang.findFirst({
            where: { id: Number(slug) },
        })

        if (!getData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Barang Tidak Ditemukan !",
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

        const getData = await prisma.tb_barang.findUnique({
            where: { id: Number(slug) },
            select: { id: true },
        })

        if (!getData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Barang Tidak Ditemukan !",
                    status: 404
                },
            }, {
                status: 404
            })
        }

        const formData = await request.formData() as unknown as FormData;
        const file = formData.get("foto") as File | null

        const checkData = await prisma.tb_barang.findUnique({
            where: {
                kode: formData.get("kode")?.toString(),
                NOT: {
                    id: Number(slug)
                }
            },
            select: { id: true },
        })

        if (checkData) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Data Barang Gagal Diubah.\nNama Barang Sudah Digunakan !",
                    status: 409
                },
            },
                { status: 409 })
        }

        const oldFoto = formData.get("old_foto")?.toString() || ""
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

            // hapus foto lama

            if (oldFoto) {
                const oldPath = path.join(uploadDir, oldFoto);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }

        await prisma.tb_barang.update({
            where: {
                id: Number(slug)
            },
            data: {
                kode: formData.get("kode")?.toString() || "",
                nama: formData.get("nama")?.toString() || "",
                harga: Number(formData.get("harga")?.toString()),
                foto: fileName || oldFoto,
                id_satuan: Number(formData.get("id_satuan")?.toString()),
            },
        })

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data Barang Berhasil Diubah",
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
