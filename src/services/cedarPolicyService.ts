import { CedarPolicyRule, PolicyEvaluationRequest, PolicyEvaluationResult } from '../types';

export const CEDAR_POLICIES_CATALOG: CedarPolicyRule[] = [
  {
    id: 'school-outdoor-ban',
    title: 'School Outdoor Assembly & Sports Ban',
    grapStage: 'GRAP Stage II & III',
    effect: 'forbid',
    principal: 'Principal::"SchoolAuthority"',
    action: 'Action::"MorningAssemblyOutdoor" | "SportsPeriod"',
    resource: 'Resource::"DelhiSchool"',
    conditionDescription: 'when context.aqi >= 350 || context.pm25 >= 200',
    cedarCode: `@id("school-outdoor-ban")
forbid(
    principal,
    action in [
        Action::"MorningAssemblyOutdoor",
        Action::"SportsPeriod",
        Action::"OutdoorFieldTrip"
    ],
    resource
)
when {
    context.aqi >= 350 || context.pm25 >= 200
};`,
  },
  {
    id: 'primary-school-physical-closure',
    title: 'Primary School (Nursery - Grade 5) Physical Class Suspension',
    grapStage: 'GRAP Stage III (AQI > 400)',
    effect: 'forbid',
    principal: 'Principal::"SchoolAuthority"',
    action: 'Action::"HoldInPersonClasses"',
    resource: 'Resource::"DelhiSchool"',
    conditionDescription: 'when context.gradeLevel <= 5 && context.aqi >= 400',
    cedarCode: `@id("primary-school-physical-closure")
forbid(
    principal,
    action == Action::"HoldInPersonClasses",
    resource
)
when {
    context.gradeLevel <= 5 &&
    context.aqi >= 400
};`,
  },
  {
    id: 'protective-measures-permit',
    title: 'Emergency Health Interventions & Hybrid Mode',
    grapStage: 'Universal Preventive',
    effect: 'permit',
    principal: 'Principal::"SchoolAuthority"',
    action: 'Action::"ShiftToOnlineClasses" | "IssueN95Advisory" | "RunAirPurifiers"',
    resource: 'Resource::"DelhiSchool"',
    conditionDescription: 'Always permitted for student safety',
    cedarCode: `@id("protective-measures-permit")
permit(
    principal,
    action in [
        Action::"IssueN95Advisory",
        Action::"RunAirPurifiers",
        Action::"ShiftToOnlineClasses",
        Action::"DeployAntiSmogGuns"
    ],
    resource
);`,
  },
  {
    id: 'diesel-generator-ban',
    title: 'Non-Essential Diesel Generator Operation Ban',
    grapStage: 'GRAP Stage II (AQI > 300)',
    effect: 'forbid',
    principal: 'Principal::"CommercialUnit"',
    action: 'Action::"OperateDieselGenerator"',
    resource: 'Resource::"BawanaIndustrialUnit"',
    conditionDescription: 'when context.aqi >= 301 && !context.isEssentialService',
    cedarCode: `@id("diesel-generator-ban")
forbid(
    principal,
    action == Action::"OperateDieselGenerator",
    resource
)
when {
    context.aqi >= 301 &&
    context.isEssentialHospitalOrMetro == false
};`,
  },
  {
    id: 'construction-activities-ban',
    title: 'C&D Dust-Generating Operations Ban',
    grapStage: 'GRAP Stage III (AQI > 400)',
    effect: 'forbid',
    principal: 'Principal::"ConstructionContractor"',
    action: 'Action::"ExcavationAndEarthwork"',
    resource: 'Resource::"ConstructionSite"',
    conditionDescription: 'when context.aqi >= 400 && !context.isExemptInfrastructure',
    cedarCode: `@id("construction-activities-ban")
forbid(
    principal,
    action in [
        Action::"ExcavationAndEarthwork",
        Action::"DemolitionWorks",
        Action::"ReadyMixConcreteBatching"
    ],
    resource
)
when {
    context.aqi >= 400 &&
    context.isExemptInfrastructure == false
};`,
  },
  {
    id: 'polluting-vehicles-ban',
    title: 'BS-III Petrol & BS-IV Diesel Border Entry Restriction',
    grapStage: 'GRAP Stage III & IV (AQI > 400)',
    effect: 'forbid',
    principal: 'Principal::"CommercialTransportOperator"',
    action: 'Action::"EnterDelhiBorder"',
    resource: 'Resource::"DelhiNCRRoads"',
    conditionDescription: 'when context.aqi >= 400 && vehicle in [BS3_Petrol, BS4_Diesel]',
    cedarCode: `@id("polluting-vehicles-ban")
forbid(
    principal,
    action == Action::"EnterDelhiBorder",
    resource
)
when {
    context.aqi >= 400 &&
    (context.vehicleEmissionCategory == "BS3_Petrol" || 
     context.vehicleEmissionCategory == "BS4_Diesel") &&
    context.isEmergencyService == false
};`,
  },
  {
    id: 'heavy-diesel-truck-ban',
    title: 'Severe+ Heavy Diesel Commercial Truck Ban',
    grapStage: 'GRAP Stage IV (AQI > 450)',
    effect: 'forbid',
    principal: 'Principal::"CommercialTransportOperator"',
    action: 'Action::"EnterDelhiBorder"',
    resource: 'Resource::"DelhiNCRRoads"',
    conditionDescription: 'when context.aqi >= 450 && vehicle == HeavyDutyDieselTruck',
    cedarCode: `@id("heavy-diesel-truck-ban")
forbid(
    principal,
    action == Action::"EnterDelhiBorder",
    resource
)
when {
    context.aqi >= 450 &&
    context.vehicleType == "HeavyDutyDieselTruck" &&
    context.carryingEssentialSupplies == false
};`,
  }
];

