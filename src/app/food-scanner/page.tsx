"use client";

import React, { useState } from "react";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import ShapeGrid from "@/components/ui/ShapeGrid";
import StarBorder from "@/components/ui/StarBorder";
import BorderGlow from "@/components/ui/BorderGlow";
import Shuffle from "@/components/ui/Shuffle";
import { Scan, Upload, Sparkles, CheckCircle2, ArrowRight, Apple, Flame, Utensils } from "lucide-react";

export default function FoodScannerPage() {
  const [selectedFood, setSelectedFood] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  const presets = [
    {
      name: "Mediterranean Grilled Salmon Bowl",
      category: "Prepared Whole Food Plate",
      calories: 540,
      protein: 42,
      carbs: 38,
      fiber: 9,
      fat: 22,
      glycemicLoad: "Low (GL: 8)",
      cvConfidence: "98.4%",
      recommendation: "Excellent cardioprotective omega-3 ratio with low glycemic load. Ideal for ApoB stabilization.",
    },
    {
      name: "Indian Dal Tadka with Brown Rice",
      category: "Lentil Legume Meal",
      calories: 460,
      protein: 21,
      carbs: 68,
      fiber: 14,
      fat: 10,
      glycemicLoad: "Moderate (GL: 16)",
      cvConfidence: "97.1%",
      recommendation: "High prebiotic soluble fiber aids gut microbiome and low-density lipoprotein clearance.",
    },
    {
      name: "Artisan Avocado Toast & Poached Egg",
      category: "Breakfast Composite",
      calories: 385,
      protein: 18,
      carbs: 28,
      fiber: 8,
      fat: 24,
      glycemicLoad: "Low (GL: 6)",
      cvConfidence: "99.0%",
      recommendation: "Monounsaturated fatty acid profile supports vascular endothelial elasticity.",
    },
  ];

  const handleSelectPreset = (idx: number) => {
    setAnalyzing(true);
    setSelectedFood(idx);
    setTimeout(() => setAnalyzing(false), 400);
  };

  const food = presets[selectedFood];

  return (
    <div className="relative min-h-screen bg-[#FDF4F5] flex flex-col overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Background LiDAR Spectrometry Crosshair Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-45">
        <ShapeGrid
          shape="cross"
          direction="diagonal"
          lineColor="rgba(16, 185, 129, 0.12)"
          hoverColor="#10B981"
          hoverFillColor="#D1FAE5"
          fillOpacity={0.18}
          cellSize={36}
          speed={0.3}
          rainbow={false}
        />
      </div>

      <FloatingNavbar />

      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="backdrop-blur-2xl bg-white/80 p-6 sm:p-10 rounded-3xl border border-white/80 shadow-xl shadow-emerald-500/5 space-y-4">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              STEP 1 &bull; OPTICAL FOOD & PRODUCT SCANNER
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mt-2">
              <Shuffle
                text="Optical LiDAR Food & Macro Scanner"
                tag="span"
                effect="flip"
                shuffleDirection="up"
                duration={0.35}
                stagger={0.015}
                accentColor="#10B981"
                triggerOnHover={true}
                hoverRadius={40}
              />
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium leading-relaxed">
              Upload photos of food plates, packaged snacks, and beverages to extract calorie density, macro distributions, and glycemic trajectory recommendations.
            </p>
          </div>

          <div className="bg-emerald-50/90 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Free Food Scan Trial &bull; Computer Vision Engine v3.8</span>
            </div>
            <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              CV VALIDATED
            </span>
          </div>
        </div>

        {/* Scanner Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preset Selector & Upload Box (1 Col) */}
          <div className="glass-panel p-6 rounded-3xl border border-red-100 shadow-sm space-y-5">
            <h3 className="font-bold text-gray-900 text-sm">Select Food Plate Sample</h3>

            <div className="space-y-2">
              {presets.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => handleSelectPreset(i)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all ${
                    selectedFood === i
                      ? "bg-red-50 border-red-400 text-red-900 shadow-sm"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-bold">{p.name}</div>
                  <div className="text-[11px] text-gray-500 font-mono mt-0.5">{p.category}</div>
                </button>
              ))}
            </div>

            {/* Custom Upload Simulation Box */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-red-400 transition-colors cursor-pointer bg-white/60">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-gray-800">Drop Meal Photo to Scan</div>
              <p className="text-[10px] text-gray-500 mt-1">JPEG, PNG, HEIC up to 20MB</p>
            </div>
          </div>

          {/* CV Nutritional Analysis encased in React Bits BorderGlow (2 Cols) */}
          <BorderGlow
            className="lg:col-span-2 w-full shadow-md"
            edgeSensitivity={30}
            glowColor="350 85 65"
            backgroundColor="#FFFFFF"
            borderRadius={24}
            glowRadius={36}
            glowIntensity={1.2}
            coneSpread={26}
            colors={['#DC2626', '#E11D48', '#FB7185']}
          >
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{food.name}</h2>
                    <span className="text-xs font-mono text-gray-500">CV Confidence: {food.cvConfidence}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-100 text-red-700 border border-red-200">
                    {food.glycemicLoad}
                  </span>
                </div>

                {/* Macro Bar Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <Flame className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <span className="text-[10px] text-gray-500 block font-sans">CALORIES</span>
                    <span className="text-2xl font-black text-gray-900">{food.calories}</span>
                    <span className="text-[10px] text-gray-400 block">kcal</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <span className="text-[10px] text-gray-500 block font-sans">PROTEIN</span>
                    <span className="text-2xl font-black text-red-600">{food.protein}g</span>
                    <span className="text-[10px] text-emerald-600 block font-bold">Optimal</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <span className="text-[10px] text-gray-500 block font-sans">DIETARY FIBER</span>
                    <span className="text-2xl font-black text-emerald-600">{food.fiber}g</span>
                    <span className="text-[10px] text-emerald-600 block font-bold">Prebiotic</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <span className="text-[10px] text-gray-500 block font-sans">HEALTHY FATS</span>
                    <span className="text-2xl font-black text-blue-600">{food.fat}g</span>
                    <span className="text-[10px] text-gray-400 block">Lipid Ratio</span>
                  </div>
                </div>

                {/* Recommendation Callout */}
                <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 text-xs text-gray-800 space-y-1">
                  <div className="font-bold text-red-800 flex items-center gap-2">
                    <Apple className="w-4 h-4 text-red-600" />
                    <span>Bio-Algorithmic Dietitian Recommendation</span>
                  </div>
                  <p className="font-medium leading-relaxed">
                    {food.recommendation}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-mono text-[11px]">Syncing to Patient Dashboard...</span>
                <StarBorder
                  as="button"
                  onClick={() => handleSelectPreset((selectedFood + 1) % presets.length)}
                  color="#DC2626"
                  trailColor="#F87171"
                  glow={0.6}
                  sparkle={true}
                  radius={12}
                  theme="light"
                  backgroundColor="#DC2626"
                  textColor="#FFFFFF"
                  className="px-4 py-2 text-xs font-bold shadow-md shadow-red-500/20 transition-all cursor-pointer"
                >
                  Scan Next Meal
                </StarBorder>
              </div>
            </div>
          </BorderGlow>
        </div>
      </main>

      <Footer />
    </div>
  );
}
