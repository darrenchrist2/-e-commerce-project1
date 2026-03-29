"use client";

import ProductCard from "@/components/productCard";

const products = [
    {
        id: 1,
        name: "Wireless Headphone",
        price: 25000,
        imageUrl: "/products/headphone.jpg",
    },
    {
        id: 2,
        name: "Smart Watch Modern Edition",
        price: 125000,
        imageUrl: "/products/smartwatch.jpg",
    },
    {
        id: 3,
        name: "Laptop Sleeve Minimalist",
        price: 85000,
        imageUrl: "/products/laptop-sleeve.jpg",
    },
    {
        id: 4,
        name: "Portable Bluetooth Speaker",
        price: 99000,
        imageUrl: "/products/speaker.jpg",
    },
];

export default function ProductCardSection() {
    return (
        <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    onViewDetail={() => console.log("View detail", product.id)}
                    onAddToCart={() => console.log("Add to cart", product.id)}
                />
            ))}
        </section>
    );
}