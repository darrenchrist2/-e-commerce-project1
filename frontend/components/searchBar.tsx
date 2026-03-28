"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ProductSuggestion = {
    id: number;
    name: string;
    category: string;
    price: string;
};

const MOCK_PRODUCTS: ProductSuggestion[] = [
    { id: 1, name: "Sepatu Lari Pria AirFlex", category: "Sepatu", price: "Rp 499.000" },
    { id: 2, name: "Sepatu Sneakers Wanita Cloud Street", category: "Sepatu", price: "Rp 549.000" },
    { id: 3, name: "Tas Selempang Urban Basic", category: "Tas", price: "Rp 279.000" },
    { id: 4, name: "Tas Kerja Minimalist Pro", category: "Tas", price: "Rp 399.000" },
    { id: 5, name: "Jam Tangan Chrono Active", category: "Aksesoris", price: "Rp 899.000" },
    { id: 6, name: "Headphone Wireless SonicBeat", category: "Elektronik", price: "Rp 699.000" },
    { id: 7, name: "Mouse Wireless Ergo Click", category: "Elektronik", price: "Rp 249.000" },
    { id: 8, name: "Kaos Oversize Cotton Ease", category: "Fashion", price: "Rp 159.000" },
    { id: 9, name: "Kemeja Linen Casual Breeze", category: "Fashion", price: "Rp 289.000" },
    { id: 10, name: "Celana Chino Modern Fit", category: "Fashion", price: "Rp 329.000" },
    { id: 11, name: "Skincare Hydrating Gel", category: "Beauty", price: "Rp 119.000" },
    { id: 12, name: "Parfum Daily Fresh Aura", category: "Beauty", price: "Rp 219.000" },
    { id: 13, name: "Sepatu Formal Executive Brown", category: "Sepatu", price: "Rp 629.000" },
    { id: 14, name: "Sandal Casual FlexWalk", category: "Sepatu", price: "Rp 199.000" },
    { id: 15, name: "Dompet Kulit Compact", category: "Aksesoris", price: "Rp 189.000" },
];

export default function SearchBar() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    // Filter rekomendasi berdasarkan kata kunci yang diketik user.
    const filteredProducts = useMemo(() => {
        const keyword = query.trim().toLowerCase();

        if (!keyword) {
            // Saat belum mengetik apa pun, tampilkan placeholder recommendation.
            return MOCK_PRODUCTS.slice(0, 8);
        }

        return MOCK_PRODUCTS.filter((product) =>
            `${product.name} ${product.category}`.toLowerCase().includes(keyword)
        ).slice(0, 8);
    }, [query]);

    const showDropdown = isOpen && (filteredProducts.length > 0 || query.trim().length > 0);

    const handleSelect = (productName: string) => {
        setQuery(productName);
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.focus();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (activeIndex < 0 || !listRef.current) return;

        const activeItem = listRef.current.querySelector<HTMLElement>(
            `[data-suggestion-index="${activeIndex}"]`
        );

        activeItem?.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
        });
    }, [activeIndex]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((prev) =>
                prev < filteredProducts.length - 1 ? prev + 1 : 0
            );
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : filteredProducts.length - 1
            );
        }

        if (event.key === "Enter") {
            if (activeIndex >= 0 && filteredProducts[activeIndex]) {
                event.preventDefault();
                handleSelect(filteredProducts[activeIndex].name);
            }
        }

        if (event.key === "Escape") {
            setIsOpen(false);
            setActiveIndex(-1);
        }
    };

    useEffect(() => {
        // Reset active item saat hasil filter berubah.
        setActiveIndex(-1);
    }, [query]);

    return (
        <div ref={wrapperRef} className="relative w-full max-w-3xl">
            {/* Search input */}
            <div
                className={`group flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm transition-all duration-300 ${
                isOpen
                    ? "border-slate-300 shadow-lg ring-4 ring-slate-100"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-slate-400 transition-colors duration-300 group-focus-within:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                </svg>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onFocus={() => setIsOpen(true)}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Cari produk, kategori, atau brand..."
                    role="combobox"
                    aria-expanded={showDropdown}
                    aria-controls="product-suggestion-list"
                    aria-autocomplete="list"
                    className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setIsOpen(true);
                            inputRef.current?.focus();
                        }}
                        className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Hapus pencarian"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Dropdown recommendation */}
            <div
                className={`absolute left-0 right-0 top-[calc(100%+12px)] z-50 origin-top overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ${
                showDropdown
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
            >
                <div className="border-b border-slate-100 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Rekomendasi produk
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        {query.trim()
                            ? `Hasil pencarian untuk "${query}"`
                            : "Produk populer untuk pencarian cepat"}
                    </p>
                </div>

                <ul
                    ref={listRef}
                    id="product-suggestion-list"
                    role="listbox"
                    className="max-h-90 overflow-y-auto p-3"
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <li key={product.id} role="option" aria-selected={isActive}>
                                    <button
                                        type="button"
                                        data-suggestion-index={index}
                                        onMouseDown={(event) => {
                                            // Mencegah input blur sebelum click selesai.
                                            event.preventDefault();
                                        }}
                                        onClick={() => handleSelect(product.name)}
                                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                                            isActive
                                            ? "bg-slate-100"
                                            : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-slate-800">
                                                {product.name}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {product.category}
                                            </p>
                                        </div>

                                        <span className="ml-4 shrink-0 text-xs font-medium text-slate-600">
                                            {product.price}
                                        </span>
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                            <li className="px-4 py-10 text-center">
                                <p className="text-sm font-medium text-slate-700">
                                    Produk tidak ditemukan
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Coba gunakan kata kunci lain.
                                </p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}