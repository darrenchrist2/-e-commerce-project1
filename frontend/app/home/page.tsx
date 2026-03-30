"use client";

import { useState } from "react";
import SearchBar from "@/components/searchBar";
import ProductCardSection from "@/components/productCardSection";
import ProductFilter, { ProductFilterValue } from "@/components/productFilter";
import Image from "next/image";

const initialFilter: ProductFilterValue = {
    locations: [],
    sellerTypes: [],
    paymentMethods: [],
    shippingOptions: [],
    promoPrograms: [],
    categories: [],
};

export default function Page() {
    const [filters, setFilters] = useState<ProductFilterValue>(initialFilter);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-6xl">
                
                {/* header section (logo, searchbar, cart) */}
                <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {/* Logo */}
                    <Image
                        src="/logo_ecommerce1.png"
                        alt="Logo Ecommerce"
                        width={44}
                        height={44}
                        className="mx-auto sm:mx-0 object-contain transition-all duration-300 hover:scale-110 hover:rotate-3 active:scale-95"
                    />
                    {/* Search bar */}
                    <div className="flex-1">
                        <SearchBar />
                    </div>
                </section>

                {/* content section */}
                <section className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                    {/* sidebar desktop */}
                    <ProductFilter value={filters} onChange={setFilters} />

                    {/* product list */}
                    <div className="min-w-0">
                        <ProductCardSection />
                    </div>
                </section>
            </div>
        </main>
    );
}