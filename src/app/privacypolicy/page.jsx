// src/components/PrivacyPolicySection.jsx
import { appName } from "@/constants/appName."

export default function PrivacyPolicySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Header */}
        <div>
          <span className="text-amber-700 text-xs uppercase tracking-[0.4em] font-bold">Data Protection</span>
          <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mt-4 mb-2 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-zinc-400 text-sm italic font-light">Last updated: June 2026</p>
        </div>

        <hr className="border-zinc-200" />

        {/* Privacy Content */}
        <div className="space-y-8 text-zinc-600 leading-relaxed font-light text-base">
          <p>
            At {appName}, we value your trust and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our site or purchase our handcrafted goods.
          </p>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">1. Information We Collect</h2>
            <p>
              When you make a purchase or commission a custom order, we collect the necessary details you provide to fulfill it. This includes your name, billing and shipping addresses, email address, phone number, and any sizing dimensions required for custom armour pieces.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">2. How We Use Your Information</h2>
            <p>
              We use your data solely to process your orders, communicate updates regarding your commissions, and provide reliable customer support. If you opt-in, we may occasionally send you updates about new collection releases or forge announcements.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">3. Information Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal details with third parties. Your information is only shared with trusted service providers strictly necessary to run our business—such as secure payment processors and the shipping couriers tasked with delivering your leatherwork.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to safeguard your private information. While no method of digital transmission or storage is 100% secure, we take all reasonable precautions to keep your measurements, order histories, and personal details safe.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-serif text-zinc-900 font-semibold">5. Your Rights</h2>
            <p>
              You have the right to access, update, or request the deletion of the personal information we hold about you. If you wish to update your measurement records or remove your details from our systems, please contact us.
            </p>
          </div>
        </div>

        {/* Footer/Signature Note */}
        <div className="mt-6 border-t border-zinc-100 pt-8">
          <p className="text-sm text-zinc-500 font-light">
            For any privacy-related inquiries or data requests, please feel free to reach out.
          </p>
          <div className="mt-4 signature-font text-3xl text-zinc-400">Arshad Armoury</div>
        </div>

      </div>
    </section>
  )
}