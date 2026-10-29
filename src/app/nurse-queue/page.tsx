"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import CardiacPulseCanvas from "@/components/canvas/CardiacPulseCanvas";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { useAuth } from "@/context/AuthContext";
import { 
  Heart, 
  Activity, 
  Bell, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  Pill, 
  LogOut, 
  Sparkles,
  Zap
} from "lucide-react";

interface BedTelemetry {
  bedNumber: string;
  patientName: string;
  age: number;
  heartRate: number;
  spO2: number;
  respirationRate: number;
  bp: string;
  status: "Normal" | "Alert" | "Warning";
  alertText?: string;
}

export default function NurseQueuePage() {
  const { user, logout } = useAuth();

  const [beds, setBeds] = useState<BedTelemetry[]>([
    {
      bedNumber: "Bed 101",
      patientName: "Marcus Vance",
      age: 42,
      heartRate: 72,
      spO2: 99,
      respirationRate: 16,
      bp: "118/76",
      status: "Normal",
    },
    {
      bedNumber: "Bed 102",
      patientName: "Anita Roy",
      age: 58,
      heartRate: 88,
      spO2: 95,
      respirationRate: 21,
      bp: "142/90",
      status: "Alert",
      alertText: "Borderline QTc prolongation detected on Lead II",
    },
    {
      bedNumber: "Bed 103",
      patientName: "Kabir Sen",
      age: 34,
      heartRate: 68,
      spO2: 98,
      respirationRate: 14,
      bp: "112/72",
      status: "Normal",
    },
    {
      bedNumber: "Bed 104",
      patientName: "Devi Prasad",
      age: 61,
      heartRate: 96,
      spO2: 96,
      respirationRate: 22,
      bp: "134/86",
      status: "Warning",
      alertText: "Post-op analgesia titration requested",
    },
  ]);

  // Medication Administration Record (MAR)
  const [meds, setMeds] = useState([
    { id: "m-1", bed: "Bed 101", med: "Atorvastatin 20mg Tab PO", time: "12:00 PM", status: "Due" },
    { id: "m-2", bed: "Bed 102", med: "Metoprolol Succinate 25mg PO", time: "12:15 PM", status: "Due" },
    { id: "m-3", bed: "Bed 104", med: "IV Paracetamol 1000mg Infusion", time: "01:00 PM", status: "Scheduled" },
  ]);

  const markMedAdministered = (id: string) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "Administered" } : m))
    );
  };

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <CardiacPulseCanvas />
      <FloatingNavbar />
      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-red-100 shadow-xl shadow-red-500/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <AethrizLogo variant="pill" size="xs" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <Activity className="w-3.5 h-3.5" />
                Nurse Station Triage & In-Patient Telemetry &bull; Role: Nurse
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Triage HUD: <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{user?.fullName || "Ananya Sharma, RN, BSN"}</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm">
              Nursing License: <span className="font-mono font-bold text-slate-800">{user?.licenseNo || "MCI-RN-884210"}</span> &bull; Ward: In-Patient Telemetry Cohort A
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => alert("Rapid Response / Code Blue alert broadcast simulated to crash cart team.")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all"
            >
              <Zap className="w-4 h-4 fill-current" />
              Trigger Rapid Response
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Telemetry Grid of Beds */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              Live Ward Telemetry (4 Active In-Patients)
            </h2>
            <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Continuous 60Hz Telemetry Link
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beds.map((b) => (
              <div
                key={b.bedNumber}
                className={`rounded-3xl p-6 border shadow-sm transition-all space-y-4 ${
                  b.status === "Alert"
                    ? "bg-red-50/50 border-red-300 ring-2 ring-red-500/20"
                    : b.status === "Warning"
                    ? "bg-amber-50/40 border-amber-300"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs">
                      {b.bedNumber}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{b.patientName}</h3>
                      <span className="text-[11px] text-slate-500">Age: {b.age} yrs</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    b.status === "Alert"
                      ? "bg-red-600 text-white animate-pulse"
                      : b.status === "Warning"
                      ? "bg-amber-500 text-white"
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {b.status}
                  </span>
                </div>

                {b.alertText && (
                  <div className="p-3 rounded-xl bg-red-100/70 border border-red-200 text-red-900 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="font-semibold">{b.alertText}</span>
                  </div>
                )}

                {/* Live Vitals HUD */}
                <div className="grid grid-cols-4 gap-3 bg-[#0B0E14] text-white p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">HR</span>
                    <span className="text-xl font-mono font-bold text-red-400">{b.heartRate}</span>
                    <span className="text-[9px] text-slate-400 block">BPM</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">SpO2</span>
                    <span className="text-xl font-mono font-bold text-sky-400">{b.spO2}%</span>
                    <span className="text-[9px] text-slate-400 block">Pulse Ox</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">RESP</span>
                    <span className="text-xl font-mono font-bold text-emerald-400">{b.respirationRate}</span>
                    <span className="text-[9px] text-slate-400 block">/min</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">NIBP</span>
                    <span className="text-base font-mono font-bold text-amber-400">{b.bp}</span>
                    <span className="text-[9px] text-slate-400 block">mmHg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Last Vitals sync: 1 min ago</span>
                  <button
                    onClick={() => alert(`Opening full 12-lead ECG strip for ${b.patientName}...`)}
                    className="font-semibold text-red-600 hover:text-red-700"
                  >
                    View 12-Lead ECG Strip &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Administration Schedule (MAR) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Pill className="w-4 h-4 text-red-600" />
                Medication Administration Record (MAR)
              </h2>
              <p className="text-xs text-slate-500">Barcoded 5-Rights electronic verification</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Shift 08:00 - 16:00</span>
          </div>

          <div className="space-y-3">
            {meds.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-xs font-bold text-slate-800">
                    {m.bed}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{m.med}</p>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      Scheduled: {m.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {m.status === "Administered" ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Administered & Recorded
                    </span>
                  ) : (
                    <button
                      onClick={() => markMedAdministered(m.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs shadow-md shadow-red-600/20 hover:scale-105 transition-all"
                    >
                      Verify & Administer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
