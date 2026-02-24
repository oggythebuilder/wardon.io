"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBanner } from '@/components/ui/StatusBanner';
import { SkeletonTable } from '@/components/ui/Skeleton';

interface HeaderResult {
  success: boolean;
  domain: string;
  score: number;
  grade: string;
  isSslError?: boolean;
  error?: string;
  security: {
    present: Array<{ name: string; value: string; importance: string; desc: string }>;
    missing: Array<{ name: string; importance: string; desc: string }>;
    warnings: string[];
  };
  serverInfo: {
    server: string | null;
    technology: string[];
  };
}

export default function AnalysisPage() {
  const params = useParams();
  const domainParam = params.domain as string;
  const [data, setData] = useState<HeaderResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Observing & Sanitizing: URL se https:// aur trailing slashes hatana
    const cleanDomain = decodeURIComponent(domainParam)
      .replace(/^https?:\/\//, '') // Remove http:// or https://
      .replace(/\/+$/, '');       // Remove trailing slashes

    async function fetchHeaders() {
      try {
        setLoading(true);
        const res = await fetch(`/api/http-headers?domain=${cleanDomain}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Analysis Failed:", err);
      } finally {
        setLoading(false);
      }
    }

    if (cleanDomain) {
      fetchHeaders();
    }
  }, [domainParam]);

  // Loading State
  if (loading) return <SkeletonTable rows={6} />;

  // Error State (If domain is unreachable or SSL is cooked)
  if (!data || data.success === false) {
    return (
      <div className="p-10 md:p-20 max-w-7xl mx-auto min-h-screen italic">
        <h1 className="text-4xl font-bold tracking-tighter uppercase mb-6">{decodeURIComponent(domainParam)}</h1>
        <StatusBanner score={0} grade="F" sslError={data?.isSslError} />
        <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-lg">
          <p className="text-red-500 font-mono text-sm uppercase tracking-widest">
            // ERROR: {data?.error || "Target system refused connection"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-20 max-w-7xl mx-auto min-h-screen italic">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none text-white">
            {data.domain}
          </h1>
          <p className="text-green-500 text-xs mt-4 tracking-[0.3em] font-mono">
            // STATUS: RECON_COMPLETED_SUCCESSFULLY
          </p>
        </div>
        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-right">
          Analyzed_by_Wardon_Intelligence_v1.0
        </div>
      </div>

      {/* Analyzing Phase: Status Banner */}
      <StatusBanner score={data.score} grade={data.grade} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Understanding Phase: Present Headers */}
        <div className="border border-white/5 bg-white/[0.01] p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-green-500 mb-8 border-b border-green-500/20 pb-2">
            // SECURE_CONFIGURATIONS
          </h3>
          <div className="space-y-6">
            {data.security.present.length > 0 ? (
              data.security.present.map((h) => (
                <div key={h.name} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-white uppercase tracking-tight">{h.name}</span>
                    <span className="text-[9px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded uppercase font-mono">Verified</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono break-all opacity-80 group-hover:opacity-100 transition-opacity">
                    {h.value}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-xs italic">No security headers detected.</p>
            )}
          </div>
        </div>

        {/* Risk Analysis: Missing Headers */}
        <div className="border border-white/5 bg-white/[0.01] p-8 rounded-xl backdrop-blur-sm">
          <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-red-500 mb-8 border-b border-red-500/20 pb-2">
            // EXPLOITATION_RISKS
          </h3>
          <div className="space-y-6">
            {data.security.missing.map((h) => (
              <div key={h.name} className="relative pl-4 border-l-2 border-red-500/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-red-400 uppercase tracking-tight">{h.name}</span>
                  <span className="text-[9px] text-red-500/50 font-mono uppercase italic">{h.importance}</span>
                </div>
                <p className="text-[11px] text-gray-500 italic leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Server & Tech Leakage */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        <div className="p-6 border border-white/5 bg-white/[0.02] rounded-lg">
          <span className="text-[10px] text-gray-500 block mb-2 uppercase tracking-widest">Main_Server</span>
          <span className="text-white text-sm">{data.serverInfo.server || "Hidden (Secure)"}</span>
        </div>
        <div className="p-6 border border-white/5 bg-white/[0.02] rounded-lg md:col-span-2">
          <span className="text-[10px] text-gray-500 block mb-2 uppercase tracking-widest">Tech_Stack_Leakage</span>
          <div className="flex flex-wrap gap-2">
            {data.serverInfo.technology.length > 0 ? (
              data.serverInfo.technology.map((tech, i) => (
                <span key={i} className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-gray-600 text-[10px] italic">No backend technologies leaked via headers.</span>
            )}
          </div>
        </div>
      </div>

      {/* Warning Logs Footer */}
      {data.security.warnings.length > 0 && (
        <div className="mt-8 p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
          <h4 className="text-[10px] font-bold text-yellow-600 uppercase tracking-[0.3em] mb-4">// INTEL_WARNINGS</h4>
          <div className="space-y-2 font-mono text-[11px] text-gray-400">
            {data.security.warnings.map((w, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-yellow-500/50 font-bold">[{i+1}]</span>
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}