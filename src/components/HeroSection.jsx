// src/components/HeroSection.jsx
import Link from "next/link"
import { appName } from "@/constants/appName."

export default function HeroSection() {
  return (
    <section
      className="relative h-[85vh] flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: "url('https://www.shutterstock.com/image-photo/sweeping-aerial-view-longforgotten-iron-600nw-2711319959.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark Overlay for Depth */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content with Glassmorphism */}
      <div className="relative z-10 text-center px-8 py-12 md:py-16 max-w-3xl mx-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-sm shadow-2xl">
        
        {/* Decorative Top Accent */}
        <div className="w-12 h-[1px] bg-amber-500 mx-auto mb-6"></div>

        <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight">
          {appName}
        </h1>
        
        <p className="text-zinc-200 text-lg md:text-xl mb-10 font-light tracking-wide italic">
          Forging premium leather goods and armour with unmatched craftsmanship.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Styled as a button directly - no nested <button> tag needed */}
          <Link 
            href="https://wa.me/923080903030" 
            target="_blank"
            className="px-10 py-4 bg-amber-700 text-white font-bold tracking-widest uppercase text-xs text-center
                       hover:bg-amber-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg inline-block"
          >
            Contact Us
          </Link>
          
          <Link 
            href="/products"
            className="px-10 py-4 border border-white text-white font-bold tracking-widest uppercase text-xs text-center
                       hover:bg-white hover:text-zinc-900 transition-all duration-300 inline-block"
          >
            View Collection
          </Link>
        </div>
      </div>

      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-zinc-950 to-transparent"></div>
    </section>
  )
}