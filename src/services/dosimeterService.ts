import { CommuteDosimeterInput, CommuteDosimeterResult, IndoorPurifierInput, IndoorPurifierResult } from '../types';

export function calculateCommuteDosage(
  input: CommuteDosimeterInput,
  stationAqi: number,
  stationPm25: number
): CommuteDosimeterResult {
  // 1. Respiration rates in Liters/minute based on age and physical exertion
  let baseRespirationLpm = 10; // normal resting/seated adult
  if (input.userAgeGroup === 'child') {
    baseRespirationLpm = 8;
  } else if (input.userAgeGroup === 'senior') {
    baseRespirationLpm = 8.5;
  }

  // Multiplier for physical exertion
  let exertionMultiplier = 1.0;
  if (input.commuteMode === 'walking') exertionMultiplier = 2.2;
  else if (input.commuteMode === 'bicycle') exertionMultiplier = 3.4;
  else if (input.commuteMode === 'bus_nonac' || input.commuteMode === 'auto_rickshaw') exertionMultiplier = 1.1;

  const totalVentilationLpm = baseRespirationLpm * exertionMultiplier;
  const totalVolumeLiters = totalVentilationLpm * input.durationMinutes;
  const totalVolumeM3 = totalVolumeLiters / 1000;

  // 2. Micro-environment penetration factor (how much outdoor PM2.5 gets inside)
  let microEnvPenetration = 1.0;
  switch (input.commuteMode) {
    case 'metro':
      microEnvPenetration = 0.30; // 70% filtered in DMRC AC trains
      break;
    case 'car_ac':
      microEnvPenetration = 0.40; // 60% filtered by AC cabin filters
      break;
    case 'bus_nonac':
      microEnvPenetration = 0.95;
      break;
    case 'auto_rickshaw':
      microEnvPenetration = 1.0;
      break;
    case 'walking':
    case 'bicycle':
      microEnvPenetration = 1.0;
      break;
  }

  // 3. Mask filtration penetration
  let maskPenetration = 1.0;
  switch (input.maskType) {
    case 'cloth':
      maskPenetration = 0.80; // 20% protection
      break;
    case 'surgical':
      maskPenetration = 0.55; // 45% protection
      break;
    case 'n95':
      maskPenetration = 0.05; // 95% protection
      break;
    case 'none':
    default:
      maskPenetration = 1.0;
      break;
  }

  // Total inhaled dosage in micrograms (ug)
  const effectiveConcentration = stationPm25 * microEnvPenetration * maskPenetration;
  const rawDosageUg = effectiveConcentration * totalVolumeM3;

  // Vulnerability amplifier for respiratory conditions / asthma
  const vulnerabilityMultiplier = input.hasRespiratoryCondition ? 1.4 : 1.0;
  const totalDosageUg = Math.round(rawDosageUg * vulnerabilityMultiplier);

  // Cigarette equivalence: 1 cigarette delivers ~220 ug PM2.5 to the lungs (Berkeley Earth model)
  const cigaretteEquivalence = +(totalDosageUg / 220).toFixed(1);

  // Risk categorization
  let riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Hazardous' = 'Low';
  if (totalDosageUg > 180) riskLevel = 'Hazardous';
  else if (totalDosageUg > 100) riskLevel = 'Severe';
  else if (totalDosageUg > 50) riskLevel = 'High';
  else if (totalDosageUg > 20) riskLevel = 'Moderate';

  // Calculate potential dosage saved by switching to Metro + N95
  const optimalEffectiveConcentration = stationPm25 * 0.30 * 0.05;
  const optimalVentilationLpm = baseRespirationLpm * 1.0;
  const optimalVolumeM3 = (optimalVentilationLpm * input.durationMinutes) / 1000;
  const optimalDosageUg = Math.round(optimalEffectiveConcentration * optimalVolumeM3);
  const potentialDosageSavedUg = Math.max(0, totalDosageUg - optimalDosageUg);

  let cleanAirRecommendation = 'Good route configuration. Keep hydrated.';
  if (input.maskType === 'none') {
    cleanAirRecommendation = 'Wearing an N95 respirator cuts lung dosage by 95% on this route.';
  } else if (input.commuteMode === 'auto_rickshaw' || input.commuteMode === 'bicycle') {
    cleanAirRecommendation = 'Consider Delhi Metro for this trip to avoid direct toxic exhaust inhalation.';
  }

  return {
    averageAqi: stationAqi,
    averagePm25: stationPm25,
    inhaledAirVolumeLiters: Math.round(totalVolumeLiters),
    totalPm25DosageUg: totalDosageUg,
    cigaretteEquivalence,
    riskLevel,
    cleanAirRecommendation,
    potentialDosageSavedUg,
  };
}

