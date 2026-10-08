import React, { useState } from 'react';
import { StationData, CommuteDosimeterInput, CommuteMode, MaskType } from '../types';
import { calculateCommuteDosage } from '../services/dosimeterService';
import {
  Compass,
  Train,
  Car,
  Bus,
  Footprints,
  Bike,
  ShieldAlert,
  Cigarette,
  HeartPulse,
  Activity,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ExposureDosimeterProps {
  stations: StationData[];
}

export const ExposureDosimeter: React.FC<ExposureDosimeterProps> = ({ stations }) => {
  const [originId, setOriginId] = useState<string>('dtu-bawana');
  const [destId, setDestId] = useState<string>('mandir-marg');
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [commuteMode, setCommuteMode] = useState<CommuteMode>('auto_rickshaw');
  const [maskType, setMaskType] = useState<MaskType>('none');
  const [userAgeGroup, setUserAgeGroup] = useState<'child' | 'adult' | 'senior'>('adult');
  const [hasAsthma, setHasAsthma] = useState<boolean>(false);

  const originStation = stations.find((s) => s.id === originId) || stations[0];
  const destStation = stations.find((s) => s.id === destId) || stations[1];

  const avgStationAqi = Math.round((originStation.aqi + destStation.aqi) / 2);
  const avgStationPm25 = Math.round((originStation.pm25 + destStation.pm25) / 2);

  const input: CommuteDosimeterInput = {
    originStationId: originId,
    destinationStationId: destId,
    durationMinutes,
    commuteMode,
    maskType,
    userAgeGroup,
    hasRespiratoryCondition: hasAsthma,
  };

  const result = calculateCommuteDosage(input, avgStationAqi, avgStationPm25);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 text-xs font-mono font-semibold flex items-center space-x-1.5">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Bio-Dosimetric Lung Deposition Calculator</span>
            </span>
            <span className="text-xs text-slate-400">Personalized Delhi Commuter Risk Assessor</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Commute Exposure Dosimeter & Cigarette-Equivalent Health Index
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Outdoor AQI alone doesn't tell the whole story. Your physical breathing rate, transport cabin filtration, and respirator mask determine how many micrograms of fine toxic soot settle in your alveoli.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Trip & Vulnerability Profile</span>
          </h3>

          {/* Origin & Destination */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Trip Origin</label>
              <select
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg px-2.5 py-2 border border-slate-800 focus:outline-none"
              >
                {stations.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (AQI {s.aqi})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Destination</label>
              <select
                value={destId}
                onChange={(e) => setDestId(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg px-2.5 py-2 border border-slate-800 focus:outline-none"
              >
                {stations.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (AQI {s.aqi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Commute Duration */}
          <div className="space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Commute Duration:</span>
              <span className="font-bold text-cyan-400 font-mono">{durationMinutes} Minutes</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(+e.target.value)}
              className="w-full accent-cyan-500"
            />
          </div>

          {/* Commute Mode Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Transport Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'metro', label: 'Metro (AC)', icon: Train },
                { id: 'car_ac', label: 'AC Car', icon: Car },
                { id: 'bus_nonac', label: 'Bus', icon: Bus },
                { id: 'auto_rickshaw', label: 'Auto', icon: Car },
                { id: 'bicycle', label: 'Bicycle', icon: Bike },
                { id: 'walking', label: 'Walking', icon: Footprints },
              ].map((mode) => {
                const Icon = mode.icon;
                const isSelected = commuteMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setCommuteMode(mode.id as CommuteMode)}
                    className={`p-2 rounded-lg border text-center text-xs transition-all flex flex-col items-center space-y-1 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] font-medium">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mask Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Respirator / Mask Worn</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'none', label: 'No Mask (0%)' },
                { id: 'cloth', label: 'Cloth (20%)' },
                { id: 'surgical', label: 'Surgical (45%)' },
                { id: 'n95', label: 'N95 / FFP2 (95%)' },
              ].map((mask) => (
                <button
                  key={mask.id}
                  type="button"
                  onClick={() => setMaskType(mask.id as MaskType)}
                  className={`p-2 rounded-lg border text-center text-[10px] font-medium transition-all ${
                    maskType === mask.id
                      ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {mask.label}
                </button>
              ))}
            </div>
          </div>

          {/* Demographic & Asthma */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Age Bracket:</span>
              <div className="flex space-x-1">
                {(['child', 'adult', 'senior'] as const).map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setUserAgeGroup(age)}
                    className={`px-2.5 py-1 rounded text-xs capitalize ${
                      userAgeGroup === age
                        ? 'bg-cyan-900 text-white font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="asthma"
                checked={hasAsthma}
                onChange={(e) => setHasAsthma(e.target.checked)}
                className="rounded border-slate-700 text-rose-600 focus:ring-0"
              />
              <label htmlFor="asthma" className="text-xs text-slate-300 cursor-pointer">
                Pre-existing Asthma, Bronchitis, or COPD
              </label>
            </div>
          </div>
        </div>

        {/* Right Dosage & Health Impact Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Dosimeter Results Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">Total Route Toxicity Dose</span>
                <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>{originStation.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span>{destStation.name}</span>
                </h4>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  result.riskLevel === 'Hazardous'
                    ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                    : result.riskLevel === 'Severe'
                    ? 'bg-red-950 text-red-300 border-red-800'
                    : result.riskLevel === 'High'
                    ? 'bg-orange-950 text-orange-300 border-orange-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}
              >
                {result.riskLevel} Health Risk
              </span>
            </div>

            {/* Huge Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Inhaled PM2.5 Dose</span>
                <div className="text-3xl font-black text-rose-400 mt-1 font-mono">
                  {result.totalPm25DosageUg} <span className="text-sm font-normal text-slate-400">µg</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Alveolar particulate load</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block flex items-center space-x-1">
                  <Cigarette className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cigarette Equiv.</span>
                </span>
                <div className="text-3xl font-black text-amber-400 mt-1 font-mono">
                  {result.cigaretteEquivalence} <span className="text-sm font-normal text-slate-400">cigs</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Berkeley Earth formula</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
                <span className="text-[11px] text-slate-400 block flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Air Inhaled</span>
                </span>
                <div className="text-3xl font-black text-cyan-400 mt-1 font-mono">
                  {result.inhaledAirVolumeLiters} <span className="text-sm font-normal text-slate-400">Liters</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Tidal respiratory volume</span>
              </div>
            </div>

            {/* Harm Reduction Recommendation Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-slate-950 border border-emerald-800/60 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Harm Reduction Optimization</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {result.cleanAirRecommendation}
              </p>
              {result.potentialDosageSavedUg > 0 && (
                <div className="pt-2 border-t border-emerald-950 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Potential Particulate Dosage Saved:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    -{result.potentialDosageSavedUg} µg ({(result.potentialDosageSavedUg / 220).toFixed(1)} fewer cigarettes)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Diurnal Inversion Safe-Window Guide */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Delhi Diurnal Smog Inversion Windows</span>
            </h4>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/60 text-center">
                <span className="text-[10px] text-rose-300 font-bold block">06:00 - 09:30 AM</span>
                <span className="text-xs font-bold text-rose-400 mt-0.5 block">Severe Inversion Peak</span>
                <span className="text-[10px] text-slate-400">Cold air traps exhaust at surface</span>
              </div>

              <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/60 text-center">
                <span className="text-[10px] text-emerald-300 font-bold block">11:30 AM - 03:30 PM</span>
                <span className="text-xs font-bold text-emerald-400 mt-0.5 block">Best Transit Window</span>
                <span className="text-[10px] text-slate-400">Solar boundary layer lifts</span>
              </div>

              <div className="bg-orange-950/40 p-2.5 rounded-lg border border-orange-900/60 text-center">
                <span className="text-[10px] text-orange-300 font-bold block">06:00 - 10:00 PM</span>
                <span className="text-xs font-bold text-orange-400 mt-0.5 block">Traffic + Cooling Trap</span>
                <span className="text-[10px] text-slate-400">Heavy truck entry starts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
