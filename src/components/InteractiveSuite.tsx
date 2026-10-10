import React from 'react';
import { StationData } from '../types';
import { DelhiAqiMap } from './DelhiAqiMap';
import { SchoolSafetyPanel } from './SchoolSafetyPanel';
import { StubblePlumeTracker } from './StubblePlumeTracker';
import { ExposureDosimeter } from './ExposureDosimeter';
import { IndoorAirSimulator } from './IndoorAirSimulator';
import { Wind, School, Flame, Compass, Home, Sparkles } from 'lucide-react';

interface InteractiveSuiteProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stations: StationData[];
  selectedStation: StationData;
  onSelectStation: (station: StationData) => void;
}

export const InteractiveSuite: React.FC<InteractiveSuiteProps> = ({
  activeTab,
  setActiveTab,
  stations,
  selectedStation,
  onSelectStation,
}) => {
  // If activeTab is 'hero', default the suite to 'map'
  const currentTool = activeTab === 'hero' ? 'map' : activeTab;

  return (
    <section id="interactive-suite" className="py-16 bg-[#fcfcfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading & Pill Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>LIVE TELEMETRY & POLICY ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Interactive Air Intelligence Suite
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Select any tool below to evaluate live CPCB station data, simulate school closure rules in AWS Cedar, or plan clean commute routes.
            </p>
          </div>

          {/* Active Tool Status Indicator */}
          <div className="flex items-center space-x-2.5 bg-gray-100/90 border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold text-gray-800 self-start md:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {currentTool === 'map' && '📍 Delhi-NCR Monitoring Grid'}
              {currentTool === 'school' && '🏫 AWS Cedar Policy Decision Point'}
              {currentTool === 'stubble' && '🌾 Satellite Stubble Plume Tracker'}
              {currentTool === 'commute' && '🚶 Commute Bio-Dosimeter'}
              {currentTool === 'indoor' && '🏠 CADR Air Purifier Lab'}
            </span>
          </div>
        </div>

        {/* Dynamic Tool Content in a Sleek Container */}
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-800 text-slate-100">
          {currentTool === 'map' && (
            <DelhiAqiMap
              stations={stations}
              selectedStation={selectedStation}
              onSelectStation={onSelectStation}
            />
          )}

          {currentTool === 'school' && (
            <SchoolSafetyPanel currentStation={selectedStation} />
          )}

          {currentTool === 'stubble' && (
            <StubblePlumeTracker />
          )}

          {currentTool === 'commute' && (
            <ExposureDosimeter stations={stations} />
          )}

          {currentTool === 'indoor' && (
            <IndoorAirSimulator currentStation={selectedStation} />
          )}
        </div>
      </div>
    </section>
  );
};
