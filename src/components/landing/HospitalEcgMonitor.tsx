"use client";

import React, { useEffect, useRef, useState } from "react";
import { Activity, Volume2, VolumeX, Cpu, Heart, ShieldCheck, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function HospitalEcgMonitor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState<"ecg" | "ai" | "telemetry">("ecg");
  const [bpm, setBpm] = useState(68);
  const [lead, setLead] = useState<"II" | "V1" | "V5">("II");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBeep = () => {
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
      osc.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.07);
    } catch {
      // AudioContext policy
    }
  };

  useEffect(() => {
    if (activeTab !== "ecg") return;

    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement.clientWidth);
    let h = (canvas.height = canvas.parentElement.clientHeight || 170);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight || 170;
    };
    window.addEventListener("resize", handleResize);

    let ecgX = 0;
    let prevY = h / 2;
    let beatCycle = 0;
    const beatLength = (60 / bpm) * 60;

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(16, 185, 129, 0.07)";
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    };

    const getEcgY = (phase: number) => {
      const mid = h / 2;
      let amp = 1.0;
      if (lead === "V1") amp = 0.7;
      if (lead === "V5") amp = 1.25;

      if (phase > 0.12 && phase < 0.22) {
        const p = (phase - 0.12) / 0.1;
        return mid - Math.sin(p * Math.PI) * (14 * amp);
      }
      if (phase >= 0.28 && phase < 0.31) {
        return mid + 10 * amp;
      }
      if (phase >= 0.31 && phase < 0.36) {
        const p = (phase - 0.31) / 0.05;
        return mid - Math.sin(p * Math.PI) * (58 * amp);
      }
      if (phase >= 0.36 && phase < 0.4) {
        return mid + 16 * amp;
      }
      if (phase > 0.52 && phase < 0.68) {
        const p = (phase - 0.52) / 0.16;
        return mid - Math.sin(p * Math.PI) * (18 * amp);
      }
      return mid + (Math.random() - 0.5) * 1.5;
    };

    ctx.fillStyle = "#03060A";
    ctx.fillRect(0, 0, w, h);
    drawGrid();

    const speed = 2.4;
    const render = () => {
      beatCycle += 1;
      const phase = (beatCycle % beatLength) / beatLength;

      if (Math.abs(phase - 0.32) < 0.02 && beatCycle % 30 === 0) {
        playBeep();
      }

      const nextY = getEcgY(phase);
      const nextX = ecgX + speed;

      // Clear cursor bar ahead
      ctx.fillStyle = "#03060A";
      ctx.fillRect(ecgX + speed, 0, 18, h);

      // Restore grid ahead
      ctx.strokeStyle = "rgba(16, 185, 129, 0.06)";
      ctx.lineWidth = 1;
      const step = 20;
      const gx = Math.floor((ecgX + speed) / step) * step;
      if (gx >= ecgX + speed && gx <= ecgX + speed + 18) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }

      // Draw active waveform
      ctx.beginPath();
      ctx.moveTo(ecgX, prevY);
      ctx.lineTo(nextX, nextY);
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 2.2;
      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 7;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ecgX = nextX;
      prevY = nextY;

      if (ecgX >= w) {
        ecgX = 0;
        prevY = h / 2;
        ctx.fillStyle = "#03060A";
        ctx.fillRect(0, 0, 18, h);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [bpm, lead, soundEnabled, activeTab]);

  return (
    <div className="hud-dark-terminal rounded-3xl p-5 text-white space-y-4 shadow-2xl border border-gray-800 backdrop-blur-xl">
      {/* Console Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800/80">
        <div className="flex items-center gap-2">
          {(["ecg", "ai", "telemetry"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-gray-900/90 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800"
                }`}
              >
                {tab === "ecg" && <Activity className="w-3.5 h-3.5" />}
                {tab === "ai" && <Cpu className="w-3.5 h-3.5" />}
                {tab === "telemetry" && <Heart className="w-3.5 h-3.5" />}
                <span>
                  {tab === "ecg" && "12-Lead ECG"}
                  {tab === "ai" && "Bio-AI Tensors"}
                  {tab === "telemetry" && "Hemodynamics"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {activeTab === "ecg" && (
            <>
              {/* Lead Switchers */}
              <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-0.5 text-[10px] font-mono">
                {(["II", "V1", "V5"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLead(l)}
                    className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      lead === l ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Lead {l}
                  </button>
                ))}
              </div>

              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                  soundEnabled
                    ? "bg-amber-950/80 border-amber-600 text-amber-400"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                }`}
                title="Toggle cardiac chime"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </>
          )}

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>60Hz LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Viewport depending on activeTab */}
      {activeTab === "ecg" && (
        <div className="space-y-3 animate-fadeIn">
          {/* Canvas screen */}
          <div className="relative w-full h-40 bg-[#03060A] rounded-2xl overflow-hidden border border-gray-800/80 shadow-inner">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute top-2.5 left-3 font-mono text-xs flex items-center gap-2.5 text-emerald-400 pointer-events-none">
              <span className="text-xl font-black">{bpm}</span>
              <span className="text-[10px] text-gray-400">BPM &bull; SINUS</span>
            </div>
            <div className="absolute top-2.5 right-3 font-mono text-[10px] text-gray-400 pointer-events-none flex items-center gap-2.5">
              <span>PR: 142ms</span>
              <span>QRS: 88ms</span>
              <span>QTc: 412ms</span>
            </div>
            <div className="absolute bottom-2 left-3 font-mono text-[9px] text-gray-500 pointer-events-none">
              Lead {lead} &bull; 25mm/s &bull; 10mm/mV &bull; Filter: 0.05-150Hz
            </div>
          </div>

          {/* Vital readouts */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="bg-gray-900/80 p-2.5 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <span className="text-[10px] text-gray-400 block font-sans">BLOOD PRESSURE</span>
              <span className="font-bold text-white text-sm">120/80</span>
              <span className="text-[9px] text-emerald-400 block font-sans">Optimal Sinus</span>
            </div>
            <div className="bg-gray-900/80 p-2.5 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <span className="text-[10px] text-gray-400 block font-sans">SpO2 PULSE</span>
              <span className="font-bold text-emerald-400 text-sm">99.2%</span>
              <span className="text-[9px] text-gray-400 block font-sans">Arterial Oxygen</span>
            </div>
            <div className="bg-gray-900/80 p-2.5 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
              <span className="text-[10px] text-gray-400 block font-sans">RESPIRATION</span>
              <span className="font-bold text-cyan-400 text-sm">14 rpm</span>
              <span className="text-[9px] text-gray-400 block font-sans">Eupneic Rhythm</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="space-y-3 animate-fadeIn">
          {/* Bio-AI Diagnostic Tensor Stream */}
          <div className="bg-[#03060A] rounded-2xl p-4 border border-gray-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                Deep Bayesian Biomarker Inference Engine
              </span>
              <span className="text-[10px] font-mono text-emerald-400">99.4% Model AUC-ROC</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>Subclinical Plaque Probability</span>
                  <span className="text-emerald-400 font-bold">0.04 (Nominal Tier)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "4%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>ApoB / ApoA1 Lipoprotein Ratio</span>
                  <span className="text-emerald-400 font-bold">0.62 (Cardioprotective)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "22%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>Endothelial Elasticity Index</span>
                  <span className="text-cyan-400 font-bold">96.8 / 100</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: "96.8%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>Glycemic Variability (Continuous CGM)</span>
                  <span className="text-emerald-400 font-bold">94 mg/dL (eA1c: 4.8%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "16%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
            <span>FDA SaMD Protocol: Certified</span>
            <Link href="/health-analysis" className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 hover:underline">
              <span>Launch Full AI Profiler</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {activeTab === "telemetry" && (
        <div className="space-y-3 animate-fadeIn">
          {/* Cardiovascular Hemodynamic Matrix */}
          <div className="bg-[#03060A] rounded-2xl p-4 border border-gray-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-cyan-400" />
                Real-Time Ventricular Hemodynamics
              </span>
              <span className="text-[10px] font-mono text-gray-400">Echocardiographic Echo Sync</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-gray-900/90 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-400 block font-sans">LEFT VENTRICULAR EF</span>
                <span className="text-base font-black text-emerald-400 mt-0.5 block">64%</span>
                <span className="text-[9px] text-gray-400 font-sans">Normal Range: 55-70%</span>
              </div>
              <div className="bg-gray-900/90 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-400 block font-sans">CARDIAC OUTPUT</span>
                <span className="text-base font-black text-white mt-0.5 block">5.1 L/min</span>
                <span className="text-[9px] text-gray-400 font-sans">Resting Index: 3.0 L/m²</span>
              </div>
              <div className="bg-gray-900/90 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-400 block font-sans">STROKE VOLUME</span>
                <span className="text-base font-black text-white mt-0.5 block">74 mL/beat</span>
                <span className="text-[9px] text-gray-400 font-sans">Myocardial Compliance</span>
              </div>
              <div className="bg-gray-900/90 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-400 block font-sans">PULSE WAVE VELOCITY</span>
                <span className="text-base font-black text-emerald-400 mt-0.5 block">6.2 m/s</span>
                <span className="text-[9px] text-gray-400 font-sans">Arterial Flexibility High</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
            <span>Ref: AAHAAR/NTC/2026-27/02</span>
            <Link href="/body-explorer" className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 hover:underline">
              <span>Inspect in 3D Anatomy Atlas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
