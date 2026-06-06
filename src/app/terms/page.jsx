// src/components/AboutSection.jsx
import Image from "next/image"
import { appName } from "@/constants/appName."



export default function TermsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Header */}
        <div>
          <span className="text-amber-700 text-xs uppercase tracking-[0.4em] font-bold">Legal Agreement</span>
          <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mt-4 mb-2 leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-zinc-400 text-sm italic font-light">Last updated: June 2026</p>
        </div>

        <hr className="border-zinc-200" />

        {/* Terms Content */}
        <div className="space-y-8 text-zinc-600 leading-relaxed font-light text-base">
          <p>
            Welcome to {appName}. These Terms & Conditions govern your use of our website and the purchase of our handcrafted leather goods and armour. By accessing our site or purchasing our products, you agree to be bound by these terms.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">1. Handcrafted Goods & Variations</h2>
            <p>
              Because our products are meticulously handmade, minor variations in leather texture, color, and finish are natural and unique characteristics of each piece. These distinct traits are not considered defects but rather a testament to the authenticity of the craft.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">2. Custom Armour & Sizing</h2>
            <p>
              Clients ordering custom armour or sized leather goods are responsible for providing accurate measurements. {appName} is not liable for fitment issues arising from incorrect dimensions provided by the buyer. 
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">3. Intellectual Property</h2>
            <p>
              All content on this site, including designs, images, text, and logos, is the exclusive property of Arshad Armoury. Unauthorized reproduction, modification, or distribution of our proprietary designs is strictly prohibited.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">4. Limitation of Liability</h2>
            <p>
              Our products are intended for decorative, costume, or historical reenactment purposes. {appName} assumes no liability for injury, loss, or damage resulting from the misuse or altering of our armour and leather products.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">5. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the revised terms.
            </p>
          </div>
        </div>

        {/* Footer/Signature Note */}
        <div className="mt-6 border-t border-zinc-100 pt-8">
          <p className="text-sm text-zinc-500 font-light">
            If you have any questions regarding these terms, please contact us directly.
          </p>
          <div className="mt-4 signature-font text-3xl text-zinc-400">Arshad Armoury</div>
        </div>

      </div>
    </section>
  )
}