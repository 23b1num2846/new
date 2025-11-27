"use client";

import SearchBar from "../layout/SearchBar";

export default function Hero({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <section className="relative bg-linear-to-br from-orange-500 via-amber-500 to-orange-600 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Орон нутгийн бизнесүүдийг
          <span className="block bg-clip-text text-transparent bg-linear-to-r from-white to-orange-100">
            илрүүлж, дэмжээрэй
          </span>
        </h1>

        <p className="text-xl text-orange-100 mb-6">
          Хотын шилдэг газруудыг хайж, сэтгэгдэл уншиж, өөрийн туршлагаа хуваалцаарай.
        </p>

        <SearchBar onSearch={onSearch} />
      </div>
    </section>
  );
}
