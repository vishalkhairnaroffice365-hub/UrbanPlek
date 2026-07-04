import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCheckmarkCircle, IoShieldCheckmark, IoLocationSharp, IoTime, IoPeople, IoArrowForward, IoBusiness, IoBed, IoHome } from 'react-icons/io5';
import SECTION_HERO from "../../assets/studentsportal/sectionhero.png";

const BROWSE_ITEMS = [
  {
    title: 'Modern Hostels',
    subtitle: 'Shared amenities & social life',
    icon: IoBusiness,
    link: '/students-portal/#hostels'
  },
  {
    title: 'Premium PGs',
    subtitle: 'Home-style food & privacy',
    icon: IoBed,
    link: '/students-portal/#pgs'
  },
  {
    title: 'Shared Flats',
    subtitle: 'Independence & flexibility',
    icon: IoHome,
    link: '/students-portal/#flats'
  },
];

const HERO_FEATURES = [
  {
    title: 'Verified PGs',
    description: 'Hand-picked and safety checked.',
    icon: IoShieldCheckmark,
  },
  {
    title: 'Near Colleges',
    description: 'Proximity to top Nashik hubs.',
    icon: IoLocationSharp,
  },
  {
    title: 'Time-Based Search',
    description: 'Find homes by commute time.',
    icon: IoTime,
  },
  {
    title: 'Flatmate Match',
    description: 'Find the right living companion.',
    icon: IoPeople,
  },
];

function BrowseSection() {
  return (
    <section className="w-full max-w-[1280px] px-6 py-6 mb-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-[#111318]">
              Browse by Accommodation
            </h2>
            <p className="text-[#616f89]">
              Choose the living style that fits you best
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BROWSE_ITEMS.map((item, index) => (
            <Link key={index} href={item.link}>
              <div className="group flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer h-full gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <item.icon className="text-2xl" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[#111318] text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-[#616f89] text-sm">{item.subtitle}</p>
                </div>
                <IoArrowForward className="ml-auto text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="w-full max-w-[1280px] px-6 py-6 @container">
      <div className="rounded-xl overflow-hidden shadow-2xl luxury-light-gradient">
        <div className="flex flex-col lg:flex-row min-h-[420px]">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full">
            <Image
              src={SECTION_HERO.src}
              alt="Modern student hostel room in Nashik with desk and bed"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden"></div>
            {/* <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-lg flex items-center gap-3 shadow-lg z-10">
              <div className="bg-primary/20 p-2 rounded-full">
                <IoCheckmarkCircle className="text-primary text-[20px]" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Quality Assurance
                </p>
                <p className="text-sm font-black text-[#111318]">
                  500+ Verified Listings
                </p>
              </div>
            </div> */}
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold w-fit uppercase tracking-wider">
                Students Exclusive
              </div>
              <h1 className="text-[#111318] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                Tailored for Students:{' '}
                <span className="text-primary">Your Home in Nashik</span>
              </h1>
              <p className="text-[#616f89] text-base font-normal leading-relaxed max-w-[560px]">
                Find verified Hostels, PGs, and shared rooms near your college.
                Hassle-free living starts here. Discover the perfect space that
                fits your lifestyle and budget.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {HERO_FEATURES.map((feature, index) => (
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
                <Link href="/students-portal/#listings" className="flex min-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:shadow-2xl hover:shadow-primary/30 transition-all">
                  <span className="truncate">Explore Now</span>
                  <IoArrowForward className="ml-2 text-[20px]" />
                </Link>
                <Link href="/students-portal" className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 border border-gray-200 bg-transparent text-[#111318] text-base font-bold leading-normal hover:bg-gray-50 transition-all">
                  <span className="truncate">Learn More</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StudentsPortal() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex-1 flex flex-col items-center">
          <Hero />
          <BrowseSection />
        </div>
      </div>
    </div>
  );
}
