// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-[#0A0A0A] text-white min-h-screen flex flex-col"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        <Navbar />
        
        {/* Children wo content hai jo har page ka alag hoga (Hero, Tools, etc.) */}
        <div className="grow flex flex-col">
          {children}
        </div>

        <footer className="p-10 text-center border-t border-white/5">
          <p className="text-[9px] uppercase tracking-[0.8em] text-gray-700 italic">
            Wardon Protocol // Built for Infrastructure Integrity // 2026
          </p>
        </footer>
      </body>
    </html>
  );
}

// (path : my-app- src-app- (tools)-http-headers-page.tsx ) 