import { CUSTOM_TEXT } from "@/constants/CustomText";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

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

        const getData = await prisma.vw_barang.findUnique({
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
                message: error,
                status: 400
            },
        }, {
            status: 400
        })
    }
}

// export const PUT = async (request: NextRequest, props: { params: Promise<{ slug: string }> }) => {
//     try {
//         const { slug } = await props.params;

//         const getData = await prisma.tb_barang.findUnique({
//             where: { id: Number(slug) },
//             select: { id: true },
//         })

//         if (!getData) {
//             return NextResponse.json({
//                 meta_data: {
//                     success: false,
//                     message: "Data Barang Tidak Ditemukan !",
//                     status: 404
//                 },
//             }, {
//                 status: 404
//             })
//         }

//         const formData = await request.formData() as unknown as FormData;

//         const namaInput = formData.get("nama")?.toString() ?? "";
//         const nama = namaInput.replace(/\s+/g, "").toLowerCase();

//         const checkData = await prisma.$queryRaw<{ nama: string }[]>`
//   SELECT nama FROM tb_barang 
//   WHERE LOWER(REPLACE(nama, ' ', '')) = ${nama} AND id != ${Number(slug)}`;

//         if (checkData.length == 1) {
//             return NextResponse.json({
//                 meta_data: {
//                     success: false,
//                     message: "Data Barang Gagal Diubah.\nNama Barang Sudah Digunakan !",
//                     status: 409
//                 },
//             },
//                 { status: 409 })
//         }

//         await prisma.tb_barang.update({
//             where: {
//                 id: Number(slug)
//             },
//             data: {
//                 nama: namaInput,
//             },
//         })

//         return NextResponse.json({
//             meta_data: {
//                 success: true,
//                 message: "Data Barang Berhasil Diubah",
//                 status: 200
//             },
//         },
//             { status: 200 })
//     }
//     catch (error: unknown) {
//         return NextResponse.json({
//             meta_data: {
//                 success: false,
//                 message: error,
//                 status: 400
//             },
//         }, {
//             status: 400
//         })
//     }
// }
