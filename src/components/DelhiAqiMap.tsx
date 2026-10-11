import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { StationData } from '../types';
import { getAqiColor, getAqiBadgeClass } from '../services/aqiDataService';
import { Wind, Thermometer, Droplets, AlertOctagon, Search, Navigation } from 'lucide-react';

interface DelhiAqiMapProps {
  stations: StationData[];
  selectedStation: StationData;
  onSelectStation: (station: StationData) => void;
}

// Helper to pan map when a station is clicked from the list
const ChangeMapView: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 12, { animate: true });
  return null;
};

export const DelhiAqiMap: React.FC<DelhiAqiMapProps> = ({
  stations,
  selectedStation,
  onSelectStation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');

  const filteredStations = stations.filter((station) => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'All' || station.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Map view (8 cols) */}
      <div className="lg:col-span-8 flex flex-col space-y-4">
        {/* Top Summary Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Delhi-NCR Continuous Air Monitoring Grid</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                {stations.length} Active CPCB Telemetry Nodes
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Covering major transport corridors, residential zones, and industrial clusters.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">AQI Scale:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-medium border border-emerald-800">
              0-100 Good
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-medium border border-amber-800">
              101-200 Mod
            </span>
            <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-300 font-medium border border-orange-800">
              201-300 Poor
            </span>
            <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 font-medium border border-red-800">
              301-400 V.Poor
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-medium border border-rose-800">
              400+ Severe
            </span>
          </div>
        </div>

        {/* Leaflet Map Card */}
        <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-[540px] shadow-2xl">
          <MapContainer
            center={[selectedStation.lat, selectedStation.lng]}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <ChangeMapView coords={[selectedStation.lat, selectedStation.lng]} />
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              maxZoom={16}
            />

            {stations.map((st) => {
              const color = getAqiColor(st.aqi);
              const isSelected = selectedStation.id === st.id;
              const isNorthNode = st.id === 'rohini-bawana';

              return (
                <CircleMarker
                  key={st.id}
                  center={[st.lat, st.lng]}
                  radius={isSelected ? 16 : isNorthNode ? 14 : 10}
                  pathOptions={{
                    color: isSelected ? '#ffffff' : color,
                    fillColor: color,
                    fillOpacity: 0.85,
                    weight: isSelected ? 3 : 1.5,
                  }}
                  eventHandlers={{
                    click: () => onSelectStation(st),
                  }}
                >
                  <Popup>
                    <div className="p-2 space-y-1.5 text-slate-100">
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{st.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-extrabold" style={{ color }}>
                          AQI {st.aqi}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                          {st.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 space-y-0.5 pt-1 border-t border-slate-700">
                        <div>PM2.5: <span className="font-semibold">{st.pm25} µg/m³</span></div>
                        <div>PM10: <span className="font-semibold">{st.pm10} µg/m³</span></div>
                        <div>Enforcing: <span className="text-amber-400 font-semibold">{st.grapStage}</span></div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Quick Floating Pill on Top Left */}
          <div className="absolute top-4 left-4 z-[1000] bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-200 shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">Focused Node:</span>
              <span className="text-cyan-400 font-bold">{selectedStation.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar: Focused Station Card & Station Directory (4 cols) */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        {/* Active Station In-Depth Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                {selectedStation.zone} Delhi Monitoring Hub
              </span>
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 mt-0.5">
                <span>{selectedStation.name}</span>
              </h3>
            </div>
            <div className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${getAqiBadgeClass(selectedStation.aqi)}`}>
              {selectedStation.category}
            </div>
          </div>

          {/* Big AQI Number & GRAP Mandate */}
          <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Current Ambient AQI</p>
              <div className="text-4xl font-black mt-1" style={{ color: getAqiColor(selectedStation.aqi) }}>
                {selectedStation.aqi}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">CPCB 24h Weighted Sub-Index</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block">Enforced GRAP Stage</span>
              <span className="inline-block mt-1 px-2.5 py-1 rounded-md bg-amber-950/80 text-amber-300 border border-amber-800 text-xs font-bold">
                {selectedStation.grapStage}
              </span>
              <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-end space-x-1">
                <AlertOctagon className="w-3 h-3 text-rose-400" />
                <span>AWS Cedar Evaluated</span>
              </p>
            </div>
          </div>

          {/* Pollutant Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">PM2.5 (Fine particulate)</span>
              <span className="text-base font-bold text-white">{selectedStation.pm25}</span>
              <span className="text-[10px] text-slate-400 ml-1">µg/m³</span>
              <span className="block text-[10px] text-rose-400 mt-0.5 font-medium">
                {(selectedStation.pm25 / 15).toFixed(1)}x WHO Safe Limit
              </span>
            </div>

            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">PM10 (Coarse dust)</span>
              <span className="text-base font-bold text-white">{selectedStation.pm10}</span>
              <span className="text-[10px] text-slate-400 ml-1">µg/m³</span>
              <span className="block text-[10px] text-amber-400 mt-0.5 font-medium">
                {(selectedStation.pm10 / 45).toFixed(1)}x WHO Safe Limit
              </span>
            </div>

            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Nitrogen Dioxide (NO₂)</span>
              <span className="text-base font-bold text-white">{selectedStation.no2}</span>
              <span className="text-[10px] text-slate-400 ml-1">µg/m³</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Vehicular emission</span>
            </div>

            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 block text-[11px]">Carbon Monoxide (CO)</span>
              <span className="text-base font-bold text-white">{selectedStation.co}</span>
              <span className="text-[10px] text-slate-400 ml-1">mg/m³</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Incomplete burn</span>
            </div>
          </div>

          {/* Micro-climate */}
          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-1.5">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span>{selectedStation.temp}°C</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>{selectedStation.humidity}% RH</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Wind className="w-4 h-4 text-sky-400" />
              <span>{selectedStation.windSpeed} km/h ({selectedStation.windDir})</span>
            </div>
          </div>
        </div>

        {/* Station Search & Zone Filter List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search monitoring station..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-slate-950 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 border border-slate-800 focus:outline-none"
            >
              <option value="All">All Zones</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
              <option value="NCR">NCR</option>
            </select>
          </div>

          {/* Scrollable station list */}
          <div className="overflow-y-auto space-y-2 max-h-[190px] pr-1">
            {filteredStations.map((st) => {
              const isSelected = selectedStation.id === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => onSelectStation(st)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Navigation className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="font-medium">{st.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold" style={{ color: getAqiColor(st.aqi) }}>
                      {st.aqi}
                    </span>
                    <span className="text-[10px] text-slate-500">{st.zone}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
