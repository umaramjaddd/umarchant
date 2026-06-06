import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReduxProvider from "../Redux/ReduxProvider";


const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
// src/app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      {/* Change bg-zinc-900 to bg-zinc-950 for a more high-end "Onyx" look */}
      <body className="bg-zinc-950 text-white min-h-screen selection:bg-amber-600/30 selection:text-amber-200">
          <ReduxProvider>
            <Navbar />
           <main className="pt-[70px] md:pt-[100px]">{children}</main>
            <Footer />
          </ReduxProvider>
        </body>
    </html>
  );
}