import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Zap, Sparkles, Bell, Wifi, Camera, QrCode } from 'lucide-react';

export default function MobileAppMockup() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'scanner' | 'notifications'>('home');
  const [wifiSignal, setWifiSignal] = useState(true);
  const [notifTriggered, setNotifTriggered] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);
  const [mockLoading, setMockLoading] = useState(false);

  const triggerPushNotification = () => {
    setNotifTriggered(true);
    setTimeout(() => {
      setNotifTriggered(false);
    }, 4000);
  };

  const handleQRScan = () => {
    setMockLoading(true);
    setTimeout(() => {
      setQrScanned(true);
      setMockLoading(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center py-6">
      
      {/* Simulation options */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Native Mobile Client Simulator (iOS & Android)</h2>
          <p className="text-sm text-slate-500">Test specialized mobile client nodes: instant capture, QR offline capabilities, and local notification intervals.</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={triggerPushNotification}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-xs transition flex items-center justify-between"
          >
            <span>Trigger Push Notification</span>
            <Bell className="w-4 h-4 text-amber-400 animate-swing" />
          </button>

          <button
            onClick={() => setWifiSignal(!wifiSignal)}
            className={`w-full font-semibold py-3 px-4 rounded-xl text-xs transition flex items-center justify-between ${
              wifiSignal ? 'bg-emerald-50 border border-emerald-100 text-emerald-800' : 'bg-red-50 border border-red-100 text-red-800'
            }`}
          >
            <span>Offline Sync Mode: {wifiSignal ? 'WiFi Online' : 'Local Offline Engine Status'}</span>
            <Wifi className="w-4 h-4" />
          </button>

          <div className="bg-slate-50 p-4 rounded-2xl text-[11px] text-slate-500 leading-relaxed border space-y-1.5">
            <strong className="text-slate-700 block">Offline Local-First Engine Parameters</strong>
            <p>CarbonPulse uses a custom service worker layer storing data telemetry locally. If cellular network access goes down, calculations occur instantly, then sync to Verra databases when online.</p>
          </div>
        </div>
      </div>

      {/* Center Phone Screen Simulation Case */}
      <div className="flex justify-center">
        
        {/* Container phone frame wrapper */}
        <div className="w-[280px] h-[540px] bg-slate-950 rounded-[40px] p-3.5 shadow-2xl ring-12 ring-slate-900 flex flex-col justify-between overflow-hidden relative border-4 border-slate-800">
          
          {/* Notch indicator */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800"></div>
          </div>

          {/* Top Status Bar of iPhone */}
          <div className="h-6 flex justify-between items-center text-[9px] text-slate-400 font-mono px-4 pt-1 z-20">
            <span>09:41 AM</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3" />
              <span>{wifiSignal ? 'LTE' : 'Offline'}</span>
              <div className="w-4.5 h-2.5 border rounded-sm p-0.5 flex items-center">
                <div className="h-full bg-slate-400 w-3 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* Overlay Push Notification message */}
          <AnimatePresence>
            {notifTriggered && (
              <motion.div 
                className="absolute top-8 left-3 right-3 bg-slate-900/95 text-white p-3 rounded-2xl z-40 border border-slate-800 shadow-xl"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
              >
                <div className="flex items-center gap-2 text-[9px] text-emerald-400 font-bold mb-1">
                  <Zap className="w-3.5 h-3.5" /> CARBONPULSE ALERTER
                </div>
                <p className="text-[10px] text-slate-200 leading-tight">Your daily streak is safe! Doing Vegetarian lunch today spared 2.3 kg CO2e.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inside App Content screen */}
          <div className="flex-grow bg-slate-900 text-slate-100 rounded-[28px] overflow-hidden flex flex-col relative">
            
            {activeScreen === 'home' && (
              <div className="p-4 flex-grow flex flex-col justify-between">
                
                {/* Header */}
                <div className="space-y-1 mt-3">
                  <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-black block">Dashboard</span>
                  <div className="flex justify-between items-center">
                    <strong className="text-normal font-sans tracking-tight">My Footprint</strong>
                    <span className="text-[8px] bg-slate-800 text-emerald-500 px-1.5 py-0.5 rounded-full font-bold">Grade B+</span>
                  </div>
                </div>

                {/* Main Dial Hero */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700/30 p-4 rounded-2xl text-center shadow-lg my-3">
                  <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Pulse Tracker</span>
                  <strong className="text-3xl font-sans font-extrabold text-emerald-400 tracking-tighter mt-1 block">85</strong>
                  <span className="text-[9px] text-slate-300 block mt-1">1.8 kg CO2e saved today</span>
                </div>

                {/* Quick Activities */}
                <div className="space-y-2 flex-grow">
                  <span className="text-[8px] uppercase text-slate-500 font-bold tracking-wider block">Telemetry integrations</span>
                  {[
                    { label: 'Uber ride auto-logged', value: '+0.5 kg' },
                    { label: 'Utility electric reading', value: '42 kWh' }
                  ].map((act, i) => (
                    <div key={i} className="p-2 bg-slate-800/50 rounded-xl flex justify-between items-center text-[9px]">
                      <span className="text-slate-300">{act.label}</span>
                      <span className="font-mono text-emerald-400 font-bold">{act.value}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Screen navigation bar */}
                <div className="flex justify-around items-center pt-2 border-t border-slate-800 text-[10px] text-slate-400 mt-auto">
                  <button onClick={() => setActiveScreen('home')} className="text-emerald-400">Home</button>
                  <button onClick={() => setActiveScreen('scanner')} className="hover:text-white">QR Scan</button>
                </div>

              </div>
            )}

            {activeScreen === 'scanner' && (
              <div className="p-4 flex-grow flex flex-col">
                <span className="text-[9px] text-sky-400 uppercase tracking-widest font-black block mt-3 mb-1">Scanning</span>
                <strong className="text-xs">QR Scanner Camera</strong>
                <p className="text-[9px] text-slate-400 mt-0.5 mb-4">Aim camera at shared partner challenges QR codes.</p>

                <div className="flex-grow flex items-center justify-center relative">
                  {/* Mock camera view */}
                  <div className="w-36 h-36 border-2 border-dashed border-sky-400/80 rounded-xl relative flex flex-col items-center justify-center bg-slate-800">
                    <Camera className="w-8 h-8 text-sky-400/60" />
                    {mockLoading ? (
                      <span className="text-[8px] text-slate-400 font-mono mt-2">Connecting lens...</span>
                    ) : qrScanned ? (
                      <span className="text-[8px] text-emerald-400 font-mono font-bold mt-2">SCAN RECOGNIZED +50GP</span>
                    ) : (
                      <button
                        onClick={handleQRScan}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-[8px] px-2.5 py-1 rounded-sm mt-3"
                      >
                        Capture Code
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Screen nav */}
                <div className="flex justify-around items-center pt-2 border-t border-slate-800 text-[10px] text-slate-400 mt-auto">
                  <button onClick={() => setActiveScreen('home')} className="hover:text-white">Home</button>
                  <button onClick={() => setActiveScreen('scanner')} className="text-sky-400">QR Scan</button>
                </div>
              </div>
            )}

          </div>

          {/* Core bottom bar indicator of iPhone */}
          <div className="h-4 flex items-center justify-center z-20">
            <div className="w-20 bg-slate-400 h-1 rounded-full"></div>
          </div>

        </div>

      </div>

      {/* Explanatory detail of the mobile client */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" /> Fully Native Mobile Integration
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          The CarbonPulse application acts responsively on iOS and Android viewports. Enjoy identical, full carbon factor telemetry options, real-time push alerts to bypass footprint slumps, and instant camera uploads to keep progress constant whether traveling, at work, or dining out.
        </p>
      </div>

    </div>
  );
}
