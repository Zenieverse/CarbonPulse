import { motion } from 'motion/react';
import { Leaf, Shield, Smartphone, Briefcase, Zap, Flame, Award, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: (tier?: 'free' | 'premium' | 'business' | 'enterprise') => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-500" />,
      title: "Carbon Footprint Engine",
      description: "Sophisticated multi-category calculator covering transit, diet, utility bills, shopping, and home energy."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sky-500" />,
      title: "AI Sustainability Coach",
      description: "Ask questions, analyze receipt OCR statement scans, and build optimized weekly emissions reduction plans."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Automated Tracking Nodes",
      description: "Simulated live connections to smart meters, mobility apps, and credit cards for frictionless offset logging."
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      title: "Gamification & Challenges",
      description: "Participate in No Car Week, Plastc-Free Month, earn XP badges, streaks, and rank in localized leaderboards."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-sky-500" />,
      title: "Enterprise ESG Hub",
      description: "Aggregate team participation, generate disclosures, track employee streaks, and export certified ESG dossiers."
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: "Military-Grade Security",
      description: "SOC2 ready, absolute GDPR data sovereignty compliance, end-to-end telemetry encryption."
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
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-emerald-100">
            <SparkleIcon className="w-3.5 h-3.5" /> Introducing CarbonPulse v2.5 — Paris Climate Aligned
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
              className="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-slate-100">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
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
