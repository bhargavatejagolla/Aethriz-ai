"use client";

import React, { useEffect, useRef, useState } from "react";
import { Activity, Volume2, VolumeX } from "lucide-react";

export default function HospitalEcgMonitor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bpm] = useState(68);
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
      gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.08);
    } catch {
      // AudioContext policy
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement.clientWidth);
    let h = (canvas.height = canvas.parentElement.clientHeight || 180);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight || 180;
    };
    window.addEventListener("resize", handleResize);

    let ecgX = 0;
    let prevY = h / 2;
    let beatCycle = 0;
    const beatLength = (60 / bpm) * 60;

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
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

    const render = () => {
      ctx.fillStyle = "rgba(3, 6, 10, 0.16)";
      ctx.fillRect(0, 0, w, h);
      drawGrid();

      const stepsPerFrame = 3;
      for (let s = 0; s < stepsPerFrame; s++) {
        beatCycle++;
        const phase = (beatCycle % beatLength) / beatLength;
        const nextY = getEcgY(phase);

        ctx.fillStyle = "#03060A";
        ctx.fillRect(ecgX, 0, 16, h);

        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(ecgX === 0 ? 0 : ecgX - 1, prevY);
        ctx.lineTo(ecgX, nextY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (Math.abs(phase - 0.33) < 1 / beatLength) {
          playBeep();
        }

        prevY = nextY;
        ecgX++;
        if (ecgX >= w) {
          ecgX = 0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [bpm, lead, soundEnabled]);

  return (
    <div className="hud-dark-terminal rounded-3xl p-5 text-white space-y-4 shadow-xl border border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider flex items-center gap-2 font-mono">
              <span>HOSPITAL ECG TELEMETRY</span>
              <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">
                60 FPS LIVE
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">
              Lead: <span className="text-red-400 font-bold">{lead}</span> &bull; Status: Normal Sinus Rhythm
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Lead switchers */}
          <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-0.5 text-[10px] font-mono">
            {(["II", "V1", "V5"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLead(l)}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  lead === l ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Lead {l}
              </button>
            ))}
          </div>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              soundEnabled
                ? "bg-amber-950/80 border-amber-600 text-amber-400"
                : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
            }`}
            title="Toggle telemetry chime"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Canvas screen */}
      <div className="relative w-full h-40 bg-[#03060A] rounded-2xl overflow-hidden border border-gray-800/80">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-2.5 left-3 font-mono text-xs flex items-center gap-2.5 text-emerald-400 pointer-events-none">
          <span className="text-lg font-black">{bpm}</span>
          <span className="text-[10px] text-gray-400">BPM</span>
        </div>
        <div className="absolute top-2.5 right-3 font-mono text-[10px] text-gray-400 pointer-events-none flex items-center gap-2.5">
          <span>PR: 142ms</span>
          <span>QRS: 88ms</span>
          <span>QTc: 412ms</span>
        </div>
      </div>

      {/* Vital readouts */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="bg-gray-900/60 p-2 rounded-xl border border-gray-800">
          <span className="text-[10px] text-gray-400 block">BLOOD PRESSURE</span>
          <span className="font-bold text-white">120/80</span>
        </div>
        <div className="bg-gray-900/60 p-2 rounded-xl border border-gray-800">
          <span className="text-[10px] text-gray-400 block">SpO2 PULSE</span>
          <span className="font-bold text-emerald-400">99.1%</span>
        </div>
        <div className="bg-gray-900/60 p-2 rounded-xl border border-gray-800">
          <span className="text-[10px] text-gray-400 block">RESPIRATION</span>
          <span className="font-bold text-cyan-400">14 rpm</span>
        </div>
      </div>
    </div>
  );
}
