import ProductCard from "@/components/productCard";

const recommendedProducts = [
    {
        name: "Sneakers Casual Pria",
        price: 349000,
        imageUrl: "https://picsum.photos/seed/sneakers/400/400",
    },
    {
        name: "Tas Selempang Wanita",
        price: 189000,
        imageUrl: "https://picsum.photos/seed/bag/400/400",
    },
    {
        name: "Smartwatch Sport",
        price: 499000,
        imageUrl: "https://picsum.photos/seed/smartwatch/400/400",
    },
    {
        name: "Headphone Wireless",
        price: 299000,
        imageUrl: "https://picsum.photos/seed/headphone/400/400",
    },
    {
        name: "Jaket Denim Unisex",
        price: 259000,
        imageUrl: "https://picsum.photos/seed/jacket/400/400",
    },
    {
        name: "Keyboard Mechanical",
        price: 699000,
        imageUrl: "https://picsum.photos/seed/keyboard/400/400",
    },
    {
        name: "Parfum Premium",
        price: 159000,
        imageUrl: "https://picsum.photos/seed/perfume/400/400",
    },
    {
        name: "Mini Diecast Collection",
        price: 89000,
        imageUrl: "https://picsum.photos/seed/diecast/400/400",
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

                <button className="text-sm font-semibold text-orange-500 hover:text-orange-600">
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