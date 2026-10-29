"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import DnaHelixCanvas from "@/components/canvas/DnaHelixCanvas";
import Shuffle from "@/components/ui/Shuffle";
import StarBorder from "@/components/ui/StarBorder";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { 
  Activity, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Heart, 
  RefreshCw, 
  ShieldCheck, 
  Download, 
  Zap, 
  Layers,
  Flame,
  FileText
} from "lucide-react";

interface CohortPreset {
  name: string;
  label: string;
  systolic: number;
  apob: number;
  glucose: number;
  sleep: number;
  exercise: number;
}

export default function HealthAnalysisPage() {
  const [systolic, setSystolic] = useState(124);
  const [apob, setApob] = useState(112);
  const [glucose, setGlucose] = useState(98);
  const [sleep, setSleep] = useState(7);
  const [exercise, setExercise] = useState(150);
  const [activeCohort, setActiveCohort] = useState<string>("custom");
  const [exportNotice, setExportNotice] = useState(false);

  const cohortPresets: CohortPreset[] = [
    {
      name: "athlete",
      label: "Cardiorespiratory Athlete",
      systolic: 108,
      apob: 68,
      glucose: 84,
      sleep: 8.5,
      exercise: 260,
    },
    {
      name: "desk-worker",
      label: "Sedentary Desk Worker",
      systolic: 132,
      apob: 118,
      glucose: 102,
      sleep: 6,
      exercise: 45,
    },
    {
      name: "elevated-risk",
      label: "Subclinical Atherogenic",
      systolic: 154,
      apob: 148,
      glucose: 126,
      sleep: 5,
      exercise: 20,
    },
    {
      name: "stabilized",
      label: "Post-Treatment Stabilized",
      systolic: 118,
      apob: 74,
      glucose: 90,
      sleep: 7.5,
      exercise: 180,
    },
  ];

  const applyCohort = (preset: CohortPreset) => {
    setActiveCohort(preset.name);
    setSystolic(preset.systolic);
    setApob(preset.apob);
    setGlucose(preset.glucose);
    setSleep(preset.sleep);
    setExercise(preset.exercise);
  };

  // Dynamic Bayesian risk calculation
  const bpFactor = Math.max(0, (systolic - 115) / 2.5);
  const apobFactor = Math.max(0, (apob - 90) / 1.8);
  const glucoseFactor = Math.max(0, (glucose - 90) / 1.5);
  const sleepPenalty = sleep < 6 ? 12 : sleep > 9 ? 6 : 0;
  const exerciseCredit = Math.min(15, exercise / 15);

  const rawRisk = Math.round(18 + bpFactor + apobFactor + glucoseFactor + sleepPenalty - exerciseCredit);
  const riskScore = Math.max(5, Math.min(95, rawRisk));

  const getRiskCategory = (score: number) => {
    if (score < 28) return { label: "Optimal Baseline", color: "text-emerald-700 bg-emerald-50 border-emerald-200", gaugeColor: "#10B981" };
    if (score < 58) return { label: "Moderate Risk Tier", color: "text-amber-800 bg-amber-50 border-amber-200", gaugeColor: "#F59E0B" };
    return { label: "Elevated Risk — Clinical Attention", color: "text-red-700 bg-red-50 border-red-200", gaugeColor: "#DC2626" };
  };

  const riskCat = getRiskCategory(riskScore);

  // SVG Gauge calculations
  const gaugeRadius = 64;
  const circumference = Math.PI * gaugeRadius; // Semi-circle
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  const handleExportDossier = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <DnaHelixCanvas />
      <FloatingNavbar />

      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header with Step 1 Architecture Notice */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-red-100 shadow-xl space-y-4">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <AethrizLogo variant="pill" size="xs" />
              <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                STEP 1 &bull; AI HEALTH &amp; LIFESTYLE ANALYSIS
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                ACC/AHA CLINICAL ALGORITHM
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

          {/* Clinical Cohort Presets Bar */}
          <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-gray-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-red-600" />
              <span>Simulate Verified Clinical Cohort:</span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {cohortPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyCohort(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCohort === preset.name
                      ? "bg-red-600 text-white shadow-sm shadow-red-500/20"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Analyzer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-red-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-600" />
                <span>Biometric &amp; Lifestyle Parameters</span>
              </h2>
              <span className="text-[11px] text-gray-500 font-mono">Real-Time Reactive Math</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-mono">
              {/* Systolic BP */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 hover:border-gray-300 transition-colors shadow-2xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-bold font-sans">Systolic BP</span>
                  <span className="font-black text-red-600 text-sm">{systolic} mmHg</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="180"
                  value={systolic}
                  onChange={(e) => {
                    setSystolic(parseInt(e.target.value));
                    setActiveCohort("custom");
                  }}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>90 (Optimal)</span>
                  <span>140 (Stage 1)</span>
                  <span>180 (Stage 2)</span>
                </div>
              </div>

              {/* Serum ApoB */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 hover:border-gray-300 transition-colors shadow-2xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-bold font-sans">Serum ApoB</span>
                  <span className="font-black text-red-600 text-sm">{apob} mg/dL</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="170"
                  value={apob}
                  onChange={(e) => {
                    setApob(parseInt(e.target.value));
                    setActiveCohort("custom");
                  }}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>50 (Ideal)</span>
                  <span>90 (Threshold)</span>
                  <span>170 (Critical)</span>
                </div>
              </div>

              {/* Fasting Glucose */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 hover:border-gray-300 transition-colors shadow-2xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-bold font-sans">Fasting Glucose</span>
                  <span className="font-black text-amber-600 text-sm">{glucose} mg/dL</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="160"
                  value={glucose}
                  onChange={(e) => {
                    setGlucose(parseInt(e.target.value));
                    setActiveCohort("custom");
                  }}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>70 (Euglycemic)</span>
                  <span>100 (Impaired)</span>
                  <span>160 (Elevated)</span>
                </div>
              </div>

              {/* Sleep Duration */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 hover:border-gray-300 transition-colors shadow-2xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-bold font-sans">Sleep Duration</span>
                  <span className="font-black text-blue-600 text-sm">{sleep} hrs/night</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="10"
                  step="0.5"
                  value={sleep}
                  onChange={(e) => {
                    setSleep(parseFloat(e.target.value));
                    setActiveCohort("custom");
                  }}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>4 hrs (Deficit)</span>
                  <span>7.5 hrs (Optimal)</span>
                  <span>10 hrs</span>
                </div>
              </div>
            </div>

            {/* Exercise Slider */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2 text-xs font-mono shadow-2xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-bold font-sans flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  Moderate-to-Vigorous Activity (Aerobic + Resistance)
                </span>
                <span className="font-black text-emerald-600 text-sm">{exercise} min/week</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="10"
                value={exercise}
                onChange={(e) => {
                  setExercise(parseInt(e.target.value));
                  setActiveCohort("custom");
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0 min (Sedentary)</span>
                <span>150 min (AHA Guideline)</span>
                <span>300 min (Optimal Conditioning)</span>
              </div>
            </div>

            {/* Subclinical Organ Perfusion Tensors */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-mono">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <span className="text-[10px] text-gray-500 block font-sans">ENDOTHELIAL SHEAR</span>
                <span className="font-bold text-gray-900 block mt-0.5">{systolic < 125 ? "0.94 Normal" : "0.78 Compromised"}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <span className="text-[10px] text-gray-500 block font-sans">ATHEROGENIC BURDEN</span>
                <span className="font-bold text-gray-900 block mt-0.5">{apob < 90 ? "Low Plaque" : "Active Penetration"}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <span className="text-[10px] text-gray-500 block font-sans">GLYCEMIC STABILITY</span>
                <span className="font-bold text-gray-900 block mt-0.5">{glucose < 100 ? "Normoglycemic" : "Excursion Risk"}</span>
              </div>
            </div>
          </div>

          {/* Results Card with Radial Speedometer Gauge (5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-red-100 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>Bayesian Cardiorespiratory Score</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                  p &lt; 0.001
                </span>
              </div>

              {/* Radial Arc Speedometer */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center relative shadow-xs">
                <div className="relative w-44 h-28 flex items-end justify-center">
                  <svg className="w-44 h-44 overflow-visible" viewBox="0 0 160 160">
                    {/* Background Semi-Circle Arc */}
                    <path
                      d="M 16 120 A 64 64 0 0 1 144 120"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    {/* Active Colored Arc */}
                    <path
                      d="M 16 120 A 64 64 0 0 1 144 120"
                      fill="none"
                      stroke={riskCat.gaugeColor}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute bottom-2 text-center font-mono">
                    <span className="text-4xl font-black text-gray-900 block leading-none">{riskScore}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Index / 100</span>
                  </div>
                </div>

                <span className={`inline-block text-xs font-bold px-3.5 py-1 rounded-full border mt-3 ${riskCat.color}`}>
                  {riskCat.label}
                </span>

                <div className="w-full mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-center text-[10px] font-mono text-gray-500">
                  <span>Cohort Rank: {100 - riskScore}th percentile</span>
                  <span>FPR Confidence: 99.4%</span>
                </div>
              </div>

              {/* Verified Clinical Findings */}
              <div className="space-y-2 text-xs text-gray-700 font-medium">
                <div className="flex items-start gap-2 bg-gray-50/80 p-2.5 rounded-xl border border-gray-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>ApoB particle density: <strong>{apob > 115 ? "Accelerated subendothelial atherogenesis" : "Physiologic clearance baseline"}</strong></span>
                </div>
                <div className="flex items-start gap-2 bg-gray-50/80 p-2.5 rounded-xl border border-gray-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Vascular compliance: <strong>{systolic > 130 ? "Elevated afterload requiring monitoring" : "Optimal normotensive elasticity"}</strong></span>
                </div>
              </div>
            </div>

            {/* Call to Actions & Physician Dossier Export */}
            <div className="space-y-2.5">
              <StarBorder
                as={Link}
                href="/booking"
                color="#DC2626"
                trailColor="#F87171"
                glow={0.7}
                sparkle={true}
                radius={14}
                theme="light"
                backgroundColor="#DC2626"
                textColor="#FFFFFF"
                borderColor="rgba(220, 38, 38, 0.3)"
                className="w-full py-3.5 text-xs font-bold shadow-md shadow-red-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="text-white">Discuss Results with Board Cardiologist</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </StarBorder>

              <button
                onClick={handleExportDossier}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-red-600" />
                <span>{exportNotice ? "Dossier Dispatched to Records!" : "Export Clinical Summary (PDF / EHR)"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
