import React from 'react';

const Hero = () => {
  return (
    <section className="grow flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto py-20">
      <div className="mb-10 text-[11px] uppercase tracking-[0.6em] text-green-500 opacity-80 border border-green-500/20 px-4 py-2 rounded-full">
        Establishing Connection // Active Reconnaissance
      </div>

      <h1 className="text-7xl md:text-9xl font-normal leading-[0.85] tracking-tighter mb-10 italic">
        Perimeter <br /> 
        <span className="text-gray-500 not-italic">Sovereignty.</span>
      </h1>

      <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mb-12 italic border-l border-white/10 pl-6">
        Wardon is a high-fidelity intelligence engine. Map the invisible infrastructure. 
        The modern watchman for your digital estate.
      </p>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center uppercase tracking-widest text-[11px]">
        <button className="bg-white text-black px-12 py-4 rounded-sm font-bold hover:bg-green-500 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]">
          Initialize Scan →
        </button>
        <button className="border-b border-gray-600 px-2 py-4 hover:border-white transition-all opacity-60 hover:opacity-100">
          Access Intelligence Archive
        </button>
      </div>
    </section>
  );
};

export default Hero;