import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, ShieldCheck, Share2, Copy, ExternalLink, X, FileText, Globe } from 'lucide-react';
import { UserProfile } from '../types';

interface InnovatorBadgeProps {
  onSelectProfile?: (profile: UserProfileObj) => void;
  activeProfileName?: string;
  onShowToast?: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export interface UserProfileObj {
  name: string;
  email: string;
  tier: 'free' | 'premium' | 'business' | 'enterprise';
  greenPoints: number;
  xp: number;
  streak: number;
  level: number;
  levelName: 'Eco Starter' | 'Green Explorer' | 'Climate Champion' | 'Carbon Warrior' | 'Net Zero Hero';
  isInnovator: boolean;
  badge: string;
  avatar: string;
}

export default function InnovatorBadge({ onSelectProfile, activeProfileName, onShowToast }: InnovatorBadgeProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // ReFi Talents Certificate metadata - Nga Nguyen
  const innovatorData: UserProfileObj = {
    name: "Nga Nguyen",
    email: "nga.nguyen@refi.talents",
    tier: "enterprise",
    greenPoints: 1250,
    xp: 3850,
    streak: 42,
    level: 4,
    levelName: "Carbon Warrior",
    isInnovator: true,
    badge: "ReFi Talents",
    avatar: "NN"
  };

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText("https://refi-talents.fsbc.de/certificates/nga-nguyen-innovator");
    onShowToast?.("Blockchain ledger credential link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Mini interactive widget on the dashboard */}
      <div 
        id="innovator-spotlight-card"
        className="relative overflow-hidden rounded-3xl border border-slate-205 bg-gradient-to-tr from-[#313824] to-[#434b35] p-5 text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.01] duration-300 cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        {/* Abstract design vector mimics */}
        <div className="absolute right-0 top-0 -mr-12 -mt-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
        
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold text-emerald-300">
            <Award className="w-3.5 h-3.5" /> ReFi Innovator Spotlight
          </div>
          <span className="text-[9px] text-emerald-400 font-mono tracking-widest bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
            VERIFIED CREDENTIAL
          </span>
        </div>

        {/* Card Body - Likeness of the certificate structure (Omitted image for stylized presentation) */}
        <div className="mt-4 flex items-center gap-3.5">
          {/* Circular initials representation of Nga Nguyen */}
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-white/90 bg-gradient-to-br from-[#d97706] to-[#b45309] shadow-inner flex items-center justify-center text-white font-display font-semibold text-lg">
              NN
            </div>
            {/* Open book icon absolute in top-left like the certificate */}
            <div className="absolute -top-1 -left-1 w-5 h-5 bg-[#d97706]/90 rounded-full border border-white flex items-center justify-center text-[8px] text-white font-bold" title="ReFi Matrix Code">
              📖
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold tracking-tight text-white">{innovatorData.name}</h3>
              <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wide">
                Innovator
              </span>
            </div>
            
            {/* ReFi Talents Pill button representation */}
            <div className="inline-flex items-center gap-1 bg-white text-slate-900 rounded-full px-2.5 py-0.5 text-[9.5px] font-bold">
              <span className="text-emerald-700 font-extrabold text-xs">d</span> ReFi Talents
            </div>
          </div>
        </div>

        {/* Preview Footer */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
          <span className="font-mono text-[9px] text-slate-400">Ledger ID: #FSBC-RF-712</span>
          <span className="text-emerald-300 flex items-center gap-1 hover:underline">
            Inspect Certificate <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* FULL SCREEN EXPERIMENTAL LEDGER DIALOG */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-[#F8FAFC] p-0 shadow-2xl text-slate-800 border border-slate-200"
            >
              {/* Upper Section matching the Cert image background & setup */}
              <div className="bg-gradient-to-b from-[#4A5333] to-[#2D331E] p-8 text-white relative">
                <button 
                  onClick={() => setModalOpen(false)}
                  className="absolute right-4 top-4 rounded-xl bg-black/20 hover:bg-black/40 p-2 text-white/80 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Top Left Certificate open book matrix mark */}
                <div className="absolute top-8 left-8 flex items-center gap-1.5 opacity-85">
                  <div className="bg-[#B45309]/95 p-1.5 rounded-lg border border-white/20 text-white shadow-md">
                    {/* Reconstruct custom open-book icon */}
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      <rect x="5" y="7" width="4" height="4" rx="0.5" fill="white" opacity="0.3" />
                      <rect x="15" y="7" width="4" height="4" rx="0.5" fill="white" opacity="0.3" />
                    </svg>
                  </div>
                </div>

                {/* Center Content Matching Image (Omitted image for stylized presentation) */}
                <div className="flex flex-col items-center text-center mt-4">
                  {/* Stylized Initials Badge Frame instead of photograph */}
                  <div className="relative font-bold">
                    <div className="w-32 h-32 rounded-full border-4 border-white/95 bg-gradient-to-br from-[#d97706] to-[#b45309] shadow-xl flex items-center justify-center text-white font-display font-bold text-3xl">
                      NN
                    </div>
                  </div>

                  {/* Name and Tagline */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-2xl font-display font-bold tracking-tight text-white">Nga Nguyen</h2>
                      <span className="bg-[#D97706] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        Innovator
                      </span>
                    </div>

                    <p className="text-zinc-300 text-xs tracking-wide">Certified Sustainable Ledger professional</p>

                    {/* Pill logo button */}
                    <div className="mt-3 inline-flex items-center gap-2 bg-white text-slate-950 font-sans font-bold text-xs py-1.5 px-5 rounded-full shadow-md">
                      <span className="text-emerald-700 text-lg font-black leading-none">d</span>
                      <span>ReFi Talents</span>
                    </div>
                  </div>
                </div>

                {/* Partner brands bar exactly as shown in picture footer */}
                <div className="mt-10 pt-4 border-t border-white/10">
                  <p className="text-[8px] text-slate-400 font-mono tracking-widest text-center uppercase mb-3.5">
                    FSBC SUPPORT • CO-VALIDATION PARTNERS
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3.5 text-[9.5px] text-white/70 font-mono font-bold tracking-tight">
                    <span className="hover:text-emerald-300 transition select-none flex items-center gap-1">🌱 MECOTA</span>
                    <span className="hover:text-emerald-300 transition select-none">particula</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded text-[8.5px] hover:text-emerald-300 transition select-none">
                      Frankfurt School Blockchain Center
                    </span>
                    <span className="hover:text-emerald-300 transition select-none">dwpbank</span>
                    <span className="hover:text-emerald-300 transition select-none flex items-center gap-1">🔆 Climate Collective</span>
                    <span className="hover:text-emerald-300 transition select-none">Vanagon</span>
                    <span className="hover:text-emerald-300 transition select-none">meritto</span>
                  </div>
                </div>
              </div>

              {/* Lower Details / Interactive Block */}
              <div className="p-6 space-y-5 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Credential Ledger</span>
                    <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Hash Verified on Polygon Core
                    </p>
                    <p className="text-slate-500 leading-relaxed text-[11px]">
                      Co-validated by Frankfurt School Blockchain Center cohort #12. This registry signifies excellence in ReFi carbon market validation.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">CarbonPulse Impact Stats</span>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Carbon Score: <strong className="text-emerald-600 font-mono">A+ Rating</strong></span>
                      <span>Streak: <strong className="text-orange-500 font-mono">🔥 42 Days</strong></span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Sustained GP: <strong className="text-slate-800 font-mono">1,250 GP</strong></span>
                      <span>Workspace Rank: <strong className="text-slate-800 font-mono">Top 2%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Block Chain validation text */}
                <div className="text-[11px] text-slate-400 font-mono bg-slate-900 text-emerald-400 p-3 rounded-xl flex items-center justify-between">
                  <span className="truncate">TX: 0x9f5b2ac3...f71253bc_refi_innovator</span>
                  <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 rounded">
                    CONGENIAL SECURE
                  </span>
                </div>

                {/* Operations footer */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (onSelectProfile) {
                        onSelectProfile(innovatorData);
                        setModalOpen(false);
                      }
                    }}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      activeProfileName === 'Nga Nguyen'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {activeProfileName === 'Nga Nguyen' ? 'Currently Acting As Nga Nguyen' : 'Act as Nga Nguyen (Simulate Profile)'}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs p-2.5 px-4 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      Credentials Link
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
