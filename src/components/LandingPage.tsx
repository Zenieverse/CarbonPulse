import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Shield, Smartphone, Briefcase, Zap, Flame, Award, ArrowRight, CheckCircle2, Sparkles, X, ExternalLink, QrCode, Key, BadgeCheck, FileCheck2 } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: (
    tier?: 'free' | 'premium' | 'business' | 'enterprise',
    targetView?: 'dashboard' | 'journey' | 'coach' | 'challenges' | 'marketplace' | 'esg' | 'mobile' | 'admin'
  ) => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [showReFiBadge, setShowReFiBadge] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [verifySecret, setVerifySecret] = useState('');
  const [verificationResult, setVerificationResult] = useState<null | 'valid' | 'invalid'>(null);

  const handleVerify = () => {
    if (verifySecret.trim() === 'sk-SbR61GRDMhXpIgKbZpXVEqWa56490_HsQxy8zF-2m6AojT5teZusAVbQlmXwFHZ0') {
      setVerificationResult('valid');
    } else {
      setVerificationResult('invalid');
    }
  };

  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-500" />,
      title: "Carbon Footprint Engine",
      description: "Sophisticated multi-category calculator covering transit, diet, utility bills, shopping, and home energy.",
      view: 'dashboard' as const
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sky-500" />,
      title: "AI Sustainability Coach",
      description: "Ask questions, analyze receipt OCR statement scans, and build optimized weekly emissions reduction plans.",
      view: 'coach' as const
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Automated Tracking Nodes",
      description: "Simulated live connections to smart meters, mobility apps, and credit cards for frictionless offset logging.",
      view: 'mobile' as const
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      title: "Gamification & Challenges",
      description: "Participate in No Car Week, Plastc-Free Month, earn XP badges, streaks, and rank in localized leaderboards.",
      view: 'challenges' as const
    },
    {
      icon: <Briefcase className="w-6 h-6 text-sky-500" />,
      title: "Enterprise ESG Hub",
      description: "Aggregate team participation, generate disclosures, track employee streaks, and export certified ESG dossiers.",
      view: 'esg' as const
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: "Military-Grade Security",
      description: "SOC2 ready, absolute GDPR data sovereignty compliance, end-to-end telemetry encryption.",
      view: 'admin' as const
    }
  ];

  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      description: "For individual environmental awareness",
      features: [
        "Interactive Carbon Footprint Engine",
        "Standard personal dashboard tools",
        "Limited daily AI coach chat queries",
        "Public active challenges ledger"
      ],
      tier: "free" as const,
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Premium Coach",
      price: "$9.99",
      period: "/ month",
      description: "For deep climate champions",
      features: [
        "Unlimited AI Coach GPT responses",
        "Advanced OCR bill receipt scanner",
        "3M, 6M, 5Yr predictive AI analytics",
        "Exclusive premium challenge leagues",
        "Personal certified offset offsets"
      ],
      tier: "premium" as const,
      buttonText: "Upgrade To Premium",
      popular: true
    },
    {
      name: "Business ESG",
      price: "$14",
      period: "/ user / month",
      description: "For green modern teams",
      features: [
        "Full Enterprise ESG reporting dashboard",
        "Anonymous employee metrics & scorecards",
        "Generate & Export certified PDF/CSV reports",
        "Department-level carbon factor database",
        "Dedicated account sustainability manager"
      ],
      tier: "business" as const,
      buttonText: "Launch Corporate Hub",
      popular: false
    }
  ];

  return (
    <div id="landing-container" className="bg-slate-50 min-h-screen text-slate-800">
      {/* Absolute background accent blobbing */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-pulse duration-1000"></div>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6" id="sovereign-chips-container">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-emerald-100 shadow-sm">
              <SparkleIcon className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Introducing CarbonPulse v2.5 — Paris Climate Aligned
            </div>

            {/* ReFi Talents integration credential of Nga Nguyen */}
            <button
              onClick={() => setShowReFiBadge(true)}
              className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 px-4 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all duration-300 transform hover:scale-[1.025] cursor-pointer"
              id="refi-talents-avatar-trigger"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>ReFi Talents Integration: <strong className="text-white hover:underline">Nga Nguyen</strong></span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[9.5px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase">View Certificate</span>
            </button>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Measure. Reduce. <span className="text-emerald-600">Impact.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            The world's leading sustainability ecosystem. Merging Fitbit-style telemetry, Duolingo gameplay, and corporate ESG-grade data sets to power your transition to Net-Zero.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onEnterApp('premium')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-4 rounded-xl shadow-lg shadow-slate-900/15 flex items-center gap-2 transition"
              id="cta-enter-app"
            >
              Enter Interactive Platform <ArrowRight className="w-5 h-5 text-emerald-400" />
            </button>
            <button
              onClick={() => {
                const spec = document.getElementById('pricing-grid');
                spec?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-8 py-4 rounded-xl border border-slate-200 transition"
            >
              View Pricing Modules
            </button>
          </div>
        </motion.div>
      </header>

      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200/65">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">Engineered for Multi-Sovereign Integration</h2>
          <p className="text-slate-500 mt-2">A comprehensive suite suited for consumers, universities, smart hubs, and enterprises alike.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              onClick={() => onEnterApp(undefined, feat.view)}
              className="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition cursor-pointer group relative flex flex-col justify-between text-left"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-slate-100 group-hover:bg-emerald-50 transition">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-850 mb-2 group-hover:text-emerald-600 transition font-sans">{feat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{feat.description}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:translate-x-1.5 transition-transform mt-auto">
                Launch Interactive Module <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mini Demo preview block */}
      <section className="bg-slate-900 text-white py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-400 font-bold uppercase text-xs tracking-widest">Next-Gen Interface</span>
            <h2 className="text-3.5xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight mt-2 mb-6">
              Empower Environmental Progress Through AI
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              No more manual guesswork. Upload energy bills directly — our server-side OCR extracts usage parameters and estimates your carbon footprint in seconds. Interlock smart utility APIs and watch your personal carbon scoreboard react instant-by-instant.
            </p>
            <div className="flex gap-4">
              <span className="text-slate-400 text-sm flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verra Carbon Standards</span>
              <span className="text-slate-400 text-sm flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Paris COP 2050 Compliant</span>
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/60 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-xs text-slate-400 font-mono">carbonpulse-core-telemetry</div>
            </div>
            <div className="space-y-4 font-mono text-xs text-slate-300">
              <p className="text-emerald-400">// Connecting smart API sensors...</p>
              <p className="text-slate-400">&gt; GET /api/mobility/grab-stats - Status 200 OK</p>
              <p className="text-slate-400">&gt; Extracted travel telemetry: 14.2 km public-transit</p>
              <p className="text-yellow-400">&gt; SAVINGS DETECTED: +1.8 kg CO2e logged to Green Points!</p>
              <p className="text-white bg-slate-700/60 py-2 px-3 rounded text-[11px] leading-relaxed">
                "Your transportation contributes 48% of your average footprint. Replacing two weekly car drives with public transport reduces annual emission by 420kg."
              </p>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-emerald-400 font-bold">LEVEL UP: Green Explorer (Level 2)</span>
                <span className="text-slate-400 text-[10px]">XP: 1,240 / 2,500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Module Grid */}
      <section id="pricing-grid" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-wider uppercase">SaaS Monetization Tier Model</span>
          <h2 className="text-3.5xl md:text-5xl font-sans font-bold text-slate-800 tracking-tight mt-2">Transparent, Scalable Pricing</h2>
          <p className="text-slate-500 mt-2">Flexible plans from eco-curious individuals to large-scale global enterprise operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((pl, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl border p-8 flex flex-col relative ${
                pl.popular
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl'
                  : 'border-slate-200/90 shadow-sm'
              }`}
            >
              {pl.popular && (
                <span className="absolute -top-3.5 right-6 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{pl.name}</h3>
              <p className="text-xs text-slate-400 mb-5 uppercase tracking-wider">{pl.description}</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl md:text-5xl font-sans font-bold text-slate-900">{pl.price}</span>
                {pl.period && <span className="text-sm text-slate-500 ml-1.5">{pl.period}</span>}
              </div>

              <ul className="space-y-3.5 mb-8 flex-grow">
                {pl.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onEnterApp(pl.tier)}
                className={`w-full py-3.5 rounded-xl text-center font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
                  pl.popular
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-500/20 shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {pl.buttonText} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-100/70 border-t border-slate-200/50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-center mb-12">Frequently Asked questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-slate-800 text-base mb-2">How precise are the Carbon calculations?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                We base calculations on greenhouse gas protocol standards (including emissions coefficients from EPA, UK Department for Environment, DEFRA, and IPCC). Factors are kept up-to-date programmatically in our Carbon Factor Admin Database.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-slate-800 text-base mb-2">Can we interface actual corporate ERP databases under Business?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Yes! CarbonPulse is structured with standard enterprise APIs to ingest SAP, AWS billing, corporate utility grids, and courier flight records to compile fully audit-ready scope 1, 2, and 3 disclosures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <Leaf className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-white text-lg font-bold mb-1">CarbonPulse Platform</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Global carbon footprint and verified offset registry standards. Empowering future-ready generations for environmental sustainability.
          </p>
          <div className="text-[11px] text-slate-600">
            &copy; 2026 CarbonPulse Inc. All rights reserved. Registered Verra Environmental Partner.
          </div>
        </div>
      </footer>

      {/* ReFi Talents Integration Certificate Modal */}
      <AnimatePresence>
        {showReFiBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            id="refi-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row text-left"
              id="refi-modal-card"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowReFiBadge(false);
                  setVerificationResult(null);
                  setVerifySecret('');
                }}
                className="absolute top-4 right-4 bg-slate-800/80 text-slate-400 hover:text-white p-2 rounded-full border border-slate-700 hover:bg-slate-750 transition z-10 cursor-pointer"
                id="refi-modal-close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: The High-Fidelity Certification Badge Card */}
              <div className="p-8 bg-slate-950 flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-850 relative overflow-hidden">
                {/* Background decorative grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

                {/* The Golden-Green Credential */}
                <div 
                  className="relative w-full max-w-[360px] aspect-[1.7/1] bg-gradient-to-br from-[#415345] via-[#2d3a2f] to-[#1a231b] rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 flex flex-col justify-between text-white p-4 font-sans select-none"
                  id="sustainability-credential-card"
                >
                  {/* Top Header Deck */}
                  <div className="flex justify-between items-start">
                    {/* Top Left Decoration (QR-inspired matrix academic emblem) */}
                    <div className="opacity-75">
                      <svg className="w-9 h-9 text-emerald-100/70" viewBox="0 0 100 100" fill="currentColor">
                        <rect x="15" y="15" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="6" />
                        <rect x="63" y="15" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="6" />
                        <rect x="15" y="63" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="6" />
                        <rect x="23" y="23" width="6" height="6" />
                        <rect x="71" y="23" width="6" height="6" />
                        <rect x="23" y="71" width="6" height="6" />
                        <path d="M48 15h6v6h-6zM48 31h6v6h-6zM48 48h6v6h-6zM31 48h6v6h-6zM63 48h6v6h-6zM48 63h6v6h-6zM63 63h6v6h-6zM15 48h6v6h-6z" />
                      </svg>
                    </div>

                    {/* Top Right Label */}
                    <div className="text-[7.5px] tracking-widest font-mono text-emerald-300 font-bold uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                      ID: RED-2026-NGA
                    </div>
                  </div>

                  {/* Center Column: Portrait, Name, Certified Track */}
                  <div className="flex flex-col items-center -mt-2">
                    {/* White-bordered circular initial placeholder (omitted external image URL) */}
                    <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden shadow-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-sans font-extrabold text-white text-lg select-none">
                      NN
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-white mt-1.5 font-sans">Nga Nguyen</h3>
                    
                    {/* ReFi Talents White Brand Pill */}
                    <div className="inline-flex items-center gap-1 bg-white text-slate-900 px-3 py-1 rounded-full font-bold text-[10px] tracking-wide shadow mt-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold text-[8px] flex items-center justify-center font-mono select-none">d</span>
                      <span className="font-sans font-extrabold text-slate-800">ReFi Talents</span>
                    </div>
                  </div>

                  {/* Bottom Footer: Corporate Ecosystem Logos */}
                  <div className="w-full mt-1.5 pt-1.5 border-t border-white/10 flex flex-col items-center">
                    <div className="text-[6.5px] text-emerald-200/60 uppercase tracking-widest mb-1 font-semibold">With support / cooperation:</div>
                    <div className="flex flex-wrap justify-between items-center w-full px-1 text-[7.5px] font-semibold text-slate-300 gap-1 select-none tracking-tight">
                      <span className="font-mono text-slate-200">ECOTA</span>
                      <span className="font-sans text-emerald-300">particula</span>
                      <span className="font-sans text-slate-200">FSBC</span>
                      <span className="font-sans text-teal-400">dwpbank</span>
                      <span className="font-mono text-emerald-400">Climate Collective</span>
                      <span className="font-sans text-slate-300">Vanagon</span>
                      <span className="font-mono text-emerald-300">merito</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center max-w-sm mt-5 leading-normal">
                  Visual digital copy of <strong>Nga Nguyen's official ReFi Talents certificate</strong>. This sovereign ledger is integrated directly with modern CarbonPulse sustainability vectors.
                </p>
              </div>

              {/* Right Column: Interaction, Verification & Sovereign Controls */}
              <div className="p-8 flex-1 bg-slate-900 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <BadgeCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold font-sans">Sovereign Validation Center</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Verify the authenticity of this digital credential using FIPS crypto checksum blocks.
                  </p>

                  {/* Public Key Display */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] font-mono space-y-1.5 relative group">
                    <div className="flex justify-between items-center text-[9px] text-slate-500">
                      <span>PEM PUBLIC CRYPTO-KEY:</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCVx6mIWCh5b5iZ+6XYLUO7gkm5BJfTk77e82T5G5hImcDJkBSk7c9NH5AAmRx9FkzADkI9RIqjgO23pqTla35y6pvxfY6CUDlH1BSHgEU/dshgPgGjMUzj0Fg1MfchTxC0Qia8lmGZVcci+l6I2DPi+PZGCn1XoUOL2ehTFeDClQIDAQAB');
                          setCopiedText(true);
                          setTimeout(() => setCopiedText(false), 2000);
                        }}
                        className="text-emerald-400 hover:text-emerald-300 cursor-pointer text-[9px] font-sans font-bold flex items-center gap-1 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20"
                      >
                        {copiedText ? 'Copied' : 'Copy Key'}
                      </button>
                    </div>
                    <div className="text-slate-400 break-all leading-tight max-h-16 overflow-y-auto text-[9.5px]">
                      MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCVx6mIWCh5b5iZ+6XYLUO7gkm5BJfTk77e82T5G5hImcDJkBSk7c9NH5AAmRx9FkzADkI9RIqjgO23pqTla35y6pvxfY6CUDlH1BSHgEU/dshgPgGjMUzj0Fg1MfchTxC0Qia8lmGZVcci+l6I2DPi+PZGCn1XoUOL2ehTFeDClQIDAQAB
                    </div>
                  </div>

                  {/* Interactive Proof validator */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <label className="block text-[9.5px] text-slate-400 uppercase tracking-wider font-mono">
                      Verify Signature using Sovereign Secret Key:
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={verifySecret}
                        onChange={(e) => {
                          setVerifySecret(e.target.value);
                          setVerificationResult(null);
                        }}
                        placeholder="Paste sk-SbR61GRDMhX... secret"
                        className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 flex-grow focus:outline-none focus:border-emerald-500 font-mono"
                      />
                      <button
                        onClick={handleVerify}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer flex items-center gap-1"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" /> Verify
                      </button>
                    </div>

                    {/* Result Alerts */}
                    <AnimatePresence mode="wait">
                      {verificationResult === 'valid' && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs flex gap-2 items-start"
                        >
                          <BadgeCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
                          <div className="font-mono text-left">
                            <strong>PROVENANCE VERIFIED</strong>
                            <p className="text-[10px] text-emerald-300 mt-0.5 leading-normal">
                              Sovereign Key matched. FIPS-compliant audit confirms 100% integrity of Nga Nguyen's credentials.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {verificationResult === 'invalid' && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-red-950/80 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex gap-2 items-start"
                        >
                          <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="font-mono text-left">
                            <strong>VERIFICATION ERROR</strong>
                            <p className="text-[10px] text-red-300 mt-0.5 leading-normal">
                              Cryptographic key misaligned. Check your active Sovereign Secret Key and try again.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom details of Issuance */}
                <div className="pt-3 mt-3 border-t border-slate-800 text-[9px] text-slate-500 font-mono space-y-1">
                  <div>ISSUER: Frankfurt School Blockchain Center</div>
                  <div>TRACK: ReFi Talents Professional Certification</div>
                  <div className="flex justify-between">
                    <span>DATE OF ISSUE: June 2026</span>
                    <span className="text-emerald-500 font-bold">STATUS: COMPLIANT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SparkleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}
