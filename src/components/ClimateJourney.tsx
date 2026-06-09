import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Eye, Play, Sparkles, TrendingUp, Users, Trophy, Leaf, Zap, ShieldCheck, 
  HelpCircle, ChevronRight, ArrowRight, CheckCircle2, Globe, ArrowUpRight, Cpu, 
  Settings, Award, Heart, BarChart3, TreeDeciduous, RefreshCw 
} from 'lucide-react';
import { UserProfile, CarbonFootprint } from '../types';

interface ClimateJourneyProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  footprint: CarbonFootprint;
  onAdjustFootprint: (category: keyof CarbonFootprint, value: any) => void;
  onShowToast?: (message: string, type?: 'success' | 'info' | 'error') => void;
  onNavigateToView: (view: 'dashboard' | 'coach' | 'challenges' | 'marketplace' | 'esg' | 'mobile' | 'admin') => void;
}

export default function ClimateJourney({
  profile,
  setProfile,
  footprint,
  onAdjustFootprint,
  onShowToast,
  onNavigateToView
}: ClimateJourneyProps) {
  
  // Track active stage on the journey wheel
  const [activeStage, setActiveStage] = useState<number>(0);
  
  // Forecast Sliders (Stage 9 state)
  const [forecastHorizon, setForecastHorizon] = useState<number>(12); // months: 3, 6, 12, 60 (5 years)
  const [ecoDiligence, setEcoDiligence] = useState<'low' | 'moderate' | 'champion'>('moderate');

  // Interactive Stage 4 state
  const [loggedActivity, setLoggedActivity] = useState<{name: string, saved: number}[]>([
    { name: 'Bike Commute instead of driving', saved: 4.8 },
    { name: 'Switched off vampire standby appliances', saved: 1.2 }
  ]);
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityKg, setNewActivityKg] = useState('2.5');

  const handleLogTelemetryAction = (e: React.FormEvent) => {
    e.preventDefault();
    const kg = parseFloat(newActivityKg);
    if (!newActivityName.trim() || isNaN(kg)) return;

    const act = { name: newActivityName, saved: kg };
    setLoggedActivity(prev => [act, ...prev]);
    onShowToast?.(`Telemetry logged: Saved ${kg} kg CO₂e! +25 XP`, 'success');
    
    // Add rewards to profile
    setProfile(p => {
      const nextXp = p.xp + 25;
      const nextLvl = Math.floor(nextXp / 1000) + 1;
      const levels: UserProfile['levelName'][] = ['Eco Starter', 'Green Explorer', 'Climate Champion', 'Carbon Warrior', 'Net Zero Hero'];
      return {
        ...p,
        greenPoints: p.greenPoints + 15,
        xp: nextXp,
        level: nextLvl,
        levelName: levels[Math.min(levels.length - 1, nextLvl - 1)]
      };
    });

    setNewActivityName('');
  };

  const stagesData = [
    {
      id: 1,
      title: "Discover",
      subtitle: "How sustainable am I?",
      icon: <Compass className="w-5 h-5" />,
      color: "emerald",
      bgGradient: "from-emerald-500 to-teal-600",
      description: "The journey begins when a user signs up using Google, Apple, Microsoft, or email authentication. Upon onboarding, CarbonPulse introduces users to their sustainability profile through an engaging assessment covering transportation, home energy, diet, shopping, travel, waste, and digital consumption.",
      bullets: [
        "Assessment covers: Transportation habits, Home energy usage, Dietary preferences, Shopping behavior, Travel frequency, Waste generation, and Digital consumption.",
        "Connect external services: Bank accounts, Credit cards, Utility providers, Ride-sharing platforms, Smart devices, and Mobility applications.",
        "Outcome: Users gain their first clear understanding of their environmental impact with an initial Carbon Score and Sustainability Grade."
      ],
      interactiveType: "onboarding-status"
    },
    {
      id: 2,
      title: "Understand",
      subtitle: "Where do my emissions come from?",
      icon: <Eye className="w-5 h-5" />,
      color: "sky",
      bgGradient: "from-sky-500 to-indigo-600",
      description: "The AI Sustainability Coach analyzes user behavior and breaks emissions into understandable categories, comparing them against localized averages and net-zero targets.",
      bullets: [
        "Interactive dashboards: Transportation footprint, Food emissions, Energy consumption, Shopping impact, Travel footprint, and Waste contribution.",
        "AI-generated insights explain: Major emission sources, Behavioral patterns, Hidden carbon costs, and Benchmark comparisons.",
        "Benchmark comparisons: Compare against city averages, national averages, global averages, and net-zero targets."
      ],
      interactiveType: "benchmarks-compare"
    },
    {
      id: 3,
      title: "Act",
      subtitle: "What should I do next?",
      icon: <Play className="w-5 h-5" />,
      color: "amber",
      bgGradient: "from-amber-500 to-orange-600",
      description: "Instead of generic advice, CarbonPulse creates personalized sustainability action plans. The AI prioritizes actions with the highest return on environmental impact.",
      bullets: [
        "Personal recommendations: Replace two weekly car trips with public transit, reduce home power usage by 10%, switch to plant-based meals twice weekly, etc.",
        "Rich decision metrics: Potential CO₂ reduction, Estimated cost, Difficulty level, Impact score, and Time commitment.",
        "Outcome: Users know exactly how to reduce their footprint with actionable high-impact guidance."
      ],
      interactiveType: "action-cards"
    },
    {
      id: 4,
      title: "Track",
      subtitle: "Am I making progress?",
      icon: <Cpu className="w-5 h-5" />,
      color: "teal",
      bgGradient: "from-teal-500 to-emerald-600",
      description: "CarbonPulse automatically tracks sustainability actions through connected services and user activity, continuously learning and improving recommendations to match real-world shifts.",
      bullets: [
        "Automatic triggers: Bike commutes detected, electricity reductions recorded, flight emissions added, and sustainable purchases recognized.",
        "Comprehensive tracking metrics: Daily carbon reports, weekly sustainability summaries, monthly reviews, and real-time Carbon Score updates.",
        "Outcome: Users see measurable improvements in real time as their green accomplishments register automatically."
      ],
      interactiveType: "telemetry-ledger"
    },
    {
      id: 5,
      title: "Engage",
      subtitle: "Can I do this with others?",
      icon: <Users className="w-5 h-5" />,
      color: "violet",
      bgGradient: "from-violet-500 to-fuchsia-600",
      description: "Behavior change accelerates when it becomes collaborative and social. Connect with friends, families, work teams, and universities in active challenges.",
      bullets: [
        "Sustainability communities: Create or join Local groups, Friends and family networks, Workplace teams, and University cohorts.",
        "Interactive social challenges: No Car Week, Plastic-Free Month, Plant-Based Challenge, and Energy Saver Challenge.",
        "Outcome: High-fidelity community leaderboards foster healthy competition while encouraging collective climate action."
      ],
      interactiveType: "community-groups"
    },
    {
      id: 6,
      title: "Achieve",
      subtitle: "My actions are creating impact.",
      icon: <Trophy className="w-5 h-5" />,
      color: "rose",
      bgGradient: "from-rose-500 to-pink-600",
      description: "Celebrate milestones, track your streaks, level up your environmental standing, and keep motivation blazing with real-time rewards.",
      bullets: [
        "Earn gamified rewards: Green Points, Achievement Badges, XP Rewards, Sustainability Streaks, and Community Recognition.",
        "Dynamic level progression: Eco Starter → Green Explorer → Climate Champion → Carbon Warrior → Net Zero Hero.",
        "Outcome: Sustainability motivation remains exceptionally high through visible progress, rewards, and milestones."
      ],
      interactiveType: "gamified-achievements"
    },
    {
      id: 7,
      title: "Offset",
      subtitle: "How do I address unavoidable emissions?",
      icon: <Leaf className="w-5 h-5" />,
      color: "green",
      bgGradient: "from-green-500 to-emerald-700",
      description: "Address residual, unavoidable emissions through full access to verified, high-quality, and completely transparent carbon sink projects from tree planting to ocean cleanup.",
      bullets: [
        "Support global climate projects: Tree planting, Mangrove restoration, Renewable energy, Ocean cleanup, and Biodiversity preservation.",
        "Verified transparency: Explicit impact metrics, project transparency reporting, carbon certificates, and live progress updates.",
        "Outcome: Users achieve a balanced, responsible, and verifiable net-zero carbon footprint."
      ],
      interactiveType: "marketplace-calculator"
    },
    {
      id: 8,
      title: "Lead",
      subtitle: "How can I inspire others?",
      icon: <Award className="w-5 h-5" />,
      color: "cyan",
      bgGradient: "from-cyan-500 to-blue-600",
      description: "Evolve into a carbon champion. Start climate advocacy campaigns, organize local communities, mentor newcomers, and manage organizational impact with advanced ESG software panels.",
      bullets: [
        "Advanced community coordination: Create sustainability groups, launch local initiatives, mentor new members, and organize public events.",
        "Enterprise intelligence: Organizations gain access to high-fidelity ESG dashboards that measure collective impact across teams and departments.",
        "Outcome: Individual action scales into massive, self-sustaining community and organizational transformation."
      ],
      interactiveType: "esg-reporting"
    },
    {
      id: 9,
      title: "Transform",
      subtitle: "What does long-term impact look like?",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "emerald",
      bgGradient: "from-indigo-600 to-emerald-600",
      description: "Using secure, state-of-the-art AI forecasting, CarbonPulse projects sustainability outcomes across multiple future milestones so you can see exactly how today's choices shape the environment.",
      bullets: [
        "Multi-horizon climate projections: Visualize outcomes over 3 months, 6 months, 12 months, and 5 years.",
        "Deep impact translations: See total emissions avoided, trees-equivalent absorption, water saved, energy conserved, and community contributions.",
        "Outcome: Direct evidence that your compound choices materialize into a highly sustainable future for the planet."
      ],
      interactiveType: "ai-forecasting"
    }
  ];

  // Helper values for calculations in Stage 9 (Forecast modeling)
  const getForecastMetrics = () => {
    let monthlySavings = 0;
    if (ecoDiligence === 'low') monthlySavings = 25; // kg
    else if (ecoDiligence === 'moderate') monthlySavings = 72;
    else monthlySavings = 168;

    const totalSavedKg = monthlySavings * forecastHorizon;
    const treeEquiv = Math.round(totalSavedKg / 22); // 1 mature tree absorbs ~22kg CO2 per year
    const waterSavedLiters = Math.round(monthlySavings * 18.5 * forecastHorizon); // 18.5 L saved per kg reduction estimate
    const energySavedKwh = Math.round(monthlySavings * 2.63 * forecastHorizon); // 2.63 kWh per kg estimate

    return { totalSavedKg, treeEquiv, waterSavedLiters, energySavedKwh };
  };

  const { totalSavedKg, treeEquiv, waterSavedLiters, energySavedKwh } = getForecastMetrics();

  return (
    <div className="space-y-8" id="climate-journey-viewport">
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-semibold border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Interactive Platform Flywheel
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-slate-900 leading-tight">
            The CarbonPulse Climatic User Journey
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Discover a complete, interconnected, closed-loop sustainability flywheel. Experience how small individual awareness points cascade through 9 strategic feedback stages to achieve authenticated global impact transformation.
          </p>

          {/* Flow list representing outer ring */}
          <div className="pt-4 flex flex-wrap gap-2">
            {stagesData.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold font-mono border transition flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 border-slate-900 text-emerald-400 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${isActive ? 'bg-emerald-500 text-slate-900' : 'bg-slate-100 text-slate-500'}`}>
                    {stage.id}
                  </span>
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main interactive split block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Wheel Selector Column */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-8">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider font-mono">The Climate Flywheel</h3>
            <p className="text-xs text-slate-400">Click any component below to simulate full stage flow telemetry.</p>
          </div>

          {/* SVG Visual Circle Flywheel Graphic */}
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            {/* Spinning background effect circle */}
            <motion.div 
              className="absolute inset-0 border-2 border-dotted border-slate-200 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
            />

            {/* Core telemetry inner circle */}
            <div className="absolute w-28 h-28 bg-gradient-to-tr from-slate-950 to-slate-800 rounded-full flex flex-col items-center justify-center p-4 text-center text-white border-2 border-white/90 shadow-lg z-10 selection:bg-transparent">
              <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-1.5">Node Status</span>
              <span className="text-[11px] font-bold text-emerald-400 uppercase font-mono">ACTIVE</span>
            </div>

            {/* 9 Outer Ring Circle buttons */}
            {stagesData.map((stage, idx) => {
              // Calculate angles for 9 equidistant buttons
              const angle = (idx * (360 / 9) - 90) * (Math.PI / 180);
              const r = 104; // radius
              const x = Math.round(r * Math.cos(angle)) + 128 - 18; // center x offset
              const y = Math.round(r * Math.sin(angle)) + 128 - 18; // center y offset

              const isActive = activeStage === idx;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setActiveStage(idx);
                    onShowToast?.(`Loaded ${stage.title} Telemetry Viewport`, 'info');
                  }}
                  className={`absolute w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition shadow-sm cursor-pointer z-20 ${
                    isActive
                      ? 'bg-emerald-500 border-white text-slate-950 scale-110 ring-4 ring-emerald-500/20'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                  style={{ left: `${x}px`, top: `${y}px` }}
                  title={`${stage.id}. ${stage.title}`}
                >
                  {stage.id}
                </button>
              );
            })}
          </div>

          {/* Interactive instruction banner */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-[11px] leading-relaxed text-slate-500">
            <span className="font-bold text-slate-800 block mb-1">💡 Flywheel Telemetry Paradigm:</span>
            Measure → Understand → Act → Track → Engage → Achieve → Offset → Lead → Transform. Each stage automatically triggers the downstream component!
          </div>

        </div>

        {/* Right Active Viewport Segment */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
            >
              
              {/* Card top banner with stage details */}
              <div className={`p-6 md:p-8 text-white bg-gradient-to-tr ${stagesData[activeStage].bgGradient} relative`}>
                <div className="absolute right-4 top-4 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9.5px] font-mono tracking-wider font-semibold">
                  STAGE {stagesData[activeStage].id} OF 9
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-2 rounded-xl text-white">
                      {stagesData[activeStage].icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-sans font-extrabold tracking-tight">
                      {stagesData[activeStage].title}
                    </h3>
                  </div>

                  <p className="text-white/90 text-sm italic font-medium">
                    "{stagesData[activeStage].subtitle}"
                  </p>
                </div>
              </div>

              {/* Card body detail text */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider font-mono">Stage Objectives</h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    {stagesData[activeStage].description}
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-1 gap-3 pt-2">
                    {stagesData[activeStage].bullets.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DYNAMIC INTERACTIVE SIMULATIONS FOR EACH STAGE */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-emerald-500 animate-pulse" /> Live Telemetry Interactive Simulator
                  </h4>

                  {/* Onboarding status simulator (Stage 1) */}
                  {stagesData[activeStage].interactiveType === "onboarding-status" && (
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-900">Your Discovery Parameters Ledger</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">100% Onboarded</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        {[
                          { name: 'Transportation', value: `${footprint.transportation} km/wk`, status: 'Active' },
                          { name: 'Home Energy', value: `${footprint.electricity} kWh/mo`, status: 'Active' },
                          { name: 'Dietary habits', value: footprint.diet, status: 'Active' },
                          { name: 'Digital Stream', value: `${footprint.digital} hrs/day`, status: 'Active' },
                          { name: 'Shopping Habits', value: footprint.shopping, status: 'Active' },
                          { name: 'Waste Volume', value: footprint.waste, status: 'Active' },
                          { name: 'Short Flight', value: `${footprint.flights} flights/yr`, status: 'Active' },
                          { name: 'Long Flight', value: `${footprint.flightsLong} flights/yr`, status: 'Active' }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs space-y-1">
                            <span className="text-[9.5px] text-slate-400 block truncate">{item.name}</span>
                            <span className="font-bold text-slate-800 text-[11px] block capitalize">{item.value}</span>
                            <span className="text-[9px] text-emerald-600 flex items-center gap-1">🟢 Connected</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-1.5">
                        <button
                          onClick={() => onNavigateToView('dashboard')}
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-xl transition"
                        >
                          Modify Parameters via Main Questionnaire
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Benchmark comparisons (Stage 2) */}
                  {stagesData[activeStage].interactiveType === "benchmarks-compare" && (
                    <div className="bg-slate-900 text-white border border-slate-800 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-white/10">
                        <span className="text-xs font-bold font-mono tracking-wider text-slate-300">Sustainable Comparison Index (Annual CO₂e)</span>
                        <span className="text-[9.5px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 rounded">
                          AI Telemetry Done
                        </span>
                      </div>

                      <div className="space-y-3.5 text-xs font-mono">
                        {[
                          { label: 'Global Average Cap (Sustainable)', val: 2200, color: 'bg-emerald-500', note: 'Ideal' },
                          { label: 'City Cohort Target average', val: 3850, color: 'bg-sky-500', note: 'Localized' },
                          { label: 'US/EU Average Footprint', val: 12500, color: 'bg-red-500', note: 'High Factor' },
                          { label: `Your Measured Footprint`, val: 4120, color: 'bg-amber-500', active: true, note: 'Your Node' }
                        ].map((row, idx) => {
                          const percentage = Math.min(100, (row.val / 15000) * 100);
                          return (
                            <div key={idx} className={`space-y-1 p-2 rounded-xl border ${row.active ? 'border-amber-500 bg-white/5 font-bold' : 'border-transparent'}`}>
                              <div className="flex justify-between text-[11px]">
                                <span className={row.active ? 'text-amber-300' : 'text-slate-400'}>
                                  {row.active ? '⭐' : '•'} {row.label}
                                </span>
                                <span>{row.val.toLocaleString()} kg CO₂e <span className="opacity-60 text-[9.5px]">({row.note})</span></span>
                              </div>
                              <div className="w-full bg-white/10 h-2 rounded-lg overflow-hidden">
                                <div 
                                  className={`h-full ${row.color} transition-all duration-1000`} 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2 text-[10px] leading-relaxed text-slate-400">
                        * Your current carbon parameters place you <strong>67% lower</strong> than regional high-emission indexes, but further adaptation adjustments are necessary to match net-zero objectives.
                      </div>
                    </div>
                  )}

                  {/* Action recommendation cards (Stage 3) */}
                  {stagesData[activeStage].interactiveType === "action-cards" && (
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-800 block">Personalized Priority Directives (Top Recommendations)</span>
                        <span className="text-[10px] font-mono text-slate-400">Ranked by Payback Impact</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'Tackle Standby Power', code: 'E-55', kg: 140, difficulty: 'Easy', cost: '$0', time: '5 Mins/Day' },
                          { title: 'Public Commute shift', code: 'T-102', kg: 420, difficulty: 'Medium', cost: 'Saves $45/mo', time: 'Continuous' },
                          { title: 'Vegetarian twice weekly', code: 'F-12', kg: 180, difficulty: 'Easy', cost: 'Saves $15/mo', time: 'Weekly' },
                          { title: 'Smart Nest thermostat', code: 'E-201', kg: 560, difficulty: 'Hard', cost: '$120 startup', time: 'One-time setup' }
                        ].map((action, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs flex flex-col justify-between space-y-3 hover:border-emerald-300 transition">
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-start">
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono">CODE: {action.code}</span>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                  action.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-800' : action.difficulty === 'Medium' ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-800'
                                }`}>
                                  {action.difficulty}
                                </span>
                              </div>
                              <h5 className="font-bold text-xs text-slate-800">{action.title}</h5>
                            </div>

                            <div className="space-y-1 pt-1.5 border-t border-slate-100 font-mono text-[10px] text-slate-500">
                              <div className="flex justify-between">
                                <span>Impact reduction:</span>
                                <strong className="text-emerald-600">-{action.kg} kg/yr</strong>
                              </div>
                              <div className="flex justify-between">
                                <span>Estimated cost:</span>
                                <strong>{action.cost}</strong>
                              </div>
                            </div>

                            <button
                              onClick={() => onShowToast?.(`Added "${action.title}" action task pipeline!`, 'success')}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10.5px] py-1.5 rounded-lg transition"
                            >
                              Add to Action Pipeline
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Telemetry Action Logger (Stage 4) */}
                  {stagesData[activeStage].interactiveType === "telemetry-ledger" && (
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Smart Telemetry Commits (Automatic & Manual)</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Stream your commute logs or electricity savings to instantly recalculate Green points.</p>
                      </div>

                      {/* Log form */}
                      <form onSubmit={handleLogTelemetryAction} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-7">
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Switched off heat during active commute" 
                            className="w-full bg-white text-xs border border-slate-200/80 rounded-xl px-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                            value={newActivityName}
                            onChange={(e) => setNewActivityName(e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <input 
                            type="number" 
                            step="0.1"
                            required
                            placeholder="Kg CO₂ avoided" 
                            className="w-full bg-white text-xs border border-slate-200/80 rounded-xl px-3 py-2 text-slate-700"
                            value={newActivityKg}
                            onChange={(e) => setNewActivityKg(e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-xl transition cursor-pointer"
                          >
                            Log
                          </button>
                        </div>
                      </form>

                      {/* Logs list representation */}
                      <div className="space-y-2 mt-4 font-mono text-[10px]">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Telemetry Status Timeline</span>
                        {loggedActivity.map((act, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-3xs flex justify-between items-center">
                            <span className="text-slate-600 flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-amber-500" /> {act.name}
                            </span>
                            <span className="text-emerald-600 font-bold font-mono">-{act.saved} kg CO₂e verified</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Community connections (Stage 5) */}
                  {stagesData[activeStage].interactiveType === "community-groups" && (
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-xs font-bold text-slate-800">Your Active Regional Cohorts</span>
                        <span className="text-[10px] text-slate-400">Total participants: 24,192</span>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'Bay Area Climate Innovators', members: '1,420 members', code: 'BCI-12', joined: true, activity: 'Plastic-Free Month' },
                          { name: 'German-Sustained Frankfurt School Cohort 12', members: '185 members', code: 'FSBC-12', joined: false, activity: 'Carbon Ledger Audit' },
                          { name: 'Global ReFi Talents network', members: '8,410 members', code: 'RET-01', joined: false, activity: 'L2 Polygon offsets' }
                        ].map((group, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-3xs flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h6 className="font-bold text-xs text-slate-800">{group.name}</h6>
                                <span className="bg-slate-100 font-mono text-[8px] text-slate-500 px-1.5 py-0.2 rounded uppercase">{group.code}</span>
                              </div>
                              <div className="flex gap-3 text-[10px] text-slate-400 font-mono">
                                <span>{group.members}</span>
                                <span>• Active Campaign: <strong className="text-emerald-600 font-bold">{group.activity}</strong></span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                onShowToast?.(`Joined micro community: ${group.name}`, 'success');
                              }}
                              className={`py-1.5 px-3 rounded-lg text-[10.5px] font-bold transition flex-shrink-0 cursor-pointer ${
                                group.joined 
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
                              }`}
                            >
                              {group.joined ? 'Currently Member' : 'Request Registry Entry'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Level system & badges (Stage 6) */}
                  {stagesData[activeStage].interactiveType === "gamified-achievements" && (
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center pb-2">
                        <span className="text-xs font-bold text-slate-800">Your Current Milestones Overview</span>
                        <span className="font-mono text-[10px] text-slate-500">Global Score: <strong>Rank #2,412</strong></span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Profile metrics status */}
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs space-y-3.5">
                          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider block">Level & XP Track</span>
                          
                          <div className="flex justify-between text-xs font-bold text-slate-800">
                            <span>Level {profile.level} ({profile.levelName})</span>
                            <span className="font-mono text-emerald-600">{profile.xp % 1000} / 1000 XP</span>
                          </div>

                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-full transition-all duration-500" 
                              style={{ width: `${(profile.xp % 1000) / 10}%` }}
                            ></div>
                          </div>

                          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                            <span>Green Points:</span>
                            <span className="font-bold text-slate-800">{profile.greenPoints} GP</span>
                          </div>
                        </div>

                        {/* Badges and streaks */}
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-3xs space-y-3.5">
                          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider block">Current Streaks Ledger</span>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">🔥</span>
                            <div>
                              <strong className="text-base text-slate-850 block">{profile.streak} Days Active</strong>
                              <span className="text-[10px] text-slate-400 leading-none">Complete 1 quest daily to maintain.</span>
                            </div>
                          </div>

                          <div className="flex gap-2.5 pt-1">
                            <span className="bg-emerald-50 text-emerald-800 font-bold text-[9px] px-1.5 py-0.5 rounded border border-emerald-100">🚲 COMMUTER LOCK</span>
                            <span className="bg-amber-50 text-amber-800 font-bold text-[9px] px-1.5 py-0.5 rounded border border-amber-100">🔋 STANDBY SLAYER</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Offset calculator project list (Stage 7) */}
                  {stagesData[activeStage].interactiveType === "marketplace-calculator" && (
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-800">Verified Climate Investment Projects</span>
                        <span className="text-[10px] text-emerald-600 font-bold underline cursor-pointer" onClick={() => onNavigateToView('marketplace')}>Browse Marketplace</span>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'Katingan Peatland Mangrove Conservation', loc: 'Central Kalimantan, Indonesia', registry: 'Verra Registry VCS-147', transparency: '98/100', cost: '$12.50 / Ton' },
                          { name: 'Smart Biochar Soil Adaptation', loc: 'Frankfurt Cohort Lab Region', registry: 'Gold Standard GS-884', transparency: '95/100', cost: '$18.00 / Ton' }
                        ].map((proj, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-3xs space-y-1.5">
                            <div className="flex justify-between items-start">
                              <h6 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                                <TreeDeciduous className="w-4 h-4 text-emerald-600" /> {proj.name}
                              </h6>
                              <span className="text-[10.5px] font-mono whitespace-nowrap text-emerald-700 bg-emerald-50 px-2 rounded-md font-bold">{proj.cost}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono leading-none">{proj.loc}</p>
                            <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                              <span>Registry: <strong>{proj.registry}</strong></span>
                              <span>Transparency Score: <strong className="text-emerald-700">{proj.transparency}</strong></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ESG reports preview (Stage 8) */}
                  {stagesData[activeStage].interactiveType === "esg-reporting" && (
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-white space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-white/10">
                        <span className="text-xs font-bold font-mono text-slate-300">Corporate ESG Hub Preview (Scope 1,2,3)</span>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-500/30 px-2 rounded">Enterprise Live</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className="text-[9px] text-slate-400 block uppercase font-mono">Sovereign Scope 1</span>
                          <strong className="text-base font-extrabold text-amber-300 block font-mono mt-1">12.4 Tons</strong>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className="text-[9px] text-slate-400 block uppercase font-mono">Sovereign Scope 2</span>
                          <strong className="text-base font-extrabold text-emerald-400 block font-mono mt-1">28.8 Tons</strong>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className="text-[9px] text-slate-400 block uppercase font-mono">Sovereign Scope 3</span>
                          <strong className="text-base font-extrabold text-indigo-300 block font-mono mt-1">142.1 Tons</strong>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-1 font-sans">
                        <button
                          onClick={() => onNavigateToView('esg')}
                          className="flex-1 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                        >
                          Access Full Corporate ESG Suite <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* AI forecasting chart (Stage 9) */}
                  {stagesData[activeStage].interactiveType === "ai-forecasting" && (
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-5">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block text-indigo-900">Predictive Personal Outcomes Optimizer</span>
                          <p className="text-[10px] text-slate-400">Interact with parameters to forecast long-term environmental payoffs.</p>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-bold">
                          AI Model Active
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Interactive sliders */}
                        <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200/50 shadow-2xs">
                          {/* Slider 1: Diligence */}
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-500 font-mono uppercase block">Sustained Diligence Mode</label>
                            <div className="flex gap-1.5 bg-slate-50 p-1 rounded-lg">
                              {[
                                { id: 'low', label: 'Ecurious' },
                                { id: 'moderate', label: 'Adaptive' },
                                { id: 'champion', label: 'Climate Champion' }
                              ].map(mode => (
                                <button
                                  key={mode.id}
                                  type="button"
                                  onClick={() => setEcoDiligence(mode.id as any)}
                                  className={`flex-1 text-[10px] font-extrabold py-1 rounded transition cursor-pointer ${
                                    ecoDiligence === mode.id
                                      ? 'bg-slate-900 text-white shadow-3xs'
                                      : 'text-slate-500 hover:text-slate-800'
                                  }`}
                                >
                                  {mode.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Slider 2: Horizon */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-[11.5px] font-bold text-slate-500 font-mono">
                              <span className="uppercase">Time Horizon Horizon</span>
                              <span className="text-indigo-600">{forecastHorizon === 60 ? '5 Years' : `${forecastHorizon} Months`}</span>
                            </div>
                            <input 
                              type="range" 
                              min="3" 
                              max="60" 
                              step="3"
                              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
                              value={forecastHorizon}
                              onChange={(e) => setForecastHorizon(parseInt(e.target.value))}
                            />
                            <div className="flex justify-between text-[9px] text-slate-400 font-mono pt-0.5">
                              <span>3m</span>
                              <span>6m</span>
                              <span>12m</span>
                              <span>24m</span>
                              <span>5yr</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive projection indicators */}
                        <div className="space-y-3 bg-slate-900 text-white p-4 rounded-xl border border-slate-800">
                          <span className="text-[9.5px] text-slate-400 font-mono uppercase block">Projected Climatic Payback</span>
                          
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="border-l-2 border-emerald-500 pl-2.5">
                              <span className="text-[9px] text-slate-400 block font-mono">CO₂e Saved</span>
                              <strong className="text-base text-emerald-400 font-mono font-extrabold block">{totalSavedKg} kg</strong>
                            </div>
                            <div className="border-l-2 border-amber-500 pl-2.5">
                              <span className="text-[9px] text-slate-400 block font-mono">Tree Equivalent</span>
                              <strong className="text-base text-amber-400 font-mono font-extrabold block">~{treeEquiv} Trees</strong>
                            </div>
                            <div className="border-l-2 border-sky-400 pl-2.5">
                              <span className="text-[9px] text-slate-400 block font-mono">Water Preserved</span>
                              <strong className="text-base text-sky-400 font-mono font-extrabold block">{waterSavedLiters.toLocaleString()} L</strong>
                            </div>
                            <div className="border-l-2 border-indigo-400 pl-2.5">
                              <span className="text-[9px] text-slate-400 block font-mono">Energy Conserved</span>
                              <strong className="text-base text-indigo-400 font-mono font-extrabold block">{energySavedKwh.toLocaleString()} kWh</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Interactive button to proceed to actual screen or navigate further */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const routes: Record<string, string> = {
                        'onboarding-status': 'dashboard',
                        'benchmarks-compare': 'coach',
                        'action-cards': 'challenges',
                        'telemetry-ledger': 'dashboard',
                        'community-groups': 'challenges',
                        'gamified-achievements': 'challenges',
                        'marketplace-calculator': 'marketplace',
                        'esg-reporting': 'esg',
                        'ai-forecasting': 'dashboard'
                      };
                      const activeType = stagesData[activeStage].interactiveType;
                      const viewTarget = routes[activeType] || 'dashboard';
                      onNavigateToView(viewTarget as any);
                    }}
                    className="flex-1 py-3 px-5 rounded-xl bg-slate-900 text-slate-100 hover:text-white hover:bg-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inspect Actual Working Live Screen</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>

                  <button
                    onClick={() => {
                      const next = (activeStage + 1) % 9;
                      setActiveStage(next);
                      onShowToast?.(`Iterated to next core flywheel cycle`, 'success');
                    }}
                    className="flex-1 py-3 px-5 rounded-xl border border-slate-205 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Rotate Flywheel</span>
                    <RefreshCw className="w-3.5 h-3.5 text-slate-400 font-bold" />
                  </button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Flywheel Narrative block */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-xl"></div>
        <h3 className="text-lg font-bold font-sans flex items-center gap-2 text-white">
          <Globe className="w-5 h-5 text-emerald-400 animate-pulse" /> The CarbonPulse Sustainable Core Flywheel
        </h3>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-4xl">
          Each user loop reinforces positive sustainable mechanics. Discover emissions to build understanding; understand triggers to prioritize actions; act of your own accord to monitor live metrics; track background indicators to empower collaborative communities; build communities to achieve higher registry ranks; offset the unavoidable; lead micro cohorts; and observe predictive forecasting models project long-term net-zero transformations.
        </p>
        <div className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest bg-emerald-950/50 p-2.5 px-4 rounded-xl border border-emerald-500/10 inline-block">
          Measure • Reduce • Impact.
        </div>
      </div>
    </div>
  );
}
