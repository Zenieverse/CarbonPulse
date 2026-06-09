import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CarbonFootprint, UserProfile, ActivityFeedItem } from './types';
import { defaultFootprint, initialFeedItems, calculateEmissions } from './data/carbonData';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import Challenges from './components/Challenges';
import Marketplace from './components/Marketplace';
import ESGSuite from './components/ESGSuite';
import MobileAppMockup from './components/MobileAppMockup';
import AdminPanel from './components/AdminPanel';
import InnovatorBadge, { UserProfileObj } from './components/InnovatorBadge';

import { Leaf, LogOut, ArrowRight, Settings, Radio, Trophy, Trees, Award, HelpCircle, Bell, Smartphone, User, Menu, X } from 'lucide-react';

export default function App() {
  // Global States
  const [userStatus, setUserStatus] = useState<'landing' | 'logged-in'>('landing');
  const [profile, setProfile] = useState<UserProfile>({
    email: 'zeniverse@gmail.com',
    name: 'Zenie Verse',
    tier: 'premium',
    greenPoints: 480,
    xp: 1240,
    streak: 6,
    level: 2,
    levelName: 'Green Explorer'
  });
  
  const [footprint, setFootprint] = useState<CarbonFootprint>(defaultFootprint);
  const [feed, setFeed] = useState<ActivityFeedItem[]>(initialFeedItems);
  const [activeView, setActiveView] = useState<'dashboard' | 'coach' | 'challenges' | 'marketplace' | 'esg' | 'mobile' | 'admin'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Transition helper from Landing to App
  const handleEnterApp = (tier?: 'free' | 'premium' | 'business' | 'enterprise') => {
    if (tier) {
      setProfile(prev => ({ ...prev, tier }));
      triggerToast(`Welcome to CarbonPulse! Logged into ${tier.toUpperCase()} module.`, "success");
    } else {
      triggerToast("Welcome to CarbonPulse!", "success");
    }
    setUserStatus('logged-in');
  };

  const handleLogout = () => {
    setUserStatus('landing');
  };

  const handleSelectProfile = (newProfile: UserProfileObj) => {
    setProfile(newProfile);
    triggerToast(`Switched active profile to ReFi Innovator: ${newProfile.name}!`, "success");
  };

  // Adjusting simple fields inside footprint database 
  const handleAdjustFootprint = (category: keyof CarbonFootprint, value: any) => {
    setFootprint(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Custom emissions added as generic timeline item
  const handleAddCustomEmissions = (name: string, valueKg: number, category: string) => {
    const newItem: ActivityFeedItem = {
      id: `custom-${Date.now()}`,
      user: profile.name,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      action: `manually registered billing footprint: ${name}`,
      type: 'negative',
      impact: valueKg,
      timestamp: 'Just now',
      reactions: [],
      comments: []
    };
    setFeed(prev => [newItem, ...prev]);
  };

  if (userStatus === 'landing') {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  // Render Inside shell
  return (
    <div id="carbon-pulse-shell" className="bg-[#F8FAFC] min-h-screen text-slate-900 flex flex-col lg:flex-row font-sans relative">
      
      {/* Dynamic Alert Banner Toast */}
      {toast && (
        <div id="global-toast" className="fixed top-6 right-6 z-[999] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`shadow-lg p-3.5 px-4 rounded-xl flex items-center gap-2.5 border pointer-events-auto bg-white/95 backdrop-blur-md text-xs font-semibold ${
              toast.type === 'error'
                ? 'text-red-800 border-red-250 bg-red-50/95'
                : toast.type === 'info'
                ? 'text-sky-800 border-sky-200 bg-sky-50/95'
                : 'text-emerald-800 border-emerald-200 bg-emerald-50/95'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-sky-500' : 'bg-emerald-500'
            } animate-pulse`} />
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-700 p-0.5 ml-1 transition cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      )}

      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="w-64 bg-white border-r border-slate-200 lg:flex flex-col h-screen sticky top-0 hidden z-30">
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-2.5 cursor-pointer select-none border-b border-slate-100" onClick={() => setUserStatus('landing')}>
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
            <Leaf className="w-4.5 h-4.5" />
          </div>
          <div>
            <strong className="text-lg font-bold tracking-tight text-slate-800 block leading-none">CarbonPulse</strong>
            <span className="text-[9px] text-slate-400 font-mono tracking-wider mt-1 block">MEASURE • REDUCE</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Radio className="w-4 h-4" /> },
            { id: 'coach', label: 'AI Coach', icon: <Award className="w-4 h-4" /> },
            { id: 'challenges', label: 'Challenges', icon: <Trophy className="w-4 h-4" /> },
            { id: 'marketplace', label: 'Offset Marketplace', icon: <Trees className="w-4 h-4" /> },
            { id: 'esg', label: 'Enterprise ESG', icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'mobile', label: 'Mobile Client', icon: <Smartphone className="w-4 h-4" /> },
            { id: 'admin', label: 'Admin Panel', icon: <Settings className="w-4 h-4" /> }
          ].map(tab => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-3 text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 shadow-2xs'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* ReFi Talents Climate Innovator Spotlight */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/40">
          <InnovatorBadge 
            onSelectProfile={handleSelectProfile} 
            activeProfileName={profile.name}
            onShowToast={triggerToast}
          />
        </div>

        {/* Dynamic Streak Card at the bottom of the Sidebar */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-900 rounded-xl p-4 text-white relative overflow-hidden shadow-md">
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-emerald-500/10 rounded-full"></div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Current Streak</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold">{profile.streak} Days</span>
              <span className="text-orange-400 font-bold text-lg animate-bounce">🔥</span>
            </div>
            
            <div className="mt-3.5 space-y-1">
              <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                <span>Lvl {profile.level} ({profile.levelName})</span>
                <span>{profile.xp % 1000} / 1000 XP</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${(profile.xp % 1000) / 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE NAV HEADER */}
      <nav className="bg-white border-b border-slate-200 py-3.5 px-6 sticky top-0 z-40 lg:hidden w-full flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setUserStatus('landing')}>
            <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
              <Leaf className="w-4 h-4" />
            </div>
            <strong className="text-slate-900 font-sans font-extrabold text-sm tracking-tight">CarbonPulse</strong>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-lg">
              {profile.greenPoints} GP
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex flex-col gap-1">
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'coach', label: '💬 AI Coach' },
              { id: 'challenges', label: '🏆 Challenges' },
              { id: 'marketplace', label: '🌳 Offset Marketplace' },
              { id: 'esg', label: '🏢 Enterprise ESG' },
              { id: 'mobile', label: '📱 Mobile Client' },
              { id: 'admin', label: '⚙️ Admin Panel' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveView(tab.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs font-semibold p-2.5 rounded-lg transition ${
                  activeView === tab.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            
            <button
              onClick={handleLogout}
              className="text-left text-xs font-semibold p-2.5 rounded-lg text-red-600 hover:bg-red-50/50 flex items-center gap-1.5 mt-2 border-t pt-3"
            >
              <LogOut className="w-4 h-4" />
              Exit App
            </button>
          </div>
        )}
      </nav>

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        
        {/* Sleek Header Top Bar */}
        <header className="px-6 lg:px-8 pt-8 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              Morning, {profile.name}!
              {profile.isInnovator && (
                <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider relative -top-0.5">
                  Innovator
                </span>
              )}
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Here's your live impact telemetry and verified carbon tracking score.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick stats indicator */}
            <div className="hidden sm:flex items-center gap-2.5 bg-white border border-slate-200/80 rounded-xl px-4 py-2 shadow-2xs">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Green balance</p>
                <p className="text-xs font-mono font-extrabold text-slate-700 mt-0.5">{profile.greenPoints} GP</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 px-4 py-2 rounded-xl transition text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Logout session"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>Exit Core</span>
            </button>
          </div>
        </header>

        {/* Dynamic Inner Main Content with responsive padding */}
        <main className="flex-grow px-6 lg:px-8 pb-12">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeView === 'dashboard' && (
              <Dashboard 
                footprint={footprint} 
                setFootprint={setFootprint} 
                feed={feed} 
                setFeed={setFeed}
                profile={profile}
                setProfile={setProfile}
                onOpenCoach={() => setActiveView('coach')}
                onSelectProfile={handleSelectProfile}
                onShowToast={triggerToast}
              />
            )}

            {activeView === 'coach' && (
              <AICoach 
                footprint={footprint} 
                onAdjustFootprint={handleAdjustFootprint}
                onAddCustomEmissions={handleAddCustomEmissions}
              />
            )}

            {activeView === 'challenges' && (
              <Challenges 
                profile={profile}
                setProfile={setProfile}
                onShowToast={triggerToast}
              />
            )}

            {activeView === 'marketplace' && (
              <Marketplace 
                profile={profile}
                setProfile={setProfile}
                currentFootprintKg={calculateEmissions(footprint).total}
              />
            )}

            {activeView === 'esg' && (
              <ESGSuite />
            )}

            {activeView === 'mobile' && (
              <MobileAppMockup />
            )}

            {activeView === 'admin' && (
              <AdminPanel profile={profile} />
            )}
          </motion.div>
        </main>

        {/* Premium Mini App Footer */}
        <footer className="bg-slate-900 text-slate-400 py-5 text-center border-t border-slate-800 text-[10px] font-mono mt-auto">
          <div className="px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
            <span>CarbonPulse Sustain Platform • Verra Verified Registry VCS-102</span>
            <span>Sovereign Paris Accords Telemetry Node: <strong className="text-emerald-400">ONLINE_SECURE</strong></span>
          </div>
        </footer>

      </div>

    </div>
  );
}
