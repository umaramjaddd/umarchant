"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" }); // type: "success" or "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus({ type: "success", message: "Your message has been forged! We'll get back to you shortly." });
      setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form including phone
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to deliver message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-zinc-950 text-white overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Left: Atmospheric Image */}
        <div className="w-full md:w-5/12 relative h-64 md:h-auto">
          <Image
            src="/contact.png" 
            alt="The Workshop"
            fill
            className="object-cover opacity-60 hover:opacity-80 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/20 to-zinc-950"></div>
        </div>

        {/* Right: Sophisticated Form */}
        <div className="w-full md:w-7/12 p-8 md:p-20 flex flex-col justify-center">
          <span className="text-amber-500 text-xs uppercase tracking-[0.5em] mb-4">Inquiries</span>
          <h2 className="text-4xl font-serif mb-6">Forge a Connection</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-zinc-700 py-2 focus:border-amber-500 outline-none transition-colors" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-zinc-700 py-2 focus:border-amber-500 outline-none transition-colors" 
              />
            </div>
            
            {/* Added Phone Field (Spans full width on mobile, half on desktop) */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-zinc-700 py-2 focus:border-amber-500 outline-none transition-colors" 
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">Your Message</label>
              <textarea 
                rows={3} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-zinc-700 py-2 focus:border-amber-500 outline-none transition-colors resize-none" 
              />
            </div>
            
            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
              <button 
                type="submit"
                disabled={loading}
                className="md:w-max px-12 py-4 bg-amber-700 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Success/Error Feedback Messages */}
              {status.message && (
                <p className={`text-xs uppercase tracking-wider font-semibold ${status.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>

          {/* Contact Details Grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-zinc-800">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">WhatsApp</p>
              <a href="https://wa.me/921234567890" target="_blank" rel="noreferrer" className="text-sm hover:text-amber-500 transition">+92 123 456 7890</a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Email</p>
              <a href="mailto:support@arshadarmoury.com" className="text-sm hover:text-amber-500 transition">support@arshadarmoury.com</a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Social</p>
              <a href="#" className="text-sm hover:text-amber-500 transition">@arshadarmoury</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}