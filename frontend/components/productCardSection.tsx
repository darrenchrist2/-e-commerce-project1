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
            <section className="mt-8">
                <p className="text-sm text-slate-500">Memuat data produk...</p>
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
        <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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