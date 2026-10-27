"use client";

import React, { useEffect, useRef } from "react";

export default function CardiacPulseCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // ECG waveform synthesis: P-QRS-T complex
    // baseline is 0; P: +0.25; Q: -0.15; R: +1.2; S: -0.35; T: +0.35
    const ecgShape = (phase: number): number => {
      // phase 0 to 1
      if (phase > 0.12 && phase < 0.22) {
        // P-wave
        return Math.sin(((phase - 0.12) / 0.1) * Math.PI) * 0.22;
      }
      if (phase >= 0.28 && phase < 0.31) {
        // Q wave
        return -Math.sin(((phase - 0.28) / 0.03) * Math.PI) * 0.18;
      }
      if (phase >= 0.31 && phase < 0.36) {
        // R wave (sharp ventricular depolarization spike)
        const p = (phase - 0.31) / 0.05;
        return p < 0.5 ? p * 2 * 1.3 : (1 - (p - 0.5) * 2) * 1.3;
      }
      if (phase >= 0.36 && phase < 0.4) {
        // S wave
        return -Math.sin(((phase - 0.36) / 0.04) * Math.PI) * 0.32;
      }
      if (phase >= 0.48 && phase < 0.65) {
        // T wave (ventricular repolarization)
        return Math.sin(((phase - 0.48) / 0.17) * Math.PI) * 0.32;
      }
      return 0; // isoelectric baseline
    };

    let sweepX = 0;
    const speed = 120; // px/sec
    const heartRate = 68; // BPM
    const beatPeriod = 60 / heartRate; // ~0.88 sec per beat
    const beatWidth = speed * beatPeriod; // px per beat cycle

    const history: { x: number; y: number; time: number }[] = [];
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle clinical telemetry grid
      ctx.strokeStyle = "rgba(220, 38, 38, 0.035)";
      ctx.lineWidth = 1;

      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw 2 active Lead traces across the page:
      // Lead II in upper-middle, Lead V1 in lower-middle
      const leads = [
        { yBase: height * 0.42, amp: 48, color: "#DC2626", glow: "#F87171" },
        { yBase: height * 0.72, amp: 36, color: "#E11D48", glow: "#FB7185" },
      ];

      leads.forEach((lead) => {
        // Calculate points
        ctx.beginPath();
        let first = true;

        for (let x = 0; x < width; x += 3) {
          // calculate phase for this x
          const totalDist = x + (time / 1000) * speed;
          const cycleX = (totalDist % beatWidth) / beatWidth;
          const yOffset = -ecgShape(cycleX) * lead.amp;
          const y = lead.yBase + yOffset;

          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = lead.color;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Lead identifier watermark
        ctx.font = "10px monospace";
        ctx.fillStyle = lead.color;
        ctx.globalAlpha = 0.4;
        ctx.fillText(`LEAD II TELEMETRY • ${heartRate} BPM • 25 mm/s`, 40, lead.yBase - lead.amp - 10);
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.9 }}
    />
  );
}
