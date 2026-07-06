'use client';

import React from 'react';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';
import heroBG from "../../assets/list-your-property/hero.png";
import Header from '../home/header';

import commercialIMG from "../../assets/list-your-property/commercial.jpg"
import landIMG from "../../assets/list-your-property/lands.jpg"
import residentialIMG from "../../assets/list-your-property/residential.jpg"
import studentIMG from "../../assets/list-your-property/students.jpg"

const LINKS = {
  'Residential': '/list-your-property/residential-property',
  'Student': '/list-your-property/student-spaces',
  'Land': '/list-your-property/land-plots',
  'Commercial': '/list-your-property/commercial-spaces',
}

function PropertyCard({
  imageSrc,
  title,
  subtitle,
  description,
  linkText,
  delay = '0s',
}){
  return (
    <article 
      className="flex flex-col group  animate-fade-in bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-6"
      style={{ animationDelay: delay }}
    >
      <div className="relative rounded-2xl overflow-hidden card-shadow mb-5 card-hover-effect w-full aspect-video">
        <img 
          src={imageSrc} 
          alt={`${title} ${subtitle}`} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="space-y-3 px-1 flex flex-col">
        <h2 className="text-2xl md:text-3xl font-extrabold font-serif italic text-slate-900 leading-tight">
          {title}<br />
          <span className="text-primary font-serif italic font-bold">{subtitle}</span>
        </h2>
        <p className="text-slate-500 text-base leading-relaxed">
          {description}
        </p>
        <div className="pt-2">
          <a 
            href={LINKS[title]}
            className="inline-flex items-center text-primary font-bold uppercase tracking-wider text-xs btn-underline"
          >
            {linkText}
            {/* @ts-ignore */}
            <BsArrowRight className="ml-2 w-4 h-4 stroke-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default function Hero(){
  return (
    <div className="min-h-screen bg-background-light text-[#0f172a]">
      {/* Header */}
      <Header />

      <section className="relative pt-12">
        {/* Background Map */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-multiply pointer-events-none">
          <Image
            src={heroBG}
            alt="Map background of Nashik city"
            fill
            priority
            className="object-cover grayscale-map"
            quality={90}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-12 md:pt-16">
        {/* Page Header */}
        <section className="text-center mb-16 animate-fade-in max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">Join Our Network</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight mb-4 font-display">
            List Your Property on <span className="text-primary">UrbanPlek</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of property owners reaching millions of renters across the country.
          </p>
        </section>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12">
          <PropertyCard
            imageSrc={residentialIMG.src}
            title="Residential"
            subtitle="Property."
            description="List your apartments, houses, or villas to reach professional tenants and families looking for their next long-term home. Manage listings with ease."
            linkText="List Residential"
            delay="0.2s"
          />
          <PropertyCard
            imageSrc={studentIMG.src}
            title="Student"
            subtitle="Spaces."
            description="Dedicated housing near major universities. Perfect for HMOs, purpose-built student accommodation (PBSA), or private ensuite rooms."
            linkText="List Student Housing"
            delay="0.4s"
          />
          <PropertyCard
            imageSrc={landIMG.src}
            title="Land"
            subtitle="Plots."
            description="List your plots and lands to reach buyers looking for investment opportunities or building their dream home."
            linkText="List Lands"
            delay="0.6s"
          />
          <PropertyCard
            imageSrc={commercialIMG.src}
            title="Commercial"
            subtitle="Spaces."
            description="List shops, offices, and commercial spaces for rent or sale. Connect with businesses and entrepreneurs."
            linkText="List Commercial"
            delay="0.8s"
          />
        </div>
        </div>
      </section>
    </div>
  );
};