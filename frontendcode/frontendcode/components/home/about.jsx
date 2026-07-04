import Image from 'next/image';
import Link from 'next/link';
import { IoCheckmarkCircle, IoStar, IoArrowForward } from 'react-icons/io5';
import SECTION_HERO from "../../assets/list-your-property/sectionhero.png";
import INTERIOR_IMAGE from "../../assets/list-your-property/interior.png";

const IMAGES = {
  main: {
    src: SECTION_HERO.src,
    alt: "Modern Nashik Estate Architecture"
  },
  secondary: {
    src: INTERIOR_IMAGE.src,
    alt: "Luxury Interior Design"
  }
};

const AVATARS = [
  // "https://lh3.googleusercontent.com/aida-public/AB6AXuC295qZwaemTlraelwLEGh2C-F0DcfKmkBXNA20mO16fwfKE0RmxccQheGuHNWKJjA1phuXB5gWNxIHelLe_pYBpIajuxxVK3dInpYjmv0fH5S_3V5F5ji7-MjEox8Qu_Et41px1Dehdu2_JnQKl3f3NXTCmG7eWDGz9wjnOeZzYGo5u8C63ntB5eH_jj9prBK63v3XQHfAO30JXVEdtPXN82EzaMDmJwG5PSWkYP-ocHmt3Z_fJ7ByNM_X8dR6KftnGHILaJshMkVR",
  // "https://lh3.googleusercontent.com/aida-public/AB6AXuBdH0UEYzWsfkTjtkSHTP1BoIyo6BPrhpTQji60AVzsVz0UAU05cfoX0lsCDoC7_PoXl2ImbZ0WMoV8p6AhoDT46Q_ZS1iUlZnhFGNr9rwJgue2ChFPcnHQJGrn4smGsYLrz9X4jUtUbeW5swF2TEso5SZrnjlWGDtoEymvKH-arfMMOFMWchJrN6oribT-arIgtXOqTySd3a2wAj1uEibjA2Ml0-3oBQvl_ks8_3h7An3WAvFtXMXodN5iKy4iQBOMEnLlgWLWNC4l",
  // "https://lh3.googleusercontent.com/aida-public/AB6AXuBpNpKqFfCG8oDZYYhAUqVGzFSo-ZLIuGCMZMLeaei489rz87yx8fM63vujhE3a8FVaJIBvA4YYCd1lVkgCQ-hQIIdmzE2Z1BJS1kJgYyBYAS6QqjSI0otOJoc84w40JgYpJ1-ZPhwV6RFGCpNQ7zx2q0VVjilWM9YhcsaQG2MOJoF_vPQPVm3ZnWdAO-sQcQ-xAiuFt6ZCadv5HZekX8B4tQdoJWWDhiIKuo5FCkOQgnb5QvBQVM15ZH1d-aFwTNxprZu6jbheL9r6"
];

const BACKGROUND_LINES = [
  "top-20 right-40 h-64 rotate-45",
  "top-40 right-60 h-96 rotate-45",
  "bottom-20 left-40 h-64 -rotate-45"
];

export default function About() {
  return (
    <div id="about" className="w-full flex flex-col luxury-light-gradient overflow-hidden py-10 lg:py-12 px-6 lg:px-24 relative">
      {/* Background Elements */}
      <div className="abstract-glow-light -top-48 -left-48" />
      <div className="abstract-glow-light -bottom-48 -right-48" />
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
        {BACKGROUND_LINES.map((className, i) => (
           <div key={i} className={`absolute w-px bg-gradient-to-b from-transparent via-[#2b6cee] to-transparent transform ${className}`} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Images */}
        <div className="lg:col-span-6 relative h-[420px] lg:h-[560px] w-full">
          {/* Main Image */}
          <div className="absolute left-0 top-0 w-4/5 h-[80%] rounded-xl overflow-hidden shadow-xl border border-[var(--brand-navy)]/5">
            <Image
              alt={IMAGES.main.alt}
              src={IMAGES.main.src}
              fill
              className="object-cover scale-105 transition-transform duration-700 hover:scale-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Secondary Image */}
          <div className="absolute right-0 bottom-4 w-1/2 h-1/2 rounded-xl overflow-hidden shadow-xl border border-[var(--brand-navy)]/5 z-20">
            <Image
              alt={IMAGES.secondary.alt}
              src={IMAGES.secondary.src}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

          {/* Verified Badge */}
          {/* <div className="absolute -right-4 top-1/4 glass-card-light p-5 rounded-2xl z-30 flex flex-col items-center justify-center min-w-[160px] shadow-lg">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl font-extrabold text-[var(--brand-navy)] tracking-tighter">
                500+
              </span>
              <IoCheckmarkCircle className="text-[#2b6cee] w-6 h-6" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--brand-navy)]/60">
              Verified Listings
            </p>
            <div className="mt-4 flex gap-1 w-full">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i === 0 ? 'bg-[#2b6cee]' : 'bg-[var(--brand-navy)]/10'}`} />
              ))}
            </div>
          </div> */}

          {/* Trusted Badge */}
          {/* <div className="absolute left-8 -bottom-6 glass-card-light p-4 rounded-2xl z-30 shadow-lg flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {AVATARS.map((src, i) => (
                  <div key={i} className="relative h-10 w-10 rounded-full ring-2 ring-white overflow-hidden">
                    <Image
                      src={src}
                      alt={`Trusted User ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                ))}
                <div className="h-10 w-10 rounded-full bg-[#2b6cee]/10 flex items-center justify-center text-[10px] font-bold ring-2 ring-white text-[#2b6cee]">
                  5K+
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[var(--brand-navy)]">
                  5,000+ Trusted
                </p>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <IoStar key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-6 flex flex-col space-y-8 lg:pl-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#2b6cee]" />
              <span className="text-[#2b6cee] font-extrabold tracking-[0.3em] text-[10px] uppercase">
                The Urban Narrative
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-medium leading-[0.9] text-[var(--brand-navy)] tracking-tight">
              ABOUT <br />
              <span className="font-serif italic font-bold">US.</span>
            </h2>
          </div>

          <div className="space-y-6 text-[var(--brand-navy)]/70 text-base leading-relaxed max-w-lg font-light">
            <p>
              Urbanplek is a premium, digital-first real estate ecosystem designed specifically for the
              Nashik market. Operating as both a discovery platform for property seekers and a
              comprehensive sales engine for property owners.
            </p>
            <p className="border-l-2 border-[#2b6cee] pl-6 italic text-[var(--brand-navy)]/80">
              We bridge the gap between digital listings and physical deal closures, prioritizing
              verified listings, hyper-local search mechanics, and an end-to-end service model that
              removes the friction from buying, selling, and renting.
            </p>
          </div>
{/* 
          <div className="pt-4">
            <Link href="/portfolio" className="relative group inline-flex items-center gap-6 bg-[#2b6cee] text-white font-bold py-4 px-9 rounded-full overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#2b6cee]/20 cursor-pointer">
              <span className="relative z-10 tracking-[0.15em] text-xs uppercase">
                Explore the Portfolio
              </span>
              <IoArrowForward className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-1.5" />
              <div className="absolute inset-0 bg-[var(--brand-navy)] translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
