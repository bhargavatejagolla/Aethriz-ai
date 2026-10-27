"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import CardiacPulseCanvas from "@/components/canvas/CardiacPulseCanvas";
import { useAuth } from "@/context/AuthContext";
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  Clock, 
  Video, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  Search, 
  ChevronRight, 
  LogOut, 
  ShieldCheck,
  Building2,
  Share2
} from "lucide-react";

interface PatientCase {
  id: string;
  name: string;
  age: number;
  time: string;
  status: "Waiting in Lobby" | "In Review" | "Completed";
  triageLevel: "High" | "Medium" | "Routine";
  condition: string;
  telehealthReady: boolean;
}

export default function DoctorPortalPage() {
  const { user, logout } = useAuth();
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-01");
  const [activeTab, setActiveTab] = useState<"schedule" | "clinical-ai" | "prescriptions">("schedule");

  const patientCases: PatientCase[] = [
    {
      id: "case-01",
      name: "Marcus Vance",
      age: 42,
      time: "11:00 AM",
      status: "Waiting in Lobby",
      triageLevel: "Medium",
      condition: "Post-Myocardial Infarction recovery; ApoB lipid panel follow-up",
      telehealthReady: true,
    },
    {
      id: "case-02",
      name: "Anita Roy",
      age: 58,
      time: "11:45 AM",
      status: "In Review",
      triageLevel: "High",
      condition: "Borderline Prolonged QTc (465ms) on 24hr Holter telemetry; palpitations",
      telehealthReady: false,
    },
    {
      id: "case-03",
      name: "Kabir Sen",
      age: 34,
      time: "02:15 PM",
      status: "Waiting in Lobby",
      triageLevel: "Routine",
      condition: "Preventive Cardiovascular Genomics screening; familial hypercholesterolemia",
      telehealthReady: true,
    },
    {
      id: "case-04",
      name: "Meera Patel",
      age: 63,
      time: "03:30 PM",
      status: "Completed",
      triageLevel: "Routine",
      condition: "Hypertension titration follow-up; ambulatory BP 122/78 mmHg",
      telehealthReady: false,
    },
  ];

  const selectedCase = patientCases.find((c) => c.id === selectedCaseId) || patientCases[0];

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <CardiacPulseCanvas />
      <FloatingNavbar />
      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Clinician Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-red-100 shadow-xl shadow-red-500/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              <Stethoscope className="w-3.5 h-3.5" />
              AETHRIZ Clinician Command HUD &bull; Role: Doctor
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Clinician Dashboard: <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{user?.fullName || "Dr. Sarah Lin, MD, FACC"}</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm">
              License: <span className="font-mono font-bold text-slate-800">{user?.licenseNo || "NPI-1849204918"}</span> &bull; Department: {user?.department || "Cardiovascular Medicine"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>TELEHEALTH NODE ONLINE</span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Quick Triage Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500">Today's Patients</span>
            <p className="text-2xl font-black font-mono text-slate-900 mt-1">12</p>
            <span className="text-[11px] text-slate-400">4 Telehealth &bull; 8 Clinic</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-amber-600 font-semibold">Pending Triage Review</span>
            <p className="text-2xl font-black font-mono text-amber-600 mt-1">3</p>
            <span className="text-[11px] text-slate-400">1 Critical ECG flag</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-emerald-600 font-semibold">Consultations Done</span>
            <p className="text-2xl font-black font-mono text-emerald-600 mt-1">7</p>
            <span className="text-[11px] text-slate-400">Average duration 18m</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-red-600 font-semibold">AI Copilot Accuracy</span>
            <p className="text-2xl font-black font-mono text-red-600 mt-1">98.4%</p>
            <span className="text-[11px] text-slate-400">Bayesian Diagnostic Model</span>
          </div>
        </div>

        {/* Clinical Workspace: Left Roster / Right Case Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Patient Roster */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-600" />
                  Today's Clinical Roster
                </h2>
                <span className="text-xs font-mono text-slate-400">27 Oct 2026</span>
              </div>

              <div className="space-y-3">
                {patientCases.map((c) => {
                  const isSelected = selectedCaseId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCaseId(c.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                        isSelected
                          ? "border-red-600 bg-red-50/50 shadow-sm ring-1 ring-red-500"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{c.name}</span>
                          <span className="text-xs text-slate-400">({c.age}y)</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {c.time}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-1">{c.condition}</p>

                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <span className={`px-2 py-0.5 rounded font-semibold ${
                          c.triageLevel === "High"
                            ? "bg-red-100 text-red-700"
                            : c.triageLevel === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {c.triageLevel} Priority
                        </span>

                        {c.telehealthReady ? (
                          <span className="text-red-600 font-semibold flex items-center gap-1">
                            <Video className="w-3.5 h-3.5" />
                            Ready in Lobby
                          </span>
                        ) : (
                          <span className="text-slate-400">In-Person Clinic</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Clinical Case & AI Decision Copilot */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-slate-900">{selectedCase.name}</h3>
                    <span className="text-xs text-slate-500 font-mono">PID-8940-2026</span>
                  </div>
                  <p className="text-xs text-red-600 font-medium mt-0.5">{selectedCase.condition}</p>
                </div>

                {selectedCase.telehealthReady && (
                  <button
                    onClick={() => alert(`Launching encrypted WebRTC tele-consultation room for ${selectedCase.name}...`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs shadow-md shadow-red-600/30 hover:scale-105 transition-all"
                  >
                    <Video className="w-4 h-4" />
                    Launch Telehealth Room
                  </button>
                )}
              </div>

              {/* Bio-Telemetry Telemetry Strip */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0B0E14] text-white">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Sinus ECG</span>
                  <p className="text-lg font-mono font-bold text-emerald-400">72 BPM</p>
                  <span className="text-[10px] text-slate-500">Normal Axis</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">ApoB Lipid</span>
                  <p className="text-lg font-mono font-bold text-amber-400">68 mg/dL</p>
                  <span className="text-[10px] text-slate-500">-24% on Statin</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">MAP Arterial</span>
                  <p className="text-lg font-mono font-bold text-sky-400">92 mmHg</p>
                  <span className="text-[10px] text-slate-500">Pulse pressure 42</span>
                </div>
              </div>

              {/* AI Clinical Decision Support (CDS) */}
              <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  AETHRIZ Bio-Algorithmic Decision Support Copilot
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Based on longitudinal Holter and lipid panel trajectory, <strong>ApoB has dropped from 94 to 68 mg/dL</strong> within target range for post-MI secondary prevention (&lt;70 mg/dL). No signs of statin-associated transaminitis (ALT 24 IU/L).
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => alert("Prescription renewal draft generated: Atorvastatin 20mg tab OD x 90 days.")}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors"
                  >
                    Approve 90-Day Rx Renewal
                  </button>
                  <button
                    onClick={() => alert("Diagnostic order dispatched: Fasting Lipoprotein(a) + hs-CRP in 12 weeks.")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-700 text-xs font-semibold hover:bg-red-50 transition-colors"
                  >
                    Schedule Repeat Lipid Panel
                  </button>
                </div>
              </div>

              {/* Clinical Notes Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Consultation SOAP Notes & Assessment
                </label>
                <textarea
                  rows={4}
                  defaultValue="Subjective: Patient reports zero angina or dyspnea on exertion (completed 30 min daily brisk walks). Objective: BP 118/76 mmHg, SpO2 99%. Assessment: Stable post-MI recovery. Plan: Continue current regimen."
                  className="w-full p-4 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => alert("Consultation note saved to patient electronic medical record.")}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Save to EMR & Dispatch Summary
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
