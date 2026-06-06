// src/components/AboutSection.jsx
import Image from "next/image"
import { appName } from "@/constants/appName."

export default function AboutSection() {
  return (
    <section className="py-20 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left: Image with Decorative Frame */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-amber-600/30"></div>
          <div className="relative z-10 w-full h-[450px] overflow-hidden shadow-2xl">
            <Image
              src="/logo.png" 
              alt="Arshad Armoury Craftsmanship"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-700/10 -z-0"></div>
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2">
          <span className="text-amber-700 text-xs uppercase tracking-[0.4em] font-bold">Our Heritage</span>
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 mt-4 mb-8 leading-tight">
            The Art of the <br/> Modern Blacksmith
          </h2>
          <div className="space-y-6 text-zinc-600 leading-relaxed font-light text-lg">
            <p>
              {appName} is dedicated to crafting premium leather goods and armour that combine tradition, craftsmanship, and style. Every piece is meticulously designed and handmade to ensure durability and elegance.
            </p>
            <p>
              Our mission is to preserve the art of fine leatherwork and armour making while delivering products that our customers can cherish for years to come.
            </p>
          </div>
          <div className="mt-10 signature-font text-3xl text-zinc-400">Arshad Armoury</div>
        </div>
      </div>
    </section>
  )
}