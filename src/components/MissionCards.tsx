import React from 'react';
import { School, Flame, Compass, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface MissionCardsProps {
  onSelectFeature: (tabId: string) => void;
  onOpenAwsModal: () => void;
}

export const MissionCards: React.FC<MissionCardsProps> = ({ onSelectFeature, onOpenAwsModal }) => {
  return (
    <section className="py-16 bg-[#f7f7f5] border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>SYSTEMIC ENVIRONMENTAL ACTION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              We're Building an <span className="text-emerald-600 font-extrabold">Intelligent</span>,<br />
              Actionable Air Shield for Delhi.
            </h2>

            <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
              When bad air days arrive, guesswork costs children's lung capacity and disrupts municipal life.
              VayuShield transforms scattered raw sensors into deterministic policies, automated warnings, and verifiable protection.
            </p>
          </div>

          <div className="lg:col-span-4 flex items-center space-x-3 justify-start lg:justify-end">
            <button
              onClick={() => onSelectFeature('school')}
              className="px-5 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all shadow-md"
            >
              <span>Explore Interactive Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAwsModal}
              className="px-5 py-3 rounded-full bg-white hover:bg-gray-100 text-gray-800 text-xs sm:text-sm font-bold border border-gray-300 shadow-sm transition-all"
            >
              AWS Stack
            </button>
          </div>
        </div>

        {/* 3 Tall Vertical Cards (Exact match to middle row of reference image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: School Air Safety */}
          <div
            onClick={() => onSelectFeature('school')}
            className="group relative rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 h-[460px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-end p-7 bg-gradient-to-br from-[#064e3b] via-[#043327] to-[#0f172a]"
          >
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop&q=80"
              alt="School Campus"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 mix-blend-overlay"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

            {/* Content over image */}
            <div className="relative space-y-3 z-10">
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-emerald-800 shadow-md">
                <School className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                School Safety & GRAP
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                AWS Cedar evaluates statutory Delhi DoE rules. Suspends physical outdoor sports and switches classes to hybrid learning when AQI &gt; 400.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-emerald-400 group-hover:underline">
                <span>Evaluate Cedar Policy</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Stubble Radar */}
          <div
            onClick={() => onSelectFeature('stubble')}
            className="group relative rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 h-[460px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-end p-7 bg-gradient-to-br from-[#7c2d12] via-[#431407] to-[#0f172a]"
          >
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&auto=format&fit=crop&q=80"
              alt="Stubble farm fires"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

            <div className="relative space-y-3 z-10">
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-orange-600 shadow-md">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                Stubble Plume Radar
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Detects upwind thermal clusters in Punjab and Haryana via NASA satellites with 18-hour advance smoke plume trajectory modeling.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-orange-400 group-hover:underline">
                <span>View Plume Trajectory</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Commute Dosimeter & Indoor CADR */}
          <div
            onClick={() => onSelectFeature('commute')}
            className="group relative rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 h-[460px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-end p-7 bg-gradient-to-br from-[#0369a1] via-[#082f49] to-[#0f172a]"
          >
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&auto=format&fit=crop&q=80"
              alt="Delhi Metro & Urban Commute"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

            <div className="relative space-y-3 z-10">
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-sky-700 shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                Commute & Indoor Defense
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Translates ambient smog into inhaled lung micrograms and cigarette equivalents. Optimizes HEPA room purifiers to cut 40% power.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-sky-400 group-hover:underline">
                <span>Calculate Your Dosage</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
