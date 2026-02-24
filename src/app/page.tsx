import React from 'react';
import Hero from '@/components/home/Hero';

export default function HomePage() {
  return (
    <main className="grow flex flex-col relative">
      {/* 1. Main Hero Section (Search & Branding) */}
      <Hero />

      {/* 2. System Intelligence Footer (Homepage specific) */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-700">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-[0.4em] text-gray-500">System_Core</span>
            <span className="text-[10px] font-mono text-green-500 italic">v2.0.6_STABLE</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-[0.4em] text-gray-500">Active_Nodes</span>
            <span className="text-[10px] font-mono text-white italic">1,024_GLOBAL</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-[0.4em] text-gray-500">Last_Recon</span>
            <span className="text-[10px] font-mono text-white italic">Just Now</span>
          </div>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-10 right-10 opacity-20 hidden md:block">
        <div className="text-[8px] font-mono text-right leading-relaxed uppercase tracking-widest italic">
          // Perimeter_Sovereignty <br />
          // Autonomous_Infrastructure <br />
          // Wardon_Protocol
        </div>
      </div>
    </main>
  );
}