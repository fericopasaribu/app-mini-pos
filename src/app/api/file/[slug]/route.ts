import { getMime } from "@/lib/mimes";
import { readFile } from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";

export const GET = async (_: NextRequest, props: { params: Promise<{ slug: string }> }) => {
    const { slug } = await props.params;
    const filePath = path.join(process.cwd(), "uploads", slug);

    try {
        const buffer = await readFile(filePath);
        const contentType = getMime(slug);

        return new Response(new Uint8Array(buffer), {
            headers: {
                "Content-Type": contentType,
            },
        });
    } catch (error) {
        return Response.json({ error }, { status: 404 });
    }
}
