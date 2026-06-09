import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OffsetProject, UserProfile } from '../types';
import { initialOffsetProjects } from '../data/carbonData';
import { ShieldAlert, CheckCircle2, Ticket, Award, HelpCircle, Mail, MapPin, DollarSign, Leaf, ExternalLink, Sparkles, X, Heart } from 'lucide-react';

interface MarketplaceProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  currentFootprintKg: number;
  purchasedCert?: any | null;
  setPurchasedCert?: (cert: any) => void;
}

export default function Marketplace({ 
  profile, 
  setProfile, 
  currentFootprintKg,
  purchasedCert: propPurchasedCert,
  setPurchasedCert: propSetPurchasedCert
}: MarketplaceProps) {
  const [projects, setProjects] = useState<OffsetProject[]>(initialOffsetProjects);
  const [selectedProject, setSelectedProject] = useState<OffsetProject | null>(initialOffsetProjects[0]);
  const [offsetAmountTons, setOffsetAmountTons] = useState(1.5);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Local fallback if props not provided
  const [localPurchasedCert, setLocalPurchasedCert] = useState<any | null>(null);
  const purchasedCert = propPurchasedCert !== undefined ? propPurchasedCert : localPurchasedCert;
  const setPurchasedCert = propSetPurchasedCert !== undefined ? propSetPurchasedCert : setLocalPurchasedCert;

  const currentFootprintTons = currentFootprintKg / 1000;

  const handlePurchaseOffset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const totalCost = offsetAmountTons * selectedProject.pricePerTon;
    setIsVerifying(true);

    setTimeout(() => {
      // Complete transaction simulation
      const certId = `CERT-PULSE-${Math.floor(100000 + Math.random() * 900000)}`;
      const certData = {
        certId,
        projectName: selectedProject.name,
        location: selectedProject.location,
        tonsOffsetted: offsetAmountTons,
        cost: totalCost,
        date: new Date().toLocaleDateString(),
        holderName: profile.name,
        rating: selectedProject.rating
      };

      setProfile(prev => ({
        ...prev,
        greenPoints: prev.greenPoints + Math.round(offsetAmountTons * 100),
        xp: prev.xp + Math.round(offsetAmountTons * 50)
      }));

      setPurchasedCert(certData);
      setIsVerifying(false);
    }, 1800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* List of Verified Projects */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Verified Carbon Offset Marketplace</h2>
          <p className="text-sm text-slate-500">Every project listed here is independently audited and VCS/Gold Standard verified to guarantee genuine carbon removal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(proj => (
            <div 
              key={proj.id} 
              onClick={() => setSelectedProject(proj)}
              className={`bg-white rounded-3xl overflow-hidden border cursor-pointer transition flex flex-col justify-between ${
                selectedProject?.id === proj.id 
                  ? 'border-emerald-600 ring-2 ring-emerald-500/10 shadow-md' 
                  : 'border-slate-200/80 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase font-mono tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {proj.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {proj.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-800">{proj.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-3">{proj.description}</p>
                </div>

                <div className="text-[10.5px] font-medium text-slate-400">
                  Rating: <strong className="text-slate-600">{proj.rating}</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Price / Ton</span>
                    <strong className="text-slate-800 text-sm">${proj.pricePerTon.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase text-right">Audit Transparency</span>
                    <strong className="text-emerald-600 font-mono block text-right">{proj.transparencyScore}/100</strong>
                  </div>
                </div>
              </div>

              {selectedProject?.id === proj.id && (
                <div className="bg-emerald-600 text-white text-xs text-center py-2 font-bold uppercase tracking-wider">
                  Selected Project Node
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calculator & Checkout Sidebar */}
      <div className="space-y-6">
        {selectedProject ? (
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-wider block">Impact Checkout Portal</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">Offset: {selectedProject.name}</h3>
              <p className="text-xs text-slate-400 mt-1">Calibrate offset quantity in Tons. Every metric ton purchased retires equivalent carbon in the sovereign public registry.</p>
            </div>

            {/* Quick Offset Targets selector */}
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">Quick Actions</span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <button
                  type="button"
                  onClick={() => setOffsetAmountTons(currentFootprintTons)}
                  className="bg-white border rounded-xl p-2 font-mono text-xs font-bold text-slate-800 hover:bg-slate-50"
                >
                  My Whole Footprint ({currentFootprintTons.toFixed(2)} t)
                </button>
                <button
                  type="button"
                  onClick={() => setOffsetAmountTons(1.0)}
                  className="bg-white border rounded-xl p-2 font-mono text-xs font-bold text-slate-800 hover:bg-slate-50"
                >
                  Standard 1.0 Ton
                </button>
              </div>
            </div>

            <form onSubmit={handlePurchaseOffset} className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Tons CO₂e to retired:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={offsetAmountTons}
                    onChange={(e) => setOffsetAmountTons(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-20 p-1.5 text-center bg-slate-50 border rounded-lg font-mono font-bold"
                  />
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="15"
                  step="0.2"
                  value={offsetAmountTons}
                  onChange={(e) => setOffsetAmountTons(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Total Price Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 font-sans border border-slate-800">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Carbon offset amount:</span>
                  <span>{offsetAmountTons.toFixed(1)} Tons</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Price per ton:</span>
                  <span>${selectedProject.pricePerTon.toFixed(2)} / ton</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-3 text-sm">
                  <span className="text-slate-400 font-semibold">Consolidated Cost:</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">${(offsetAmountTons * selectedProject.pricePerTon).toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 text-xs shadow-lg shadow-emerald-500/10"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sovereign Escrow validation...
                  </>
                ) : (
                  <>
                    Retire Selected Offset Amount
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-slate-400 p-6 border border-dashed rounded-3xl">
            Select a verified project node on the left list to open the retirement ledger.
          </div>
        )}
      </div>

      {/* Printable Certificate Modal/Presentation Overlay */}
      <AnimatePresence>
        {purchasedCert && (
          <div className="fixed inset-0 bg-slate-950/85 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative border-8 border-double border-emerald-900/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button 
                onClick={() => setPurchasedCert(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-4">
                <Leaf className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                
                <div>
                  <h3 className="font-serif text-2xl font-extrabold text-slate-900 uppercase tracking-wide">Certificate of Retiral</h3>
                  <p className="text-[10px] text-slate-400 tracking-widest uppercase font-mono mt-1">Verified Emissions reduction token</p>
                </div>

                <div className="w-full bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between border-b pb-2 font-mono text-[9px] text-slate-400">
                    <span>REGISTRY ID: {purchasedCert.certId}</span>
                    <span>VERRA REQ CODE: 902-X</span>
                  </div>

                  <p className="leading-relaxed">
                    This document certifies that <strong className="text-slate-800 text-sm font-sans">{purchasedCert.holderName}</strong> has retired <span className="p-1 font-mono font-bold text-white bg-emerald-600 rounded">{purchasedCert.tonsOffsetted} metric tons</span> of verified carbon dioxide equivalent (CO₂e).
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 block uppercase">Environmental Project Node</span>
                    <strong className="text-slate-800 text-sm">{purchasedCert.projectName}</strong>
                  </div>

                  <div className="flex justify-between text-[11px] pt-2 border-t text-slate-500">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-mono">LOCATION</span>
                      {purchasedCert.location}
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block font-mono">DATE OF RETIREMENT</span>
                      {purchasedCert.date}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-6 pt-4">
                  {/* Mock QR node */}
                  <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
                    <div className="w-16 h-16 bg-slate-800 flex items-center justify-center text-white font-mono text-[8.5px] text-center leading-tight">
                      VERIFIED<br/>STAMP
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verra VCS registry stamp
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                      Offset registered under blockchain public hash, retired forever to prevent double-counting.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-grow bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition"
                  >
                    Print PDF Dossier
                  </button>
                  <button
                    onClick={() => setPurchasedCert(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-xl text-xs transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
