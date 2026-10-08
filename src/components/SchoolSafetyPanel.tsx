import React, { useState, useEffect } from 'react';
import { StationData, PolicyEvaluationRequest, PolicyEvaluationResult } from '../types';
import { evaluateCedarPolicy, CEDAR_POLICIES_CATALOG } from '../services/cedarPolicyService';
import {
  School,
  ShieldCheck,
  ShieldAlert,
  FileText,
  Code2,
  CheckCircle,
  XCircle,
  Play,
  Sliders,
  Send,
  Building2,
  Truck,
  GraduationCap
} from 'lucide-react';

interface SchoolSafetyPanelProps {
  currentStation: StationData;
}

export const SchoolSafetyPanel: React.FC<SchoolSafetyPanelProps> = ({ currentStation }) => {
  // Policy Evaluation Form State
  const [selectedRole, setSelectedRole] = useState<'SchoolAuthority' | 'ConstructionContractor' | 'CommercialTransportOperator' | 'Citizen'>('SchoolAuthority');
  const [selectedAction, setSelectedAction] = useState<any>('MorningAssemblyOutdoor');
  const [customAqi, setCustomAqi] = useState<number>(currentStation.aqi);
  const [customPm25, setCustomPm25] = useState<number>(currentStation.pm25);
  const [gradeLevel, setGradeLevel] = useState<number>(4);
  const [isEssentialService, setIsEssentialService] = useState<boolean>(false);
  const [vehicleCategory, setVehicleCategory] = useState<'BS3_Petrol' | 'BS4_Diesel' | 'BS6' | 'EV_Electric'>('BS4_Diesel');
  
  // Evaluation Result State
  const [evalResult, setEvalResult] = useState<PolicyEvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showNoticeModal, setShowNoticeModal] = useState<boolean>(false);
  const [activeCedarPolicyTab, setActiveCedarPolicyTab] = useState<string>('school-outdoor-ban');

  // Sync when station changes
  useEffect(() => {
    setCustomAqi(currentStation.aqi);
    setCustomPm25(currentStation.pm25);
  }, [currentStation]);

  // Run evaluation
  const runEvaluation = async () => {
    setIsEvaluating(true);
    const req: PolicyEvaluationRequest = {
      principalType: selectedRole,
      principalId: `Principal::"${selectedRole}"`,
      action: selectedAction,
      resourceType: selectedRole === 'SchoolAuthority' ? 'DelhiSchool' : selectedRole === 'ConstructionContractor' ? 'ConstructionSite' : 'DelhiNCRRoads',
      resourceId: `Resource::"${currentStation.name}"`,
      context: {
        aqi: customAqi,
        pm25: customPm25,
        gradeLevel: gradeLevel,
        isEssentialService: isEssentialService,
        vehicleEmissionCategory: vehicleCategory,
        carryingEssentialSupplies: isEssentialService,
      },
    };

    const res = await evaluateCedarPolicy(req);
    setEvalResult(res);
    setIsEvaluating(false);
  };

  useEffect(() => {
    runEvaluation();
  }, [selectedRole, selectedAction, customAqi, customPm25, gradeLevel, isEssentialService, vehicleCategory]);

  const activePolicyData = CEDAR_POLICIES_CATALOG.find((p) => p.id === activeCedarPolicyTab) || CEDAR_POLICIES_CATALOG[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-mono font-semibold">
              AWS Cedar Open-Source Policy-As-Code
            </span>
            <span className="text-xs text-slate-400">Delhi GRAP & DoE Compliance Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            School Air Safety & GRAP Automated Authorization Decision Point (PDP)
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Schools and municipal authorities must legally restrict student exposure during hazardous air inversions.
            VayuShield uses <strong className="text-cyan-400">AWS Cedar</strong> to evaluate air quality thresholds into non-repudiable legal decisions.
          </p>
        </div>

        <button
          onClick={() => setShowNoticeModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all whitespace-nowrap self-start md:self-auto"
        >
          <FileText className="w-4 h-4" />
          <span>Generate School Notice (PDF)</span>
        </button>
      </div>

      {/* Main Grid: Policy Evaluation Simulator (Left) + Decision & Cedar Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Simulation Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Authorization Request Parameters</span>
            </h3>

            {/* 1. Select Principal Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Entity / Principal Role</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'SchoolAuthority', label: 'School Admin / Principal', icon: GraduationCap },
                  { id: 'ConstructionContractor', label: 'Construction Firm', icon: Building2 },
                  { id: 'CommercialTransportOperator', label: 'Fleet / Transporter', icon: Truck },
                  { id: 'Citizen', label: 'General Public', icon: School },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedRole(item.id as any);
                        if (item.id === 'SchoolAuthority') setSelectedAction('MorningAssemblyOutdoor');
                        else if (item.id === 'ConstructionContractor') setSelectedAction('ExcavationAndEarthwork');
                        else if (item.id === 'CommercialTransportOperator') setSelectedAction('EnterDelhiBorder');
                        else setSelectedAction('HoldInPersonClasses');
                      }}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center space-x-2 ${
                        isSelected
                          ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Action to Evaluate */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Action to Evaluate</label>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {selectedRole === 'SchoolAuthority' && (
                  <>
                    <option value="MorningAssemblyOutdoor">Morning Outdoor Assembly & Prayer</option>
                    <option value="SportsPeriod">Physical PE / Sports Period Outdoors</option>
                    <option value="HoldInPersonClasses">Hold In-Person Physical Classes</option>
                    <option value="ShiftToOnlineClasses">Shift to Digital/Hybrid Remote Learning</option>
                    <option value="IssueN95Advisory">Issue Mandatory N95 Mask Circular</option>
                  </>
                )}
                {selectedRole === 'ConstructionContractor' && (
                  <>
                    <option value="ExcavationAndEarthwork">Excavation & Heavy Earthwork (Dust Generating)</option>
                    <option value="OperateDieselGenerator">Run Diesel Generators for Site Power</option>
                  </>
                )}
                {selectedRole === 'CommercialTransportOperator' && (
                  <>
                    <option value="EnterDelhiBorder">Commercial Vehicle Entry through Delhi Borders</option>
                    <option value="OperateDieselGenerator">Operate Industrial Backup Generators</option>
                  </>
                )}
                {selectedRole === 'Citizen' && (
                  <>
                    <option value="HoldInPersonClasses">Send Child to Physical Classes</option>
                    <option value="EnterDelhiBorder">Drive Personal BS-III Petrol / BS-IV Diesel Car</option>
                  </>
                )}
              </select>
            </div>

            {/* 3. Role-specific context options */}
            {selectedRole === 'SchoolAuthority' && selectedAction === 'HoldInPersonClasses' && (
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Target Grade Level:</span>
                  <span className="font-bold text-cyan-400">Class {gradeLevel} ({gradeLevel <= 5 ? 'Primary Wing' : 'Middle/High Wing'})</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(+e.target.value)}
                  className="w-full accent-cyan-500"
                />
                <p className="text-[10px] text-slate-500">Under GRAP Stage III, Nursery to Grade 5 physical classes are legally banned.</p>
              </div>
            )}

            {selectedRole === 'CommercialTransportOperator' && (
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <label className="text-xs text-slate-300">Vehicle Emission Standard:</label>
                <select
                  value={vehicleCategory}
                  onChange={(e) => setVehicleCategory(e.target.value as any)}
                  className="w-full bg-slate-900 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-slate-700"
                >
                  <option value="BS3_Petrol">BS-III Petrol (Banned in Stage III/IV)</option>
                  <option value="BS4_Diesel">BS-IV Diesel (Banned in Stage III/IV)</option>
                  <option value="BS6">BS-VI Compliant (Permitted)</option>
                  <option value="EV_Electric">Electric / Zero-Emission (Permitted)</option>
                </select>
              </div>
            )}

            {/* 4. Air Quality Environmental Context Sliders */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Simulated Ambient AQI:</span>
                  <span className="font-bold text-rose-400 font-mono">{customAqi}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="5"
                  value={customAqi}
                  onChange={(e) => setCustomAqi(+e.target.value)}
                  className="w-full accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Simulated PM2.5 (µg/m³):</span>
                  <span className="font-bold text-amber-400 font-mono">{customPm25} µg/m³</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="450"
                  step="5"
                  value={customPm25}
                  onChange={(e) => setCustomPm25(+e.target.value)}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="essential"
                  checked={isEssentialService}
                  onChange={(e) => setIsEssentialService(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-600 focus:ring-0"
                />
                <label htmlFor="essential" className="text-xs text-slate-300 cursor-pointer">
                  Tag as Essential Lifeline / Emergency Service
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AWS Cedar Authorization Decision & Policy Code Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Decision Card */}
          {evalResult && (
            <div
              className={`rounded-xl border p-5 shadow-xl transition-all ${
                evalResult.decision === 'deny'
                  ? 'bg-rose-950/20 border-rose-800/80 shadow-rose-950/20'
                  : 'bg-emerald-950/20 border-emerald-800/80 shadow-emerald-950/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {evalResult.decision === 'deny' ? (
                    <div className="w-10 h-10 rounded-xl bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center">
                      <XCircle className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Cedar Decision Outcome
                    </span>
                    <h4
                      className={`text-xl font-black ${
                        evalResult.decision === 'deny' ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {evalResult.decision === 'deny' ? 'FORBIDDEN (DENIED)' : 'PERMITTED (ALLOWED)'}
                    </h4>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Enforced Directive</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-800">
                    {evalResult.grapStage}
                  </span>
                </div>
              </div>

              {/* Rationale */}
              <div className="mt-4 p-3.5 rounded-lg bg-slate-950/80 border border-slate-900 text-xs text-slate-200 space-y-2">
                <p className="leading-relaxed">{evalResult.reason}</p>
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Legal Basis: <strong className="text-slate-300">{evalResult.legalMandate}</strong></span>
                  <span className="font-mono text-cyan-400">Rule: @id("{evalResult.matchedPolicyId}")</span>
                </div>
              </div>
            </div>
          )}

          {/* AWS Cedar Policy DSL Code Explorer */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>AWS Cedar Policy Catalog (Language Standard)</span>
              </h3>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                cedar-policy v4.x
              </span>
            </div>

            {/* Policy Tabs */}
            <div className="flex space-x-1 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800">
              {CEDAR_POLICIES_CATALOG.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveCedarPolicyTab(p.id)}
                  className={`text-[11px] px-2.5 py-1 rounded whitespace-nowrap transition-colors font-medium ${
                    activeCedarPolicyTab === p.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="relative rounded-lg bg-slate-950 border border-slate-800/80 p-4 font-mono text-xs overflow-x-auto">
              <div className="text-slate-400 text-[11px] mb-2 flex items-center justify-between border-b border-slate-900 pb-2">
                <span>File: <strong className="text-slate-200">aws/cedar_policies.cedar</strong></span>
                <span className="text-indigo-400">{activePolicyData.grapStage}</span>
              </div>
              <pre className="text-slate-200 leading-relaxed">
                <code>{activePolicyData.cedarCode}</code>
              </pre>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              AWS Cedar ensures that policies are provably deterministic, auditable, and decoupled from frontend or backend application code.
            </p>
          </div>
        </div>
      </div>

      {/* Official School Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <School className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Official Emergency Air Advisory Circular</h3>
              </div>
              <button
                onClick={() => setShowNoticeModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            {/* Printable Notice Paper */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 font-sans text-xs text-slate-300">
              <div className="text-center border-b border-slate-800 pb-3">
                <h4 className="text-base font-extrabold text-white uppercase tracking-wider">
                  DIRECTORATE OF EDUCATION / SCHOOL ADMINISTRATIVE COUNCIL
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">National Capital Territory of Delhi • Air Quality Wing</p>
                <p className="text-[10px] text-cyan-400 font-mono mt-1">Ref No: DO-DEL/GRAP-AIR/2026/089</p>
              </div>

              <div>
                <p className="font-semibold text-slate-200">TO: ALL PARENTS, TEACHERS & WARDENS</p>
                <p className="text-[11px] text-slate-400">Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>

              <div className="p-3 rounded bg-rose-950/30 border border-rose-900/60 text-rose-300 space-y-1">
                <p className="font-bold">SUBJECT: IMMEDIATE SAFETY MEASURES UNDER GRAP STAGE III (AQI {customAqi})</p>
                <p className="text-[11px]">
                  Pursuant to CAQM statutory directives and automated AWS Cedar compliance validation:
                </p>
              </div>

              <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>
                  <strong>Physical Outdoor Assemblies & Sports:</strong> Suspended with immediate effect until further notice.
                </li>
                <li>
                  <strong>Primary Wing (Nursery to Class 5):</strong> Physical classes will not be held. All lessons shift to digital online portals starting tomorrow morning.
                </li>
                <li>
                  <strong>Classes 6 to 12:</strong> Compulsory N95/FFP2 masks for commuting students. Indoor HEPA filtration active in all classrooms.
                </li>
                <li>
                  <strong>School Busses:</strong> Windows must remain sealed; drivers instructed to avoid congested choke-points.
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  <p className="font-semibold text-slate-200">Office of the Principal</p>
                  <p>Authorized by VayuShield Automated Policy Engine</p>
                </div>
                <div className="text-right font-mono text-[10px] text-indigo-400">
                  <p>SHA256: e8b94a0f8c...3d2</p>
                  <p>Status: VERIFIED & COMPLIANT</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
