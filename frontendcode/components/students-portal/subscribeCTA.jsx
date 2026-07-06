import Image from 'next/image';
import { IoArrowForward, IoMail } from 'react-icons/io5';

const FEATURES = ['NEW LISTING ALERTS', 'PRICE DROP NOTIFICATIONS', 'EXCLUSIVE STUDENT DEALS'];
const BG_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDihKFxRqQqcp2ET0chwq7M3e3rL9hqM2OAvBJSPZZ860Pt7NKEm1I7RtVqtIpPYnrXog_-eTSkozvTNwXK2ZKkpy8ngyKZgn3rTpd66LqDeAf4Uv2DhWdFE9LAG9neWZ7FFU5r38AlVZMMe-MeTk_5MYR8KWjHzB5UlMJEg1WYXVwgKQlh5AXHlo_hWikVYZ5KHPeR7oDM0_u9T1nqrbiWlHdvrCQ-TdKEKMFHGa9o50PSx1RBrtqZyjSroyWNa_uPvsd1rS2s3B-o";

export default function SubscribeCTA() {
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
            alt="Students group study"
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
              Never Miss a <br />
              New Listing
            </h1>
            <p className="text-sm md:text-base text-slate-600 font-medium max-w-md">
              Get instant updates on the latest hostels, PGs, and student rooms in Nashik delivered straight to your inbox.
            </p>
          </div>

          {/* Features List (Desktop) */}
          <div className="mt-4 md:mt-0 text-right hidden md:block">
            <ul className="space-y-2">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center justify-end gap-2 group">
                  <span className="text-xs font-bold tracking-widest text-slate-500 group-hover:text-primary transition-colors">
                    {feature}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="relative z-10 px-4 pb-4 md:px-8 md:pb-8 mt-6 md:mt-0">
          <div className="bg-primary rounded-2xl p-3 md:p-4 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-lg shadow-primary/20">
            <div className="flex items-center gap-3 text-center lg:text-left w-full lg:w-auto justify-center lg:justify-start">
              <div className="hidden lg:flex w-10 h-10 rounded-full bg-white/20 items-center justify-center shrink-0">
                <IoMail className="text-white w-5 h-5" />
              </div>
              <h2 className="text-white font-bold text-sm md:text-lg tracking-tight whitespace-nowrap">
                SUBSCRIBE FOR UPDATES
              </h2>
            </div>
            
            <form className="w-full lg:max-w-md flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full h-10 md:h-11 px-4 bg-white/10 border border-white/20 rounded-xl text-sm font-medium text-white placeholder:text-white/70 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                required
              />
              <button type="submit" className="h-10 md:h-11 px-6 bg-white hover:bg-slate-50 text-primary font-extrabold rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer text-sm shrink-0">
                <span>Join</span>
                <IoArrowForward className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}