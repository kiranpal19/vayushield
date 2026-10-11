import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Train,
  CheckCircle2,
  Search,
  School,
  Play,
  HeartHandshake
} from 'lucide-react';
import { StationData } from '../types';

interface HeroSectionProps {
  stations: StationData[];
  onSelectStation: (stationId: string) => void;
  onExploreSuite: (tabId: string) => void;
  onOpenAwsModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stations,
  onSelectStation,
  onExploreSuite,
  onOpenAwsModal,
}) => {
  const [selectedPinStation, setSelectedPinStation] = useState<string>('rohini-bawana');

  return (
    <section className="relative pt-6 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tag Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MISSION CLEAN AIR • REALTIME DELHI-NCR DEFENSE</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold text-gray-900 tracking-tight leading-[1.08]">
              Breathe <span className="text-emerald-600 font-extrabold">Clean</span>,<br />
              Defend <span className="text-emerald-700">Every Breath.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl font-normal leading-relaxed">
              When hazardous winter smog inversions grip Delhi-NCR, VayuShield combines <strong className="text-gray-900 font-semibold">satellite farm fire telemetry</strong>, <strong className="text-gray-900 font-semibold">AWS Cedar policy-as-code</strong>, and <strong className="text-gray-900 font-semibold">lung bio-dosimetry</strong> to protect classrooms and commuters before toxic particulate settles in human lungs.
            </p>

            {/* Pill Search / Action Bar */}
            <div className="pt-2 max-w-xl">
              <div className="p-1.5 bg-white rounded-full border border-gray-300/80 shadow-lg shadow-gray-200/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 flex items-center px-4 py-2">
                  <Search className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                  <select
                    value={selectedPinStation}
                    onChange={(e) => {
                      setSelectedPinStation(e.target.value);
                      onSelectStation(e.target.value);
                    }}
                    className="w-full bg-transparent text-sm text-gray-800 font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="rohini-bawana">📍 Rohini / Bawana (North Delhi)</option>
                    <option value="anand-vihar">📍 Anand Vihar ISBT (East Delhi)</option>
                    <option value="ito">📍 ITO Intersection (Central Delhi)</option>
                    <option value="dwarka-sec8">📍 Dwarka Sector 8 (West Delhi)</option>
                    <option value="rk-puram">📍 R.K. Puram (South Delhi)</option>
                    <option value="wazirpur">📍 Wazirpur Industrial Area</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    onSelectStation(selectedPinStation);
                    onExploreSuite('school');
                  }}
                  className="px-6 py-3 rounded-full bg-gray-950 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-md shrink-0 hover:shadow-lg"
                >
                  <span>Simulate Air Defense</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Social Proof Pill (matching the avatar row in reference) */}
              <div className="flex items-center space-x-3 mt-4 px-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Student"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Principal"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="Citizen"
                  />
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Safeguarding <span className="font-bold text-gray-800">5,000+ Delhi schools</span>, universities, and daily commuters.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Overlapping Glass Cards (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* The Main Hero Visual Card with Guaranteed Atmospheric Background */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 h-[500px] isolate [transform:translateZ(0)] bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f172a]">
              {/* Atmospheric Background SVG Illustration (Always visible even offline) */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full object-cover opacity-60" viewBox="0 0 500 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="sunGlow" cx="70%" cy="20%" r="60%">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#86efac" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#34d399" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                  {/* Sun / Sky Light */}
                  <rect width="100%" height="100%" fill="url(#sunGlow)" />
                  <rect width="100%" height="100%" fill="url(#mistGrad)" />
                  {/* Mountain & Forest Silhouettes */}
                  <path d="M0 320 Q120 260 250 300 T500 280 L500 500 L0 500 Z" fill="#065f46" opacity="0.7" />
                  <path d="M0 370 Q160 310 320 350 T500 330 L500 500 L0 500 Z" fill="#044e39" opacity="0.85" />
                  <path d="M0 420 Q200 370 380 400 T500 390 L500 500 L0 500 Z" fill="#022c22" opacity="0.95" />
                  {/* Subtle Wind Wave Lines */}
                  <path d="M-50 180 Q100 140 250 190 T550 160" stroke="#a7f3d0" strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="6 6" />
                  <path d="M-50 220 Q120 180 280 230 T550 200" stroke="#67e8f9" strokeWidth="1.5" fill="none" opacity="0.25" strokeDasharray="8 8" />
                </svg>
              </div>

              {/* High-Res Nature Canopy Photo (With automatic silent fallback) */}
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80"
                alt="Clean Forest Sky"
                onError={(e) => {
                  // Silently hide image if offline or blocked so background SVG/gradient shines through
                  e.currentTarget.style.display = 'none';
                }}
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 hover:scale-105 [backface-visibility:hidden]"
              />

              {/* Dark vignette gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

              {/* Floating Pill Top Left */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-lg flex items-center space-x-2 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-gray-900">Live Telemetry Node</span>
                <span className="text-[11px] text-gray-500 font-medium">Online</span>
              </div>

              {/* Overlapping Feature Cards on the Right (exact match to Aeline reference cards) */}
              <div className="absolute bottom-6 inset-x-6 space-y-2.5">
                {/* Feature 1 */}
                <div
                  onClick={() => onExploreSuite('school')}
                  className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between cursor-pointer hover:bg-white transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        School Air Safety & GRAP
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        AWS Cedar evaluates outdoor sports bans & hybrid classes.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Feature 2 */}
                <div
                  onClick={() => onExploreSuite('stubble')}
                  className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between cursor-pointer hover:bg-white transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-800 shrink-0">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                        Satellite Stubble Radar
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        18-hour early warning before Punjab smoke reaches Delhi.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
                </div>

                {/* Feature 3 */}
                <div
                  onClick={() => onExploreSuite('commute')}
                  className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between cursor-pointer hover:bg-white transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-800 shrink-0">
                      <Train className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-sky-700 transition-colors">
                        Commute Dosimeter
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        -85% lung particle intake using Metro + N95 routing.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metrics Cards Row (matching the 520K+, 120+, 350+, 100% in reference image) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
              40+
            </span>
            <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">
              Continuous Stations
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Real-time CPCB telemetry grid</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight font-sans">
              18 Hrs
            </span>
            <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">
              Plume Early Warning
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Satellite flight-time vectors</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
              85%
            </span>
            <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">
              Dosage Saved
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Metro + N95 commuter routing</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight font-sans">
              100%
            </span>
            <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">
              AWS Open Source
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Cedar Policy Engine & SAM</p>
          </div>
        </div>
      </div>
    </section>
  );
};
