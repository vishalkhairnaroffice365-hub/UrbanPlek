'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoSchool, IoMenu, IoClose } from 'react-icons/io5';
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import logo from '../../assets/logo.png';

const NAV_LINKS = [
  { label: 'Commercial', href: '/listings#commercial' },
  { label: 'Lands/Plots', href: '/listings#lands' },
  { label: 'Homes', href: '/listings#homes' },
  { label: 'Start Listing', href: '/list-your-property', badge: 'Free' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 z-[100] w-full bg-white/70 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center z-[101]">
            <Image src={logo} alt="UrbanPlek" className="h-10 w-auto object-contain" priority />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map(({ label, href, badge }) => (
              <Link key={label} href={href} className={`text-sm font-bold transition-colors flex items-center gap-2 ${badge ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
                {label}
                {badge && <span className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-black animate-pulse">{badge}</span>}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Auth & Portal */}
          <div className="flex items-center gap-3.5">
            <div className="hidden sm:flex items-center gap-5 mr-1">
              {isLoaded && (
                <>
                  {!isSignedIn ? (
                    <>
                      <SignInButton mode="modal">
                        <button className="text-sm font-bold text-gray-700 hover:text-primary transition-all">Login</button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="px-5 py-2 text-sm font-bold bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-all">Sign Up</button>
                      </SignUpButton>
                    </>
                  ) : (
                    <UserButton afterSignOutUrl="/" />
                  )}
                </>
              )}
            </div>
            
            <Link href="/students-portal" className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all">
              <IoSchool className="text-lg" />
              <span>Students Portal</span>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-3xl text-gray-800 p-1 outline-none" onClick={toggleMenu}>
              {isOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Menu */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-50 bg-white ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map(({ label, href }) => (
              <Link 
                key={label} 
                href={href} 
                className="text-base font-bold text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link 
              href="/students-portal" 
              className="flex items-center gap-2 text-primary font-bold py-2"
              onClick={() => setIsOpen(false)}
            >
              <IoSchool /> Students Portal
            </Link>
          </nav>

          <hr className="border-gray-100" />

          {/* Mobile Auth Buttons */}
          <div className="pt-2">
            {isLoaded && (
              <div className="flex flex-col gap-3">
                {!isSignedIn ? (
                  <>
                    <SignInButton mode="modal">
                      <button className="w-full py-3 border border-gray-200 rounded-xl text-sm font-bold">Login</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold">Sign Up</button>
                    </SignUpButton>
                  </>
                ) : (
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <UserButton /> 
                    <span className="font-bold text-sm text-gray-700">My Account</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}