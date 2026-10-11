import React from 'react';
import { Wind, Cloud, ArrowUpRight, Activity, ShieldCheck, Flame, Compass, Home } from 'lucide-react';
import { GrapStage } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  delhiAverageAqi: number;
  dominantGrapStage: GrapStage;
  selectedEpisode: string;
  setSelectedEpisode: (episode: string) => void;
  onOpenAwsModal: () => void;
  onScrollToTool: (toolId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  delhiAverageAqi,
  dominantGrapStage,
  selectedEpisode,
  setSelectedEpisode,
  onOpenAwsModal,
  onScrollToTool,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Atmospheric Defense Label */}
          <div 
            onClick={() => { setActiveTab('hero'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-all duration-300">
              <Wind className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-gray-950 group-hover:text-emerald-700 transition-colors">
                  VayuShield
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 uppercase tracking-widest">
                  AIR DEFENSE AI
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Hyperlocal Pollution Defense & Policy Engine</p>
            </div>
          </div>

          {/* Navigation Links with Cool Hover & Sleek Pill Highlight */}
          <nav className="hidden lg:flex items-center bg-gray-100/90 p-1 rounded-full border border-gray-200/80 shadow-inner">
            {[
              { id: 'hero', label: 'Overview' },
              { id: 'map', label: 'Live AQI Grid' },
              { id: 'school', label: 'School Air Safety' },
              { id: 'stubble', label: 'Smoke Plume Radar' },
              { id: 'commute', label: 'Lung Dosimeter' },
              { id: 'indoor', label: 'Purifier Lab' },
            ].map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    onScrollToTool(link.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gray-950 text-white font-bold shadow-md shadow-gray-950/20 scale-[1.02]'
                      : 'text-gray-600 font-medium hover:text-emerald-800 hover:bg-emerald-500/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area - Crisp High-Tech Badges */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Smog Simulation Dropdown */}
            <div className="hidden xl:flex items-center bg-white rounded-full px-3 py-1.5 border border-gray-200 text-xs shadow-sm hover:border-gray-300 transition-colors">
              <span className="text-gray-400 text-[11px] mr-1.5 font-mono">SIM:</span>
              <select
                value={selectedEpisode}
                onChange={(e) => setSelectedEpisode(e.target.value)}
                className="bg-transparent text-gray-800 font-semibold text-xs focus:outline-none cursor-pointer pr-1"
              >
                <option value="winter_severe">Severe Winter Smog (400+)</option>
                <option value="stubble_spike">Stubble Burning Influx</option>
                <option value="moderate_breeze">Post-Rain Dispersal</option>
              </select>
            </div>

            {/* AWS Architecture Pill */}
            <button
              onClick={onOpenAwsModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-amber-50/60 text-gray-800 border border-gray-300/90 shadow-sm hover:border-amber-400 hover:text-amber-800 transition-all shrink-0 whitespace-nowrap"
            >
              <Cloud className="w-3.5 h-3.5 text-amber-500" />
              <span>AWS Stack</span>
            </button>

            {/* High-Tech Telemetry Status Radar Pill */}
            <button
              onClick={() => {
                setActiveTab('school');
                onScrollToTool('school');
              }}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-rose-50 hover:bg-rose-100/80 text-rose-800 border border-rose-300/90 shadow-sm hover:shadow transition-all shrink-0 whitespace-nowrap group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              <span>AQI {delhiAverageAqi} • STAGE III</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
