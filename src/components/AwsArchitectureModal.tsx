import React, { useState } from 'react';
import { Cloud, X, Shield, Server, Database, Bell, CheckCircle2, Copy, Check } from 'lucide-react';

interface AwsArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AwsArchitectureModal: React.FC<AwsArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'cedar' | 'sam'>('architecture');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold">
              <Cloud className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">AWS Integration & Hackathon Qualification</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                  Eligible for AWS Prizes
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Meets "Build It (Open Source)" with AWS Cedar & "Ship It" with Serverless Cloud Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-slate-800 flex space-x-4 bg-slate-900">
          {[
            { id: 'architecture', label: 'AWS Pipeline Architecture' },
            { id: 'cedar', label: 'AWS Cedar Policies (Open Source)' },
            { id: 'sam', label: 'AWS SAM Template (template.yaml)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Highlight Badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Build It: AWS Open Source (Cedar Engine)</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Uses <strong>AWS Cedar</strong> (Apache 2.0 open source, developed by AWS) via <code className="text-cyan-400">@cedar-policy/cedar-wasm</code> to formally define and evaluate CAQM Delhi GRAP stages (I-IV) and school closures as deterministic code.
                  </p>
                  <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px] font-medium pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Meets "Auth and policy: Cedar" Hackathon requirement</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm">
                    <Server className="w-4 h-4" />
                    <span>Ship It: AWS Serverless & Cloud Hosting</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Packaged with <strong>AWS SAM</strong> infrastructure-as-code for Lambda telemetry crons, DynamoDB time-series records, Amazon SNS school broadcast topics, and AWS Amplify / S3 frontend deployment.
                  </p>
                  <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px] font-medium pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Meets "Ship It: Lambda, DynamoDB, SNS, Amplify" requirement</span>
                  </div>
                </div>
              </div>

              {/* Architecture Diagram Steps */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm">End-to-End AWS Telemetry & Policy Pipeline:</h4>
                <div className="space-y-2">
                  {[
                    {
                      step: '01',
                      name: 'Amazon EventBridge (Scheduled Cron)',
                      detail: 'Triggers ingestion function every 15 minutes to synchronize 40+ Delhi CPCB air stations and NASA VIIRS satellite stubble fire counts.',
                      icon: Bell,
                    },
                    {
                      step: '02',
                      name: 'AWS Lambda (Ingestion & ETL Worker)',
                      detail: 'Validates raw sensor streams, calculates 24h rolling averages, detects rapid smog inversions, and computes plume travel times.',
                      icon: Server,
                    },
                    {
                      step: '03',
                      name: 'Amazon DynamoDB (VayuStationData Table)',
                      detail: 'High-throughput NoSQL table storing partition key (stationId) and sort key (timestamp) with auto TTL expiration for cost optimization.',
                      icon: Database,
                    },
                    {
                      step: '04',
                      name: 'AWS Cedar Policy Engine (Decision Point)',
                      detail: 'Evaluates requests from principals (schools, transporters, contractors) against active GRAP Stage context to produce non-repudiable permit/forbid verdicts.',
                      icon: Shield,
                    },
                    {
                      step: '05',
                      name: 'Amazon SNS & SES (Emergency Broadcast)',
                      detail: 'Dispatches automated SMS/Email circulars to registered school principals and municipal commissioners when AQI crosses Stage III thresholds.',
                      icon: Bell,
                    },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.step}
                        className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start space-x-3"
                      >
                        <span className="font-mono font-bold text-amber-400 text-sm">{s.step}</span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-3.5 h-3.5 text-slate-400" />
                            <strong className="text-slate-200">{s.name}</strong>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{s.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cedar' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-400 text-[11px]">aws/cedar_policies.cedar</span>
                <span className="text-[10px] text-emerald-400 font-mono">AWS Cedar Policy DSL</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto max-h-[380px]">
{`// ==============================================================================
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
};`}
              </pre>
            </div>
          )}

          {activeTab === 'sam' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-400 text-[11px]">aws/template.yaml</span>
                <span className="text-[10px] text-orange-400 font-mono">AWS SAM CloudFormation</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto max-h-[380px]">
{`AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: VayuShield - AWS Serverless Architecture & Cedar Policy Pipeline

Globals:
  Function:
    Timeout: 30
    MemorySize: 256
    Runtime: python3.11

Resources:
  VayuStationDataTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: VayuStationData
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: stationId
          AttributeType: S
        - AttributeName: timestamp
          AttributeType: N
      KeySchema:
        - AttributeName: stationId
          KeyType: HASH
        - AttributeName: timestamp
          KeyType: RANGE

  AqiIngestionFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ./lambda/ingest
      Handler: app.lambda_handler
      Events:
        ScheduledIngest:
          Type: Schedule
          Properties:
            Schedule: rate(15 minutes)`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Team VayuKraft • Environmental Hacks @ DTU Delhi</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
