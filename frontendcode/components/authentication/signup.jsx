'use client'

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import heroBG from "../../assets/home/heroBG.jpg";
import Header from '../home/header';

const HOTSPOTS = [
  { top: '30%', left: '25%' },
  { top: '55%', left: '80%' },
  { top: '65%', left: '35%' },
  { top: '20%', left: '75%' },
  { top: '55%', left: '15%' },
];

export default function Signup() {
  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-50 font-sans text-slate-900 py-24 items-center justify-center relative">
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

      {/* Hotspots */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {HOTSPOTS.map((pos, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 flex items-center justify-center text-blue-600/60 transition-all duration-500 scale-90"
            style={pos}
          >
            <div className="absolute inset-0 rounded-full bg-blue-600/20 animate-ping"></div>
            <IoLocationSharp className="text-xl" />
          </div>
        ))}
      </div>

      {/* Header */}
      <Header />

      {/* Signup Card */}
      <div className="w-full max-w-[520px] p-4 relative z-10 flex items-center justify-center">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>

        <SignUp routing="hash" />
      </div>
    </div>
  );
}
