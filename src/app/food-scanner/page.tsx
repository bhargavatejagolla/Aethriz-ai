"use client";

import React, { useState } from "react";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import ShapeGrid from "@/components/ui/ShapeGrid";
import StarBorder from "@/components/ui/StarBorder";
import BorderGlow from "@/components/ui/BorderGlow";
import Shuffle from "@/components/ui/Shuffle";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { 
  Scan, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Apple, 
  Flame, 
  Utensils, 
  Layers, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  Camera
} from "lucide-react";

interface FoodPreset {
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  fat: number;
  glycemicLoad: string;
  cvConfidence: string;
  boundingBoxes: Array<{ label: string; weight: string; conf: string; x: string; y?: string }>;
  recommendation: string;
}

export default function FoodScannerPage() {
  const [selectedFood, setSelectedFood] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState<string>("Ready for Multi-Item Ingestion");

  const presets: FoodPreset[] = [
    {
      name: "Mediterranean Wild Salmon Bowl",
      category: "Prepared Whole Food Composite",
      calories: 540,
      protein: 42,
      carbs: 38,
      fiber: 9,
      fat: 22,
      glycemicLoad: "Low (GL: 8)",
      cvConfidence: "98.4%",
      boundingBoxes: [
        { label: "Wild Alaskan Salmon Fillet", weight: "185g", conf: "98.9%", x: "left-6 top-8" },
        { label: "Sprouted Tricolor Quinoa", weight: "120g", conf: "97.4%", x: "right-8 top-12" },
        { label: "Steamed Asparagus Spears", weight: "85g", conf: "99.1%", x: "left-12 bottom-6" },
      ],
      recommendation: "High cardioprotective EPA/DHA omega-3 ratio supports micro-vascular elasticity and low-density lipoprotein clearance.",
    },
    {
      name: "Slow-Cooked Lentil Dal & Brown Rice",
      category: "Legume Prebiotic Meal",
      calories: 460,
      protein: 21,
      carbs: 68,
      fiber: 14,
      fat: 10,
      glycemicLoad: "Moderate (GL: 14)",
      cvConfidence: "97.1%",
      boundingBoxes: [
        { label: "Yellow Lentil (Dal Tadka)", weight: "210g", conf: "98.2%", x: "left-8 top-10" },
        { label: "Short-Grain Brown Rice", weight: "140g", conf: "96.8%", x: "right-6 top-8" },
        { label: "Cumin & Ghee Tempering", weight: "15g", conf: "95.5%", x: "left-10 bottom-8" },
      ],
      recommendation: "Abundant soluble beta-glucan fiber feeds healthy gut Akkermansia muciniphila to modulate continuous glucose variability.",
    },
    {
      name: "Artisan Sourdough Avocado & Poached Egg",
      category: "Lipid-Balanced Breakfast Plate",
      calories: 385,
      protein: 18,
      carbs: 28,
      fiber: 8,
      fat: 24,
      glycemicLoad: "Low (GL: 6)",
      cvConfidence: "99.0%",
      boundingBoxes: [
        { label: "Hass Avocado Mash", weight: "90g", conf: "99.2%", x: "left-8 top-8" },
        { label: "Free-Range Poached Egg", weight: "55g", conf: "98.7%", x: "right-8 top-10" },
        { label: "Fermented Sourdough Base", weight: "65g", conf: "99.0%", x: "left-12 bottom-6" },
      ],
      recommendation: "Rich monounsaturated oleic acid matrix stabilizes postprandial endothelial shear stress without glucose spikes.",
    },
  ];

  const handleSelectPreset = (idx: number) => {
    setAnalyzing(true);
    setScanStep("1/3: Optical Infrared Volumetric Reconstruction...");
    setTimeout(() => {
      setScanStep("2/3: Semantic Food Class Segmentation...");
    }, 400);
    setTimeout(() => {
      setScanStep("3/3: Macronutrient & Glycemic Synthesis Complete");
      setSelectedFood(idx);
      setAnalyzing(false);
    }, 850);
  };

  const food = presets[selectedFood];

  // Calorie breakdown calculation
  const proteinCals = food.protein * 4;
  const carbsCals = food.carbs * 4;
  const fatCals = food.fat * 9;
  const totalMacroCals = proteinCals + carbsCals + fatCals;
  const pPct = Math.round((proteinCals / totalMacroCals) * 100);
  const cPct = Math.round((carbsCals / totalMacroCals) * 100);
  const fPct = 100 - pPct - cPct;

  return (
    <div className="relative min-h-screen bg-[#FDF4F5] flex flex-col overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Background LiDAR Spectrometry Crosshair Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <ShapeGrid
          shape="cross"
          direction="diagonal"
          lineColor="rgba(16, 185, 129, 0.1)"
          hoverColor="#10B981"
          hoverFillColor="#D1FAE5"
          fillOpacity={0.16}
          cellSize={36}
          speed={0.3}
          rainbow={false}
        />
      </div>

      <FloatingNavbar />

      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="backdrop-blur-2xl bg-white/80 p-6 sm:p-10 rounded-3xl border border-white/80 shadow-xl shadow-emerald-500/5 space-y-4">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <AethrizLogo variant="pill" size="xs" />
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                STEP 1 &bull; OPTICAL FOOD &amp; PRODUCT SCANNER
              </span>
              <span className="text-[10px] font-mono font-bold text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LiDAR CV ENGINE v3.8</span>
              </span>
            </div>
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
              Upload photos of food plates, packaged meals, and beverages to extract calorie density, macro distributions, and continuous glycemic trajectory forecasts.
            </p>
          </div>

          <div className="bg-emerald-50/90 border border-emerald-200 p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-900">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Multi-Item Detection Active: Continuous Segmentation &amp; Bounding Box Coordinates</span>
            </div>
            <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
              {scanStep}
            </span>
          </div>
        </div>

        {/* Scanner Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Preset Selector & Camera Drop Zone (5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <span>Select Plate Sample</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-500">3 Presets Loaded</span>
            </div>

            <div className="space-y-2.5">
              {presets.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => handleSelectPreset(i)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                    selectedFood === i
                      ? "bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-sm shadow-emerald-500/10"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-gray-900">{p.name}</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {p.calories} kcal
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono">{p.category}</div>
                </button>
              ))}
            </div>

            {/* Custom Upload Drop Zone */}
            <div
              onClick={() => handleSelectPreset((selectedFood + 1) % presets.length)}
              className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors cursor-pointer bg-emerald-50/40 space-y-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-gray-900">Capture or Drop Meal Photo to Scan</div>
              <p className="text-[10px] text-gray-500">JPEG, PNG, HEIC &bull; Instant Multi-Item Segmentation</p>
            </div>
          </div>

          {/* CV Nutritional Analysis & Bounding Box HUD (7 Cols) */}
          <BorderGlow
            className="lg:col-span-7 w-full shadow-md"
            edgeSensitivity={30}
            glowColor="160 84 45"
            backgroundColor="#FFFFFF"
            borderRadius={24}
            glowRadius={36}
            glowIntensity={1.1}
            coneSpread={26}
            colors={['#10B981', '#059669', '#34D399']}
          >
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">{food.name}</h2>
                    <span className="text-xs font-mono text-emerald-600 font-bold">
                      LiDAR Optical Confidence: {food.cvConfidence}
                    </span>
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                    {food.glycemicLoad}
                  </span>
                </div>

                {/* Simulated Computer Vision Bounding Box Canvas HUD */}
                <div className="relative w-full h-44 rounded-2xl bg-slate-950 p-4 border border-emerald-950 text-white font-mono overflow-hidden shadow-inner flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 border-b border-slate-800 pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5" />
                      <span>SEGMENTATION HUD &bull; MULTI-CLASS DETECTOR</span>
                    </span>
                    <span className="text-slate-400">FPS: 60 &bull; RESOLUTION: 4K</span>
                  </div>

                  {/* Bounding Box Chips representing segmented items */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-auto">
                    {food.boundingBoxes.map((box, bIdx) => (
                      <div key={bIdx} className="bg-slate-900/90 border border-emerald-500/50 p-2.5 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-300 block truncate font-sans font-bold">{box.label}</span>
                        <div className="flex justify-between text-[9px] text-emerald-400">
                          <span>{box.weight}</span>
                          <span className="text-cyan-400">{box.conf}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800">
                    <span>Aethriz Computer Vision Core v3.8</span>
                    <span className="text-emerald-400 font-bold">Plate Boundary Locked</span>
                  </div>
                </div>

                {/* Macro Distribution Segmented Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-700 font-bold">Caloric Distribution by Macronutrient</span>
                    <span className="text-gray-500">{totalMacroCals} Total Macro kcal</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div style={{ width: `${pPct}%` }} className="bg-red-500" title={`Protein: ${pPct}%`} />
                    <div style={{ width: `${cPct}%` }} className="bg-amber-500" title={`Carbs: ${cPct}%`} />
                    <div style={{ width: `${fPct}%` }} className="bg-blue-500" title={`Fat: ${fPct}%`} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-gray-600">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Protein ({pPct}%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />Complex Carbs ({cPct}%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />Healthy Fats ({fPct}%)</span>
                  </div>
                </div>

                {/* Macro Stat Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                    <Flame className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <span className="text-[10px] text-gray-500 block font-sans">CALORIES</span>
                    <span className="text-xl font-black text-gray-900">{food.calories}</span>
                    <span className="text-[10px] text-gray-400 block">kcal</span>
                  </div>
                  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                    <span className="text-[10px] text-gray-500 block font-sans">PROTEIN</span>
                    <span className="text-xl font-black text-red-600">{food.protein}g</span>
                    <span className="text-[10px] text-emerald-600 block font-bold font-sans">Optimal</span>
                  </div>
                  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                    <span className="text-[10px] text-gray-500 block font-sans">DIETARY FIBER</span>
                    <span className="text-xl font-black text-emerald-600">{food.fiber}g</span>
                    <span className="text-[10px] text-emerald-600 block font-bold font-sans">Prebiotic</span>
                  </div>
                  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
                    <span className="text-[10px] text-gray-500 block font-sans">HEALTHY FATS</span>
                    <span className="text-xl font-black text-blue-600">{food.fat}g</span>
                    <span className="text-[10px] text-gray-400 block font-sans">Lipid Ratio</span>
                  </div>
                </div>

                {/* Dietitian Recommendation Callout */}
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-xs text-gray-800 space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-2">
                    <Apple className="w-4 h-4 text-emerald-600" />
                    <span>Bio-Algorithmic Dietitian Recommendation</span>
                  </div>
                  <p className="font-medium leading-relaxed">
                    {food.recommendation}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-gray-500 font-mono text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Synchronized to Patient Metabolic Ledger</span>
                </span>
                <StarBorder
                  as="button"
                  onClick={() => handleSelectPreset((selectedFood + 1) % presets.length)}
                  color="#10B981"
                  trailColor="#6EE7B7"
                  glow={0.6}
                  sparkle={true}
                  radius={12}
                  theme="light"
                  backgroundColor="#10B981"
                  textColor="#FFFFFF"
                  className="px-5 py-2.5 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  Scan Next Food Plate
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
