# 🛡️ VayuShield (वायु-शील्ड)
### *Hyperlocal Air Intelligence, AWS Cedar GRAP Policy Engine & Vulnerable Group Protection*

---

## 🌟 The Problem
During North India's winter inversion season (October – February), Delhi-NCR experiences severe atmospheric smog episodes where AQI frequently crosses **400–480 (Severe to Severe+)**. 

Key systemic failures include:
1. **Unpredictable School Closures:** Principals and parents receive ad-hoc government circulars late at night without deterministic, verifiable enforcement rules. Children continue morning assemblies and sports in hazardous air.
2. **Delayed Stubble Burning Attribution:** Upwind farm fires in Punjab and Haryana take 16–28 hours to reach Delhi via north-westerly wind corridors, but cities only react *after* the smoke enters the airshed.
3. **Misleading Ambient AQI for Commuters:** Ambient outdoor AQI does not reflect actual lung particulate dosage. A commuter riding an open auto-rickshaw or cycling inhales vastly higher toxic dosages than a metro commuter.
4. **Inefficient Indoor Air Management:** Schools and households run air purifiers continuously without matching CADR (Clean Air Delivery Rate) to room volume, burning expensive HEPA filters and wasting electricity.

---

## 💡 The Solution: VayuShield

**VayuShield** is an end-to-end environmental intelligence platform and policy decision point built specifically for Delhi-NCR's airshed:

| Capability | VayuShield Implementation |
| :--- | :--- |
| **School Safety on Bad Days** | **AWS Cedar Policy Engine:** Formulates CAQM GRAP Regulations (Stages I–IV) and Delhi Directorate of Education guidelines into formal Policy-as-Code (`aws/cedar_policies.cedar`). Automatically forbids outdoor sports & shifts primary classes to hybrid online when AQI breaches thresholds. Generates printable official school advisories. |
| **Stubble Burning** | **Satellite Plume Telemetry:** Aggregates NASA VIIRS & MODIS thermal anomaly fire counts across Punjab and Haryana. Uses upper-tropospheric wind speed & vectors to compute flight-time ETAs of smoke plumes entering Delhi. |
| **Pollution Exposure & AQI** | **Continuous Delhi-NCR Grid & Bio-Dosimeter:** 14+ live CPCB monitoring nodes (highlighting **DTU Rohini / Bawana**, Anand Vihar, etc.). Calculates lung deposition ($\mu g$) and Berkeley Earth **Cigarette Equivalents** based on transport mode and mask type. |
| **Indoor Air Quality** | **Fluid Dynamics & CADR Simulator:** Calculates Air Changes per Hour (ACH), decay curves to WHO safe levels ($< 25 \mu g/m^3$), HEPA filter lifespan, and creates power-saving fan schedules. |

---

## ☁️ AWS Technology Stack & Compliance

### 1. Build It: AWS Open Source
* **AWS Cedar Policy Language & Engine** (`@cedar-policy/cedar-wasm` & `aws/cedar_policies.cedar`):
  * Cedar is an open-source, provable policy language developed by AWS.
  * Expresses safety rules as declarative statements (`permit` / `forbid`):
  ```cedar
  @id("school-outdoor-ban")
  forbid(
      principal,
      action in [Action::"MorningAssemblyOutdoor", Action::"SportsPeriod"],
      resource
  )
  when { context.aqi >= 350 || context.pm25 >= 200 };
  ```

### 2. Ship It: AWS Serverless Cloud Architecture
* **AWS SAM (`aws/template.yaml`):** Infrastructure-as-code template.
* **Amazon EventBridge:** 15-minute scheduled trigger for data ingestion.
* **AWS Lambda:** Python ETL ingestion worker and Cedar evaluation PDP.
* **Amazon DynamoDB (`VayuStationData`):** Pay-per-request time-series store with automatic TTL.
* **Amazon SNS / SES:** Push alerts notifying registered schools when GRAP stages change.
* **AWS Amplify Hosting:** Fast static hosting for the React frontend.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ or v24+)
* npm (v10+ or v11+)

### Installation
```bash
# 1. Clone repository
git clone https://github.com/kiranpal19/vayushield.git
cd vayushield

# 2. Install dependencies (including @cedar-policy/cedar-wasm)
npm install

# 3. Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🏛️ Project Structure
```text
environment-hacks/
├── aws/
│   ├── cedar_policies.cedar        # Formal AWS Cedar policy definitions
│   └── template.yaml               # AWS SAM CloudFormation serverless template
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Ticker, team badge & episode selector
│   │   ├── DelhiAqiMap.tsx         # Leaflet map with 14+ stations (DTU focused)
│   │   ├── SchoolSafetyPanel.tsx   # AWS Cedar Policy simulator & PDF circular
│   │   ├── StubblePlumeTracker.tsx # Stubble fires & plume time-of-flight model
│   │   ├── ExposureDosimeter.tsx   # Commute dosage & cigarette equivalence
│   │   ├── IndoorAirSimulator.tsx  # Room volume, ACH & purifier schedule
│   │   └── AwsArchitectureModal.tsx# AWS open source & cloud architecture inspector
│   ├── services/
│   │   ├── aqiDataService.ts       # CPCB Delhi station telemetry & GRAP logic
│   │   ├── cedarPolicyService.ts   # AWS Cedar evaluation service & catalog
│   │   ├── dosimeterService.ts     # Respiration & particle deposition formulas
│   │   └── stubbleDataService.ts   # VIIRS/MODIS satellite data & wind vectors
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Main layout & scenario switcher
│   └── main.tsx
└── package.json
```
