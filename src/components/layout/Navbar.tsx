"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Tool data with sub-topics for the popup
const toolCategories = [
  { id: 'http', title: 'HTTP Headers', subs: ['Security Headers', 'Server Info', 'Cookies', 'Raw Output'], path: '/http-headers' },
  { id: 'dns', title: 'DNS Records', subs: ['A Records', 'MX/TXT', 'Nameservers', 'Propagation'], path: '/dns-records' },
  { id: 'tech', title: 'Tech Stack', subs: ['Frameworks', 'CDNs', 'CMS Detection', 'Analytics'], path: '/tech-stack' },
  { id: 'whois', title: 'Whois Info', subs: ['Ownership', 'Registrar', 'Expiry', 'Privacy'], path: '/whois-info' },
  { id: 'maps', title: 'Sitemap & Robots', subs: ['XML Sitemap', 'Robots.txt', 'Hidden Paths'], path: '/sitemap-robots' },
  { id: 'threats', title: 'Security Threats', subs: ['Phishing', 'Blacklists', 'SSL Health'], path: '/security-threats' },
  { id: 'ports', title: 'Port Scanning', subs: ['Common Ports', 'Open Services', 'Protocols'], path: '/port-scanning' },
  { id: 'subs', title: 'Subdomains', subs: ['Sub-Enumeration', 'Hidden Assets', 'IP Mapping'], path: '/subdomains' },
  { id: 'meta', title: 'Metadata', subs: ['Image EXIF', 'PDF Tags', 'Doc Info'], path: '/metadata' },
  { id: 'score', title: 'Security Score', subs: ['Grade A-F', 'Risk Analysis', 'Fixes'], path: '/security-score' },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <nav 
      className="relative z-[100] bg-[#0A0A0A] border-b border-white/5 px-10 py-8 italic"
      onMouseLeave={() => setActiveTab(null)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-lg font-bold tracking-[0.5em] uppercase not-italic">
          WARDON.IO
        </Link>

        {/* 3 Main Links */}
        <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.3em] text-gray-400">
          <Link href="/" className="hover:text-green-500 transition-colors">Surface Engine</Link>
          <Link href="/docs" className="hover:text-green-500 transition-colors">Docs</Link>
          
          {/* Tool Trigger */}
          <div 
            className="cursor-pointer hover:text-green-500 transition-colors flex items-center gap-1"
            onMouseEnter={() => setActiveTab('tools')}
          >
            Tool <span className="text-[8px] opacity-50 font-sans">▼</span>
          </div>
        </div>

        {/* Button */}
        <button className="border border-white/20 px-6 py-2 text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
          Console_Entry
        </button>
      </div>

      {/* Modern Horizontal Popup */}
      <AnimatePresence>
        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full w-full bg-[#0D0D0D] border-b border-white/10 shadow-2xl py-12 px-10"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-5 gap-y-10 gap-x-6">
                {toolCategories.map((tool) => (
                  <Link 
                    key={tool.id} 
                    href={tool.path}
                    className="group flex flex-col space-y-3"
                  >
                    <h3 className="text-white text-xs font-bold tracking-widest uppercase group-hover:text-green-500 transition-colors">
                      {tool.title}
                    </h3>
                    <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {tool.subs.map(sub => (
                        <span key={sub} className="text-[9px] text-gray-500 lowercase tracking-normal italic">
                          // {sub}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;