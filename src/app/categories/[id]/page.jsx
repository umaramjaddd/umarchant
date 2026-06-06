"use client"

import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchSubCategories } from "@/Redux/Slices/productsSlice";
import { useParams, useSearchParams } from "next/navigation"
import ProductCard from "@/components/ProductCard"

export default function CategoryPage() {
  const dispatch = useDispatch();
  
  // Access data from Redux instead of local constants
  const { products, subCategories, loading } = useSelector((state) => state.products);
  console.log(subCategories);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSubCategories());
  }, [dispatch]);
  const params = useParams()
  const searchParams = useSearchParams()
  const categoryId = Number(params.id)
  const querySub = Number(searchParams.get("sub"))

  console.log(subCategories);
  
 
  
  const filteredSubCategories = subCategories.filter(
    (sub) => sub.category_id === categoryId
  )

  const [selectedSub, setSelectedSub] = useState(
    querySub || filteredSubCategories[0]?.id || null
  )


    // FIX: Sync selectedSub when data finished loading
  useEffect(() => {
    if (!selectedSub && filteredSubCategories.length > 0) {
      setSelectedSub(filteredSubCategories[0].id)
    }
  }, [filteredSubCategories, selectedSub])


  const filteredProducts = products.filter(
    (p) => p.sub_category_id === selectedSub
  )


  // const filteredProducts = products;

 console.log("filtered products:", filteredProducts);


  if (!filteredSubCategories.length) return (
    <div className="h-[60vh] flex items-center justify-center">
      <p className="text-zinc-500 font-serif italic tracking-widest uppercase">Archive Empty</p>
    </div>
  )

  return (
    <main className="px-6 py-20 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 border-b border-zinc-100 pb-8">
        <span className="text-amber-700 text-xs uppercase tracking-[0.4em] font-bold mb-2 block">
          Curated Collection
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-zinc-900 tracking-tight">
          Masterpieces
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 shrink-0">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold mb-6">
            Filter by Specialty
          </h3>
          <div className="flex lg:flex-col flex-wrap gap-2 lg:gap-4">
            {filteredSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSub(sub.id)}
                className={`text-left text-sm uppercase tracking-widest transition-all duration-300 relative py-1 ${
                  selectedSub === sub.id 
                    ? "text-amber-700 font-bold pl-4" 
                    : "text-zinc-500 hover:text-zinc-900 pl-0"
                }`}
              >
                {selectedSub === sub.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-amber-700"></span>
                )}
                {sub.name}
              </button>
            ))}
          </div>
        </aside>
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-zinc-50 border border-dashed border-zinc-200 py-20 text-center rounded-sm">
              <p className="text-zinc-400 font-serif italic text-lg">No pieces currently in this selection.</p>
              <button 
                onClick={() => setSelectedSub(filteredSubCategories[0]?.id)}
                className="mt-4 text-xs uppercase tracking-widest text-amber-700 font-bold border-b border-amber-700 pb-1 hover:text-amber-500 hover:border-amber-500 transition-all"
              >
                View All Categories
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}