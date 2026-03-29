"use client";

import Image from "next/image";

type ProductCardProps = {
    name: string;
    price: number | string;
    imageUrl: string;
    imageAlt?: string;
    onViewDetail?: () => void;
    onAddToCart?: () => void;
    className?: string;
};

function formatRupiah(price: number | string) {
    const numericPrice =
        typeof price === "string" ? Number(price.replace(/,/g, "")) : price;

    if (Number.isNaN(numericPrice)) {
        return "Rp 0.00";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}

export default function ProductCard({
    name,
    price,
    imageUrl,
    imageAlt,
    onViewDetail,
    onAddToCart,
    className = "",
}: ProductCardProps) {
    return (
        <article
            className={[
                "group w-full overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300",
                "hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]",
                "active:scale-[0.99]",
                className,
            ].join(" ")}
        >
            {/* Section 1: image */}
            <div className="relative overflow-hidden rounded-xl bg-slate-100">
                <div className="relative aspect-4/3 w-full">
                    <Image
                        src={imageUrl}
                        alt={imageAlt || name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/10 via-transparent to-white/20 opacity-80" />
            </div>

            {/* Section 2: nama + harga */}
            <div className="px-1 pt-3">
                <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-800">
                    {name}
                </h3>

                <p className="mt-1.5 text-sm font-bold tracking-tight text-slate-900 sm:text-base">
                    {formatRupiah(price)}
                </p>
            </div>

            {/* Section 3: actions */}
            <div className="mt-3 flex items-center gap-2">
                <button
                    type="button"
                    onClick={onViewDetail}
                    className="flex h-9 w-3/4 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 px-3 text-xs font-medium text-slate-700 transition-all duration-300 hover:border-sky-200 hover:bg-sky-100/70 hover:text-slate-900 active:scale-[0.98] sm:text-sm"
                >
                    View Detail
                </button>

                <button
                    type="button"
                    onClick={onAddToCart}
                    aria-label={`Add ${name} to cart`}
                    className="flex h-9 w-1/4 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.96]"
                >
                    <i className="ri-shopping-cart-2-line text-base" />
                </button>
            </div>
        </article>
    );
}