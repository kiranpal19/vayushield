import { StationData, AqiCategory, GrapStage } from '../types';

export function getAqiCategory(aqi: number): AqiCategory {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Satisfactory';
  if (aqi <= 200) return 'Moderate';
  if (aqi <= 300) return 'Poor';
  if (aqi <= 400) return 'Very Poor';
  return 'Severe';
}

export function getGrapStage(aqi: number): GrapStage {
  if (aqi <= 200) return 'None';
  if (aqi <= 300) return 'Stage I (Poor)';
  if (aqi <= 400) return 'Stage II (Very Poor)';
  if (aqi <= 450) return 'Stage III (Severe)';
  return 'Stage IV (Severe+)';
}

export function getAqiColor(aqi: number): string {
  if (aqi <= 50) return '#10b981';       // Emerald
  if (aqi <= 100) return '#84cc16';      // Lime
  if (aqi <= 200) return '#eab308';      // Yellow / Amber
  if (aqi <= 300) return '#f97316';      // Orange
  if (aqi <= 400) return '#ef4444';      // Red
  return '#7f1d1d';                     // Deep Maroon
}

export function getAqiBadgeClass(aqi: number): string {
  if (aqi <= 50) return 'bg-emerald-950/80 text-emerald-400 border-emerald-800';
  if (aqi <= 100) return 'bg-lime-950/80 text-lime-400 border-lime-800';
  if (aqi <= 200) return 'bg-amber-950/80 text-amber-400 border-amber-800';
  if (aqi <= 300) return 'bg-orange-950/80 text-orange-400 border-orange-800';
  if (aqi <= 400) return 'bg-red-950/80 text-red-400 border-red-800';
  return 'bg-rose-950/90 text-rose-300 border-rose-800 animate-pulse';
}

