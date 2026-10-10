import React from 'react';
import { Wind, Cloud, ShieldAlert, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-[#fcfcfb]/85 backdrop-blur-md border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name (Aeline style) */}
          <div 
            onClick={() => { setActiveTab('hero'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Wind className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
                  VayuShield
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                  Air Intelligence
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Realtime Environmental Protection</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center bg-gray-100/80 p-1 rounded-full border border-gray-200/70 space-x-0.5">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'map', label: 'Air Grid' },
              { id: 'school', label: 'School Safety' },
              { id: 'stubble', label: 'Stubble Radar' },
              { id: 'commute', label: 'Commute Dosimeter' },
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
                  className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                    isActive
                      ? 'bg-white text-gray-950 font-bold shadow-sm'
                      : 'text-gray-600 font-medium hover:text-gray-950 hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center space-x-3">
            {/* Episode Switcher Pill */}
            <div className="hidden sm:flex items-center bg-gray-100/90 rounded-full p-1 border border-gray-200 text-xs">
              <select
                value={selectedEpisode}
                onChange={(e) => setSelectedEpisode(e.target.value)}
                className="bg-transparent text-gray-700 font-medium text-xs px-2.5 py-1 focus:outline-none cursor-pointer"
              >
                <option value="winter_severe">Delhi Smog (Severe)</option>
                <option value="stubble_spike">Stubble Surge (Punjab/HR)</option>
                <option value="moderate_breeze">Post-Rain Window</option>
              </select>
            </div>

            {/* AWS Tech Stack Pill */}
            <button
              onClick={onOpenAwsModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 shadow-sm transition-all"
            >
              <Cloud className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">AWS Open Source</span>
              <span className="sm:hidden">AWS</span>
            </button>

            {/* Live Status Button (matching the lime button in the reference screenshot) */}
            <button
              onClick={() => {
                setActiveTab('school');
                onScrollToTool('school');
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#c6f254] hover:bg-[#b8e841] text-gray-950 shadow-sm transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>AQI {delhiAverageAqi} • Stage III</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
