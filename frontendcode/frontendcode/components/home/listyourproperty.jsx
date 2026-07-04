import Image from 'next/image';
import Link from 'next/link';
import { IoCheckmarkCircle, IoShieldCheckmark, IoMegaphone, IoTime, IoPerson, IoArrowForward } from 'react-icons/io5';
import HERO_IMAGE_URL from "../../assets/list-your-property/sectionhero.png";

const FEATURES = [
  {
    title: 'Verified Leads',
    description: 'Connect with genuine seekers.',
    icon: IoShieldCheckmark,
  },
  {
    title: 'Max Visibility',
    description: 'Showcase to thousands daily.',
    icon: IoMegaphone,
  },
  {
    title: 'Quick Closure',
    description: 'Close deals faster than ever.',
    icon: IoTime,
  },
  {
    title: 'Dedicated Support',
    description: 'Expert assistance at every step.',
    icon: IoPerson,
  },
];

function Hero() {
  return (
    <section className="w-full max-w-[1280px] px-6 py-6 @container">
      <div className="rounded-xl overflow-hidden shadow-2xl luxury-light-gradient">
        <div className="flex flex-col lg:flex-row min-h-[420px]">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full">
            <Image
              src={HERO_IMAGE_URL.src}
              alt="Modern home exterior representing property listing"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden"></div>
            {/* <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-lg flex items-center gap-3 shadow-lg z-10">
              <div className="bg-primary/20 p-2 rounded-full">
                <IoCheckmarkCircle className="text-primary text-[20px]" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Trusted Platform
                </p>
                <p className="text-sm font-black text-[#111318]">
                  1000+ Owners Registered
                </p>
              </div>
            </div> */}
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold w-fit uppercase tracking-wider">
                For Property Owners
              </div>
              <h1 className="text-[#111318] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                Sell or Rent Your Property <span className="text-primary">Faster & Better</span>
              </h1>
              <p className="text-[#616f89] text-base font-normal leading-relaxed max-w-[560px]">
                List your property on Nashik's most trusted real estate platform. Connect with genuine buyers and tenants instantly. No hidden charges.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {FEATURES.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-primary flex-shrink-0">
                      <feature.icon className="text-[20px]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[#111318] text-base font-bold">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#616f89]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/list-your-property" className="flex min-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:shadow-2xl hover:shadow-primary/30 transition-all">
                  <span className="truncate">List Your Property</span>
                  <IoArrowForward className="ml-2 text-[20px]" />
                </Link>
                {/* <Link href="#" className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 border border-gray-200 bg-transparent text-[#111318] text-base font-bold leading-normal hover:bg-gray-50 transition-all">
                  <span className="truncate">How it Works</span>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ListYourProperty() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex-1 flex flex-col items-center">
          <Hero />
        </div>
      </div>
    </div>
  );
}