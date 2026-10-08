export type AqiCategory = 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';

export type GrapStage = 'None' | 'Stage I (Poor)' | 'Stage II (Very Poor)' | 'Stage III (Severe)' | 'Stage IV (Severe+)';

export interface StationData {
  id: string;
  name: string;
  zone: 'North' | 'South' | 'East' | 'West' | 'Central' | 'NCR';
  lat: number;
  lng: number;
  aqi: number;
  category: AqiCategory;
  grapStage: GrapStage;
  pm25: number;      // ug/m3
  pm10: number;      // ug/m3
  no2: number;       // ug/m3
  so2: number;       // ug/m3
  co: number;        // mg/m3
  o3: number;        // ug/m3
  temp: number;      // °C
  humidity: number;  // %
  windSpeed: number; // km/h
  windDir: string;   // e.g. "NW", "W"
  updatedAt: string;
  isHighRiskZone?: boolean;
}

export interface StubbleHotspot {
  id: string;
  state: 'Punjab' | 'Haryana' | 'UP' | 'Rajasthan';
  district: string;
  lat: number;
  lng: number;
  fireCount: number;
  confidence: number; // 0-100%
  satellite: 'VIIRS (Suomi-NPP)' | 'MODIS (Aqua/Terra)';
  windSpeedKmH: number;
  windHeadingDeg: number; // 0-360
  windBearing: string;    // "NW", "WNW"
  distanceToDelhiKm: number;
  plumeTravelTimeHours: number;
  expectedDelhiImpactTime: string;
}

export interface CedarPolicyRule {
  id: string;
  title: string;
  grapStage: string;
  effect: 'permit' | 'forbid';
  principal: string;
  action: string;
  resource: string;
  conditionDescription: string;
  cedarCode: string;
}

export interface PolicyEvaluationRequest {
  principalType: 'SchoolAuthority' | 'Citizen' | 'ConstructionContractor' | 'CommercialTransportOperator';
  principalId: string;
  action: 
    | 'HoldInPersonClasses'
    | 'MorningAssemblyOutdoor'
    | 'SportsPeriod'
    | 'ShiftToOnlineClasses'
    | 'IssueN95Advisory'
    | 'OperateDieselGenerator'
    | 'ExcavationAndEarthwork'
    | 'EnterDelhiBorder';
  resourceType: 'DelhiSchool' | 'BawanaIndustrialUnit' | 'DelhiNCRRoads' | 'ConstructionSite';
  resourceId: string;
  context: {
    aqi: number;
    pm25: number;
    gradeLevel?: number; // e.g. 3 for Primary, 9 for Secondary
    isEssentialService?: boolean;
    isExemptInfrastructure?: boolean;
    vehicleEmissionCategory?: 'BS3_Petrol' | 'BS4_Diesel' | 'BS6' | 'EV_Electric';
    vehicleType?: 'TwoWheeler' | 'PassengerCar' | 'HeavyDutyDieselTruck';
    carryingEssentialSupplies?: boolean;
  };
}

export interface PolicyEvaluationResult {
  decision: 'allow' | 'deny';
  matchedPolicyId: string;
  matchedPolicyTitle: string;
  grapStage: string;
  reason: string;
  legalMandate: string;
  executionTimestamp: string;
  evaluatedViaCedar: boolean;
}

export type CommuteMode = 'metro' | 'car_ac' | 'bus_nonac' | 'auto_rickshaw' | 'bicycle' | 'walking';

export type MaskType = 'none' | 'cloth' | 'surgical' | 'n95';

export interface CommuteDosimeterInput {
  originStationId: string;
  destinationStationId: string;
  durationMinutes: number;
  commuteMode: CommuteMode;
  maskType: MaskType;
  userAgeGroup: 'child' | 'adult' | 'senior';
  hasRespiratoryCondition: boolean;
}

export interface CommuteDosimeterResult {
  averageAqi: number;
  averagePm25: number;
  inhaledAirVolumeLiters: number;
  totalPm25DosageUg: number;
  cigaretteEquivalence: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Hazardous';
  cleanAirRecommendation: string;
  potentialDosageSavedUg: number;
}

export interface IndoorPurifierInput {
  roomLengthFt: number;
  roomWidthFt: number;
  ceilingHeightFt: number;
  airPurifierCadrCfm: number;
  roomSealing: 'sealed_ac' | 'standard' | 'drafty';
  outdoorPm25: number;
  occupantCount: number;
}

export interface IndoorPurifierResult {
  roomVolumeCuFt: number;
  airChangesPerHour: number;
  minutesToSafeAir: number; // to reach < 25 ug/m3 WHO guideline
  estimatedIndoorPm25WithPurifier: number;
  estimatedIndoorPm25WithoutPurifier: number;
  filterReplacementLifespanDays: number;
  energyEfficientSchedule: {
    timeBlock: string;
    mode: 'Turbo' | 'Medium' | 'Sleep/Silent' | 'Off';
    targetPm25: number;
  }[];
}
