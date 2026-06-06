"use client";

import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/Redux/Slices/productsSlice";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function ProductViewPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  
  // State to keep track of the currently selected preview image
  const [activeImage, setActiveImage] = useState(null);

  const product = products.find((p) => p.id === Number(id));

  // 1. Safely construct the unified image array: thumbnail first, followed by any additional images
  const imageList = product 
    ? [product.thumbnail, ...(product.images || [])].filter(Boolean) 
    : [];

  // Initialize or update the active image when the product changes/loads
  useEffect(() => {
    if (imageList.length > 0) {
      // Automatically default to the first image in the list (which is the thumbnail)
      setActiveImage(imageList[0]);
    }
  }, [product]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-12 h-12 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <p className="font-serif text-xl tracking-widest text-zinc-500 uppercase">Piece not found in archives</p>
    </div>
  );

  // Dynamic WhatsApp message
  const waMessage = encodeURIComponent(`Greetings Arshad Armoury, I am interested in the ${product.name}. Could you provide more details?`);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-10 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-stretch">
        
        {/* Left: Product Showcase & Image Gallery */}
        <div className="w-full lg:w-3/5 flex flex-col gap-4">
          
          {/* Main Showcase Image */}
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-amber-600/20 blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden bg-zinc-900 border border-white/5">
              <img
                src={activeImage || product.thumbnail}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-amber-600/30"></div>
          </div>

          {/* Responsive Map Thumbnail Gallery */}
          {imageList.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3 pt-2">
              {imageList.map((imgUrl, index) => {
                const isActive = activeImage === imgUrl;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative aspect-square overflow-hidden bg-zinc-900 border transition-all duration-300 ${
                      isActive 
                        ? "border-amber-600 opacity-100 scale-[0.98]" 
                        : "border-white/5 opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Product Details & Acquisition */}
        <div className="w-full lg:w-2/5 lg:min-h-[80vh] flex flex-col justify-between sticky top-20">
          <div className="mb-8">
            <span className="text-amber-600 text-[10px] uppercase tracking-[0.5em] font-bold">
              {product.material || "Handcrafted Edition"}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 mb-6 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4 mb-8">
               <span className="text-2xl font-light text-zinc-100">PKR {product.price}</span>
               <span className="text-[10px] uppercase tracking-widest text-zinc-500 italic">Inc. Custom Fitting</span>
            </div>
            
            <div className="w-full h-[1px] bg-gradient-to-r from-zinc-800 to-transparent mb-8"></div>
            
            <p className="text-zinc-400 text-lg leading-relaxed font-light mb-10 italic">
              "{product.description}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Link 
              href={`https://wa.me/923080903030?text=${waMessage}`}
              target="_blank"
              className="group relative flex items-center justify-center gap-3 bg-amber-700 hover:bg-amber-600 text-white py-5 px-8 transition-all duration-300 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-white/10"></div>
              <Icon icon="ri:whatsapp-line" width="20" />
              <span className="text-xs uppercase font-bold tracking-[0.3em] relative z-10">Inquire via WhatsApp</span>
            </Link>

            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] uppercase tracking-[0.2em] py-4"
            >
              <Icon icon="ri:arrow-left-s-line" width="16" />
              Back to Collection
            </button>
          </div>

          {/* Authentic Details Box */}
          <div className="mt-12 p-6 border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm">
            <h4 className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-4">Craftsmanship Guarantee</h4>
            <ul className="space-y-3 text-[11px] text-zinc-500 tracking-wide uppercase">
              <li className="flex items-center gap-3"><Icon icon="ri:shield-check-line" className="text-amber-700" /> 100% Sialkot Forged Leather</li>
              <li className="flex items-center gap-3"><Icon icon="ri:hammer-line" className="text-amber-700" /> Lifetime Maintenance Support</li>
              <li className="flex items-center gap-3"><Icon icon="ri:truck-line" className="text-amber-700" /> Secure Insured Shipping</li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  );
}