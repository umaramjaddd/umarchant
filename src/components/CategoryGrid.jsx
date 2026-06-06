// src/components/CategoryGrid.jsx
"use client";

import { useSelector } from "react-redux";
import CategoryCard from "@/components/CategoryCard";

export default function CategoryGrid() {
  const { categories, loading } = useSelector((state) => state.products);

  if (loading && categories.length === 0)
    return (
      <div className="py-20 flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
        <p className="mt-4 text-zinc-500 font-serif italic">Loading Collections...</p>
      </div>
    );

  return (
    <section className="py-12 ">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-zinc-900">Featured Collections</h2>
        <div className="w-16 h-[2px] bg-amber-700 mx-auto mt-4"></div>
      </div>

      {/* Modern Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}