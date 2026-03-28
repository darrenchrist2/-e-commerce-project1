import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q")?.trim() || "";

        const products = await prisma.product.findMany({
            where: q ? {
                OR: [
                    {
                    name: {
                        contains: q,
                        mode: "insensitive",
                    },
                    },
                    {
                    category: {
                        contains: q,
                        mode: "insensitive",
                    },
                    },
                ],
            }
            : undefined,
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(
            {
            success: true,
            message: q
                ? `Data product berdasarkan query "${q}" berhasil diambil`
                : "Semua data product berhasil diambil",
            data: products,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET /api/products error:", error);

        return NextResponse.json(
            {
            success: false,
            message: "Gagal mengambil data product",
            },
            { status: 500 }
        );
    }
}