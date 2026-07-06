import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import contactMap from '../../assets/contact.png';
import { IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5';
import { CONTACT_DETAILS, SOCIAL_MEDIA } from '../../constants/constants';

const SOCIAL_LINKS = [
  { id: 'Instagram', icon: IoLogoInstagram, href: SOCIAL_MEDIA.instagram },
  { id: 'LinkedIn', icon: IoLogoLinkedin, href: SOCIAL_MEDIA.linkedin },
  // { id: 'Twitter', icon: IoLogoTwitter, href: SOCIAL_MEDIA.twitter },
];

const CONTACT_INFO = [
  {
    id: 'general',
    label: 'General Inquiries',
    value: CONTACT_DETAILS.emails.general,
    href: `mailto:${CONTACT_DETAILS.emails.general}`,
    detail: CONTACT_DETAILS.phones.general,
    delay: '300ms',
  },
  {
    id: 'collab',
    label: 'Collaborations',
    value: CONTACT_DETAILS.emails.partners,
    href: `mailto:${CONTACT_DETAILS.emails.partners}`,
    detail: CONTACT_DETAILS.phones.partners,
    delay: '500ms',
  },
];

export default function ContactSection() {
  return (
    <section id="contactus" className="py-16 bg-slate-50 font-['Poppins'] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0ms' }}
            >
              Contact us
            </h1>
            <p 
              className="text-sm md:text-base text-slate-500 max-w-sm leading-relaxed mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Get in touch with us for any enquiries, property visits, and student housing questions in Nashik.
            </p>
            
            <div 
              className="flex gap-4 items-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              {SOCIAL_LINKS.map(({ id, icon: Icon, href }) => (
                <Link 
                  key={id} 
                  href={href} 
                  aria-label={id} 
                  className="text-primary hover:opacity-80 transition-opacity"
                >
                  <Icon className="w-7 h-7" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
              {CONTACT_INFO.map((item) => (
                <div key={item.id} className="opacity-0 animate-fade-in-up" style={{ animationDelay: item.delay }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">{item.label}</p>
                  <Link href={item.href} className="block text-base font-medium hover:opacity-70 transition-opacity mb-0.5">
                    {item.value}
                  </Link>
                  <p className="text-sm text-slate-500">{item.detail}</p>
                </div>
              ))}

              {/* Office Address */}
              <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">Office Address</p>
                <p className="text-base font-medium leading-snug">
                  {CONTACT_DETAILS.address.line1}<br/>
                  {CONTACT_DETAILS.address.line2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 mt-8">
        <Link 
          href={CONTACT_DETAILS.address.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full h-56 md:h-72 overflow-hidden shadow-md border border-slate-100 group"
        >
          <Image 
            src={contactMap}
            alt="UrbanPlek Office Location Map in Nashik"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1152px) 100vw, 1152px"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
        </Link>
      </div>
    </section>
  );
}
