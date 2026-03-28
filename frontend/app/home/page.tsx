import SearchBar from "@/components/searchBar";
import Image from "next/image";

export default function Page() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-6xl">
                
                {/* Container horizontal */}
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <Image
                        src="/logo_ecommerce1.png"
                        alt="Logo Ecommerce"
                        width={44}
                        height={44}
                        className="object-contain transition-all duration-300 hover:scale-110 hover:rotate-3"
                    />
                    {/* Search bar */}
                    <div className="flex-1">
                        <SearchBar />
                    </div>
                </div>

            </div>
        </main>
    );
}