import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Challenge, UserProfile } from '../types';
import { initialChallenges } from '../data/carbonData';
import { Award, Zap, Trophy, ShieldAlert, Heart, Calendar, Flame, Users, CheckCircle2, ChevronRight, Play } from 'lucide-react';

interface ChallengesProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onShowToast?: (message: string, type?: 'success' | 'info' | 'error') => void;
}

export default function Challenges({ profile, setProfile, onShowToast }: ChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [leaderboardTab, setLeaderboardTab] = useState<'friends' | 'city' | 'company' | 'global'>('friends');

  // Ranks
  const leaderboards = {
    friends: [
      { rank: 1, name: "Marcus Vance", points: 3410, level: 4, streak: 12 },
      { rank: 2, name: "Amelia Chen", points: 2890, level: 3, streak: 8 },
      { rank: 3, name: `${profile.name} (You)`, points: profile.greenPoints, level: profile.level, streak: profile.streak, isUser: true },
      { rank: 4, name: "Liam Peterson", points: 1980, level: 2, streak: 5 },
      { rank: 5, name: "Sophia Green", points: 1450, level: 2, streak: 0 }
    ],
    city: [
      { rank: 1, name: "David Hasselgreen", points: 9450, level: 5, streak: 42 },
      { rank: 2, name: "Acme Eco Solutions Team", points: 8120, level: 5, streak: 21 },
      { rank: 12, name: `${profile.name} (You)`, points: profile.greenPoints, level: profile.level, streak: profile.streak, isUser: true }
    ],
    company: [
      { rank: 1, name: "Emma Watson", points: 4120, level: 4, streak: 15 },
      { rank: 2, name: "Sarah Jenkins", points: 3120, level: 3, streak: 11 },
      { rank: 5, name: `${profile.name} (You)`, points: profile.greenPoints, level: profile.level, streak: profile.streak, isUser: true }
    ],
    global: [
      { rank: 1, name: "Sovereign Climate Fund", points: 142500, level: 5, streak: 124 },
      { rank: 2, name: "Greta Thunberg Org", points: 128900, level: 5, streak: 356 },
      { rank: 2432, name: `${profile.name} (You)`, points: profile.greenPoints, level: profile.level, streak: profile.streak, isUser: true }
    ]
  };

  const badgeVault = [
    { id: 'b-1', name: 'Zero Carbon Commuter', desc: 'Saves 50+ kg CO2e in public transit commuting.', unlocked: true, icon: '🚲' },
    { id: 'b-2', name: 'Standby Slayer', desc: 'Successfully tracks vampire electrical standbys.', unlocked: profile.greenPoints >= 200, icon: '🔋' },
    { id: 'b-3', name: 'High-Fidelity Offsetter', desc: 'Bought first verified offset forest certificate.', unlocked: false, icon: '🌳' },
    { id: 'b-4', name: 'SaaS Power User', desc: 'Interlinked all 4 open-banking IoT telemetry nodes.', unlocked: false, icon: '⚡' }
  ];

  const handleJoinChallenge = (id: string) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === id) {
        const nextJoined = !ch.joined;
        if (nextJoined) {
          onShowToast?.(`Successfully accepted challenge "${ch.title}"!`, 'success');
        } else {
          onShowToast?.(`Withdrew from challenge "${ch.title}".`, 'info');
        }
        return { ...ch, joined: nextJoined, progress: nextJoined ? 10 : 0 };
      }
      return ch;
    }));
  };

  const handleUpdateProgress = (id: string, amount: number) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === id) {
        const nextProg = Math.min(100, Math.max(0, ch.progress + amount));
        const isNowCompleted = nextProg === 100 && ch.progress < 100;
        
        if (isNowCompleted) {
          // Grant reward points & xp
          setTimeout(() => {
            onShowToast?.(`🎉 Completed "${ch.title}"! Earned +${ch.pointsReward} GP and +${ch.xpReward} XP!`, 'success');
            setProfile(p => {
              const nextXp = p.xp + ch.xpReward;
              const nextLvl = Math.floor(nextXp / 1000) + 1;
              const levels: UserProfile['levelName'][] = ['Eco Starter', 'Green Explorer', 'Climate Champion', 'Carbon Warrior', 'Net Zero Hero'];
              return {
                ...p,
                greenPoints: p.greenPoints + ch.pointsReward,
                xp: nextXp,
                level: nextLvl,
                levelName: levels[Math.min(levels.length - 1, nextLvl - 1)]
              };
            });
          }, 200);
        } else {
          onShowToast?.(`Registered +20% progress on "${ch.title}"! Total: ${nextProg}%`, 'info');
        }

        return { ...ch, progress: nextProg };
      }
      return ch;
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Challenges lists */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Active Sustainability Challenges</h2>
          <p className="text-sm text-slate-500">Participate individually or as teams to complete milestones and earn carbon offset bonus packs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map(ch => (
            <div 
              key={ch.id} 
              className={`bg-white rounded-3xl p-6 border transition flex flex-col justify-between ${
                ch.joined ? 'border-emerald-500 shadow-sm' : 'border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    ch.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-700' : ch.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {ch.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {ch.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-800">{ch.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ch.description}</p>
                </div>

                <div className="text-[11px] text-slate-400">
                  Target Criteria: <strong className="text-slate-600 font-bold">{ch.target}</strong>
                </div>

                <div className="flex gap-4 text-xs font-semibold bg-slate-50 px-3.5 py-2 rounded-xl">
                  <div className="text-emerald-700 flex items-center gap-1">🌿 +{ch.pointsReward} GP</div>
                  <div className="text-sky-700 flex items-center gap-1">⭐ +{ch.xpReward} XP</div>
                  <div className="text-slate-400 font-normal">Active: {ch.participants}</div>
                </div>
              </div>

              {ch.joined ? (
                <div className="space-y-4 mt-6 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-600">Quest Progress:</span>
                      <span className="font-bold text-emerald-600 font-mono">{ch.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all" style={{ width: `${ch.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateProgress(ch.id, 20)}
                      className="flex-grow bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-xl"
                    >
                      Record Progress (+20%)
                    </button>
                    <button
                      onClick={() => handleJoinChallenge(ch.id)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-3 rounded-xl"
                      title="Leave Challenge"
                    >
                      Leave
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleJoinChallenge(ch.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition mt-6 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Accept Challenge
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Milestones / Badge Vault */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">CarbonPulse Badge Vault</h3>
            <p className="text-xs text-slate-400">Unlock Achievements by finishing active quests to bolster your global rank percentile.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badgeVault.map(badge => (
              <div 
                key={badge.id} 
                className={`p-4 rounded-2xl border text-center space-y-2 flex flex-col justify-between ${
                  badge.unlocked 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : 'border-slate-100 bg-slate-50/50 grayscale opacity-60'
                }`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{badge.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight">{badge.desc}</p>
                </div>
                <div className={`text-[9px] font-bold py-0.5 rounded ${badge.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'}`}>
                  {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Column */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Adaptive Global Leaderboard</h3>
          <p className="text-xs text-slate-500">Live rankings based on green actions. Gain Green Points to rise ranks during global cohorts.</p>
        </div>

        {/* Leaderboard sub tabs */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
          {['friends', 'city', 'company', 'global'].map(tab => (
            <button
              key={tab}
              onClick={() => setLeaderboardTab(tab as any)}
              className={`flex-grow text-[10px] font-bold py-1.5 rounded-lg capitalize transition ${
                leaderboardTab === tab
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Ranks list */}
        <div className="space-y-3.5">
          {leaderboards[leaderboardTab].map((row: any) => (
            <div 
              key={row.rank} 
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                row.isUser 
                  ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/20 font-bold' 
                  : 'border-slate-100 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 flex items-center justify-center rounded-full font-mono font-bold ${
                  row.rank === 1 ? 'bg-yellow-100 text-yellow-800' : row.rank === 2 ? 'bg-slate-200 text-slate-800' : 'text-slate-500'
                }`}>
                  {row.rank}
                </span>
                <div>
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    {row.name}
                    {row.streak > 0 && <span className="text-[10px] text-orange-500">🔥 {row.streak}</span>}
                  </div>
                  <div className="text-[10px] text-slate-400">Level {row.level}</div>
                </div>
              </div>
              <div className="text-right font-mono font-bold text-slate-700">
                {row.points.toLocaleString()} GP
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-4 rounded-xl text-[11px] text-slate-500 flex gap-2">
          <Trophy className="w-4.5 h-4.5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            Your standing puts you in the <strong className="text-slate-700">Top 15%</strong> of active regional sustainability advocates. Rise in levels to trigger premium merchant rebate badges!
          </div>
        </div>
      </div>

    </div>
  );
}