export function calculateIndoorPurifierMetrics(input: IndoorPurifierInput): IndoorPurifierResult {
  const roomVolumeCuFt = input.roomLengthFt * input.roomWidthFt * input.ceilingHeightFt;
  
  // Air changes per hour (ACH) = (CADR in CFM * 60) / Room Volume (cu ft)
  const ach = +((input.airPurifierCadrCfm * 60) / roomVolumeCuFt).toFixed(1);

  // Infiltration rate from outdoor based on sealing
  let infiltrationRate = 0.5; // air exchange per hour without purifier
  if (input.roomSealing === 'sealed_ac') infiltrationRate = 0.2;
  else if (input.roomSealing === 'drafty') infiltrationRate = 1.1;

  // Steady state indoor PM2.5 without purifier
  const indoorWithout = Math.round(input.outdoorPm25 * Math.min(0.85, 0.4 + infiltrationRate * 0.3));

  // Steady state indoor PM2.5 with purifier: C_indoor = (C_outdoor * Infiltration) / (Infiltration + CADR_ach)
  const cadrAirChangesPerHour = (input.airPurifierCadrCfm * 60) / roomVolumeCuFt;
  const removalEfficiency = 0.99;
  const indoorWith = Math.max(
    8,
    Math.round((input.outdoorPm25 * infiltrationRate) / (infiltrationRate + cadrAirChangesPerHour * removalEfficiency))
  );

  // Time in minutes to clean room down to WHO safe target (25 ug/m3)
  // Decay formula: t = ln(C0 / C_target) / decayConstant
  const totalDecayConstant = infiltrationRate + cadrAirChangesPerHour; // per hour
  const targetConcentration = 25;
  let minutesToSafeAir = 25;
  if (indoorWithout > targetConcentration) {
    const hours = Math.log(indoorWithout / targetConcentration) / totalDecayConstant;
    minutesToSafeAir = Math.max(12, Math.round(hours * 60));
  } else {
    minutesToSafeAir = 10;
  }

  // Estimated HEPA filter lifespan in days based on continuous exposure to severe Delhi PM2.5
  const filterLifespanDays = Math.max(
    45,
    Math.round(180 - (input.outdoorPm25 / 400) * 90)
  );

  return {
    roomVolumeCuFt,
    airChangesPerHour: ach,
    minutesToSafeAir,
    estimatedIndoorPm25WithPurifier: indoorWith,
    estimatedIndoorPm25WithoutPurifier: indoorWithout,
    filterReplacementLifespanDays: filterLifespanDays,
    energyEfficientSchedule: [
      { timeBlock: '06:00 - 09:00 (Morning Inversion Peak)', mode: 'Turbo', targetPm25: 18 },
      { timeBlock: '09:00 - 17:00 (Daytime Dispersal)', mode: 'Medium', targetPm25: 22 },
      { timeBlock: '17:00 - 21:00 (Evening Traffic Spike)', mode: 'Turbo', targetPm25: 20 },
      { timeBlock: '21:00 - 06:00 (Night Sleep Health)', mode: 'Sleep/Silent', targetPm25: 15 },
    ],
  };
}
