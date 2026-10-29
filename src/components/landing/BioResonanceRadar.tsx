"use client";

import React, { useState, useRef } from "react";
import { Activity, Brain, Heart, Flame, ShieldCheck, Sparkles, Volume2, VolumeX, RefreshCw, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";

type OrganKey = "heart" | "brain" | "metabolism" | "vascular";

interface OrganData {
  name: string;
  code: string;
  icon: typeof Heart;
  baseFreq: string;
  harmonic: string;
  primaryMetric: { label: string; value: string; status: string };
  secondaryMetric: { label: string; value: string; status: string };
  tertiaryMetric: { label: string; value: string; status: string };
  radarPoints: number[]; // 5 metrics [0-100]
  axes: [string, string, string, string, string];
  clinicalInsight: string;
  toneFreq: number; // Hz for Web Audio
}

export default function BioResonanceRadar() {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganKey>("heart");
  const [stressFactor, setStressFactor] = useState(20); // 0-100 slider
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const organs: Record<OrganKey, OrganData> = {
    heart: {
      name: "Cardiovascular Matrix",
      code: "COR-HEMO-01",
      icon: Heart,
      baseFreq: "1.20 Hz (72 BPM)",
      harmonic: "Alpha-Sinus 4.8 Hz",
      primaryMetric: { label: "LEFT VENTRICULAR EF", value: "64.2%", status: "Optimal" },
      secondaryMetric: { label: "PULSE WAVE VELOCITY", value: "6.1 m/s", status: "High Elasticity" },
      tertiaryMetric: { label: "CORONARY PERFUSION", value: "0.98 CFR", status: "Sufficient" },
      radarPoints: [88, 92, 85, 90, 86],
      axes: [
        "Electrophysiology",
        "Myocardial Compliance",
        "Inotropic Tone",
        "Endothelial Shear",
        "Chronotropic Stability",
      ],
      clinicalInsight: "Sinus sync verified. No subclinical repolarization abnormalities detected in precordial leads.",
      toneFreq: 261.63, // C4
    },
    brain: {
      name: "Neuro-Synaptic Matrix",
      code: "NEURO-SYN-04",
      icon: Brain,
      baseFreq: "10.4 Hz (Alpha Spectrum)",
      harmonic: "Beta-Gamma 40.2 Hz",
      primaryMetric: { label: "GLYMPHATIC FLUX", value: "93.8%", status: "Peak Night Clear" },
      secondaryMetric: { label: "CEREBRAL BLOOD FLOW", value: "54 mL/100g", status: "Laminar Flow" },
      tertiaryMetric: { label: "AUTONOMIC INDEX", value: "0.88 RMSSD", status: "Parasympathetic Dom" },
      radarPoints: [94, 88, 91, 84, 89],
      axes: [
        "Axonal Conductivity",
        "Glymphatic Flux",
        "Cerebrovascular Index",
        "Cortical Coherence",
        "Autonomic Balance",
      ],
      clinicalInsight: "Ambulatory microvascular EEG coherence remains within 99th percentile of healthy cohorts.",
      toneFreq: 329.63, // E4
    },
    metabolism: {
      name: "Hepatic & Endocrine Engine",
      code: "ENDO-METAB-09",
      icon: Flame,
      baseFreq: "0.05 Hz (Incretin Wave)",
      harmonic: "Hepatic Triad 0.3 Hz",
      primaryMetric: { label: "ApoB CLEARANCE", value: "92.4%", status: "Receptor Active" },
      secondaryMetric: { label: "GLYCEMIC TIME IN RANGE", value: "96.5%", status: "70-140 mg/dL" },
      tertiaryMetric: { label: "MITOCHONDRIAL ATP FLUX", value: "3.2 mmol/s", status: "High Efficiency" },
      radarPoints: [85, 89, 93, 86, 91],
      axes: [
        "Lipid Clearance",
        "Gluconeogenesis Buffer",
        "Mitochondrial Flux",
        "Cytochrome P450",
        "Anti-Inflammatory Index",
      ],
      clinicalInsight: "Longitudinal continuous glucose telemetry shows minimal standard deviation (SD < 14 mg/dL).",
      toneFreq: 392.00, // G4
    },
    vascular: {
      name: "Micro-Endothelial Bed",
      code: "VASCO-BED-12",
      icon: Activity,
      baseFreq: "3.15 Hz (Vasomotion)",
      harmonic: "Shear Harmonic 12.6 Hz",
      primaryMetric: { label: "NITRIC OXIDE SYNTHESIS", value: "96.2%", status: "High eNOS" },
      secondaryMetric: { label: "GLYCOCALYX INTEGRITY", value: "94.8%", status: "Uncompromised" },
      tertiaryMetric: { label: "CAPILLARY TRANSIT TIME", value: "0.82 s", status: "Normoxic" },
      radarPoints: [90, 87, 94, 92, 88],
      axes: [
        "Endothelial Glycocalyx",
        "Nitric Oxide Synthesis",
        "Windkessel Compliance",
        "Capillary Filtration",
        "Vasomotor Reserve",
      ],
      clinicalInsight: "Micro-capillary reflex testing indicates resilient collateral vascular branching.",
      toneFreq: 440.00, // A4
    },
  };

  const currentOrgan = organs[selectedOrgan];

  const playOrganResonance = (freq: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.35);
    } catch {
      // AudioContext policy
    }
  };

  const handleSelectOrgan = (key: OrganKey) => {
    setSelectedOrgan(key);
    playOrganResonance(organs[key].toneFreq);
  };

  // Compute 5-axis Radar Polygon Coordinates
  const center = 130;
  const radius = 100;
  const stressMultiplier = 1 - (stressFactor / 100) * 0.18; // stress gently contracts the polygon

  const radarCoords = currentOrgan.radarPoints.map((pt, idx) => {
    const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
    const r = (pt * stressMultiplier / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const polygonPath = radarCoords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ") + " Z";

  return (
    <div className="w-full rounded-3xl bg-slate-950 text-white border border-red-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background ambient bio-glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
              Bio-Resonance & Organ Frequency Spectrogram
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Multi-System Physiological Resonance</span>
            <AethrizLogo variant="symbol" size="xs" />
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-mono ${
              soundEnabled
                ? "bg-amber-950/80 border-amber-600 text-amber-400"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Toggle bio-acoustic resonance chime"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] hidden sm:inline">{soundEnabled ? "Audio On" : "Audio Mute"}</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Stanford & AIIMS Protocol</span>
          </div>
        </div>
      </div>

      {/* Organ Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {(Object.keys(organs) as OrganKey[]).map((key) => {
          const item = organs[key];
          const isSelected = selectedOrgan === key;
          const Icon = item.icon;
          return (
            <button
              key={key}
              onClick={() => handleSelectOrgan(key)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-br from-red-950/90 to-slate-900 border-red-500/80 shadow-lg shadow-red-600/20"
                  : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isSelected ? "text-red-400" : "text-slate-500"}`} />
                <span className="text-[9px] font-mono font-bold text-slate-500">{item.code}</span>
              </div>
              <div>
                <span className={`text-xs font-bold block ${isSelected ? "text-white" : "text-slate-300"}`}>
                  {item.name.split(" ")[0]}
                </span>
                <span className="text-[9px] font-mono text-slate-500 block truncate">
                  {item.baseFreq}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage: Radar Mesh + Live Parameter Readouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Mesh Visualization (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800/80 relative">
          <div className="relative w-[260px] h-[260px] flex items-center justify-center">
            {/* SVG Radar Grids */}
            <svg viewBox="0 0 260 260" className="w-full h-full overflow-visible">
              {/* Concentric rings */}
              {[0.25, 0.5, 0.75, 1.0].map((scale, i) => (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={radius * scale}
                  fill="none"
                  stroke="rgba(220, 38, 38, 0.15)"
                  strokeWidth="1"
                  strokeDasharray={scale === 1 ? "none" : "3,3"}
                />
              ))}

              {/* 5 Axis Spoke Lines */}
              {Array.from({ length: 5 }).map((_, i) => {
                const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                const ax = center + radius * Math.cos(angle);
                const ay = center + radius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={ax}
                    y2={ay}
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Active Morphing Polygon Area */}
              <path
                d={polygonPath}
                fill="rgba(220, 38, 38, 0.22)"
                stroke="#DC2626"
                strokeWidth="2.2"
                className="transition-all duration-500 ease-out"
              />

              {/* Radar Nodes */}
              {radarCoords.map((c, i) => (
                <g key={i}>
                  <circle cx={c.x} cy={c.y} r="4" fill="#DC2626" />
                  <circle cx={c.x} cy={c.y} r="8" fill="none" stroke="rgba(220, 38, 38, 0.4)" strokeWidth="1" />
                </g>
              ))}

              {/* Rotating Scan Beam */}
              <line
                x1={center}
                y1={center}
                x2={center + radius}
                y2={center}
                stroke="url(#radarGradient)"
                strokeWidth="2"
                className="animate-radar origin-center"
              />

              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Micro-center marker */}
            <div className="absolute w-2 h-2 rounded-full bg-red-500 animate-ping pointer-events-none" />
          </div>

          <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 px-2">
            <span>Harmonic: {currentOrgan.harmonic}</span>
            <span className="text-emerald-400 font-bold">Resonance Sync 99.1%</span>
          </div>
        </div>

        {/* Live Clinical Readouts & Stress Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Organ Vital Matrix Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">{currentOrgan.primaryMetric.label}</span>
              <span className="text-lg font-black text-white mt-1 block">{currentOrgan.primaryMetric.value}</span>
              <span className="text-[9px] text-emerald-400 font-mono mt-0.5 block">{currentOrgan.primaryMetric.status}</span>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">{currentOrgan.secondaryMetric.label}</span>
              <span className="text-lg font-black text-cyan-400 mt-1 block">{currentOrgan.secondaryMetric.value}</span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">{currentOrgan.secondaryMetric.status}</span>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">{currentOrgan.tertiaryMetric.label}</span>
              <span className="text-lg font-black text-amber-400 mt-1 block">{currentOrgan.tertiaryMetric.value}</span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5 block">{currentOrgan.tertiaryMetric.status}</span>
            </div>
          </div>

          {/* Interactive Stress & Exercise Modulation Slider */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                <Zap className="w-3.5 h-3.5 text-red-400" />
                Hemodynamic Modulation &amp; Exercise Load:
              </span>
              <span className="text-red-400 font-bold">{stressFactor}% Maximal METs</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={stressFactor}
              onChange={(e) => setStressFactor(Number(e.target.value))}
              className="w-full accent-red-600 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500">
              <span>Resting Baseline (0%)</span>
              <span>Moderate VO2 (50%)</span>
              <span>Peak Anaerobic (100%)</span>
            </div>
          </div>

          {/* Clinical Insight & Deep Exploration Links */}
          <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <p className="text-slate-300 text-[11px] leading-relaxed max-w-md">
              {currentOrgan.clinicalInsight}
            </p>
            <Link
              href="/body-explorer"
              className="shrink-0 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all"
            >
              <span>Explore in 3D Atlas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
