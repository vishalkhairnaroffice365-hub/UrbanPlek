'use client';

import { useState } from 'react';

const SLOGANS = [
    "Your dream home in the Wine Capital.",
    "Nashik living, elevated.",
    "Premium spaces, prime Nashik locations.",
    "Find your perfect plot in Nashik.",
    "Unlocking Nashik's finest real estate.",
    "Where Nashik meets modern living.",
    "Your key to the best properties in Nashik.",
    "Invest in Nashik, invest in the future.",
    "Discover premium estates in Nashik.",
    "Experience luxury living in Nashik."
];

export default function LoadingScreen() {
    // Pass a function to useState so it calculates the random slogan immediately on the first render
    const [slogan] = useState(() => SLOGANS[Math.floor(Math.random() * SLOGANS.length)]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-5">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin">
                <span className="sr-only">Loading...</span>
            </div>
            <p suppressHydrationWarning className="text-sm font-semibold text-slate-500 animate-pulse text-center px-4">
                {slogan}
            </p>
        </div>
    )
}