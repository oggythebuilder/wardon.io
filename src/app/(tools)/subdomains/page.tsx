import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 px-10 text-white" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl italic mb-4 uppercase tracking-tighter">subdomains</h1>
        <p className="text-green-500 mb-10 tracking-[0.5em] text-[10px] opacity-70">// STATUS: READY_FOR_RECON</p>
        
        <div className="border border-white/10 p-12 bg-white/[0.02] backdrop-blur-md">
          <p className="text-gray-400 italic mb-6">Enter target infrastructure or domain to initialize module.</p>
          <input 
            type="text" 
            placeholder="target_domain.com"
            className="w-full bg-transparent border-b border-white/20 py-4 outline-none text-3xl focus:border-green-500 transition-all italic font-light"
          />
          <button className="mt-12 bg-white text-black px-12 py-4 font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-green-500 transition-all duration-500 shadow-xl">
            Execute Module
          </button>
        </div>
      </div>
    </div>
  );
}
