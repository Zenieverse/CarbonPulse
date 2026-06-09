import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { Users, Shield, Database, Plus, Trash, Check, AlertTriangle, Key } from 'lucide-react';

interface AdminPanelProps {
  profile: UserProfile;
}

export default function AdminPanel({ profile }: AdminPanelProps) {
  const [factors, setFactors] = useState([
    { id: 'f-1', activity: 'Gasoline Passenger Car', ratio: 0.18, unit: 'kg CO2e / km' },
    { id: 'f-2', activity: 'Electric EV Grid Recharge', ratio: 0.05, unit: 'kg CO2e / km' },
    { id: 'f-3', activity: 'Weekly Grid Electricity', ratio: 0.38, unit: 'kg CO2e / kWh' },
    { id: 'f-4', activity: 'Water Supply Pumpage', ratio: 0.0003, unit: 'kg CO2e / L' }
  ]);

  const [users, setUsers] = useState([
    { id: 'u-1', name: 'Marcus Vance', email: 'vance@acme.com', level: 4, role: 'ESG Analyst', status: 'Active' },
    { id: 'u-2', name: 'Amelia Chen', email: 'chen.amelia@gmail.com', level: 3, role: 'Individual', status: 'Active' },
    { id: 'u-3', name: 'Sarah Jenkins', email: 'jenkins.s@cleanenergy.org', level: 3, role: 'Sustainability Manager', status: 'Active' },
    { id: 'u-4', name: `${profile.name} (You)`, email: profile.email, level: profile.level, role: 'Platform Admin', status: 'Active' }
  ]);

  const [newFactorActivity, setNewFactorActivity] = useState('');
  const [newFactorRatio, setNewFactorRatio] = useState('0.15');
  const [newFactorUnit, setNewFactorUnit] = useState('kg CO2e / unit');

  const handleCreateFactor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFactorActivity.trim()) return;

    const newF = {
      id: `f-${Date.now()}`,
      activity: newFactorActivity,
      ratio: parseFloat(newFactorRatio) || 0.1,
      unit: newFactorUnit
    };

    setFactors([...factors, newF]);
    setNewFactorActivity('');
  };

  const handleDeleteFactor = (id: string) => {
    setFactors(factors.filter(f => f.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Carbon Factor Databases edit */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-2">
          <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">CORE ENGINE</span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Carbon Factor Coefficients (GHG DB)</h2>
        </div>

        {/* List factors */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y overflow-hidden">
          {factors.map(f => (
            <div key={f.id} className="p-4 flex justify-between items-center text-xs">
              <div>
                <strong className="text-slate-800 text-sm block">{f.activity}</strong>
                <span className="text-slate-400 font-mono">ID: {f.id}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-800 text-sm bg-slate-100 px-3 py-1 rounded">{f.ratio}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">{f.unit}</span>
                </div>
                <button
                  onClick={() => handleDeleteFactor(f.id)}
                  className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-slate-50 transition"
                  title="Remove factor"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new factor form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Plus className="w-4.5 h-4.5 text-emerald-600" /> Insert New Carbon Factor Node
          </h3>
          <form onSubmit={handleCreateFactor} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-500 font-semibold">Activity context:</label>
              <input
                type="text"
                placeholder="e.g. Flight travel CO2"
                value={newFactorActivity}
                onChange={(e) => setNewFactorActivity(e.target.value)}
                className="w-full p-2 border rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-500 font-semibold">Emissions Coefficient Ratio:</label>
              <input
                type="number"
                step="0.0001"
                value={newFactorRatio}
                onChange={(e) => setNewFactorRatio(e.target.value)}
                className="w-full p-2 border rounded-xl font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-500 font-semibold">Unit Metric labels:</label>
              <input
                type="text"
                value={newFactorUnit}
                onChange={(e) => setNewFactorUnit(e.target.value)}
                className="w-full p-2 border rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="md:col-span-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl transition"
            >
              Commit Node Factor to Database
            </button>
          </form>
        </div>
      </div>

      {/* User administration list */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <Shield className="w-5 h-5 text-emerald-600" /> Administrative User Management
          </h3>
          <p className="text-xs text-slate-400 mt-1">Configure account access permissions, status, and role privileges.</p>
        </div>

        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
          {users.map(u => (
            <div key={u.id} className="p-3.5 border border-slate-100 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <strong className="text-slate-800 font-bold">{u.name}</strong>
                <span className="text-[10px] bg-white border px-2 py-0.5 rounded font-bold font-mono text-slate-600">
                  {u.role}
                </span>
              </div>
              <div className="text-[10.5px] text-slate-400 font-mono italic">{u.email}</div>
              <div className="flex justify-between items-center text-[10.5px]">
                <span className="text-slate-500">Tier Status: <strong className="text-emerald-600">Active Verified</strong></span>
                <span className="text-slate-400 font-bold">Lvl {u.level}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex gap-2">
          <AlertTriangle className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed font-mono">
            <strong>Audit Telemetry Notice:</strong> Any modified coefficients are validated server-side to prevent double-claiming within offset ledger nodes.
          </div>
        </div>
      </div>

    </div>
  );
}
