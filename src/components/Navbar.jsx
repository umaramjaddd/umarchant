// src/components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Menu, X} from "lucide-react";
import { appName } from "@/constants/appName.";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 hidden md:flex items-center
        ${scrolled 
          ? "bg-zinc-950/95 backdrop-blur-md h-[80px] border-b border-white/10 shadow-lg text-white" 
          : "bg-transparent h-[100px] text-black"}`}
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center group">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="Logo" fill className="object-contain transition-all"/>
            </div>
            <h1 className="font-serif text-xl tracking-[0.2em] ml-3 uppercase">{appName}</h1>
          </Link>

          <nav className="flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-colors
                  ${pathname === link.href ? "text-amber-600" : "hover:text-amber-500"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/products">
              <button className={`px-5 py-2 border text-[11px] uppercase tracking-widest font-bold transition-all
                ${scrolled ? "border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white" : "border-black text-black hover:bg-black hover:text-white"}`}>
                Products
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* --- MOBILE NAVBAR --- */}
      <header className="fixed top-0 left-0 w-full z-50 flex md:hidden items-center bg-black h-[70px] text-white px-4 border-b border-zinc-800">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="font-serif text-sm tracking-widest ml-2 uppercase">{appName}</h1>
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="fixed inset-0 top-[70px] bg-zinc-950 flex flex-col p-6 space-y-6 z-50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-serif tracking-widest border-b border-zinc-900 pb-4 uppercase"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/products" 
              onClick={() => setMenuOpen(false)}
              className="text-lg font-serif tracking-widest text-amber-500 uppercase"
            >
              Explore Products
            </Link>
            
            {/* Mobile Socials */}
            <div className="flex gap-6 pt-6">
               <Icon icon="ri:facebook-fill" width="24" className="text-zinc-500" />
               <Icon icon="ri:instagram-line" width="24" className="text-zinc-500" />
            </div>
          </div>
        )}
      </header>
    </>
  );
} 