'use client';

import React, { useState } from 'react';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa'; // Added FaTimes for the close icon
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';
// import LOGO from "@/assets/studentslogo.png";
import LOGO from "../../assets/studentslogo.png";

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Hostels', href: '#hostels' },
  { label: 'PGs', href: '#pgs' },
  { label: 'Flats/Homes', href: '#flats' },
];

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false); // State to track toggle

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-white/20 bg-white/60 backdrop-blur-xl" aria-label="Main Navigation">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src={LOGO.src}
            alt="UrbanPlek Students Logo" 
            width={150}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="text-md font-bold text-slate-600 transition-colors hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isLoaded && (
            <div className="hidden sm:flex items-center gap-3">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Login</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-5 py-2.5 text-sm font-bold bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-all">Sign Up</button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
          )}
          
          {/* Mobile Toggle Button */}
          <button 
            onClick={toggleMenu}
            aria-expanded={isOpen}
            className="lg:hidden p-2 text-slate-600 focus:outline-none transition-transform active:scale-90"
          >
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Dropdown */}
      <div 
        className={`absolute left-0 top-full w-full bg-white/95 backdrop-blur-2xl border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-6 gap-4" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              onClick={() => setIsOpen(false)} // Close menu on click
              className="text-lg font-bold text-slate-700 hover:text-blue-600 transition-colors border-b border-slate-50 pb-2"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth Actions */}
          <div className="pt-4 flex flex-col gap-3">
            {isLoaded && !isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="w-full py-3 border border-slate-200 rounded-xl font-bold text-slate-700">Login</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200">Sign Up</button>
                </SignUpButton>
              </>
            ) : (
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                <UserButton />
                <span className="font-bold text-slate-700">Profile Settings</span>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}