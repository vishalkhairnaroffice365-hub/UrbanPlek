import Image from 'next/image';
import Link from 'next/link';
import { IoArrowForward, IoCompass } from 'react-icons/io5';

const SERVICES = ['RESIDENTIAL TOURS', 'COMMERCIAL LANDS', 'HOSTEL VISITS'];
const BG_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDihKFxRqQqcp2ET0chwq7M3e3rL9hqM2OAvBJSPZZ860Pt7NKEm1I7RtVqtIpPYnrXog_-eTSkozvTNwXK2ZKkpy8ngyKZgn3rTpd66LqDeAf4Uv2DhWdFE9LAG9neWZ7FFU5r38AlVZMMe-MeTk_5MYR8KWjHzB5UlMJEg1WYXVwgKQlh5AXHlo_hWikVYZ5KHPeR7oDM0_u9T1nqrbiWlHdvrCQ-TdKEKMFHGa9o50PSx1RBrtqZyjSroyWNa_uPvsd1rS2s3B-o";

export default function BookVisitCTA() {
  return (
    <section className="w-full px-4 py-12 flex justify-center font-['Poppins'] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl shadow-xl flex flex-col justify-between bg-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            alt="High-end modern property interior in Nashik"
            src={BG_IMAGE_URL}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row justify-between items-start">
          <div className="max-w-lg">
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-3 md:mb-4">
              See Your Future <br />
              Home In Person
            </h1>
            <p className="text-sm md:text-base text-slate-600 font-medium max-w-md">
              Experience the finest premium listings in Nashik with a personalized
              guided tour of our verified properties.
            </p>
          </div>

          {/* Services List (Desktop) */}
          <div className="mt-4 md:mt-0 text-right hidden md:block">
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center justify-end gap-2 group">
                  <span className="text-xs font-bold tracking-widest text-slate-500 group-hover:text-primary transition-colors">
                    {service}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="relative z-10 px-4 pb-4 md:px-8 md:pb-8 mt-6 md:mt-0">
          <div className="bg-primary rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-primary/20">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="hidden md:flex w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                <IoCompass className="text-white w-5 h-5" />
              </div>
              <h2 className="text-white font-bold text-sm md:text-lg tracking-tight">
                READY TO EXPLORE NASHIK'S BEST PROPERTIES?
              </h2>
            </div>
            <Link href="/contact" className="w-full md:w-auto px-6 py-2.5 bg-white hover:bg-slate-50 text-primary font-extrabold rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer text-sm">
              <span>Book a Visit</span>
              <IoArrowForward className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
