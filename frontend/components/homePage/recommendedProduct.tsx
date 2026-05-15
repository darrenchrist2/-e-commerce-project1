import ProductCard from "@/components/resultPage/productCard";

const recommendedProducts = [
    {
        name: "Sneakers Casual Pria",
        price: 349000,
        imageUrl: "/images/sneakers.jpg",
    },
    {
        name: "Tas Selempang Wanita",
        price: 189000,
        imageUrl: "/images/tas_selempang_perempuan.jpg",
    },
    {
        name: "Smartwatch Sport",
        price: 499000,
        imageUrl: "/images/smartwatch_sport.jpg",
    },
    {
        name: "Headphone Wireless",
        price: 299000,
        imageUrl: "/images/headphone_wireless.jpg",
    },
    {
        name: "Jaket Denim Unisex",
        price: 259000,
        imageUrl: "/images/jaket_denim.jpg",
    },
    {
        name: "Keyboard Mechanical",
        price: 699000,
        imageUrl: "/images/mechanical_keyboard.jpg",
    },
    {
        name: "Parfum Premium",
        price: 159000,
        imageUrl: "/images/parfum.jpg",
    },
    {
        name: "Mini Diecast Collection",
        price: 89000,
        imageUrl: "/images/diecast.jpg",
    },
];

export default function RecommendedProductSection() {
    return (
        <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Rekomendasi Produk
                    </h2>
                    <p className="text-sm text-slate-500">
                        Produk yang mungkin kamu suka
                    </p>
                </div>

                <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 cursor-pointer">
                    Lihat Semua
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {recommendedProducts.map((product) => (
                    <ProductCard
                        key={product.name}
                        name={product.name}
                        price={product.price}
                        imageUrl={product.imageUrl}
                        imageAlt={product.name}
                    />
                ))}
            </div>
        </section>
    );
}