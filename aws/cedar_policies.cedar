// ==============================================================================
// VAYUSHIELD: AWS CEDAR POLICY DEFINITIONS (Open-Source Policy-As-Code)
// Implements CAQM (Commission for Air Quality Management) Delhi GRAP I - IV
// and Delhi Directorate of Education (DoE) Air Safety Guidelines
// ==============================================================================

// POLICY 1: Default Permit for Protective Health Measures
@id("protective-measures-permit")
permit(
    principal,
    action in [
        Action::"IssueN95Advisory",
        Action::"RunAirPurifiers",
        Action::"ShiftToOnlineClasses",
        Action::"DeployAntiSmogGuns"
    ],
    resource
);

// POLICY 2: School Outdoor Activities & Assembly Ban under GRAP Stage 2/3
// Triggered when AQI >= 350 or PM2.5 >= 200 ug/m3
@id("school-outdoor-ban")
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
};

// POLICY 3: Primary School (KG - Grade 5) Mandatory Physical Class Closure
// Under GRAP Stage 3 (AQI > 400), physical classes for young children must be suspended
@id("primary-school-physical-closure")
forbid(
    principal,
    action == Action::"HoldInPersonClasses",
    resource
)
when {
    context.gradeLevel <= 5 &&
    context.aqi >= 400
};

// POLICY 4: Non-Essential Diesel Generators (GRAP Stage 2: AQI > 300)
@id("diesel-generator-ban")
forbid(
    principal,
    action == Action::"OperateDieselGenerator",
    resource
)
when {
    context.aqi >= 301 &&
    context.isEssentialHospitalOrMetro == false
};

// POLICY 5: Construction & Demolition (C&D) Dust Operations (GRAP Stage 3: AQI > 400)
@id("construction-activities-ban")
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
};

// POLICY 6: High-Emitting Vehicle Transit Ban (GRAP Stage 3 & 4)
// BS-III Petrol and BS-IV Diesel passenger/commercial vehicles prohibited
@id("polluting-vehicles-ban")
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
};

// POLICY 7: GRAP Stage 4 Severe+ (AQI > 450) Heavy Duty Diesel Trucks Ban
@id("heavy-diesel-truck-ban")
forbid(
    principal,
    action == Action::"EnterDelhiBorder",
    resource
)
when {
    context.aqi >= 450 &&
    context.vehicleType == "HeavyDutyDieselTruck" &&
    context.carryingEssentialSupplies == false
};
