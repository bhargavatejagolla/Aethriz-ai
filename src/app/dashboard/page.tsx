"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import BioNeuralCanvas from "@/components/landing/BioNeuralCanvas";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { useAuth } from "@/context/AuthContext";
import { 
  Activity, 
  Heart, 
  Calendar, 
  Video, 
  Scan, 
  PlusCircle, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  FileText, 
  TrendingUp,
  User,
  LogOut
} from "lucide-react";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  mode: string;
}

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aethriz_consultations");
      if (stored) {
        setAppointments(JSON.parse(stored));
      } else {
        // Fallback demo appointment
        setAppointments([
          {
            id: "AETH-CONS-894210",
            doctorName: "Dr. Sarah Lin, MD, FACC",
            specialty: "Cardiovascular Medicine",
            date: "2026-10-30",
            time: "11:00 AM",
            mode: "telehealth",
          }
        ]);
      }
    } catch {
      // Fallback
    }
  }, []);

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <BioNeuralCanvas />
      <FloatingNavbar />
      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-red-100 shadow-xl shadow-red-500/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <AethrizLogo variant="pill" size="xs" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                <User className="w-3.5 h-3.5" />
                Patient Bio-Algorithmic HUD &bull; Role: {user?.role || "Patient"}
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{user?.fullName || "Marcus Vance"}</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm">
              Digital Health ID: <span className="font-mono font-bold text-slate-800">AETH-PID-1049-USA</span> &bull; Linked Cohort: {user?.department || "Cardiometabolic Care Cohort"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/health-analysis"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs shadow-md shadow-red-600/20 hover:scale-105 transition-all"
            >
              <Activity className="w-4 h-4" />
              New AI Health Scan
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-red-600 font-semibold text-xs shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Doctor
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-slate-500 hover:text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Exit
            </button>
          </div>
        </div>

        {/* Real-Time Bio-Telemetry Sparkline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Heart Rate */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-600 animate-pulse" />
                Heart Rate (Sinus)
              </span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-mono text-[11px]">Normal</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-slate-900">72</span>
              <span className="text-xs text-slate-500 font-mono">BPM</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Lead II resting telemetry. HRV 58ms within optimal range.
            </p>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-600" />
                Blood Pressure
              </span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-mono text-[11px]">Optimal</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-slate-900">118/76</span>
              <span className="text-xs text-slate-500 font-mono">mmHg</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Mean Arterial Pressure (MAP): 90 mmHg. Vasotone stable.
            </p>
          </div>

          {/* Blood Oxygen */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600" />
                SpO2 Saturation
              </span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-mono text-[11px]">99%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-slate-900">99</span>
              <span className="text-xs text-slate-500 font-mono">% O₂</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Continuous photoplethysmogram. Hypoxia index 0.00.
            </p>
          </div>

          {/* Fasting Glucose */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                Fasting Glucose
              </span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-mono text-[11px]">Euglycemic</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-slate-900">94</span>
              <span className="text-xs text-slate-500 font-mono">mg/dL</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Predicted HbA1c: 5.2%. Postprandial clearance 38m.
            </p>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Scheduled Appointments & Telehealth */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Active Consultations</h2>
                  <p className="text-xs text-slate-500">Cross-synchronized with AETHRIZ Mobile Platform</p>
                </div>
                <Link
                  href="/booking"
                  className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  Book Another &rarr;
                </Link>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-10 text-slate-500 space-y-3">
                  <Calendar className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-sm">No scheduled consultations right now.</p>
                  <Link
                    href="/booking"
                    className="inline-block px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold"
                  >
                    Schedule First Appointment
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-5 rounded-2xl border border-slate-200 hover:border-red-300 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-red-600 uppercase bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                            {appt.id}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-1">{appt.doctorName}</h3>
                          <p className="text-xs text-slate-500">{appt.specialty}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                          Confirmed
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {appt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {appt.time} IST
                        </span>
                        <span className="flex items-center gap-1 font-medium capitalize text-red-600">
                          <Video className="w-3.5 h-3.5" />
                          {appt.mode}
                        </span>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          onClick={() => alert(`Connecting to encrypted room for ${appt.doctorName}...`)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-semibold shadow-md shadow-red-600/20 hover:scale-105 transition-all flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" />
                          Join Video Consult
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Features Jump */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/food-scanner"
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-red-300 shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    Food & Meal Scanner
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Scan meals for instant macronutrient and glycemic breakdown.
                  </p>
                </div>
              </Link>

              <Link
                href="/body-explorer"
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-red-300 shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    3D Human Anatomy
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Explore cardiovascular, neuro, and skeletal layers in 3D.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: AI Bio-Diagnostic Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B0E14] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                    Bio-Algorithmic Health Score
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400">92 / 100</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Cardiovascular Resilience</span>
                    <span className="font-mono text-emerald-400">Low Risk (8.2%)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "91%" }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Metabolic Stability</span>
                    <span className="font-mono text-emerald-400">Optimal (94%)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "94%" }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Neuro-Autonomic Balance</span>
                    <span className="font-mono text-amber-400">Moderate Stress (78%)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "78%" }} />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>AI Diagnostic Note:</strong> Sleep cycle variability detected a 22-minute latency shift. Recommended protocol: reduce blue-spectrum exposure 45m prior to sleep and maintain hydration.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/health-analysis"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-transform"
                >
                  Recalculate Bayesian Risk Model
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Regulatory Footer Tag */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Protected under Aethriz AI HIPAA-compliant enterprise encryption. Ref: AAHAAR/NTC/2026-27/02.
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
