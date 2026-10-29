"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import ShapeGrid from "@/components/ui/ShapeGrid";
import Shuffle from "@/components/ui/Shuffle";
import RubberSegment from "@/components/ui/RubberSegment";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { 
  Heart, 
  Activity, 
  User, 
  Layers, 
  ShieldCheck, 
  Info, 
  Gauge,
  Sparkles,
  Focus,
  Box,
  Compass
} from "lucide-react";

// Dynamic import with ssr: false ensures WebGL never touches server pre-rendering
const AnatomyViewer = dynamic(() => import("@/components/anatomy/AnatomyViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[680px] rounded-3xl bg-gray-950 border border-gray-800 flex flex-col items-center justify-center space-y-4 shadow-2xl">
      <div className="w-12 h-12 rounded-full border-3 border-red-500/20 border-t-red-500 animate-spin" />
      <div className="text-center font-mono space-y-1">
        <div className="text-sm font-bold text-white uppercase tracking-wider">
          Initializing WebGL 3D Atlas
        </div>
        <div className="text-xs text-gray-400">
          Loading 3D mesh buffers &amp; clinical shaders...
        </div>
      </div>
    </div>
  )
});

export default function BodyExplorerPage() {
  const [selectedAge, setSelectedAge] = useState("28y");
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female">("Male");

  const ageGroups = [
    { id: "2y", label: "2 Years (Pediatric)", bpm: "105 BPM", spo2: "99.5%", boneDensity: "Cartilaginous Matrix" },
    { id: "12y", label: "12 Years (Adolescent)", bpm: "82 BPM", spo2: "99.0%", boneDensity: "Epiphyseal Growth Active" },
    { id: "28y", label: "28 Years (Adult)", bpm: "68 BPM", spo2: "99.2%", boneDensity: "Peak Bone Mass (T +0.4)" },
    { id: "68y", label: "68 Years (Senior)", bpm: "64 BPM", spo2: "97.8%", boneDensity: "Osteopenic Index (T -1.2)" },
  ];

  const currentAgeInfo = ageGroups.find((a) => a.id === selectedAge) || ageGroups[2];

  return (
    <div className="relative min-h-screen bg-[#FDF4F5] flex flex-col overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Background Interactive ShapeGrid: Medical Diamond Telemetry Grid */}
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
              <div className="flex flex-wrap items-center gap-3">
                <AethrizLogo variant="pill" size="xs" />
                <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full shadow-xs">
                  STEP 1 CLINICAL MODULE &bull; 3D HUMAN BODY EXPLORER
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  3D WEBGL ENGINE ACTIVE
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                <Shuffle
                  text="Interactive 3D Human Anatomy & Organ Atlas"
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
                Explore real 3D human anatomy derived from the BodyParts3D clinical reference standard. Orbit, zoom, explode anatomical layers, isolate individual organs, and inspect biological structures across developmental age cohorts.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50/80 rounded-2xl border border-red-100 flex items-center gap-3">
                <Gauge className="w-8 h-8 text-red-600" />
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-gray-500">Rendering Mode</div>
                  <div className="text-xs font-mono font-extrabold text-gray-900">Three.js GPU Shaders</div>
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
                  { value: "Male", label: "Male Reference" },
                  { value: "Female", label: "Female Reference" },
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

        {/* 3D Anatomical Atlas Viewport (Full Screen Width Studio Deck) */}
        <section className="space-y-4">
          <AnatomyViewer />
        </section>

        {/* Physiological & Developmental Telemetry Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-2xl bg-white/80 p-6 rounded-3xl border border-white/80 shadow-xl shadow-red-500/5 space-y-3">
            <div className="flex items-center gap-2 text-red-600">
              <Heart className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Cardiovascular Baseline</span>
            </div>
            <div className="text-2xl font-black text-gray-900 font-mono">
              {currentAgeInfo.bpm}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              {selectedAge === "2y"
                ? "Pediatric high metabolic rate with smaller stroke volume requiring 90-120 resting BPM."
                : selectedAge === "68y"
                ? "Senior arterial stiffening elevates pulse wave velocity; baseline resting rhythm ~64 BPM."
                : "Adult normative resting sinus rhythm with flexible aortic compliance (120/80 mmHg)."}
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/80 p-6 rounded-3xl border border-white/80 shadow-xl shadow-red-500/5 space-y-3">
            <div className="flex items-center gap-2 text-sky-600">
              <Activity className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Respiratory Saturation</span>
            </div>
            <div className="text-2xl font-black text-gray-900 font-mono">
              SpO2 {currentAgeInfo.spo2}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Gas diffusion across alveolar capillary membranes with low diffusion impedance and normal ventilation-perfusion matching.
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/80 p-6 rounded-3xl border border-white/80 shadow-xl shadow-red-500/5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Bone Mineral Status</span>
            </div>
            <div className="text-2xl font-black text-gray-900 font-mono truncate">
              {currentAgeInfo.boneDensity}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Trabecular bone turnover, osteoblast mineralization index, and cortical strength modeled against DEXA demographic percentiles.
            </p>
          </div>
        </div>

        {/* Clinical Validation Stamp */}
        <div className="p-4 bg-white/60 border border-gray-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>3D Anatomical Models cataloged from BodyParts3D (The Database Center for Life Science, CC BY 4.0).</span>
          </div>
          <span className="text-[10px] text-gray-500">
            AETHRIZ Clinical Research Private Limited &bull; Ref: AAHAAR/NTC/2026-27/02
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
}
