// src/components/Footer.jsx
"use client"
import Link from "next/link"
import { appName,appPhone, appEmail } from "@/constants/appName."
import Image from "next/image"
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

import { useSelector } from "react-redux" // Import useSelector
export default function Footer() {
  const { categories, subCategories } = useSelector((state) => state.products)
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t-amber-950 px-6 py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

        {/* Branding - Spans 4 columns */}
        <div className="md:col-span-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-500">
              <Image
                src="/logo.png"
                alt="Arshad Armoury Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-2xl tracking-[0.15em] text-white">
              {appName.toUpperCase()}
            </h1>
          </Link>
          <p className="text-sm leading-relaxed text-zinc-500 mt-6 max-w-sm">
            Forging excellence for over two centuries. {appName} specializes in premium defense equipment and precision craftsmanship, rooted in a family legacy that spans generations.
          </p>
          <div className="flex gap-4 mt-6">
             <Link href="#" className="hover:text-amber-600 transition-colors"><FaFacebook size={18}/></Link>
             <Link href="#" className="hover:text-amber-600 transition-colors"><FaInstagram size={18}/></Link>
             <Link href="#" className="hover:text-amber-600 transition-colors"><FaTwitter size={18}/></Link>
          </div>
        </div>

        {/* Quick Links - Spans 2 columns */}
        <div className="md:col-span-2">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-6">Explore</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Our Legacy</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
          </ul>
        </div>

        {/* Products - Spans 3 columns */}
        <div className="md:col-span-3">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-6">Collections</h3>
          {/* <div className="grid grid-cols-1 gap-6">
            {categories.slice(0, 3).map((cat) => (
              <div key={cat.id}>
                <Link
                  href={`/categories/${cat.id}`}
                  className="text-zinc-200 hover:text-amber-500 transition-colors font-medium text-sm"
                >
                  {cat.name}
                </Link>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                   {subCategories
                    .filter((sub) => sub.categoryId === cat.id)
                    .slice(0, 3) // Keep it clean
                    .map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/categories/${cat.id}?sub=${sub.id}`}
                        className="text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div> */}
          <div className="grid grid-cols-1 gap-6">
            {/* Show first 3 categories from Redux Store */}
            {categories?.slice(0, 3).map((cat) => (
              <div key={cat.id}>
                <Link
                  href={`/categories/${cat.id}`}
                  className="text-zinc-200 hover:text-amber-500 transition-colors font-medium text-sm"
                >
                  {cat.name}
                </Link>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                   {subCategories
                    ?.filter((sub) => Number(sub.category_id) === Number(cat.id))
                    .slice(0, 3) 
                    .map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/categories/${cat.id}?sub=${sub.id}`}
                        className="text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info - Spans 3 columns */}
        <div className="md:col-span-3">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold mb-6">The Workshop</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaPhone className="mt-1 text-amber-700 shrink-0" />
              <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-tighter">Call Us</p>
                <span className="text-zinc-300">{appPhone}</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-amber-700 shrink-0" />
              <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-tighter">Email Inquiries</p>
                <span className="text-zinc-300">{appEmail}</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          © {new Date().getFullYear()} Arshad Armoury — Forged in Steel. Bound by Legacy.
        </p>
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-zinc-600">
          <Link href="/privacypolicy" className="hover:text-zinc-300 transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-300 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}