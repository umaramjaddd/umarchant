"use client"
import { useState, useEffect } from "react"
import AdminPanel from "@/components/Admin/AdminPanel"
import Image from "next/image"
import { Lock, ShieldAlert } from "lucide-react"

export default function ContactPage() {
  const [hasMounted, setHasMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState(false)

  const ADMIN_USER = "umar"
  const ADMIN_PASS = "armoury" 

  // Fix: Ensure hydration is complete before rendering UI
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (credentials.username === ADMIN_USER && credentials.password === ADMIN_PASS) {
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  // Avoid hydration mismatch by returning null until mounted
  if (!hasMounted) return <div className="min-h-screen bg-zinc-950" />

  if (isAuthenticated) {
    return <AdminPanel />
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 bg-zinc-950">
      <div className="absolute w-[400px] h-[400px] bg-amber-900/10 blur-[120px] rounded-full"></div>

      <div 
        className={`relative z-10 w-full max-w-md p-10 bg-zinc-900 border border-white/5 shadow-2xl transition-all duration-300 ${error ? 'border-red-500/40 translate-x-1' : ''}`}
      >
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-4 opacity-80">
            <Image src="/logo.png" alt="Logo" fill className="object-contain grayscale brightness-200" />
          </div>
          <h2 className="font-serif text-2xl tracking-[0.3em] text-white uppercase">Vault Access</h2>
          <div className="w-10 h-[1px] bg-amber-700 mx-auto mt-3"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold ml-1">Commander ID</label>
            <input 
              type="text" 
              required
              autoComplete="off"
              // Added suppressHydrationWarning as a double-layer of protection
              suppressHydrationWarning
              className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-base focus:border-amber-600 outline-none transition-all"
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold ml-1">Access Key</label>
            <input 
              type="password" 
              required
              suppressHydrationWarning
              className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white text-base focus:border-amber-600 outline-none transition-all"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase tracking-widest justify-center animate-pulse">
              <ShieldAlert size={14} />
              <span>Identity Rejected</span>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-5 bg-amber-700 hover:bg-amber-600 text-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <Lock size={14} className="text-white/70" />
            Authorize Entry
          </button>
        </form>
      </div>
    </div>
  )
}