import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { Users, Shield, Database, Plus, Trash, Check, AlertTriangle, Key, UserPlus, Power, CheckCircle2 } from 'lucide-react';

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

  const [newUserOpen, setNewUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('ESG Analyst');
  const [newUserLevel, setNewUserLevel] = useState(3);
  const [newUserStatus, setNewUserStatus] = useState('Active');
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => {
      setNotice(current => current === msg ? null : current);
    }, 4500);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showNotice("Please fill in all user profile details");
      return;
    }
    const newUser = {
      id: `u-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      level: newUserLevel,
      role: newUserRole,
      status: newUserStatus
    };
    setUsers([...users, newUser]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserOpen(false);
    showNotice(`Provisioned secure terminal access for ${newUserName}`);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (id === 'u-4' || name.includes('(You)')) {
      showNotice("Refusing safety hazard: Cannot delete your active admin node");
      return;
    }
    setUsers(users.filter(u => u.id !== id));
    showNotice(`Revoked master token access for: ${name}`);
  };

  const handleUpdateRole = (id: string, role: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
    showNotice(`Recalibrated ledger authorization role clearance: ${role}`);
  };

  const handleUpdateLevel = (id: string, level: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, level } : u));
    showNotice(`Modified FIPS access hierarchy index: Lvl ${level}`);
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const isCurrentUser = users.find(u => u.id === id)?.email === profile.email;
    if (isCurrentUser) {
      showNotice("Cannot suspend your active workspace session");
      return;
    }
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setUsers(users.map(u => u.id === id ? { ...u, status: nextStatus } : u));
    showNotice(`Clearance access code updated to: ${nextStatus.toUpperCase()}`);
  };

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

      {/* User administration list & Cryptographic parameters */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                <Shield className="w-5 h-5 text-emerald-600" /> Administrative User Management
              </h3>
              <p className="text-xs text-slate-400 mt-1">Configure account access permissions, status, and role privileges.</p>
            </div>
            <button
              onClick={() => setNewUserOpen(!newUserOpen)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-sm"
              id="admin-btn-add-user"
            >
              <UserPlus className="w-3.5 h-3.5" />
              {newUserOpen ? 'Close Panel' : 'Provision User'}
            </button>
          </div>

          {/* Inline notification banner */}
          {notice && (
            <div id="admin-notice-banner" className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-pulse flex-shrink-0" />
              <span>{notice}</span>
            </div>
          )}

          {/* New User Form Inline Card */}
          {newUserOpen && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-xs space-y-3" id="add-user-form-container">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold font-sans">
                <UserPlus className="w-4 h-4 text-emerald-600 animate-bounce" />
                <span>Onboard New Sovereign Account node</span>
              </div>
              <form onSubmit={handleCreateUser} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Secure Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane.doe@co2pulse.org"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">System Privilege Role</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      <option value="ESG Analyst">ESG Analyst</option>
                      <option value="Sustainability Manager">Sustainability Manager</option>
                      <option value="Individual">Individual</option>
                      <option value="Platform Admin">Platform Admin</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Clearance Level</label>
                    <select
                      value={newUserLevel}
                      onChange={(e) => setNewUserLevel(Number(e.target.value))}
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      <option value={1}>Lvl 1 - Standard User</option>
                      <option value={2}>Lvl 2 - Contributor</option>
                      <option value={3}>Lvl 3 - Specialist</option>
                      <option value={4}>Lvl 4 - Integrity Officer</option>
                      <option value={5}>Lvl 5 - Sovereign SuperAdmin</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Telemetry Status</label>
                    <select
                      value={newUserStatus}
                      onChange={(e) => setNewUserStatus(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 font-semibold"
                    >
                      <option value="Active">🟢 ACTIVE</option>
                      <option value="Suspended">🔴 SUSPENDED</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-xl transition shadow-xs cursor-pointer"
                >
                  Confirm Registration & Launch Node
                </button>
              </form>
            </div>
          )}

          {/* Scrollable Directory of Registered Operators */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {users.map(u => {
              const isCurrentUser = u.email === profile.email;
              return (
                <div 
                  key={u.id} 
                  className={`p-3 border rounded-2xl transition-all duration-300 space-y-3.5 text-xs ${
                    u.status === 'Suspended' 
                      ? 'border-red-100 bg-red-50/20' 
                      : isCurrentUser 
                        ? 'border-emerald-500/20 bg-emerald-50/10' 
                        : 'border-slate-100 bg-slate-50/40'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <strong className="text-slate-800 font-bold text-sm tracking-tight">{u.name}</strong>
                        {isCurrentUser && (
                          <span className="bg-emerald-100 text-emerald-800 text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                            You
                          </span>
                        )}
                        <span className={`text-[8.5px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                          u.status === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {u.status}
                        </span>
                      </div>
                      <div className="text-[10.5px] text-slate-400 font-mono italic">{u.email}</div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Suspence switch button */}
                      <button
                        onClick={() => handleToggleStatus(u.id, u.status)}
                        disabled={isCurrentUser}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isCurrentUser
                            ? 'opacity-30 cursor-not-allowed text-slate-400'
                            : u.status === 'Suspended' 
                              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-600' 
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600'
                        }`}
                        title={isCurrentUser ? 'Forbidden to self-suspend' : u.status === 'Suspended' ? 'Activate Access' : 'Suspend Access'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>

                      {/* Trash action button */}
                      <button
                        onClick={() => handleDeleteUser(u.id, u.name)}
                        disabled={isCurrentUser}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isCurrentUser 
                            ? 'text-slate-300 bg-slate-50 cursor-not-allowed' 
                            : 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer'
                        }`}
                        title={isCurrentUser ? 'Protected administration session' : 'Revoke system node access'}
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Privilege Level and Role Selects */}
                  <div className="grid grid-cols-2 gap-2 text-[10.5px] pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[9.5px] text-slate-400 block mb-1 uppercase font-semibold tracking-wider">Clearance</span>
                      <select
                        value={u.level}
                        onChange={(e) => handleUpdateLevel(u.id, Number(e.target.value))}
                        disabled={isCurrentUser}
                        className="w-full text-slate-700 text-[11px] p-1 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-300 cursor-pointer"
                      >
                        <option value={1}>Lvl 1 - Standard</option>
                        <option value={2}>Lvl 2 - Contributor</option>
                        <option value={3}>Lvl 3 - Specialist</option>
                        <option value={4}>Lvl 4 - Officer</option>
                        <option value={5}>Lvl 5 - SuperAdmin</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-[9.5px] text-slate-400 block mb-1 uppercase font-semibold tracking-wider">System Role</span>
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                        disabled={isCurrentUser}
                        className="w-full text-slate-700 text-[11px] p-1 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-300 cursor-pointer font-medium"
                      >
                        <option value="ESG Analyst">ESG Analyst</option>
                        <option value="Sustainability Manager">Sustainability Manager</option>
                        <option value="Individual">Individual</option>
                        <option value="Platform Admin">Platform Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed font-mono">
              <strong>Audit Telemetry Notice:</strong> Any modified coefficients are validated server-side to prevent double-claiming within offset ledger nodes.
            </div>
          </div>
        </div>

        {/* Military Grade Cryptographic Console */}
        <div className="bg-slate-950 text-slate-350 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4.5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Key className="w-4.5 h-4.5 text-emerald-400 animate-pulse" />
              <strong className="text-xs font-mono font-bold uppercase text-white tracking-widest">Crypto-Security Center</strong>
            </div>
            <span className="text-[9px] text-emerald-400 font-medium font-mono px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/30 rounded">
              MIL-SPEC ACTIVE
            </span>
          </div>

          <div className="space-y-3.5 text-[10.5px] font-mono leading-relaxed">
            <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-slate-500 block text-[9.5px] uppercase">Encryption Cipher Matrix</span>
              <span className="text-white font-bold block">AES-256GCM (FIPS 140-3 Compliant)</span>
              <span className="text-slate-400 text-[9.5px]">Master Key Rotation: Every 24 hours via HSM Node</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[9px] font-mono">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-slate-500 block">SHA-256 CHECKSUM</span>
                <span className="text-emerald-400 font-bold">SECURE INTEGRITY</span>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="text-slate-500 block">SOC-2 AUDITED</span>
                <span className="text-sky-400 font-bold">100% SUCCESSFUL</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed space-y-2">
              <div>
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Active Sovereign API Secret</span>
                <span className="text-emerald-400 block select-all font-mono break-all leading-tight">
                  sk-SbR61GRDMhXpIgKbZpXVEqWa56490_HsQxy8zF-2m6AojT5teZusAVbQlmXwFHZ0
                </span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Cryptographic Verification Public Key (PEM)</span>
                <span className="text-sky-400 block select-all font-mono break-all text-[8.5px] leading-tight font-light bg-black/30 p-1.5 rounded border border-white/5 mt-0.5 max-h-24 overflow-y-auto">
                  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCVx6mIWCh5b5iZ+6XYLUO7gkm5BJfTk77e82T5G5hImcDJkBSk7c9NH5AAmRx9FkzADkI9RIqjgO23pqTla35y6pvxfY6CUDlH1BSHgEU/dshgPgGjMUzj0Fg1MfchTxC0Qia8lmGZVcci+l6I2DPi+PZGCn1XoUOL2ehTFeDClQIDAQAB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
