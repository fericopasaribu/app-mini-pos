import path from "path";

const ALLOWED_TYPES: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    zip: "application/zip",
    pdf: "application/pdf",
};

export function getMime(filename: string): string {
    const ext = path.extname(filename).toLowerCase().replace(".", "");
    return ALLOWED_TYPES[ext] || "application/octet-stream";
}
