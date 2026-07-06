import React from 'react';
import Link from 'next/link';
import { IoMail, IoCall, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5';
import { CONTACT_DETAILS, SOCIAL_MEDIA } from '../../constants/constants';

const CONTACT_INFO = [
  { icon: IoMail, text: CONTACT_DETAILS.emails.support, href: `mailto:${CONTACT_DETAILS.emails.support}` },
  { icon: IoCall, text: CONTACT_DETAILS.phones.tollFree, href: `tel:${CONTACT_DETAILS.phones.tollFree.replace(/-/g, '')}` },
];

const FOOTER_LINKS = [
  {
    title: 'Company',
    links: [
      // { label: 'Features', href: '#' },
      { label: 'About Us', href: '/#about' },
      { label: 'Contact', href: '/#contactus' },
      // { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '/#FAQ' },
      // { label: 'Help Center', href: '#' },
      // { label: 'Support', href: '#' },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: IoLogoInstagram, href: SOCIAL_MEDIA.instagram },
  { label: 'LinkedIn', icon: IoLogoLinkedin, href: SOCIAL_MEDIA.linkedin },
  { label: 'X (Twitter)', icon: IoLogoTwitter, href: SOCIAL_MEDIA.twitter },
];

const LEGAL_LINKS = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms & conditions', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#2b6cee] text-white py-12 px-6 md:px-12 lg:px-24 font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Heading and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8 mb-12">
          <div className="flex-grow max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Your Gateway To Nashik Real Estate — Verified and Trusted.
            </h2>
          </div>
          <div className="w-full lg:w-auto lg:min-w-[380px]">
            <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-90">
              Subscribe to Newsletter
            </p>
            <form className="relative flex items-center p-1.5 border border-white/30 rounded-full focus-within:border-white transition-all bg-white/5">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-transparent border-none focus:ring-0 text-white placeholder-white/60 px-5 py-2 w-full text-sm outline-none"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="bg-white text-[#2b6cee] px-8 py-2 rounded-full font-bold text-sm hover:bg-opacity-95 transition-all whitespace-nowrap shadow-sm cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 opacity-80">
              Contact Information
            </h3>
            <ul className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, text, href }, index) => (
                <li key={index} className="flex items-center gap-3 group cursor-pointer">
                  <Icon className="w-5 h-5 text-white shrink-0" />
                  <a href={href} className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Link Sections */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 opacity-80">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 opacity-80">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold opacity-60">
          <div className="text-center sm:text-left">
            © 2026 URBANPLEK. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8 uppercase tracking-widest">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
