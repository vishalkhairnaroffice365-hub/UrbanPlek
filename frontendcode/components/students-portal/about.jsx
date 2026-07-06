import React from 'react';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaUserTie, 
  FaSearch, 
  FaCheckCircle, 
  FaCalendarCheck, 
  FaArrowRight 
} from 'react-icons/fa';

export default function About() {
  return (
    <div className="relative w-full flex items-center justify-center py-16 px-4 md:px-8 lg:px-16 overflow-hidden ">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10">
        
        {/* Left Column: Images & Floating Cards */}
        <div className="relative order-2 lg:order-1 mt-8 lg:mt-0 mx-auto w-full max-w-md lg:max-w-full">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop" 
              alt="Modern student housing interior" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* Floating Card: Students */}
          <div className="absolute -top-5 -right-5 md:-right-8 bg-white p-3 rounded-xl shadow-lg border border-gray-100 max-w-[160px] z-20 hidden sm:block">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 bg-blue-50 rounded-md text-blue-600">
                <FaGraduationCap className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-bold text-slate-800 text-xs">Students</h3>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">The perfect study base near your Nashik campus.</p>
          </div>

          {/* Floating Card: Interns */}
          <div className="absolute top-1/2 -left-5 md:-left-8 -translate-y-1/2 bg-white p-3 rounded-xl shadow-lg border border-gray-100 max-w-[160px] z-20 hidden sm:block">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 bg-indigo-50 rounded-md text-indigo-600">
                <FaBriefcase className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-bold text-slate-800 text-xs">Interns</h3>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">Flexible, short-term stays for your professional start.</p>
          </div>

          {/* Floating Card: Professionals */}
          <div className="absolute -bottom-5 right-5 md:right-8 bg-white p-3 rounded-xl shadow-lg border border-gray-100 max-w-[180px] z-20 hidden sm:block">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 bg-emerald-50 rounded-md text-emerald-600">
                <FaUserTie className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-bold text-slate-800 text-xs">Professionals</h3>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">Premium living for the modern working generation.</p>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col gap-6 order-1 lg:order-2 items-center text-center lg:items-start lg:text-left">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full tracking-wider uppercase">
              UrbanPlek Portal
            </span>
            <h1 className="text-slate-900 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
              The Student <br />
              <span className="text-blue-600">Housing</span> Revolution
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-lg leading-relaxed">
              Nashik's first Gen-Z focused platform. We've simplified the hunt for high-end, verified housing so you can focus on what matters most—your growth.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0 relative mt-2 text-left">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-100"></div>

            {/* Step 1 */}
            <div className="group relative flex items-start gap-5 pb-8">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-blue-100 shadow-sm text-blue-600">
                <FaSearch className="w-4 h-4" />
              </div>
              <div className="pt-0.5">
                <h4 className="text-base font-bold text-slate-900 mb-0.5">Search your College</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Explore curated, high-quality stays within walking distance of Nashik's top institutions.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative flex items-start gap-5 pb-8">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-blue-100 shadow-sm text-blue-600">
                <FaCheckCircle className="w-4 h-4" />
              </div>
              <div className="pt-0.5">
                <h4 className="text-base font-bold text-slate-900 mb-0.5">Verify the Listing</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Review 100% verified properties with actual photos, amenities list, and transparent pricing.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative flex items-start gap-5">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-blue-100 shadow-sm text-blue-600">
                <FaCalendarCheck className="w-4 h-4" />
              </div>
              <div className="pt-0.5">
                <h4 className="text-base font-bold text-slate-900 mb-0.5">Book a Visit</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Schedule a personalized tour with a click and experience your future home in person.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
