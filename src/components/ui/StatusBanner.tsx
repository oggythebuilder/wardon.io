"use client";

import React from 'react';

interface StatusBannerProps {
  score?: number;
  grade?: string;
  sslError?: boolean;
}

export function StatusBanner({ score = 0, grade = '', sslError }: StatusBannerProps) {
  // SSL Error State
  if (sslError) {
    return (
      <div className="border-2 border-red-500/50 bg-red-500/10 p-6 rounded-xl mb-8 animate-pulse">
        <h2 className="text-2xl font-bold text-red-500 uppercase tracking-tighter italic">
          ⚠️ CRITICAL: SSL IS COOKED 🍳
        </h2>
        <p className="text-sm text-red-400/70 mt-1 italic font-mono">
          // Certificate verification failed. Major red flag for domain integrity.
        </p>
      </div>
    );
  }

  // Safe check for grade using Optional Chaining and fallback
  const currentGrade = grade || '';
  const isSecure = currentGrade.startsWith('A') || currentGrade.startsWith('B');
  
  const themeColor = isSecure ? 'text-green-500' : 'text-red-500';
  const borderColor = isSecure ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5';

  return (
    <div className={`border-2 ${borderColor} p-8 rounded-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-6`}>
      <div className="text-center md:text-left">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-2 font-mono">
          // SECURITY_GRADE_ANALYSIS
        </h2>
        <div className={`text-8xl font-black tracking-tighter ${themeColor}`}>
          {currentGrade || 'N/A'}
        </div>
      </div>

      <div className="text-center md:text-right">
        <div className="text-5xl font-light italic text-white">
          {score}<span className="text-xl opacity-30">/100</span>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-mono">
          Protocol_Integrity_Score
        </p>
        <div className={`mt-2 h-1 w-32 ml-auto rounded-full bg-gray-800 overflow-hidden`}>
          <div 
            className={`h-full ${isSecure ? 'bg-green-500' : 'bg-red-500'} transition-all duration-1000`} 
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}