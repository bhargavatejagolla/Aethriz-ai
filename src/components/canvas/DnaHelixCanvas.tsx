"use client";

import React, { useEffect, useRef } from "react";

export default function DnaHelixCanvas({ className = "" }: { className?: string }) {
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

    // Mouse tracking for subtle tilt
    let mouseX = width / 2;
    let targetTilt = 0;
    let currentTilt = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      targetTilt = (e.clientX / width - 0.5) * 0.35;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // DNA Parameters
    const numRungs = 40;
    const helixRadius = Math.min(width * 0.12, 140);
    const strandLength = height * 1.25;
    const rungSpacing = strandLength / numRungs;
    let angle = 0;

    // Ambient floating bio-molecules
    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 200 - 100,
      radius: Math.random() * 2.4 + 1.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? "rgba(220, 38, 38, " : "rgba(16, 185, 129, ",
    }));

    // Base pair color configurations (Adenine, Thymine, Guanine, Cytosine)
    const basePairs = [
      { a: "#DC2626", b: "#FB7185", label: "A-T" }, // Adenine - Thymine
      { a: "#059669", b: "#34D399", label: "G-C" }, // Guanine - Cytosine
      { a: "#2563EB", b: "#60A5FA", label: "T-A" }, // Thymine - Adenine
      { a: "#7C3AED", b: "#A78BFA", label: "C-G" }, // Cytosine - Guanine
    ];

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tilt damping
      currentTilt += (targetTilt - currentTilt) * 0.05;
      angle += 0.9 * dt;

      // Draw floating bio-ions in background
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 1.5 * dt;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const alpha = 0.2 + 0.15 * Math.sin(p.pulse);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();
      });

      // DNA Helix center position (positioned slightly towards right for elegant backdrop)
      const centerX = width > 1024 ? width * 0.72 : width * 0.5;
      const startY = -height * 0.1;

      // Collect rungs for depth-sorting
      interface RungElement {
        y: number;
        z: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        z1: number;
        z2: number;
        pairIdx: number;
      }
      const rungs: RungElement[] = [];

      for (let i = 0; i < numRungs; i++) {
        const y = startY + i * rungSpacing;
        const currentAngle = angle + (i * Math.PI) / 9;

        // 3D rotation coordinates around Y axis with mouse tilt
        const x1 = Math.cos(currentAngle) * helixRadius;
        const z1 = Math.sin(currentAngle) * helixRadius;

        const x2 = -x1;
        const z2 = -z1;

        // Apply tilt
        const tiltedX1 = centerX + x1 * Math.cos(currentTilt) - (y - height / 2) * Math.sin(currentTilt) * 0.1;
        const tiltedX2 = centerX + x2 * Math.cos(currentTilt) - (y - height / 2) * Math.sin(currentTilt) * 0.1;

        rungs.push({
          y,
          z: (z1 + z2) / 2,
          x1: tiltedX1,
          y1: y,
          x2: tiltedX2,
          y2: y,
          z1,
          z2,
          pairIdx: i % basePairs.length,
        });
      }

      // Sort by depth (back to front for proper 3D occlusion)
      rungs.sort((a, b) => a.z - b.z);

      // Draw DNA rungs & sugar-phosphate nodes
      rungs.forEach((rung) => {
        const pair = basePairs[rung.pairIdx];

        // Depth perspective scale and opacity
        const scale1 = (rung.z1 + helixRadius) / (2 * helixRadius); // 0 to 1
        const scale2 = (rung.z2 + helixRadius) / (2 * helixRadius);

        const alphaRung = Math.min(1, Math.max(0.18, (scale1 + scale2) * 0.45));

        // 1. Draw Hydrogen Bond Rung (Connecting bar)
        const midX = (rung.x1 + rung.x2) / 2;
        const midY = (rung.y1 + rung.y2) / 2;

        // Left nucleotide half
        ctx.beginPath();
        ctx.moveTo(rung.x1, rung.y1);
        ctx.lineTo(midX, midY);
        ctx.strokeStyle = pair.a;
        ctx.globalAlpha = alphaRung * 0.85;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Right nucleotide half
        ctx.beginPath();
        ctx.moveTo(midX, midY);
        ctx.lineTo(rung.x2, rung.y2);
        ctx.strokeStyle = pair.b;
        ctx.globalAlpha = alphaRung * 0.85;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Central hydrogen bond junction dot
        ctx.beginPath();
        ctx.arc(midX, midY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = alphaRung;
        ctx.fill();

        // 2. Draw Sugar-Phosphate Strand Node 1
        const r1 = 3 + scale1 * 4;
        ctx.beginPath();
        ctx.arc(rung.x1, rung.y1, r1, 0, Math.PI * 2);
        ctx.fillStyle = pair.a;
        ctx.globalAlpha = 0.35 + scale1 * 0.65;
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        // 3. Draw Sugar-Phosphate Strand Node 2
        const r2 = 3 + scale2 * 4;
        ctx.beginPath();
        ctx.arc(rung.x2, rung.y2, r2, 0, Math.PI * 2);
        ctx.fillStyle = pair.b;
        ctx.globalAlpha = 0.35 + scale2 * 0.65;
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        ctx.globalAlpha = 1.0;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.95 }}
    />
  );
}