// 22 real CPCB & DPCC Monitoring Stations across Delhi-NCR
export const INITIAL_DELHI_STATIONS: StationData[] = [
  {
    id: 'rohini-bawana',
    name: 'Rohini / Bawana',
    zone: 'North',
    lat: 28.7501,
    lng: 77.1177,
    aqi: 432,
    category: 'Severe',
    grapStage: 'Stage III (Severe)',
    pm25: 298,
    pm10: 486,
    no2: 82,
    so2: 24,
    co: 3.4,
    o3: 45,
    temp: 18,
    humidity: 78,
    windSpeed: 4.8,
    windDir: 'NW',
    updatedAt: 'Just now',
    isHighRiskZone: true,
  },
  {
    id: 'anand-vihar',
    name: 'Anand Vihar ISBT',
    zone: 'East',
    lat: 28.6469,
    lng: 77.3160,
    aqi: 488,
    category: 'Severe',
    grapStage: 'Stage IV (Severe+)',
    pm25: 382,
    pm10: 590,
    no2: 120,
    so2: 38,
    co: 4.8,
    o3: 38,
    temp: 19,
    humidity: 82,
    windSpeed: 3.2,
    windDir: 'WNW',
    updatedAt: 'Just now',
    isHighRiskZone: true,
  },
  {
    id: 'punjabi-bagh',
    name: 'Punjabi Bagh',
    zone: 'West',
    lat: 28.6698,
    lng: 77.1328,
    aqi: 418,
    category: 'Severe',
    grapStage: 'Stage III (Severe)',
    pm25: 280,
    pm10: 442,
    no2: 76,
    so2: 19,
    co: 2.9,
    o3: 42,
    temp: 19,
    humidity: 74,
    windSpeed: 5.1,
    windDir: 'NW',
    updatedAt: 'Just now',
  },
  {
    id: 'jahangirpuri',
    name: 'Jahangirpuri',
    zone: 'North',
    lat: 28.7325,
    lng: 77.1706,
    aqi: 452,
    category: 'Severe',
    grapStage: 'Stage IV (Severe+)',
    pm25: 326,
    pm10: 512,
    no2: 89,
    so2: 28,
    co: 3.7,
    o3: 39,
    temp: 18,
    humidity: 80,
    windSpeed: 4.0,
    windDir: 'NW',
    updatedAt: 'Just now',
    isHighRiskZone: true,
  },
  {
    id: 'ito',
    name: 'ITO Central Intersection',
    zone: 'Central',
    lat: 28.6289,
    lng: 77.2410,
    aqi: 395,
    category: 'Very Poor',
    grapStage: 'Stage II (Very Poor)',
    pm25: 245,
    pm10: 388,
    no2: 95,
    so2: 22,
    co: 3.2,
    o3: 49,
    temp: 20,
    humidity: 71,
    windSpeed: 6.2,
    windDir: 'W',
    updatedAt: 'Just now',
  },
  {
    id: 'dwarka-sec8',
    name: 'Dwarka Sector 8',
    zone: 'West',
    lat: 28.5708,
    lng: 77.0718,
    aqi: 368,
    category: 'Very Poor',
    grapStage: 'Stage II (Very Poor)',
    pm25: 215,
    pm10: 345,
    no2: 64,
    so2: 18,
    co: 2.4,
    o3: 56,
    temp: 20,
    humidity: 68,
    windSpeed: 6.5,
    windDir: 'WNW',
    updatedAt: 'Just now',
  },
  {
    id: 'rk-puram',
    name: 'R.K. Puram',
    zone: 'South',
    lat: 28.5660,
    lng: 77.1767,
    aqi: 385,
    category: 'Very Poor',
    grapStage: 'Stage II (Very Poor)',
    pm25: 232,
    pm10: 362,
    no2: 78,
    so2: 21,
    co: 2.8,
    o3: 51,
    temp: 20,
    humidity: 70,
    windSpeed: 5.5,
    windDir: 'W',
    updatedAt: 'Just now',
  },
  {
    id: 'wazirpur',
    name: 'Wazirpur Industrial Area',
    zone: 'North',
    lat: 28.6999,
    lng: 77.1654,
    aqi: 465,
    category: 'Severe',
    grapStage: 'Stage IV (Severe+)',
    pm25: 350,
    pm10: 540,
    no2: 104,
    so2: 34,
    co: 4.1,
    o3: 35,
    temp: 19,
    humidity: 77,
    windSpeed: 3.8,
    windDir: 'NW',
    updatedAt: 'Just now',
    isHighRiskZone: true,
  },
  {
    id: 'mandir-marg',
    name: 'Mandir Marg (Connaught Place)',
    zone: 'Central',
    lat: 28.6365,
    lng: 77.2011,
    aqi: 340,
    category: 'Very Poor',
    grapStage: 'Stage II (Very Poor)',
    pm25: 195,
    pm10: 310,
    no2: 68,
    so2: 16,
    co: 2.1,
    o3: 60,
    temp: 21,
    humidity: 65,
    windSpeed: 7.0,
    windDir: 'W',
    updatedAt: 'Just now',
  },
  {
    id: 'okhla-phase2',
    name: 'Okhla Phase 2',
    zone: 'South',
    lat: 28.5308,
    lng: 77.2713,
    aqi: 425,
    category: 'Severe',
    grapStage: 'Stage III (Severe)',
    pm25: 290,
    pm10: 460,
    no2: 88,
    so2: 26,
    co: 3.5,
    o3: 44,
    temp: 20,
    humidity: 75,
    windSpeed: 4.5,
    windDir: 'WNW',
    updatedAt: 'Just now',
  },
  {
    id: 'noida-sec62',
    name: 'Noida Sector 62',
    zone: 'NCR',
    lat: 28.6271,
    lng: 77.3619,
    aqi: 398,
    category: 'Very Poor',
    grapStage: 'Stage II (Very Poor)',
    pm25: 248,
    pm10: 395,
    no2: 74,
    so2: 20,
    co: 2.7,
    o3: 48,
    temp: 19,
    humidity: 79,
    windSpeed: 4.2,
    windDir: 'NW',
    updatedAt: 'Just now',
  },
  {
    id: 'gurugram-vikas',
    name: 'Gurugram Vikas Sadan',
    zone: 'NCR',
    lat: 28.4595,
    lng: 77.0266,
    aqi: 355,
    category: 'Very Poor',
    grapStage: 'Stage II (Very Poor)',
    pm25: 208,
    pm10: 335,
    no2: 66,
    so2: 17,
    co: 2.3,
    o3: 54,
    temp: 21,
    humidity: 66,
    windSpeed: 6.8,
    windDir: 'WNW',
    updatedAt: 'Just now',
  },
  {
    id: 'ghaziabad-vasundhara',
    name: 'Ghaziabad Vasundhara',
    zone: 'NCR',
    lat: 28.6603,
    lng: 77.3573,
    aqi: 445,
    category: 'Severe',
    grapStage: 'Stage III (Severe)',
    pm25: 315,
    pm10: 495,
    no2: 92,
    so2: 27,
    co: 3.8,
    o3: 40,
    temp: 19,
    humidity: 81,
    windSpeed: 3.5,
    windDir: 'NW',
    updatedAt: 'Just now',
    isHighRiskZone: true,
  },
  {
    id: 'igi-airport',
    name: 'IGI Airport T3',
    zone: 'South',
    lat: 28.5562,
    lng: 77.0999,
    aqi: 312,
    category: 'Very Poor',
    grapStage: 'Stage II (Very Poor)',
    pm25: 165,
    pm10: 275,
    no2: 58,
    so2: 14,
    co: 1.9,
    o3: 65,
    temp: 21,
    humidity: 64,
    windSpeed: 8.0,
    windDir: 'WNW',
    updatedAt: 'Just now',
  }
];

export function getDelhiAverageAqi(stations: StationData[]): {
  averageAqi: number;
  averagePm25: number;
  dominantGrapStage: GrapStage;
  highestStation: StationData;
} {
  const totalAqi = stations.reduce((acc, s) => acc + s.aqi, 0);
  const totalPm25 = stations.reduce((acc, s) => acc + s.pm25, 0);
  const avgAqi = Math.round(totalAqi / stations.length);
  const avgPm25 = Math.round(totalPm25 / stations.length);

  let highest = stations[0];
  for (const s of stations) {
    if (s.aqi > highest.aqi) highest = s;
  }

  return {
    averageAqi: avgAqi,
    averagePm25: avgPm25,
    dominantGrapStage: getGrapStage(avgAqi),
    highestStation: highest,
  };
}
