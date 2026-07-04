'use client'

import { useState } from 'react';
import Link from 'next/link';
import { IoChevronDown, IoArrowForward } from 'react-icons/io5';

const FAQS = [
  {
    question: "How do I know if a listing on UrbanPlek is verified?",
    answer: "Every listing on UrbanPlek undergoes a rigorous multi-step verification process. Look for the blue \"Verified\" checkmark badge. Our team physically visits student housing and premium listings in Nashik to ensure photos match reality."
  },
  {
    question: "Are there specific options for student housing?",
    answer: "Yes, we have a dedicated section for student housing that includes hostels, PGs, and shared apartments located near major educational institutions in Nashik."
  },
  {
    question: "Can I schedule a property visit through the platform?",
    answer: "Absolutely! You can schedule visits directly through the property listing page. Choose a time slot that works for you, and the property manager will confirm the appointment."
  },
  {
    question: "What are the fees for listing my property?",
    answer: "We are currently aggressively onboarding our first 100 property owners with a 100% free service offer. This 'First 100' program is designed to build a high-quality portfolio rapidly."
  },
  {
    question: "Do you offer help with rental agreements?",
    answer: "We provide standard rental agreement templates that are legally compliant in Nashik. For premium users, we also offer assistance with notarization and registration."
  },
  {
    question: "Is UrbanPlek available in other cities?",
    answer: "Currently, we are focused exclusively on Nashik to provide the best possible local experience. We plan to expand to other cities in Maharashtra soon."
  },
  {
    question: "How can I report an inaccurate listing?",
    answer: "If you find any discrepancies in a listing, please use the 'Report Listing' button on the property page. Our verification team will investigate within 24 hours."
  }
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Poppins'] selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 shadow-sm w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">UrbanPlek Nashik</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Frequently asked <span className="text-blue-600">questions</span>
              </h1>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Still have questions?</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Can't find the answer you're looking for? Reach out to our dedicated support team.
                </p>
              </div>
              
              <Link href="/contact" className="w-full group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98] text-sm">
                <span>Contact Support</span>
                <IoArrowForward className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column - FAQ List */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {FAQS.map((faq, index) => (
              <FAQItem 
                key={index} 
                item={faq} 
                isOpen={openIndex === index} 
                onClick={() => setOpenIndex(openIndex === index ? null : index)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden
        ${isOpen 
          ? 'bg-white border-blue-600 shadow-xl shadow-blue-900/5 ring-1 ring-blue-600/10' 
          : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
        }
      `}
    >
      <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
        <h3 className={`text-sm sm:text-base font-bold leading-snug transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-800 group-hover:text-blue-600'}`}>
          {item.question}
        </h3>
        
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
          ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}
        `}>
          <IoChevronDown className="w-5 h-5" />
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-5 pb-5 pt-0">
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
