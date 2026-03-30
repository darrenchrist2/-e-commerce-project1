"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/productCard";

type ProductFromApi = {
    id: number;
    name: string;
    price: number | string;
    imageUrl?: string | null;
    category?: string | null;
    score: number;
};

export default function ProductCardSection() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.trim() || "";

    const [products, setProducts] = useState<ProductFromApi[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError("");

                const endpoint = query
                    ? `/api/products?q=${encodeURIComponent(query)}`
                    : "/api/products";

                const response = await fetch(endpoint, {
                    method: "GET",
                    cache: "no-store",
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message || "Gagal mengambil data produk");
                }

                setProducts(result.data || []);
            } catch (err) {
                console.error("Fetch products error:", err);
                setProducts([]);
                setError("Data produk gagal dimuat");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [query]);

    if (isLoading) {
        return (
            <section className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <article
                        key={index}
                        className="group w-full overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm"
                    >
                        {/* Section 1: image skeleton */}
                        <div className="relative overflow-hidden rounded-xl bg-slate-100">
                            <div className="relative aspect-4/3 w-full animate-pulse bg-slate-200" />
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/10 via-transparent to-white/20 opacity-80" />
                        </div>

                        {/* Section 2: nama + harga skeleton */}
                        <div className="px-1 pt-3">
                            <div className="h-4 w-[88%] animate-pulse rounded-md bg-slate-200" />
                            <div className="mt-2 h-4 w-[62%] animate-pulse rounded-md bg-slate-200" />

                            <div className="mt-3 h-5 w-[42%] animate-pulse rounded-md bg-slate-300" />
                        </div>

                        {/* Section 3: actions skeleton */}
                        <div className="mt-3 flex items-center gap-2">
                            <div className="h-9 w-3/4 animate-pulse rounded-xl border border-sky-100 bg-sky-50" />
                            <div className="h-9 w-1/4 animate-pulse rounded-xl border border-slate-200 bg-white" />
                        </div>
                    </article>
                ))}
            </section>
        );
    }

    if (error) {
        return (
            <section className="mt-8">
                <p className="text-sm text-red-500">{error}</p>
            </section>
        );
    }

    if (products.length === 0) {
        return (
            <section className="mt-8">
                <p className="text-sm text-slate-500">
                    {query
                        ? `Produk dengan query "${query}" tidak ditemukan`
                        : "Belum ada data produk"}
                </p>
            </section>
        );
    }

    return (
        <section className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl || "/products/default-product.jpg"}
                    onViewDetail={() => console.log("View detail", product.id)}
                    onAddToCart={() => console.log("Add to cart", product.id)}
                />
            ))}
        </section>
    );
}