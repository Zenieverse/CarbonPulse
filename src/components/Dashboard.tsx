import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { calculateEmissions, getCarbonScoreAndGrade, BENCHMARKS } from '../data/carbonData';
import { CarbonFootprint, ActivityFeedItem, UserProfile } from '../types';
import InnovatorBadge, { UserProfileObj } from './InnovatorBadge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Zap, Bus, Plane, ShoppingBag, Trash2, ShieldCheck, Plus, MessageSquare, 
  Heart, Sparkles, TrendingDown, RefreshCw, Layers, Radio, HelpCircle, 
  CheckCircle2, AlertTriangle, ArrowUpRight, Award, FileDown
} from 'lucide-react';

interface DashboardProps {
  footprint: CarbonFootprint;
  setFootprint: (f: CarbonFootprint) => void;
  feed: ActivityFeedItem[];
  setFeed: React.Dispatch<React.SetStateAction<ActivityFeedItem[]>>;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onOpenCoach: () => void;
  onSelectProfile?: (profile: UserProfileObj) => void;
  onShowToast?: (message: string, type?: 'success' | 'info' | 'error') => void;
  onDownloadReport?: () => void;
}

export default function Dashboard({ 
  footprint, 
  setFootprint, 
  feed, 
  setFeed, 
  profile, 
  setProfile,
  onOpenCoach,
  onSelectProfile,
  onShowToast,
  onDownloadReport
}: DashboardProps) {
  // Calculations
  const breakdown = calculateEmissions(footprint);
  const { score, grade } = getCarbonScoreAndGrade(breakdown.total);

  // States
  const [activeTab, setActiveTab] = useState<'calculator' | 'integrations' | 'forecast'>('calculator');
  const [newActionText, setNewActionText] = useState('');
  const [newActionImpact, setNewActionImpact] = useState('2.5');
  const [newActionSign, setNewActionSign] = useState<'positive' | 'negative'>('positive');
  
  // OCR state trigger or quick loading indicator
  const [isCalculating, setIsCalculating] = useState(false);

  // Connection Toggles (Automated Telemetry)
  const [connections, setConnections] = useState({
    mastercard: false,
    smartMeter: false,
    googleTimeline: false,
    smartPlugs: false
  });

  // Forecasting Chart Data
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [forecastInsights, setForecastInsights] = useState('');
  const [loadingForecast, setLoadingForecast] = useState(false);

  // Fetch forecast data on tab mount
  useEffect(() => {
    if (activeTab === 'forecast') {
      triggerForecast();
    }
  }, [activeTab, footprint]);

  const triggerForecast = async () => {
    setLoadingForecast(true);
    try {
      const response = await fetch('/api/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentFootprint: footprint })
      });
      if (response.ok) {
        const data = await response.json();
        setForecastData(data.forecast);
        setForecastInsights(data.insights);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingForecast(false);
    }
  };

  // Recharts color palette
  const COLORS = ['#10B981', '#0EA5E9', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  
  // Pie chart structured payload
  const pieData = [
    { name: 'Transport', value: breakdown.transport },
    { name: 'Flights', value: breakdown.travel },
    { name: 'Home Utilities', value: breakdown.home },
    { name: 'Diet', value: breakdown.food },
    { name: 'Shopping', value: breakdown.shopping },
    { name: 'Digital', value: breakdown.digital }
  ].filter(d => d.value > 0);

  // Benchmark comparison chart
  const benchmarkChartData = [
    { name: 'You', emissions: Math.round(breakdown.total / 1000 * 10) / 10, fill: '#10B981' },
    { name: 'COP Limit Target', emissions: BENCHMARKS.targetLimit / 1000, fill: '#0EA5E9' },
    { name: 'Local Avg', emissions: BENCHMARKS.localAverage / 1000, fill: '#F59E0B' },
    { name: 'National Avg', emissions: BENCHMARKS.nationalAverage / 1000, fill: '#64748B' }
  ];

  // Action feed submissions
  const handleAddFeedItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionText.trim()) return;

    const impactVal = parseFloat(newActionImpact) || 1.5;
    const newItem: ActivityFeedItem = {
      id: `custom-${Date.now()}`,
      user: profile.name,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      action: newActionText,
      type: newActionSign,
      impact: impactVal,
      timestamp: 'Just now',
      reactions: [],
      comments: []
    };

    setFeed([newItem, ...feed]);

    // Gamification points calculation
    let pointDelta = 0;
    let xpDelta = 0;
    if (newActionSign === 'positive') {
      pointDelta = Math.round(impactVal * 30);
      xpDelta = Math.round(impactVal * 15);
      setProfile(prev => {
        const nextXp = prev.xp + xpDelta;
        const nextLevel = Math.floor(nextXp / 1000) + 1;
        const levels: UserProfile['levelName'][] = ['Eco Starter', 'Green Explorer', 'Climate Champion', 'Carbon Warrior', 'Net Zero Hero'];
        const levelName = levels[Math.min(levels.length - 1, nextLevel - 1)];
        return {
          ...prev,
          greenPoints: prev.greenPoints + pointDelta,
          xp: nextXp,
          level: nextLevel,
          levelName
        };
      });
    }

    setNewActionText('');
  };

  // Toggle automated connections and trigger feed alerts
  const toggleConnection = (key: keyof typeof connections, label: string) => {
    const isConnecting = !connections[key];
    setConnections(prev => ({ ...prev, [key]: isConnecting }));

    if (isConnecting) {
      // Create a nice mock automated alert inside the timeline
      const alertMessages = {
        mastercard: "Locked connection to Visa/Mastercard. Auto-estimated emissions for locally-sourced organic farm basket spending: saved 2.4 kg CO2e!",
        smartMeter: "Connected to Smart Utility Grid. Reduced target room heating during off-peak windows automatically: saved 1.8 kg CO2e!",
        googleTimeline: "Synced Google Timeline GPS nodes. Bike-share logs loaded: saved 4.1 kg CO2e!",
        smartPlugs: "Interlinked Home Smart Plugs. Unplugged idle desk devices during sleeping slot: saved 0.6 kg CO2e!"
      };

      const newItem: ActivityFeedItem = {
        id: `auto-${Date.now()}`,
        user: profile.name,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
        action: `automatically recorded telemetric action: ${alertMessages[key]}`,
        type: 'positive',
        impact: key === 'googleTimeline' ? 4.1 : key === 'mastercard' ? 2.4 : key === 'smartMeter' ? 1.8 : 0.6,
        timestamp: 'Just now',
        reactions: [{ type: '🌿', count: 1, users: ['user-pulse'] }],
        comments: []
      };

      setFeed([newItem, ...feed]);

      // Grant points
      setProfile(prev => ({
        ...prev,
        greenPoints: prev.greenPoints + 150,
        xp: prev.xp + 75
      }));
    }
  };

  // Click Reactions
  const handleReaction = (itemId: string, emoji: string) => {
    setFeed(prev => prev.map(item => {
      if (item.id === itemId) {
        const existingReact = item.reactions.find(r => r.type === emoji);
        if (existingReact) {
          if (existingReact.users.includes('current-user')) {
            // Remove reaction
            return {
              ...item,
              reactions: item.reactions.map(r => r.type === emoji ? {
                ...r,
                count: r.count - 1,
                users: r.users.filter(u => u !== 'current-user')
              } : r).filter(r => r.count > 0)
            };
          } else {
            // Add to existing count
            return {
              ...item,
              reactions: item.reactions.map(r => r.type === emoji ? {
                ...r,
                count: r.count + 1,
                users: [...r.users, 'current-user']
              } : r)
            };
          }
        } else {
          // Create new reaction category
          return {
            ...item,
            reactions: [...item.reactions, { type: emoji, count: 1, users: ['current-user'] }]
          };
        }
      }
      return item;
    }));
  };

  return (
    <div id="dashboard-wrapper" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Left Column: Metrics and Calculator Configuration */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Core Scores Hero Header */}
        <div id="hero-metrics-card" className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-700/30">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-emerald-500/10 rounded-full filter blur-xl"></div>
          <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 bg-sky-500/15 rounded-full filter blur-2xl"></div>

          <div className="relative z-10 flex flex-wrap justify-between items-start gap-6">
            <div>
              <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest block mb-1">Paris COP-2050 Metrics Ledger</span>
              <h1 className="text-3xl font-sans font-extrabold tracking-tight mb-2">Sustainable Telemetry Dashboard</h1>
              <p className="text-sm text-slate-300 max-w-md">Estimated personal footprint benchmarking. Lower is better. Align below the COP limit to earn the Green Star.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-5 py-3 text-center">
                <span className="text-[10px] text-slate-400 block font-mono">CARBON RATING</span>
                <span className="text-4xl font-sans font-extrabold text-emerald-400 tracking-tight">{grade}</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-5 py-3 text-center">
                <span className="text-[10px] text-slate-400 block font-mono">PULSE SCORE</span>
                <span className="text-4xl font-sans font-extrabold text-sky-400 tracking-tight">{score}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-700/50 relative z-10">
            <div>
              <span className="text-xs text-slate-400 block">Annual Carbon Footprint</span>
              <span className="text-2xl font-bold font-sans text-slate-100 flex items-baseline gap-1 mt-1">
                {(breakdown.total / 1000).toFixed(2)} <span className="text-xs text-slate-400">t CO₂e</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Monthly Average</span>
              <span className="text-2xl font-bold font-sans text-slate-100 flex items-baseline gap-1 mt-1">
                {Math.round(breakdown.total / 12)} <span className="text-xs text-slate-400">kg CO₂e</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Daily Average</span>
              <span className="text-2xl font-bold font-sans text-slate-100 flex items-baseline gap-1 mt-1">
                {(breakdown.total / 365).toFixed(1)} <span className="text-xs text-slate-400">kg CO₂e</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Paris Cop Safety Target</span>
              <span className="text-2xl font-bold font-sans text-emerald-400 flex items-baseline gap-1 mt-1">
                {BENCHMARKS.targetLimit / 1000} <span className="text-xs text-slate-400">t CO₂e</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-6 font-semibold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'calculator' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" /> Calibrate Footprint Engine
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`py-3 px-6 font-semibold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'integrations' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-500" /> Auto Connections Telemetry
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className={`py-3 px-6 font-semibold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'forecast' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingDown className="w-4 h-4 text-sky-500" /> AI Carbon Forecasting
          </button>
        </div>

        {/* Tab 1: Manual Calculation Sliders and Dropdowns */}
        {activeTab === 'calculator' && (
          <div id="calculator-panel" className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Configure Consumption Coefficients</h3>
                <p className="text-xs text-slate-400 mt-0.5">Interact with sliders to calibrate your real-time carbon estimate.</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-mono font-bold">
                Formulae-VCS-V2.5
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Transportation */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Bus className="w-4.5 h-4.5 text-blue-500" /> Commuting Distance
                  </span>
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                    {footprint.transportation} km / wk
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="600"
                  step="10"
                  value={footprint.transportation}
                  onChange={(e) => setFootprint({ ...footprint, transportation: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex gap-2 justify-between">
                  <label className="text-xs text-slate-400">Regular Vehicle Drive Mode:</label>
                  <select
                    value={footprint.transportType}
                    onChange={(e: any) => setFootprint({ ...footprint, transportType: e.target.value })}
                    className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 cursor-pointer"
                  >
                    <option value="gas-car">🚗 Petrol/Gas Car (~0.18 kg CO2e/km)</option>
                    <option value="electric-car">⚡ Electric EV (~0.05 kg CO2e/km)</option>
                    <option value="public-transit">🚌 Metro/Bus Transit (~0.04 kg CO2e/km)</option>
                    <option value="bike-walk">🚲 Bicycle Commute (Zero Carbon)</option>
                  </select>
                </div>
              </div>

              {/* Utility Energy (Electricity) */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Zap className="w-4.5 h-4.5 text-amber-500" /> Electricity Usage
                  </span>
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                    {footprint.electricity} kWh / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1200"
                  step="20"
                  value={footprint.electricity}
                  onChange={(e) => setFootprint({ ...footprint, electricity: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 italic">Simulated global average electrical grid efficiency coefficient: 0.38 kg CO2e per kWh.</p>
              </div>

              {/* Airline Flights (Short haul vs Long haul) */}
              <div className="space-y-4 border-t pt-4 md:border-none md:pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Plane className="w-4.5 h-4.5 text-sky-500" /> Short-Haul Flights (Under 3 hrs)
                  </span>
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                    {footprint.flights} / yr
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={footprint.flights}
                  onChange={(e) => setFootprint({ ...footprint, flights: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="space-y-4 border-t pt-4 md:border-none md:pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Plane className="w-4.5 h-4.5 text-indigo-500" /> Long-Haul Transpositional Flights
                  </span>
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                    {footprint.flightsLong} / yr
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={footprint.flightsLong}
                  onChange={(e) => setFootprint({ ...footprint, flightsLong: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Diet / Dining Profile */}
              <div className="space-y-4 border-t pt-6">
                <span className="text-sm font-semibold text-slate-700 block">General Food & Diet Type</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'meat-heavy', label: '🥩 Meat Heavy', desc: '~2.5 tons/yr' },
                    { key: 'balanced', label: '🥗 Balanced Diet', desc: '~1.7 tons/yr' },
                    { key: 'vegetarian', label: '🥚 Vegetarian', desc: '~1.1 tons/yr' },
                    { key: 'vegan', label: '🌱 Vegan Lifestyle', desc: '~0.7 tons/yr' }
                  ].map(dt => (
                    <button
                      key={dt.key}
                      onClick={() => setFootprint({ ...footprint, diet: dt.key as any })}
                      className={`p-3 rounded-xl border text-left transition ${
                        footprint.diet === dt.key
                          ? 'border-emerald-600 bg-emerald-50/55'
                          : 'border-slate-100 bg-slate-50/80 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-800">{dt.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{dt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shopping & Waste Rate */}
              <div className="space-y-4 border-t pt-6">
                <span className="text-sm font-semibold text-slate-700 block">Shopping & Digital Footprints</span>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Monthly Shopping intensity:</span>
                    <select
                      value={footprint.shopping}
                      onChange={(e: any) => setFootprint({ ...footprint, shopping: e.target.value })}
                      className="bg-slate-50 border rounded px-2 py-0.5 text-slate-700"
                    >
                      <option value="minimal">Minimal Consumer (Thrifting & repair)</option>
                      <option value="moderate">Moderate Materialist (Average spending)</option>
                      <option value="heavy">Heavy Purchaser (Fast Fashion / Gadgets)</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Digital Streaming hours/day:</span>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={footprint.digital}
                      onChange={(e) => setFootprint({ ...footprint, digital: Math.min(24, Math.max(0, parseInt(e.target.value) || 0)) })}
                      className="bg-slate-100 border rounded w-16 px-2 py-0.5 text-center text-slate-700"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Automated Connections Telemetry Simulation */}
        {activeTab === 'integrations' && (
          <div id="automated-panel" className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Open-Banking & Smart Device Integrations</h3>
              <p className="text-sm text-slate-500 mt-1">Unlock real-time automated mapping. Our servers capture transaction codes and electricity utilities, syncing logs into your profile.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {[
                {
                  key: 'mastercard' as const,
                  title: 'Financial Spending Sync (Visa / Mastercard)',
                  desc: 'Auto-calculates emissions based on merchant industrial classification codes.',
                  icon: <ShoppingBag className="w-5 h-5 text-emerald-500" />
                },
                {
                  key: 'smartMeter' as const,
                  title: 'Utility Grid Smart Meters',
                  desc: 'Sync hourly electricity usage coefficients from your power provider.',
                  icon: <Zap className="w-5 h-5 text-amber-500" />
                },
                {
                  key: 'googleTimeline' as const,
                  title: 'Google Maps Timeline GPS Sync',
                  desc: 'Reads walking, bicycling, bus and driving distances automatically in backgrounds.',
                  icon: <Bus className="w-5 h-5 text-blue-500" />
                },
                {
                  key: 'smartPlugs' as const,
                  title: 'Home Smart Plug IoT Arrays',
                  desc: 'Intercepts vampire power consumption on standby TVs and home offices.',
                  icon: <Radio className="w-5 h-5 text-indigo-500" />
                }
              ].map(con => (
                <div key={con.key} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 flex justify-between items-start gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1.5">
                      {con.icon}
                      <h4 className="text-sm font-bold text-slate-800">{con.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{con.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleConnection(con.key, con.title)}
                    className={`text-xs px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1 ${
                      connections[con.key]
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    }`}
                  >
                    {connections[con.key] ? 'Connected' : 'Interlink'}
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex gap-3 text-xs text-sky-800 leading-relaxed mt-4">
              <Sparkles className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="font-bold">Automated Carbon Estimation Stream Active</p>
                <p className="mt-0.5">Toggling any network connection grants <strong className="text-white bg-sky-600 px-1.5 py-0.5 rounded text-[10px]">150 GP</strong> as telemetry adaptation bonus and appends immediate action reports inside your timeline feed below!</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: AI Projections & Forecast Charts */}
        {activeTab === 'forecast' && (
          <div id="forecast-panel" className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-2">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Emissions Forecast: 2026-2031</h3>
                <p className="text-sm text-slate-500">Comparing Business-as-Usual (BAU) versus Target COP-2050 Reduction pathways in Tons CO₂e.</p>
              </div>
              <button 
                onClick={triggerForecast}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition"
                title="Refresh Projections schema"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {loadingForecast ? (
              <div className="h-[250px] flex flex-col items-center justify-center text-slate-400 font-mono text-sm gap-2">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                Evaluating historical regression matrices...
              </div>
            ) : (
              <>
                <div className="h-[260px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar name="Business-as-Usual" dataKey="businessAsUsual" fill="#EF4444" radius={[4, 4, 0, 0]} />
                      <Bar name="Net-Zero Adaptation Target" dataKey="targetReduction" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl text-slate-300 font-mono text-xs leading-relaxed border border-slate-800">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Gemini Analysis Forecast
                  </div>
                  {forecastInsights || "Select 'Calibrate Footprint Engine' to fine-tune inputs. Ensure your API key is fully authorized in the settings menu."}
                </div>
              </>
            )}
          </div>
        )}

        {/* Categories breakdown and benchmarking charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Carbon Footprint Category Division */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm relative">
            <h4 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Footprint Breakdown</h4>
            <span className="text-[10px] text-slate-400 block mb-4">Values in kg CO₂e / year</span>

            {pieData.length === 0 ? (
              <div className="h-[180px] flex items-center justify-center text-xs text-slate-400">All data elements set to zero.</div>
            ) : (
              <div className="flex items-center justify-between gap-2 max-h-[220px]">
                <div className="h-[180px] w-[50%]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} kg`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-[50%] space-y-1.5 text-xs">
                  {pieData.map((d, index) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-600 truncate">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                        {d.name}
                      </span>
                      <span className="font-semibold text-slate-800 shrink-0 font-mono">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Environmental Target Comparison Bars */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <h4 className="text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Benchmarking vs Standards</h4>
            <span className="text-[10px] text-slate-400 block mb-4">Standardized yearly emissions in Metric Tons CO₂e</span>

            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkChartData} layout="vertical" margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                  <XAxis type="number" fontSize={10} stroke="#64748B" />
                  <YAxis type="category" dataKey="name" fontSize={10} stroke="#64748B" width={80} />
                  <Tooltip formatter={(value) => `${value} Tons`} />
                  <Bar dataKey="emissions" radius={[0, 4, 4, 0]}>
                    {benchmarkChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

      {/* Right Column: Gamification Profile Card + Social Daily Activity Feed */}
      <div className="space-y-8">
        
        {/* ReFi Talents Climate Innovator Spotlight (Interactive Badge) */}
        <InnovatorBadge 
          onSelectProfile={onSelectProfile} 
          activeProfileName={profile.name}
          onShowToast={onShowToast}
        />

        {/* Official PDF Statement Center */}
        {onDownloadReport && (
          <div id="dashboard-certified-statement-widget" className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-emerald-500/20 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 -mr-10 -mt-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500/15 text-emerald-400 rounded-lg flex items-center justify-center border border-emerald-500/30">
                  <FileDown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">Statement Center</h4>
                  <p className="text-sm font-bold text-slate-100">Certified Impact Ledger</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Compile and download your verified sustainability statement containing current month Achievements, Badges earned, and secure digital Offset Certificates.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onDownloadReport}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-emerald-500/20"
                  id="dashboard-btn-download-pdf-sidebar"
                >
                  <FileDown className="w-4 h-4 text-slate-900" />
                  <span>Download Monthly Report</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-400 text-center font-mono bg-white/5 py-1 px-2 rounded">
                Telemetry Stamp ID: CP-SECURE-NODE-JUNE
              </div>
            </div>
          </div>
        )}
        
        {/* Profile / Gamification Summary Card */}
        <div id="profile-status-block" className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 relative">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold font-sans">
                {profile.name[0]}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-800">{profile.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono uppercase">{profile.email}</p>
              </div>
            </div>
            <span className="text-[9px] bg-slate-900 text-white font-extrabold px-2.5 py-0.5 rounded-full capitalize">
              {profile.tier}
            </span>
          </div>

          {/* XP Progress Ladder */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Award className="w-4 h-4 text-emerald-500" /> {profile.levelName}
              </span>
              <span className="text-slate-400 font-bold font-mono">
                Level {profile.level} • {profile.xp % 1000} / 1000 XP
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(profile.xp % 1000) / 10}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Streak: <strong className="text-orange-500">🔥 {profile.streak} Days</strong></span>
              <span>Green Balance: <strong className="text-emerald-600 font-mono">{profile.greenPoints} GP</strong></span>
            </div>
          </div>

          {/* Gamification mini goals list */}
          <div className="mt-4 pt-4 border-t space-y-2">
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider block mb-2">My Milestones</span>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Save 10 kg CO₂e (Eco Starter)
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Integrate Google Maps Timeline GPS
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-4 h-4 rounded-full border border-slate-300"></div> Buy 1 Offset on Marketplace
            </div>
          </div>
        </div>

        {/* Daily Activity Feed / Timeline Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-5">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-bold text-slate-900">Environmental Daily Activity Feed</h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">
              Active Community
            </span>
          </div>

          {/* Add custom feed item action */}
          <form onSubmit={handleAddFeedItem} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
            <div className="text-[11px] font-bold text-slate-700">Record custom action:</div>
            <input
              type="text"
              placeholder="e.g. 'Took bus train to conference', 'Avoided coffee paper cup'"
              value={newActionText}
              onChange={(e) => setNewActionText(e.target.value)}
              className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
            />
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400">Impact:</span>
                <input
                  type="number"
                  step="0.1"
                  value={newActionImpact}
                  onChange={(e) => setNewActionImpact(e.target.value)}
                  className="w-14 p-1 text-center bg-white border rounded font-mono"
                />
                <span className="text-[10px] text-slate-400">kg CO₂e</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNewActionSign('positive')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${newActionSign === 'positive' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}
                >
                  Saved 🌿
                </button>
                <button
                  type="button"
                  onClick={() => setNewActionSign('negative')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${newActionSign === 'negative' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'}`}
                >
                  Added 😢
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs py-2 rounded-xl font-bold transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Broadcast Action
            </button>
          </form>

          {/* Current list in Feed */}
          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {feed.map((item) => (
              <div key={item.id} className="p-4 border border-slate-100 bg-slate-50/50 rounded-2xl flex gap-3 text-xs relative">
                <img src={item.avatar} alt="User Avatar" className="w-8 h-8 rounded-full border border-slate-200 flex-shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-grow space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{item.user}</span>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-700 capitalize">{item.user}</span> {item.action}.
                  </p>
                  
                  {/* Impact badge */}
                  <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.type === 'positive' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                      : 'bg-red-50 text-red-700 border border-red-100'
                  }`}>
                    {item.type === 'positive' ? 'Saved' : 'Added'}: {item.impact} kg CO₂e
                  </div>

                  {/* Reaction and comments line */}
                  <div className="flex items-center gap-3 pt-1 border-t border-slate-100 mt-1">
                    <button 
                      onClick={() => handleReaction(item.id, '🌿')}
                      className={`flex items-center gap-1 py-0.5 px-2 bg-slate-100 rounded-full hover:bg-slate-200 text-[10px] font-bold ${
                        item.reactions.find(r => r.type === '🌿')?.users.includes('current-user') ? 'border border-emerald-500' : ''
                      }`}
                    >
                      🌿 {item.reactions.find(r => r.type === '🌿')?.count || 0}
                    </button>
                    <button 
                      onClick={() => handleReaction(item.id, '❤️')}
                      className="flex items-center gap-1 py-0.5 px-2 bg-slate-100 rounded-full hover:bg-slate-200 text-[10px] font-bold"
                    >
                      ❤️ {item.reactions.find(r => r.type === '❤️')?.count || 0}
                    </button>
                    {item.comments.length > 0 && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <MessageSquare className="w-3.5 h-3.5" /> {item.comments.length} Comments
                      </div>
                    )}
                  </div>

                  {/* Render comments list */}
                  {item.comments.length > 0 && (
                    <div className="bg-white border p-2.5 rounded-xl space-y-1.5 mt-2">
                      {item.comments.map(c => (
                        <div key={c.id} className="text-[10.5px] leading-relaxed">
                          <strong className="text-slate-700">{c.user}</strong>: <span className="text-slate-500">{c.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
