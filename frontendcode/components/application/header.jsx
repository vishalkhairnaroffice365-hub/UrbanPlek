import React from 'react';
import Image from 'next/image';

export default function Header({ 
  bgImage, 
  bgAlt = "Background", 
  badge, 
  title, 
  description, 
  children, 
  footer 
}) {
  return (
    /* Changed min-h: 
       Mobile: h-auto (collapses to content size) 
       Desktop: min-h-[calc(100vh-80px)] to match your previous 20rem (h-20) nav height
    */
    <div className="relative flex min-h-[60vh] md:min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-6 py-12 md:py-20">
      
      {/* Background Map - Using inset-0 to ensure it covers the collapsed area */}
      <div className="absolute inset-0 -z-10 opacity-20 mix-blend-multiply">
        {bgImage && (
          <Image
            src={bgImage}
            alt={bgAlt}
            fill
            priority
            className="object-cover grayscale"
            quality={90}
          />
        )}
      </div>

      <div className="z-10 w-full max-w-4xl text-center">
        {/* Badge - Scaled down for mobile */}
        {badge && (
          <div className="mb-4 md:mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
            <span className="font-display text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-blue-600">
              {badge}
            </span>
          </div>
        )}

        {/* Headline - Fluid typography */}
        {title && (
          <h1 className="font-display mb-4 text-3xl font-extrabold leading-[1.2] md:leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl px-2">
            {title}
          </h1>
        )}

        {/* Subheadline - Better readability on small screens */}
        {description && (
          <p className="mx-auto mb-8 max-w-2xl text-sm md:text-lg text-slate-500 leading-relaxed">
            {description}
          </p>
        )}

        {/* Search Bar / Children */}
        <div className="w-full max-w-2xl mx-auto">
          {children}
        </div>
      </div>

      {/* Features Grid / Footer */}
      {footer && (
        <div className="mt-12 w-full max-w-5xl">
          {footer}
        </div>
      )}
    </div>
  );
}