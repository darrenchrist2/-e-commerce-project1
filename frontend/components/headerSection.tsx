"use client";

import SearchBar from "@/components/searchBar";
import Image from "next/image";

export default function HeaderSection() {

    return (
        <>
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
        </>
    );
}