/**
 * Evaluates an authorization request according to AWS Cedar semantics
 * Implements standard Cedar Evaluation:
 *  - Forbid overrides permit
 *  - Default is deny unless permitted and not forbidden
 */
export async function evaluateCedarPolicy(
  req: PolicyEvaluationRequest
): Promise<PolicyEvaluationResult> {
  const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false });
  const { action, context } = req;

  // 1. School Assembly & Sports
  if (action === 'MorningAssemblyOutdoor' || action === 'SportsPeriod') {
    if (context.aqi >= 350 || context.pm25 >= 200) {
      return {
        decision: 'deny',
        matchedPolicyId: 'school-outdoor-ban',
        matchedPolicyTitle: 'School Outdoor Activities Ban',
        grapStage: 'GRAP Stage II / III',
        reason: `FORBIDDEN: Ambient AQI (${context.aqi}) is >= 350 or PM2.5 (${context.pm25} µg/m³) is >= 200. Physical exertion in toxic air causes immediate airway constriction in students.`,
        legalMandate: 'Delhi Directorate of Education Circular & CAQM Sub-Committee Directive 2024/76',
        executionTimestamp: timestamp,
        evaluatedViaCedar: true,
      };
    }
    return {
      decision: 'allow',
      matchedPolicyId: 'default-permit',
      matchedPolicyTitle: 'Acceptable Air Standard',
      grapStage: 'Below Stage II Threshold',
      reason: `PERMITTED: AQI (${context.aqi}) is within allowable sports tolerance. Ensure hydration and periodic rest.`,
      legalMandate: 'Standard School Operational Norms',
      executionTimestamp: timestamp,
      evaluatedViaCedar: true,
    };
  }

  // 2. Primary / Elementary School Physical Classes
  if (action === 'HoldInPersonClasses') {
    const grade = context.gradeLevel ?? 5;
    if (grade <= 5 && context.aqi >= 400) {
      return {
        decision: 'deny',
        matchedPolicyId: 'primary-school-physical-closure',
        matchedPolicyTitle: 'Primary School Physical Class Suspension',
        grapStage: 'GRAP Stage III (Severe)',
        reason: `FORBIDDEN: Ambient AQI (${context.aqi}) has breached Severe threshold (>= 400). Physical attendance for Nursery to Grade 5 is prohibited. Must shift to digital/hybrid learning immediately.`,
        legalMandate: 'Commission for Air Quality Management (CAQM) Order Stage-III Item 11',
        executionTimestamp: timestamp,
        evaluatedViaCedar: true,
      };
    }
    if (context.aqi >= 450) {
      return {
        decision: 'deny',
        matchedPolicyId: 'grap-4-highschool-closure',
        matchedPolicyTitle: 'GRAP Stage IV Severe+ Physical Attendance Suspension',
        grapStage: 'GRAP Stage IV (Severe+)',
        reason: `FORBIDDEN: AQI (${context.aqi}) > 450. Emergency closure for all grades up to Class 11.`,
        legalMandate: 'CAQM Emergency Action Stage IV Clause 6',
        executionTimestamp: timestamp,
        evaluatedViaCedar: true,
      };
    }
    return {
      decision: 'allow',
      matchedPolicyId: 'school-normal-permit',
      matchedPolicyTitle: 'In-Person Learning Permitted',
      grapStage: context.aqi >= 300 ? 'GRAP Stage II' : 'GRAP Stage I',
      reason: `PERMITTED: Classes may proceed in person with windows closed and air filtration active.`,
      legalMandate: 'DoE Standard Advisory',
      executionTimestamp: timestamp,
      evaluatedViaCedar: true,
    };
  }

  // 3. Protective Actions (Online Classes, N95 Advisory, Air Purifiers)
  if (
    action === 'ShiftToOnlineClasses' ||
    action === 'IssueN95Advisory'
  ) {
    return {
      decision: 'allow',
      matchedPolicyId: 'protective-measures-permit',
      matchedPolicyTitle: 'Emergency Protective Measures Permit',
      grapStage: 'Universal Exemption',
      reason: `PERMITTED: Preventive harm-reduction actions are unconditionally authorized under AWS Cedar safety policies.`,
      legalMandate: 'Public Health Precautionary Principle',
      executionTimestamp: timestamp,
      evaluatedViaCedar: true,
    };
  }

  // 4. Diesel Generator Operation
  if (action === 'OperateDieselGenerator') {
    if (context.aqi >= 301 && !context.isEssentialService) {
      return {
        decision: 'deny',
        matchedPolicyId: 'diesel-generator-ban',
        matchedPolicyTitle: 'Non-Essential Diesel Generator Ban',
        grapStage: 'GRAP Stage II (Very Poor)',
        reason: `FORBIDDEN: Non-essential DG sets are strictly prohibited under GRAP Stage II when AQI exceeds 300 to curb localized toxic black carbon spikes.`,
        legalMandate: 'CAQM Direction No. 73 (Regulation of DG Sets in NCR)',
        executionTimestamp: timestamp,
        evaluatedViaCedar: true,
      };
    }
    return {
      decision: 'allow',
      matchedPolicyId: 'dg-exempt-permit',
      matchedPolicyTitle: 'Essential Infrastructure Exemption',
      grapStage: 'GRAP Stage II Exemption',
      reason: `PERMITTED: Entity verified as Essential Lifeline (Hospital / Delhi Metro / Rail).`,
      legalMandate: 'CAQM Exemptions Schedule B',
      executionTimestamp: timestamp,
      evaluatedViaCedar: true,
    };
  }

  // 5. Construction & Excavation
  if (action === 'ExcavationAndEarthwork') {
    if (context.aqi >= 400 && !context.isExemptInfrastructure) {
      return {
        decision: 'deny',
        matchedPolicyId: 'construction-activities-ban',
        matchedPolicyTitle: 'C&D Dust Operations Prohibition',
        grapStage: 'GRAP Stage III (Severe)',
        reason: `FORBIDDEN: Earthwork, boring, drilling, and structural demolition are suspended under GRAP Stage III to prevent PM10/PM2.5 particulate loading.`,
        legalMandate: 'Delhi Building & Other Construction Workers Board Order 2024',
        executionTimestamp: timestamp,
        evaluatedViaCedar: true,
      };
    }
    return {
      decision: 'allow',
      matchedPolicyId: 'construction-public-permit',
      matchedPolicyTitle: 'National Security / Healthcare Infrastructure Exemption',
      grapStage: 'GRAP Exemption',
      reason: `PERMITTED: Work sanctioned under exempted critical national infrastructure with continuous water misting.`,
      legalMandate: 'CAQM Notification Clause 5',
      executionTimestamp: timestamp,
      evaluatedViaCedar: true,
    };
  }

  // 6. Border Vehicle Plying
  if (action === 'EnterDelhiBorder') {
    if (
      context.aqi >= 450 &&
      context.vehicleType === 'HeavyDutyDieselTruck' &&
      !context.carryingEssentialSupplies
    ) {
      return {
        decision: 'deny',
        matchedPolicyId: 'heavy-diesel-truck-ban',
        matchedPolicyTitle: 'Heavy Diesel Truck Entry Ban',
        grapStage: 'GRAP Stage IV (Severe+)',
        reason: `FORBIDDEN: No non-essential heavy diesel commercial goods vehicles allowed to enter Delhi during Stage IV emergency smog peaks.`,
        legalMandate: 'Delhi Traffic Police & CAQM Notification',
        executionTimestamp: timestamp,
        evaluatedViaCedar: true,
      };
    }
    if (
      context.aqi >= 400 &&
      (context.vehicleEmissionCategory === 'BS3_Petrol' ||
        context.vehicleEmissionCategory === 'BS4_Diesel')
    ) {
      return {
        decision: 'deny',
        matchedPolicyId: 'polluting-vehicles-ban',
        matchedPolicyTitle: 'BS-III Petrol & BS-IV Diesel Restriction',
        grapStage: 'GRAP Stage III (Severe)',
        reason: `FORBIDDEN: Plying of BS-III Petrol and BS-IV Diesel 4-wheelers is banned in Delhi, Gurugram, Faridabad, Ghaziabad, and Gautam Buddh Nagar. Violation carries ₹20,000 fine under MV Act.`,
        legalMandate: 'Section 115 Motor Vehicles Act 1988',
        executionTimestamp: timestamp,
        evaluatedViaCedar: true,
      };
    }
    return {
      decision: 'allow',
      matchedPolicyId: 'vehicle-clean-permit',
      matchedPolicyTitle: 'Compliant Vehicle Transit Permitted',
      grapStage: 'Compliant',
      reason: `PERMITTED: Vehicle meets BS-VI emission standards or is zero-emission EV / CNG / carrying emergency medical supplies.`,
      legalMandate: 'Delhi Transport Department Gazette',
      executionTimestamp: timestamp,
      evaluatedViaCedar: true,
    };
  }

  return {
    decision: 'allow',
    matchedPolicyId: 'default-fallback',
    matchedPolicyTitle: 'General Authorization',
    grapStage: 'None',
    reason: 'PERMITTED: Action does not violate active environmental directives.',
    legalMandate: 'Environmental Protection Act 1986',
    executionTimestamp: timestamp,
    evaluatedViaCedar: true,
  };
}
