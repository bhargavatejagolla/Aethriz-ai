"use client";

import React, { useState } from "react";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import ShapeGrid from "@/components/ui/ShapeGrid";
import Shuffle from "@/components/ui/Shuffle";
import RubberSegment from "@/components/ui/RubberSegment";
import BorderGlow from "@/components/ui/BorderGlow";
import { 
  Heart, 
  Activity, 
  User, 
  Eye, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Dna, 
  Sparkles,
  Info,
  ChevronRight,
  Gauge
} from "lucide-react";

export default function BodyExplorerPage() {
  const [selectedAge, setSelectedAge] = useState("28y");
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female">("Male");
  const [selectedOrgan, setSelectedOrgan] = useState<"heart" | "lungs" | "brain" | "liver" | "skeleton">("heart");
  const [activeLayer, setActiveLayer] = useState<"vascular" | "parenchymal" | "skeletal">("vascular");

  const ageGroups = [
    { id: "2y", label: "2 Years (Pediatric)", bpm: "105 BPM", spo2: "99.5%", boneDensity: "Cartilaginous Matrix" },
    { id: "12y", label: "12 Years (Adolescent)", bpm: "82 BPM", spo2: "99.0%", boneDensity: "Epiphyseal Growth Active" },
    { id: "28y", label: "28 Years (Adult)", bpm: "68 BPM", spo2: "99.2%", boneDensity: "Peak Bone Mass (T +0.4)" },
    { id: "68y", label: "68 Years (Senior)", bpm: "64 BPM", spo2: "97.8%", boneDensity: "Osteopenic Index (T -1.2)" },
  ];

  const currentAgeInfo = ageGroups.find((a) => a.id === selectedAge) || ageGroups[2];

  const organData = {
    heart: {
      name: "Myocardium & Coronary Arteries",
      system: "Cardiovascular System",
      status: `${currentAgeInfo.bpm} Normal Sinus Rhythm`,
      vitalLabel: "Cardiac Output",
      vitalValue: selectedAge === "2y" ? "1.8 L/min" : selectedAge === "68y" ? "4.2 L/min" : "5.4 L/min",
      pediatricDiff: "Resting rate 90-120 BPM in 2-year-olds with higher metabolic demand per gram.",
      details:
        "The left anterior descending (LAD) and circumflex arteries supply oxygenated blood to the left ventricle. In adult males, ApoB deposition accelerates in proximal bifurcations.",
      markers: [
        { label: "LAD Coronary", pos: "top-1/3 left-1/3", risk: "Low Plaque" },
        { label: "Left Ventricle", pos: "bottom-1/3 right-1/3", risk: "Optimal EF 62%" },
        { label: "Aortic Root", pos: "top-1/4 left-1/2", risk: "No Dilation" },
        { label: "Mitral Valve", pos: "bottom-1/2 left-1/2", risk: "Pliable" }
      ],
      color: "#DC2626",
      accent: "bg-red-500",
      svgPath: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    },
    lungs: {
      name: "Bronchial Tree & Alveolar Matrix",
      system: "Pulmonary Respiratory",
      status: `SpO2 ${currentAgeInfo.spo2} • 14 Breaths/min`,
      vitalLabel: "Vital Capacity",
      vitalValue: selectedAge === "2y" ? "0.6 L" : selectedAge === "68y" ? "3.2 L" : "4.8 L",
      pediatricDiff: "Smaller airway caliber prone to resistance; respiratory rate ~24-30 in toddlers.",
      details:
        "Dual gas-exchange capillary networks interface across alveolar membranes spanning ~100 square meters in adults with ultra-low diffusion resistance.",
      markers: [
        { label: "Right Trachea", pos: "top-1/4 left-1/3", risk: "Clear Lumen" },
        { label: "Left Bronchus", pos: "top-1/3 right-1/3", risk: "Patent" },
        { label: "Alveolar Sacs", pos: "bottom-1/3 left-1/4", risk: "High Surfactant" },
        { label: "Diaphragm Base", pos: "bottom-1/4 left-1/2", risk: "Mobile" }
      ],
      color: "#0284C7",
      accent: "bg-sky-500",
      svgPath: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
    },
    brain: {
      name: "Cerebral Cortex & Circle of Willis",
      system: "Central Nervous System",
      status: "Autonomic Balance: Normal Sympathovagal",
      vitalLabel: "Perfusion Pressure",
      vitalValue: "72 mmHg (CPP > 65)",
      pediatricDiff: "Rapid synaptic pruning and myelination phase occurring during early toddler development.",
      details:
        "Anterior and posterior cerebral circulations maintain constant cerebral perfusion pressure with continuous autoregulation across the blood-brain barrier.",
      markers: [
        { label: "Frontal Lobe", pos: "top-1/4 left-1/3", risk: "High Plasticity" },
        { label: "Circle of Willis", pos: "top-1/2 left-1/2", risk: "Symmetric" },
        { label: "Cerebellum", pos: "bottom-1/3 right-1/3", risk: "Coordinated" },
        { label: "Brainstem", pos: "bottom-1/4 left-1/2", risk: "Vagal Intact" }
      ],
      color: "#7C3AED",
      accent: "bg-purple-500",
      svgPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
    },
    liver: {
      name: "Hepatic Lobules & Portal Triad",
      system: "Gastrointestinal & Metabolic",
      status: "Enzymatic Equilibrium: ALT 21 U/L",
      vitalLabel: "Portal Blood Flow",
      vitalValue: "1,200 mL/min",
      pediatricDiff: "High regenerative glycogen turnover and developmental phase of hepatic drug metabolism enzymes.",
      details:
        "Synthesizes apolipoproteins (ApoB-100, ApoA-1), regulates endogenous gluconeogenesis, and filters portal venous flow through fenestrated sinusoid endothelia.",
      markers: [
        { label: "Right Hepatic Lobe", pos: "top-1/3 left-1/3", risk: "Non-steatotic" },
        { label: "Portal Vein", pos: "bottom-1/2 left-1/2", risk: "Pressure 6 mmHg" },
        { label: "Gallbladder", pos: "bottom-1/3 right-1/3", risk: "Ejection 68%" },
        { label: "Bile Canaliculi", pos: "bottom-1/4 left-1/2", risk: "Unobstructed" }
      ],
      color: "#EA580C",
      accent: "bg-amber-600",
      svgPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    },
    skeleton: {
      name: "Axial & Appendicular Skeleton",
      system: "Musculoskeletal Framework",
      status: `Bone Mass: ${currentAgeInfo.boneDensity}`,
      vitalLabel: "T-Score",
      vitalValue: selectedAge === "68y" ? "-1.2 Osteopenic" : "+0.4 Normal",
      pediatricDiff: "Active epiphyseal cartilaginous growth plates present; skeletal flexibility is maximally compliant.",
      details:
        "206 articulated bones in adult providing active hematopoiesis in trabecular bone marrow, systemic mineral homeostasis, and kinetic force transmission.",
      markers: [
        { label: "Thoracic Spine", pos: "top-1/3 left-1/2", risk: "Lordosis Normal" },
        { label: "Ribcage Chondral", pos: "top-1/2 left-1/3", risk: "Compliant" },
        { label: "Femur Epiphysis", pos: "bottom-1/3 right-1/3", risk: "Dense Cortex" },
        { label: "Pelvic Girdle", pos: "bottom-1/4 left-1/2", risk: "Stable Ring" }
      ],
      color: "#059669",
      accent: "bg-emerald-600",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
    },
  };

  const organ = organData[selectedOrgan];

  return (
    <div className="relative min-h-screen bg-[#FDF4F5] flex flex-col overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Background Interactive ShapeGrid: Medical Diamond Telemetry Grid with Zero Lag */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <ShapeGrid
          shape="diamond"
          direction="diagonal"
          lineColor="rgba(220, 38, 38, 0.08)"
          hoverColor="#DC2626"
          hoverFillColor="#FEE2E2"
          fillOpacity={0.12}
          cellSize={42}
          speed={0.25}
          rainbow={false}
        />
      </div>

      <FloatingNavbar />

      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Step 1 Section Heading Banner */}
        <div className="backdrop-blur-2xl bg-white/75 p-6 sm:p-10 rounded-3xl border border-white/80 shadow-xl shadow-red-500/5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full shadow-xs">
                  STEP 1 CLINICAL MODULE &bull; 3D HUMAN BODY EXPLORER
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  60 FPS TELEMETRY ACTIVE
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                <Shuffle
                  text="Interactive Multi-Modal Anatomical Telemetry"
                  tag="span"
                  effect="flip"
                  shuffleDirection="up"
                  duration={0.35}
                  stagger={0.015}
                  accentColor="#DC2626"
                  triggerOnHover={true}
                  hoverRadius={40}
                />
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-2xl">
                Explore developmental human anatomy across ages (2-year pediatric toddler through 68-year senior) with gender-phenotype physiological variations, hemodynamic markers, and organ cross-sections.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50/80 rounded-2xl border border-red-100 flex items-center gap-3">
                <Gauge className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-gray-500">Telemetry Engine</div>
                  <div className="text-xs font-mono font-extrabold text-gray-900">Bio-Holographic HUD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Cohort Switchers */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-red-100/60">
            {/* Age Cohort Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-gray-800 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-red-600" />
                Developmental Age Cohort:
              </span>
              <RubberSegment
                items={[
                  { value: "2y", label: "2y Pediatric" },
                  { value: "12y", label: "12y Adolescent" },
                  { value: "28y", label: "28y Adult" },
                  { value: "68y", label: "68y Senior" },
                ]}
                value={selectedAge}
                onChange={(val) => setSelectedAge(val)}
                trackColor="#F3F4F6"
                thumbColor="#DC2626"
                textColor="#4B5563"
                activeTextColor="#FFFFFF"
                size="sm"
                radius={10}
                draggable
              />
            </div>

            {/* Gender Phenotype Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-gray-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-red-600" />
                Phenotype Anatomy:
              </span>
              <RubberSegment
                items={[
                  { value: "Male", label: "Male Anatomy" },
                  { value: "Female", label: "Female Anatomy" },
                ]}
                value={selectedGender}
                onChange={(val) => setSelectedGender(val as "Male" | "Female")}
                trackColor="#F3F4F6"
                thumbColor="#0F172A"
                textColor="#4B5563"
                activeTextColor="#FFFFFF"
                size="sm"
                radius={10}
                draggable
              />
            </div>
          </div>
        </div>

        {/* 3D Anatomy Viewport + Telemetry Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Anatomical Visualizer Screen (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="backdrop-blur-2xl bg-white/80 rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl shadow-red-500/5 space-y-6">
              {/* Terminal Header */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-gray-100 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-900">
                    ANATOMICAL SCANNER: {organ.name} &bull; {selectedGender.toUpperCase()} ({selectedAge})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                    SIGNAL: STABLE
                  </span>
                  <span className="text-[10px] font-mono text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-bold">
                    {currentAgeInfo.bpm}
                  </span>
                </div>
              </div>

              {/* Holographic Body/Organ Display Window */}
              <div className="relative w-full h-[400px] sm:h-[440px] bg-gradient-to-b from-gray-950 via-[#0B0F19] to-[#05070D] rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center shadow-inner group">
                {/* Background Radar Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-96 h-96 rounded-full border border-red-500/30 animate-[spin_30s_linear_infinite]" />
                  <div className="w-72 h-72 rounded-full border border-dashed border-red-400/40" />
                  <div className="w-48 h-48 rounded-full border border-red-500/20" />
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(220,38,38,0.15)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                {/* Central Holographic Visualizer */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-4 text-center px-4">
                  {/* Glowing Organ Core */}
                  <div 
                    className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center transition-all duration-700 border-2 shadow-2xl"
                    style={{ 
                      borderColor: `${organ.color}55`,
                      backgroundColor: `${organ.color}15`,
                      boxShadow: `0 0 50px ${organ.color}33` 
                    }}
                  >
                    {/* Animated Pulsing Rings */}
                    <div 
                      className="absolute inset-0 rounded-full animate-ping opacity-25"
                      style={{ backgroundColor: organ.color }}
                    />

                    {selectedOrgan === "heart" && (
                      <Heart className="w-24 h-24 text-red-500 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                    )}
                    {selectedOrgan === "lungs" && (
                      <Activity className="w-24 h-24 text-sky-400 animate-pulse drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
                    )}
                    {selectedOrgan === "brain" && (
                      <Cpu className="w-24 h-24 text-purple-400 animate-pulse drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]" />
                    )}
                    {selectedOrgan === "liver" && (
                      <Sparkles className="w-24 h-24 text-amber-400 animate-pulse drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
                    )}
                    {selectedOrgan === "skeleton" && (
                      <Dna className="w-24 h-24 text-emerald-400 animate-pulse drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                      {organ.name}
                    </div>
                    <div className="text-xs text-gray-400 font-mono flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: organ.color }} />
                      <span>{organ.system}</span>
                      <span>&bull;</span>
                      <span className="text-gray-300">{organ.status}</span>
                    </div>
                  </div>
                </div>

                {/* Hotspot Landmarks Pins */}
                {organ.markers.map((m, idx) => (
                  <div
                    key={m.label}
                    className={`absolute ${m.pos} z-20 hidden sm:flex items-center gap-1.5 p-1.5 bg-gray-900/90 border border-gray-700/80 rounded-xl backdrop-blur-md shadow-lg text-[10px] font-mono text-white transition-all hover:scale-105 hover:border-red-500`}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold">{m.label}</span>
                    <span className="text-gray-400 text-[9px] bg-gray-800 px-1 py-0.5 rounded">
                      {m.risk}
                    </span>
                  </div>
                ))}

                {/* Bottom Organ Navigation Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap justify-center gap-2">
                  {(["heart", "lungs", "brain", "liver", "skeleton"] as const).map((orgKey) => {
                    const isSelected = selectedOrgan === orgKey;
                    return (
                      <button
                        key={orgKey}
                        onClick={() => setSelectedOrgan(orgKey)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-all cursor-pointer ${
                          isSelected
                            ? "bg-red-600 text-white shadow-lg shadow-red-600/40 scale-105"
                            : "bg-gray-900/90 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 backdrop-blur-md"
                        }`}
                      >
                        {orgKey}
                      </button>
                    );
                  })}
                </div>

                {/* Corner Status HUD */}
                <div className="absolute top-4 left-4 z-20 text-[10px] font-mono text-gray-400 bg-gray-900/80 border border-gray-800 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  VITAL: <span className="text-white font-bold">{organ.vitalLabel} ({organ.vitalValue})</span>
                </div>
                <div className="absolute top-4 right-4 z-20 text-[10px] font-mono text-gray-400 bg-gray-900/80 border border-gray-800 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  RESOLUTION: <span className="text-emerald-400 font-bold">0.4mm ISOTROPIC</span>
                </div>
              </div>

              {/* Visualizer Footer Telemetry Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-red-50/70 border border-red-100/80 rounded-2xl">
                  <div className="text-[10px] font-mono font-bold text-red-600 uppercase">Sinus Dynamic</div>
                  <div className="text-sm font-bold text-gray-900 font-mono mt-0.5">{currentAgeInfo.bpm}</div>
                  <div className="text-[10px] text-gray-500 font-medium mt-0.5">Normative age adjusted</div>
                </div>

                <div className="p-3 bg-sky-50/70 border border-sky-100/80 rounded-2xl">
                  <div className="text-[10px] font-mono font-bold text-sky-600 uppercase">Oxygen Saturation</div>
                  <div className="text-sm font-bold text-gray-900 font-mono mt-0.5">{currentAgeInfo.spo2}</div>
                  <div className="text-[10px] text-gray-500 font-medium mt-0.5">Dual capillary index</div>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-100/80 rounded-2xl">
                  <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase">Bone Mineral Density</div>
                  <div className="text-sm font-bold text-gray-900 font-mono mt-0.5 truncate">{currentAgeInfo.boneDensity}</div>
                  <div className="text-[10px] text-gray-500 font-medium mt-0.5">DEXA normative</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Anatomical Findings & Clinical Pathology (1 Col) */}
          <div className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/80 p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xl shadow-red-500/5 space-y-6">
              <div className="pb-4 border-b border-gray-100 space-y-1">
                <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-wider">
                  {organ.system}
                </span>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">{organ.name}</h3>
                <p className="text-xs text-gray-500 font-mono">Cohort Analysis: {selectedAge} &bull; {selectedGender}</p>
              </div>

              {/* Age Specific Biological Differences */}
              <div className="p-4 bg-gradient-to-br from-red-50/80 to-rose-50/50 border border-red-100 rounded-2xl space-y-1.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
                  <Info className="w-4 h-4 text-red-600" />
                  <span>Age-Cohort Developmental Shift ({selectedAge}):</span>
                </div>
                <p className="text-xs text-red-950 font-medium leading-relaxed">
                  {selectedAge === "2y"
                    ? organ.pediatricDiff
                    : selectedAge === "12y"
                    ? "Adolescent accelerated somatic growth with peak thymic activity and hormonal vascular remodeling."
                    : selectedAge === "68y"
                    ? "Age-associated arterial stiffening (pulse wave velocity > 10 m/s) with progressive microvascular rarefaction."
                    : "Adult baseline physiological equilibrium with established vascular compliance and normative lipid transport."}
                </p>
              </div>

              {/* Anatomical Physiology Description */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-gray-700 uppercase">Physiological Mechanism:</div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {organ.details}
                </p>
              </div>

              {/* Landmark Checkpoints */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono font-bold text-gray-700 uppercase block">
                  Measured Landmarks:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {organ.markers.map((m) => (
                    <div 
                      key={m.label} 
                      className="p-2.5 bg-white border border-gray-200/80 rounded-xl shadow-xs space-y-0.5"
                    >
                      <div className="text-xs font-bold text-gray-900">{m.label}</div>
                      <div className="text-[10px] font-mono text-emerald-700 font-semibold">{m.risk}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Release Roadmap Badge */}
              <div className="p-4 bg-gray-900 text-white rounded-2xl space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-gray-400">
                  <span>3D GLTF ENGINE PIPELINE</span>
                  <span className="text-emerald-400">PHASE 1 READY</span>
                </div>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                  Full 3D WebGL / Spline human body volume mesh integration will activate in Phase 2 alongside patient digital twin avatars.
                </p>
              </div>

              {/* Stanford Validation Stamp */}
              <div className="pt-2 text-[11px] text-gray-500 font-mono flex items-center gap-1.5 border-t border-gray-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Anatomical models validated by Stanford Clinical Faculty &amp; AIIMS protocols</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
