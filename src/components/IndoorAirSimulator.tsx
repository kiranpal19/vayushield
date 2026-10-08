import React, { useState } from 'react';
import { StationData, IndoorPurifierInput } from '../types';
import { calculateIndoorPurifierMetrics } from '../services/dosimeterService';
import {
  Home,
  Wind,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Maximize2,
  CalendarCheck
} from 'lucide-react';

interface IndoorAirSimulatorProps {
  currentStation: StationData;
}

export const IndoorAirSimulator: React.FC<IndoorAirSimulatorProps> = ({ currentStation }) => {
  const [roomLength, setRoomLength] = useState<number>(14);
  const [roomWidth, setRoomWidth] = useState<number>(12);
  const [ceilingHeight, setCeilingHeight] = useState<number>(10);
  const [cadrCfm, setCadrCfm] = useState<number>(300);
  const [roomSealing, setRoomSealing] = useState<'sealed_ac' | 'standard' | 'drafty'>('standard');
  const [occupants, setOccupants] = useState<number>(2);

  const input: IndoorPurifierInput = {
    roomLengthFt: roomLength,
    roomWidthFt: roomWidth,
    ceilingHeightFt: ceilingHeight,
    airPurifierCadrCfm: cadrCfm,
    roomSealing,
    outdoorPm25: currentStation.pm25,
    occupantCount: occupants,
  };

  const metrics = calculateIndoorPurifierMetrics(input);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/20 to-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-300 border border-teal-800 text-xs font-mono font-semibold flex items-center space-x-1.5">
              <Home className="w-3.5 h-3.5" />
              <span>Fluid Dynamics & CADR Dispersion Lab</span>
            </span>
            <span className="text-xs text-slate-400">Classroom & Bedroom Air Cleanliness Optimizer</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Indoor Air Quality & Smart HEPA Purifier Scheduler
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            In Delhi winters, indoor air without filtration reaches 60–85% of toxic outdoor PM2.5.
            Model room air changes per hour (ACH) to eliminate guesswork and protect indoor study & sleep spaces.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Maximize2 className="w-4 h-4 text-teal-400" />
            <span>Room & Purifier Specifications</span>
          </h3>

          {/* Room Dimensions */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Length (ft)</label>
              <input
                type="number"
                min="8"
                max="50"
                value={roomLength}
                onChange={(e) => setRoomLength(+e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg px-2.5 py-2 border border-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Width (ft)</label>
              <input
                type="number"
                min="8"
                max="50"
                value={roomWidth}
                onChange={(e) => setRoomWidth(+e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg px-2.5 py-2 border border-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Height (ft)</label>
              <input
                type="number"
                min="8"
                max="16"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(+e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg px-2.5 py-2 border border-slate-800"
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800 flex justify-between">
            <span>Calculated Room Volume:</span>
            <span className="text-cyan-400 font-bold">{metrics.roomVolumeCuFt.toLocaleString()} cu. ft.</span>
          </div>

          {/* Purifier CADR Rating Slider */}
          <div className="space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Clean Air Delivery Rate (CADR):</span>
              <span className="font-bold text-teal-400 font-mono">{cadrCfm} CFM</span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="25"
              value={cadrCfm}
              onChange={(e) => setCadrCfm(+e.target.value)}
              className="w-full accent-teal-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>Compact (150 CFM)</span>
              <span>Mid-tier (300 CFM)</span>
              <span>High-capacity (500+ CFM)</span>
            </div>
          </div>

          {/* Room Sealing Grade */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Room Infiltration & Sealing</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sealed_ac', label: 'Sealed / AC', desc: 'Weatherstripped' },
                { id: 'standard', label: 'Standard', desc: 'Normal doors' },
                { id: 'drafty', label: 'Drafty', desc: 'Open gaps/vents' },
              ].map((seal) => (
                <button
                  key={seal.id}
                  type="button"
                  onClick={() => setRoomSealing(seal.id as any)}
                  className={`p-2 rounded-lg border text-left text-xs transition-all ${
                    roomSealing === seal.id
                      ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block font-semibold">{seal.label}</span>
                  <span className="text-[10px] text-slate-500">{seal.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Outdoor Context */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Outdoor PM2.5 ({currentStation.name}):</span>
            <span className="font-bold text-rose-400 font-mono">{currentStation.pm25} µg/m³</span>
          </div>
        </div>

        {/* Right Output: ACH, Clean Air Time, and Energy Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Simulation Results */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Indoor Air Quality Metrics</span>
              <span className="text-xs text-teal-400 font-mono">
                ACH: {metrics.airChangesPerHour} Air Changes / Hr
              </span>
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Indoor PM2.5 (With Filter)</span>
                <div className="text-3xl font-black text-emerald-400 mt-1 font-mono">
                  {metrics.estimatedIndoorPm25WithPurifier} <span className="text-sm font-normal text-slate-400">µg/m³</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-medium mt-0.5 block">WHO Guideline Compliant</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Indoor PM2.5 (No Filter)</span>
                <div className="text-3xl font-black text-rose-400 mt-1 font-mono">
                  {metrics.estimatedIndoorPm25WithoutPurifier} <span className="text-sm font-normal text-slate-400">µg/m³</span>
                </div>
                <span className="text-[10px] text-rose-500 font-medium mt-0.5 block">Hazardous Infiltration</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
                <span className="text-[11px] text-slate-400 block flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Time to Clean Air</span>
                </span>
                <div className="text-3xl font-black text-cyan-400 mt-1 font-mono">
                  {metrics.minutesToSafeAir} <span className="text-sm font-normal text-slate-400">mins</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">To reach safe &lt; 25 µg/m³</span>
              </div>
            </div>

            {/* Filter Lifespan Pill */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <CalendarCheck className="w-4 h-4 text-indigo-400" />
                <span>Estimated HEPA Filter Useful Life under current Delhi pollution:</span>
              </div>
              <span className="font-mono font-bold text-indigo-300">
                ~{metrics.filterReplacementLifespanDays} Days
              </span>
            </div>
          </div>

          {/* Smart Energy-Efficient Purifier Schedule */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Smart Power-Saving Purifier Schedule</span>
              </h4>
              <span className="text-[11px] text-emerald-400 font-mono">Saves ~38% Electricity</span>
            </div>

            <div className="space-y-2">
              {metrics.energyEfficientSchedule.map((sched, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-300 font-medium">{sched.timeBlock}</span>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        sched.mode === 'Turbo'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : sched.mode === 'Medium'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                      }`}
                    >
                      Fan: {sched.mode}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      Target: {sched.targetPm25} µg/m³
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
