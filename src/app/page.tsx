"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import BioNeuralCanvas from "@/components/landing/BioNeuralCanvas";
import HospitalEcgMonitor from "@/components/landing/HospitalEcgMonitor";
import ClinicalSimulator from "@/components/landing/ClinicalSimulator";
import ContactSection from "@/components/landing/ContactSection";
import BioResonanceRadar from "@/components/landing/BioResonanceRadar";
import TechText from "@/components/ui/TechText";
import StrokeText from "@/components/ui/StrokeText";
import Shuffle from "@/components/ui/Shuffle";
import ElectricBorder from "@/components/ui/ElectricBorder";
import StarBorder from "@/components/ui/StarBorder";
import GlareHover from "@/components/ui/GlareHover";
import GlassIcons from "@/components/ui/GlassIcons";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { 
  Heart, 
  ArrowRight, 
  Stethoscope, 
  Users, 
  Activity, 
  Scan, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle, 
  Eye, 
  Award,
  Fingerprint
} from "lucide-react";

export default function HomePage() {
  const [selectedWord, setSelectedWord] = useState("AETHRIZ");
  const indianScripts = [
    { label: "हिन्दी", name: "Hindi" },
    { label: "ଓଡ଼ିଆ", name: "Odia" },
    { label: "తెలుగు", name: "Telugu" },
    { label: "தமிழ்", name: "Tamil" },
    { label: "বাংলা", name: "Bengali" },
  ];

  const modalityGlassItems = [
    {
      icon: <Activity className="w-6 h-6 text-red-600" />,
      color: "red",
      label: "Cardio Risk",
      href: "/health-analysis"
    },
    {
      icon: <Scan className="w-6 h-6 text-emerald-600" />,
      color: "green",
      label: "Food Plate CV",
      href: "/food-scanner"
    },
    {
      icon: <Heart className="w-6 h-6 text-purple-600" />,
      color: "purple",
      label: "3D Anatomy",
      href: "/body-explorer"
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-blue-600" />,
      color: "blue",
      label: "Specialists",
      href: "/doctors"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-amber-600" />,
      color: "orange",
      label: "ICU Stories",
      href: "/articles"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      color: "teal",
      label: "Clinical Portal",
      href: "/doctor-portal"
    }
  ];

  const featureCards = [
    {
      title: "Doctor Directory & Profiles",
      href: "/doctors",
      icon: Stethoscope,
      badge: "Medical Faculty",
      desc: "Connect with Stanford, Apollo & AIIMS board-certified clinical cardiologists and genomic specialists.",
      cta: "Explore Specialists",
      metric: "1,420+ Board Specialists",
    },
    {
      title: "Join the Team (Faculty)",
      href: "/join-team",
      icon: Users,
      badge: "Physician Onboarding",
      desc: "Apply to join the AETHRIZ clinical decision-support panel and tele-health specialist network.",
      cta: "Apply for Faculty",
      metric: "State Medical Council Verification",
    },
    {
      title: "AI Health & Lifestyle Analysis",
      href: "/health-analysis",
      icon: Activity,
      badge: "Biomarker Engine",
      desc: "Bayesian risk modeling integrating HbA1c, ApoB, lipid panels, and longitudinal cardiovascular metrics.",
      cta: "Run Risk Analysis",
      metric: "99.4% AUC Bayesian Tensors",
    },
    {
      title: "AI Food & Product Scanner",
      href: "/food-scanner",
      icon: Scan,
      badge: "Optical LiDAR",
      desc: "Multi-item food plate computer vision scanning with real-time calorie, fiber, and macro breakdown.",
      cta: "Scan Food Plate",
      metric: "Multi-Spectrum LiDAR CV",
    },
    {
      title: "Interactive 3D Body Explorer",
      href: "/body-explorer",
      icon: Heart,
      badge: "WebGL Anatomy",
      desc: "Explore full 3D human anatomy with age-based (2 y/o to adult) and gender-based multi-layer shader views.",
      cta: "Launch 3D Explorer",
      metric: "60 FPS Volumetric Organ Atlas",
    },
    {
      title: "Articles & Patient Journeys",
      href: "/articles",
      icon: BookOpen,
      badge: "Clinical Stories",
      desc: "Read and share personal healthcare stories from ICU survival to cardiac rehabilitation.",
      cta: "Read Experience Feed",
      metric: "Verified Patient Case Studies",
    },
  ];

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      {/* 60 FPS Interactive Bio-Neural Canvas */}
      <BioNeuralCanvas />

      {/* Floating Glassmorphism Navbar */}
      <FloatingNavbar />

      {/* Main Content Stream */}
      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* =========================================================================
            HERO SECTION: Liquid Light Shimmer, ECG Telemetry & Fast Actions
            ========================================================================= */}
        <section className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            
            {/* Left Hero Details */}
            <div className="lg:w-1/2 space-y-6 text-left">
              {/* Official Brand Identity & Multilingual Badge Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <AethrizLogo variant="pill" size="sm" />
                <div className="inline-flex items-center gap-2 bg-white/95 border border-red-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-gray-800">
                    Multilingual AI Healthcare:
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-700">
                    {indianScripts.map((s, idx) => (
                      <React.Fragment key={s.name}>
                        <span title={s.name}>{s.label}</span>
                        {idx < indianScripts.length - 1 && <span className="opacity-40">&bull;</span>}
                      </React.Fragment>
                    ))}
                    <span className="text-[10px] text-gray-500 font-mono">(24+ Languages)</span>
                  </div>
                </div>
              </div>

              {/* Clean, Rock-Solid Left-Aligned Main Title */}
              <div className="space-y-1 text-left">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14]">
                  <span className="block text-slate-900">The Zenith of</span>
                  <span className="block bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
                    Bio-Algorithmic
                  </span>
                  <span className="block text-slate-900">Healthcare Intelligence.</span>
                </h1>
              </div>

              {/* Sub-copy */}
              <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl font-medium text-left">
                Engineered by <strong className="text-slate-900 font-bold">Aethriz AI Healthcare And Advanced Research Private Limited</strong>. 
                Integrating ambient wearable telemetry, optical food plate scanning, 3D anatomical visualization, 
                and board-certified physician decision support.
              </p>

              {/* Hero Call-to-Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <StarBorder
                  as={Link}
                  href="/health-analysis"
                  color="#DC2626"
                  trailColor="#F87171"
                  glow={0.8}
                  sparkle={true}
                  radius={16}
                  theme="light"
                  backgroundColor="#DC2626"
                  textColor="#FFFFFF"
                  borderColor="rgba(220, 38, 38, 0.3)"
                  className="shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 text-xs font-bold transition-all px-6 py-3.5 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white">Start Free AI Health Trial</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </StarBorder>

                <Link
                  href="/booking"
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-bold text-xs shadow-sm hover:border-gray-300 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4 text-red-600" />
                  <span>Book Doctor Consultation</span>
                </Link>
              </div>

              {/* Regulatory Assurance */}
              <div className="pt-2 flex items-center gap-6 text-[11px] font-mono text-gray-600">
                <span className="flex items-center gap-1.5 font-bold text-gray-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  FDA SaMD II Protocol
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 font-bold text-gray-800">
                  <Award className="w-4 h-4 text-red-600" />
                  Ref: AAHAAR/NTC/2026-27/02
                </span>
              </div>
            </div>

            {/* Right: Hospital ECG Telemetry encased in ElectricBorder */}
            <div className="lg:w-1/2 flex justify-center">
              <ElectricBorder
                color="#DC2626"
                glowColor="#EF4444"
                speed={1.2}
                chaos={0.35}
                spread={0.45}
                thickness={1.4}
                borderRadius={28}
                className="w-full max-w-xl shadow-2xl shadow-red-500/10"
              >
                <HospitalEcgMonitor />
              </ElectricBorder>
            </div>
          </div>

          {/* Interactive React Bits Vector Engine Lab with TechText & StrokeText */}
          <div className="w-full rounded-3xl bg-white/90 backdrop-blur-md border border-red-200 shadow-xl shadow-red-500/5 p-5 sm:p-6 overflow-hidden mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-500 mb-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span className="font-bold text-red-600 uppercase tracking-wider text-xs">
                  Bio-Computational Telemetry • Signal Processing Bench
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {["AETHRIZ", "BIO-AI", "TELEMETRY", "PRECISION", "HEMODYNAMICS", "SYNAPSE"].map((word) => (
                  <button
                    key={word}
                    onClick={() => setSelectedWord(word)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedWord === word
                        ? "bg-red-600 text-white shadow-sm shadow-red-500/30"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* TechText Interactive Vector Glyph Canvas */}
              <div className="w-full h-32 sm:h-40 relative rounded-2xl bg-slate-50/80 border border-slate-100 overflow-hidden flex items-center justify-center">
                <TechText
                  key={selectedWord}
                  text={selectedWord}
                  fontWeight={800}
                  fontSize={85}
                  letterSpacing={-0.03}
                  color="#0B0E14"
                  accentColor="#DC2626"
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  strokeWidth={1.5}
                  specks={16}
                  intro="metrics"
                  introDuration={1.8}
                  clickKick={true}
                  draggable={true}
                  guides={true}
                  sweep={true}
                  speed={0.8}
                  className="w-full h-full"
                />
              </div>

              {/* StrokeText Dynamic Outline Draw with Liquid Wipe Fill */}
              <div className="w-full h-32 sm:h-40 relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-4 border border-slate-800 flex flex-col justify-center items-center text-center overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest mb-1">
                  Digital Biomarker Synthesis
                </span>
                <StrokeText
                  key={`stroke-${selectedWord}`}
                  text={selectedWord}
                  strokeColor="#DC2626"
                  fillColor="#FFFFFF"
                  strokeWidth={1.4}
                  fontSize={52}
                  fontWeight={800}
                  drawDuration={1.4}
                  fillDelay={0.2}
                  fillMode="wipe"
                  wipeFrom="left"
                  trigger="mount"
                  hoverRedraw={true}
                  className="w-full"
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  Real-Time Algorithmic Waveform Modeling
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-100 mt-3 gap-2">
              <span className="flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Interactive Biophysical Glyphs • Multi-Modal Signal Decomposition</span>
              </span>
              <span className="text-emerald-600 font-semibold">
                Clinical Compute Engine: 60 Hz Telemetry Active
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BIO-DIGITAL REFRACTION DECK: React Bits <GlassIcons /> 3D Liquid Refraction
            ========================================================================= */}
        <section className="glass-panel p-5 sm:p-8 rounded-3xl border border-red-100/90 shadow-xl shadow-red-500/5 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
              BIO-DIGITAL REFRACTION SUITE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
              Interactive Clinical Navigation Deck
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Direct clinical access modules to launch diagnostic engines, 3D anatomical raycasting, and specialist queues.
            </p>
          </div>

          <div className="pt-4 pb-6 px-1 w-full overflow-x-auto no-scrollbar scrollbar-none flex justify-start md:justify-center">
            <div className="min-w-[540px] md:min-w-0 flex justify-center py-2">
              <GlassIcons
                items={modalityGlassItems}
                size={64}
                gap={18}
                columns={6}
                roundness={0.65}
                refraction={0.8}
                bevel={0.6}
                dispersion={0.05}
                frost={0.25}
                shine={0.9}
                tint="#ffffff"
                tintOpacity={0.85}
                plate="none"
                tilt={0}
                spread={0}
                hover="none"
                parallax={0}
                labels="always"
                intro={false}
                theme="light"
              />
            </div>
          </div>
        </section>

        {/* =========================================================================
            BIO-RESONANCE ORGAN FREQUENCY RADAR: Multi-System Biophysical Spectrogram
            ========================================================================= */}
        <section>
          <BioResonanceRadar />
        </section>

        {/* =========================================================================
            FEATURE TILES: All Step 1 Website Sections (Connected Architecture)
            ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                COMPLETE WEBSITE ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
                <Shuffle
                  text="Connected Clinical & Diagnostic Services"
                  tag="span"
                  effect="slide"
                  shuffleDirection="right"
                  duration={0.35}
                  stagger={0.015}
                  accentColor="#DC2626"
                  triggerOnHover={true}
                  hoverRadius={35}
                />
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-500 font-semibold">
              Step 1 Work Guide Specification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat) => (
              <GlareHover
                key={feat.href}
                width="100%"
                height="100%"
                borderRadius="24px"
                glareColor="#DC2626"
                glareOpacity={0.22}
                variant="streak"
                rimGlint={true}
                className="w-full h-full block"
              >
                <Link
                  href={feat.href}
                  className="glass-panel w-full h-full p-6 rounded-3xl border border-red-100/80 hover:border-red-400/50 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Real-Time Holographic Scanner Laser Sweep on Hover */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#DC2626] animate-[beamScan_2.4s_ease-in-out_infinite]" />
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
                        <feat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                        {feat.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1.5 font-medium leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100/80 flex flex-col gap-2 relative z-10">
                    <div className="flex items-center justify-between text-xs font-bold text-red-600 group-hover:translate-x-0.5 transition-transform">
                      <span className="text-[10px] font-mono text-gray-500 font-normal flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{feat.metric}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>{feat.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </GlareHover>
            ))}
          </div>
        </section>

        {/* =========================================================================
            CLINICAL SIMULATOR: 5-Phase Interactive Pipeline
            ========================================================================= */}
        <ClinicalSimulator />

        {/* =========================================================================
            CONTACT US SECTION: Headquarters in Cuttack, Odisha
            ========================================================================= */}
        <ContactSection />

      </main>

      {/* Official Corporate Footer */}
      <Footer />
    </div>
  );
}
