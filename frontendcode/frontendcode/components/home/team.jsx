import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5';

const SOCIAL_ICONS = {
  twitter: IoLogoTwitter,
  instagram: IoLogoInstagram,
  linkedin: IoLogoLinkedin,
};

const TEAM_MEMBERS = [
  {
    name: "Sam Monic",
    role: "Founder",
    description: "I've established UrbanPlek in 2022 and it was one of the best ideas I've had in my life for the Nashik real estate market.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgckNeSuWEWivzwIRVBrwIUTM_zNZqIY3A97RA-GO--qEEymy4vn11KfftLUeFTda9bTbGVkHyQM6MUxoBiqeHvtzUoWKbhylxc0rNXqn_gzW2RzAEIOeZFpY_KyghWUdWw39qrovWtqoo5PP4z2wVOmd9q-hrijOMn6h0QIo4uOUQG1nQphed-bmMvTYqhiF8J1Vhkzk1SjsHzfjiwE_JhgAiCcRWmMtIVONqS6IfZYE7otocnxiNJoywsS4Q8BOsF4zrZZT7yFUL",
    socials: [
      { id: 'twitter', href: '#' },
      { id: 'instagram', href: '#' },
      { id: 'linkedin', href: '#' },
    ],
  },
  {
    name: "Rams Lesli",
    role: "Sales Executive",
    description: "I'm the chief executive of sales and closed valuable deals that helped UrbanPlek scale rapidly in the premium segment.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFVwtT71J45EMtXS86CTSvcjsW5WX1rqWXdoV1yIafkwY84_MDetfOjkCda4RmSqaDk8xIGIbE6o1ep3ZJPswuThU3YoNvLRdM_46eHO94QEjZU005sRq48DQh6hswXhvoIcqq7E6Z5m2IG3m9cKWdhlxPQSQ9VJuqIvSbWMYRWEy59wMnlmTnw-lh4i7E0f7xGaG6eoW5DNyjT81VzYqwcXfvLcNl6NbQEsiLEOjLvVEqtw_dTt5KkmUFvkuaU7aKsUygWMqUvusc",
    socials: [
      { id: 'twitter', href: '#' },
      { id: 'instagram', href: '#' },
      { id: 'linkedin', href: '#' },
    ],
  },
  {
    name: "Harshita Patel",
    role: "Co-Founder & CEO",
    description: "I am the co-founder of UrbanPlek and we've pushed our limits so far to make it the most trusted real estate platform in Nashik.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBdsfQR879D1_XwtL1w07rRRAcuCDR1KTjs0yTReCcLg6cIOqlFALddZ9IE5S1iHyTn7EM5DuAjASWxQzB351eiTWIIEO5xoIrA0PrMC6hnEKpJ_HAi9MlWKyzJkixWOOSKz5O5_6T0i7B1W_dPoVpHDF6pjUFBDvy6cCM9d9RAk6R_lfvvVakwSkGWaAGsQbuamLv42WDNudK3ViPNlzxrRjXL_iXIdHqpokKRDK5nI1nIyby2TQoGIjv3BIwWJdQ4hCncede3zsB",
    socials: [
      { id: 'twitter', href: '#' },
      { id: 'instagram', href: '#' },
      { id: 'linkedin', href: '#' },
    ],
  },
  {
    name: "Alexa Kimberly",
    role: "Lead Designer",
    description: "I've been lead designer for UrbanPlek since the beginning of it and enjoyed every bit of creating aesthetic living spaces.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsa5Pibha64nhYscMUi0EApoK95rUfs5IX-77KdZcMOf0sD5GIivRNfPFQvJnd8K9vjRBYWCC72ppRK2GjD9RFknbfFBMsCfZ_H6FicfV55h10HovM2XfWzkPVYt11EjRyuFh5AYd127n_fv9AIeVTPFHhaFVn8XbQF9ZxVY-UbhwGAwmEqsO3DgFUnR2imeCrXnhHIFbqnpvML95d72zFDp_p0IuVEqhUhJeNmpFhuIPkx50Au1AesCF82a7lPK_c0pDkLpBD2Vbp",
    socials: [
      { id: 'twitter', href: '#' },
      { id: 'instagram', href: '#' },
      { id: 'linkedin', href: '#' },
    ],
  },
];

const TeamMember = ({ name, role, description, imageUrl, socials }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative shrink-0">
        <div className="relative w-32 h-32 rounded-full border-[3px] border-primary p-1 overflow-hidden shadow-sm">
          <Image
            alt={`${name} - ${role} at UrbanPlek`}
            src={imageUrl}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 128px, 128px"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3 text-center md:text-left pt-1">
        <div>
          <h3 className="text-xl font-bold text-brand-navy">{name}</h3>
          <p className="text-primary font-semibold tracking-wider uppercase text-xs mt-1">{role}</p>
        </div>
        <hr className="border-slate-200 w-full" />
        <p className="text-slate-600 leading-relaxed max-w-sm text-sm">
          {description}
        </p>
        <div className="flex gap-3 justify-center md:justify-start">
          {socials.map(({ id, href }) => {
            const Icon = SOCIAL_ICONS[id];
            return (
              <Link
                key={id}
                className="social-icon w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                href={href}
                aria-label={`Follow ${name} on ${id}`}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default function MeetTheTeam() {
  return (
    <section className="py-8  font-['Poppins'] mb-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy">
            Meet the visionaries
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            The passionate minds behind UrbanPlek Nashik.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
