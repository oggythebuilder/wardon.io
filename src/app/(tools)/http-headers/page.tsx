"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ToolPage() {
  const [target, setTarget] = useState('');
  const router = useRouter();

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (target) router.push(`/http-headers/${encodeURIComponent(target)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 italic">
      <h1 className="text-4xl mb-8 tracking-tighter uppercase font-bold">HTTP_HEADER_ANALYSIS</h1>
      <form onSubmit={handleScan} className="w-full max-w-xl">
        <input 
          type="text" 
          placeholder="target.com" 
          className="w-full bg-transparent border-b border-white/20 p-4 text-2xl outline-none focus:border-green-500 transition-all"
          onChange={(e) => setTarget(e.target.value)}
        />
        <button className="mt-8 border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-[0.3em]">
          Initialize_Recon
        </button>
      </form>
    </div>
  );
}