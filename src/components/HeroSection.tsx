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
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>TOGETHER FOR CLEANER AIR • DELHI-NCR AIRSHED</span>
            </div>

            {/* Giant Title (matching 'Save Nature, Save Tomorrow') */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold text-gray-900 tracking-tight leading-[1.08]">
              Breathe <span className="text-emerald-600 font-extrabold">Easier</span>,<br />
              Protect <span className="text-emerald-700">Tomorrow.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl font-normal leading-relaxed">
              We combine <strong className="text-gray-900 font-semibold">AWS open-source Cedar policies</strong>, real-time CPCB telemetry, and satellite farm fire detection to safeguard students, schools, and commuters across Delhi-NCR.
            </p>

            {/* Pill Search / Action Bar (matching the email + Join Us pill in reference) */}
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
                    className="w-full bg-transparent text-sm text-gray-800 font-medium focus:outline-none cursor-pointer"
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
                  className="px-6 py-3 rounded-full bg-gray-900 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-md shrink-0"
                >
                  <span>Check GRAP Rules</span>
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
            {/* The Main Hero Visual Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-gray-900 h-[480px] isolate [transform:translateZ(0)]">
              <img
                src="https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&auto=format&fit=crop&q=80"
                alt="Clean Forest Sky vs Smog"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105 [backface-visibility:hidden]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/20" />

              {/* Floating Pill Top Left */}
              <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/40 shadow-lg flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
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
