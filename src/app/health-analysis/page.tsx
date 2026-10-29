"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import DnaHelixCanvas from "@/components/canvas/DnaHelixCanvas";
import Shuffle from "@/components/ui/Shuffle";
import StarBorder from "@/components/ui/StarBorder";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { Activity, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Heart, RefreshCw } from "lucide-react";

export default function HealthAnalysisPage() {
  const [systolic, setSystolic] = useState(124);
  const [apob, setApob] = useState(112);
  const [glucose, setGlucose] = useState(98);
  const [sleep, setSleep] = useState(7);
  const [exercise, setExercise] = useState(150);

  // Dynamic Bayesian risk calculation
  const bpFactor = Math.max(0, (systolic - 115) / 2.5);
  const apobFactor = Math.max(0, (apob - 90) / 1.8);
  const glucoseFactor = Math.max(0, (glucose - 90) / 1.5);
  const sleepPenalty = sleep < 6 ? 12 : sleep > 9 ? 6 : 0;
  const exerciseCredit = Math.min(15, exercise / 15);

  const rawRisk = Math.round(18 + bpFactor + apobFactor + glucoseFactor + sleepPenalty - exerciseCredit);
  const riskScore = Math.max(5, Math.min(95, rawRisk));

  const getRiskCategory = (score: number) => {
    if (score < 25) return { label: "Optimal Baseline", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (score < 55) return { label: "Moderate Risk Tier", color: "text-amber-800 bg-amber-50 border-amber-200" };
    return { label: "Elevated Risk — Clinical Attention", color: "text-red-700 bg-red-50 border-red-200" };
  };

  const riskCat = getRiskCategory(riskScore);

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <DnaHelixCanvas />
      <FloatingNavbar />

      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-red-100 shadow-xl space-y-4">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <AethrizLogo variant="pill" size="xs" />
              <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                STEP 1 &bull; AI HEALTH & LIFESTYLE ANALYSIS
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
              <Shuffle
                text="Multi-Parametric AI Biomarker Profiler"
                tag="span"
                effect="slide"
                shuffleDirection="right"
                duration={0.35}
                stagger={0.015}
                accentColor="#DC2626"
                triggerOnHover={true}
                hoverRadius={35}
              />
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium leading-relaxed">
              Synthesizing continuous hemodynamic measurements, metabolic glucose variance, and serum ApoB lipid markers against longitudinal cardiovascular models.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>One-Time Free Clinical AI Trial Active for this Session</span>
            </div>
            <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              TRIAL 1/1
            </span>
          </div>
        </div>

        {/* Interactive Analyzer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Form (2 Cols) */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-red-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Biometric & Lifestyle Parameters</h2>
              <span className="text-xs text-gray-500 font-mono">Real-Time Reactive Math</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              {/* Systolic BP */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-bold font-sans">Systolic BP (mmHg)</span>
                  <span className="font-black text-red-600">{systolic} mmHg</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="180"
                  value={systolic}
                  onChange={(e) => setSystolic(parseInt(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>90 (Optimal)</span>
                  <span>180 (Stage 2)</span>
                </div>
              </div>

              {/* Serum ApoB */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-bold font-sans">Serum ApoB (mg/dL)</span>
                  <span className="font-black text-red-600">{apob} mg/dL</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="170"
                  value={apob}
                  onChange={(e) => setApob(parseInt(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>50 (Ideal)</span>
                  <span>170 (Critical)</span>
                </div>
              </div>

              {/* Fasting Glucose */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-bold font-sans">Fasting Glucose (mg/dL)</span>
                  <span className="font-black text-amber-700">{glucose} mg/dL</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="160"
                  value={glucose}
                  onChange={(e) => setGlucose(parseInt(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>70 (Euglycemic)</span>
                  <span>160 (Impaired)</span>
                </div>
              </div>

              {/* Sleep Duration */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-bold font-sans">Sleep Duration (Hours)</span>
                  <span className="font-black text-blue-600">{sleep} hrs/night</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="10"
                  value={sleep}
                  onChange={(e) => setSleep(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>4 hrs</span>
                  <span>10 hrs</span>
                </div>
              </div>
            </div>

            {/* Exercise Slider */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-gray-700 font-bold font-sans">Moderate-to-Vigorous Activity (min/week)</span>
                <span className="font-black text-emerald-600">{exercise} min/wk</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                value={exercise}
                onChange={(e) => setExercise(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0 min (Sedentary)</span>
                <span>150 min (AHA Guideline)</span>
                <span>300 min (Elite)</span>
              </div>
            </div>
          </div>

          {/* Results Card (1 Col) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-100 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">AI Cardiorespiratory Risk</h3>
                <span className="text-[10px] font-mono text-gray-400">p &lt; 0.001</span>
              </div>

              <div className="text-center py-4 bg-white rounded-2xl border border-gray-200 space-y-1">
                <div className="text-5xl font-black text-red-600 font-mono tracking-tight">
                  {riskScore}
                  <span className="text-xl text-gray-400 font-normal">/100</span>
                </div>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mt-2 ${riskCat.color}`}>
                  {riskCat.label}
                </span>
              </div>

              <div className="space-y-2 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>ApoB particle density: {apob > 120 ? "Accelerated atherogenesis" : "Physiologic baseline"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Hemodynamic vascular tone: {systolic > 130 ? "Stage 1 Isolated" : "Normotensive"}</span>
                </div>
              </div>
            </div>

            <StarBorder
              as={Link}
              href="/booking"
              color="#DC2626"
              trailColor="#F87171"
              glow={0.7}
              sparkle={true}
              radius={12}
              theme="light"
              backgroundColor="#DC2626"
              textColor="#FFFFFF"
              borderColor="rgba(220, 38, 38, 0.3)"
              className="w-full py-3 text-xs font-bold shadow-md shadow-red-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="text-white">Discuss Results with a Cardiologist</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </StarBorder>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
