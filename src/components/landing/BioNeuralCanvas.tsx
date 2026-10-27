"use client";

import React, { useEffect, useRef } from "react";

export default function BioNeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: w / 2, y: h / 2, targetX: w / 2, targetY: h / 2, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // =========================================================================
    // 1. BIO-NEURAL SYNAPTIC LATTICE (54 Interactive Cells)
    // =========================================================================
    const nodes = Array.from({ length: 54 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.4 + 1.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.025,
      baseColor: Math.random() > 0.25 ? "#DC2626" : "#0284C7",
      surge: 0,
    }));

    // Traveling Action Potential Biophotons
    interface Biophoton {
      start: { x: number; y: number };
      target: { x: number; y: number };
      progress: number;
      speed: number;
      color: string;
    }
    const biophotons: Biophoton[] = [];

    // =========================================================================
    // 2. HEMODYNAMIC CARDIAC PULSE RIPPLE (70 BPM Vital Rhythm)
    // =========================================================================
    interface CardiacRipple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      alpha: number;
    }
    const cardiacRipples: CardiacRipple[] = [];
    let lastHeartbeat = 0;
    const heartbeatInterval = 860; // ~70 BPM resting clinical heart rate

    // =========================================================================
    // 3. DNA GENOMIC DOUBLE HELIX (Background 3D Biopolymer)
    // =========================================================================
    let dnaRotation = 0;
    const numRungs = 28;
    const helixRadius = 55;
    const rungSpacing = 38;

    // =========================================================================
    // 4. BOTTOM HORIZON ECG TELEMETRY WAVE
    // =========================================================================
    let ecgSweep = 0;
    const ecgSpeed = 140; // px/sec
    const ecgWave = (phase: number): number => {
      // P-QRS-T Physiological Wave Synthesis
      if (phase > 0.12 && phase < 0.2) return Math.sin(((phase - 0.12) / 0.08) * Math.PI) * 0.25; // P
      if (phase >= 0.25 && phase < 0.28) return -Math.sin(((phase - 0.25) / 0.03) * Math.PI) * 0.22; // Q
      if (phase >= 0.28 && phase < 0.33) {
        // R wave (ventricular depolarization spike)
        const p = (phase - 0.28) / 0.05;
        return p < 0.5 ? p * 2 * 1.4 : (1 - (p - 0.5) * 2) * 1.4;
      }
      if (phase >= 0.33 && phase < 0.37) return -Math.sin(((phase - 0.33) / 0.04) * Math.PI) * 0.38; // S
      if (phase >= 0.46 && phase < 0.62) return Math.sin(((phase - 0.46) / 0.16) * Math.PI) * 0.34; // T
      return 0; // isoelectric baseline
    };

    let lastTime = 0;

    // =========================================================================
    // MAIN 60 FPS RENDER LOOP
    // =========================================================================
    const render = (now: number) => {
      if (lastTime === 0 || now <= lastTime) {
        lastTime = now;
        animId = requestAnimationFrame(render);
        return;
      }
      const dt = Math.max(0.001, Math.min((now - lastTime) / 1000, 0.05));
      lastTime = now;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, w, h);

      // -----------------------------------------------------------------------
      // A. Cardiac Heartbeat Trigger (~70 BPM)
      // -----------------------------------------------------------------------
      if (now - lastHeartbeat > heartbeatInterval) {
        lastHeartbeat = now;
        // Originating from the left-chest cardiovascular region
        const heartX = w > 900 ? w * 0.28 : w * 0.5;
        const heartY = h * 0.38;
        cardiacRipples.push({
          x: heartX,
          y: heartY,
          radius: 12,
          maxRadius: Math.max(w, h) * 0.75,
          speed: 280,
          alpha: 0.28,
        });

        // Trigger synaptic surge on heartbeat
        nodes.forEach((n) => {
          const dx = n.x - heartX;
          const dy = n.y - heartY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 400) {
            n.surge = Math.max(n.surge, (1 - dist / 400) * 0.8);
          }
        });
      }

      // -----------------------------------------------------------------------
      // B. Render Expanding Cardiac Pulse Waves
      // -----------------------------------------------------------------------
      for (let rIdx = cardiacRipples.length - 1; rIdx >= 0; rIdx--) {
        const ripple = cardiacRipples[rIdx];
        ripple.radius += ripple.speed * dt;
        const progress = ripple.radius / ripple.maxRadius;

        if (progress >= 1 || ripple.radius <= 0) {
          cardiacRipples.splice(rIdx, 1);
          continue;
        }

        const safeRadius = Math.max(0.1, ripple.radius);
        const currentAlpha = ripple.alpha * Math.max(0, 1 - progress);

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, safeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 38, 38, ${currentAlpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Soft secondary inner echo
        if (safeRadius > 60) {
          const innerRadius = Math.max(0.1, safeRadius - 40);
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, innerRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(244, 63, 94, ${currentAlpha * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // -----------------------------------------------------------------------
      // C. Render Floating DNA Genomic Double Helix (Subtle Right Background)
      // -----------------------------------------------------------------------
      dnaRotation += 0.8 * dt;
      const dnaX = w > 1024 ? w * 0.88 : w * 0.92;
      const dnaCenterY = h * 0.5;

      for (let i = 0; i < numRungs; i++) {
        const rungY = dnaCenterY - (numRungs * rungSpacing) / 2 + i * rungSpacing;
        if (rungY < -50 || rungY > h + 50) continue;

        const currentAngle = dnaRotation + (i * Math.PI) / 6.5;
        const cosA = Math.cos(currentAngle);
        const sinA = Math.sin(currentAngle);

        const xA = dnaX + cosA * helixRadius;
        const xB = dnaX - cosA * helixRadius;
        const zFactor = (sinA + 1) * 0.5; // Depth 0 to 1

        const baseAlpha = 0.08 + zFactor * 0.16;

        // Base-pair connecting bridge
        ctx.beginPath();
        ctx.moveTo(xA, rungY);
        ctx.lineTo(xB, rungY);
        ctx.strokeStyle = `rgba(220, 38, 38, ${baseAlpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Strand A Node (Bio-Crimson)
        ctx.beginPath();
        ctx.arc(xA, rungY, Math.max(0.1, 1.8 + zFactor * 1.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${baseAlpha})`;
        ctx.fill();

        // Strand B Node (Cyan / Azure Genomic Indicator)
        ctx.beginPath();
        ctx.arc(xB, rungY, Math.max(0.1, 1.8 + (1 - zFactor) * 1.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(2, 132, 199, ${0.08 + (1 - zFactor) * 0.16})`;
        ctx.fill();
      }

      // -----------------------------------------------------------------------
      // D. Interactive Cursor Bio-Luminescent Field
      // -----------------------------------------------------------------------
      if (mouse.active) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        glowGrad.addColorStop(0, "rgba(220, 38, 38, 0.085)");
        glowGrad.addColorStop(0.5, "rgba(244, 63, 94, 0.03)");
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      // -----------------------------------------------------------------------
      // E. Update & Draw Bio-Neural Synaptic Nodes
      // -----------------------------------------------------------------------
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        n.surge = Math.max(0, n.surge - 0.7 * dt);

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Interactive cursor bio-attraction
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const pull = (1 - dist / 200) * 0.012;
            n.x += dx * pull;
            n.y += dy * pull;
            n.surge = Math.max(n.surge, (1 - dist / 200) * 0.5);
          }
        }

        const pulseGlow = (Math.sin(n.pulse) + 1) * 0.5;
        const totalSurge = Math.min(1, pulseGlow * 0.4 + n.surge);
        const nodeRadius = Math.max(0.1, n.radius + totalSurge * 2);

        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle =
          n.baseColor === "#DC2626"
            ? `rgba(220, 38, 38, ${0.28 + totalSurge * 0.5})`
            : `rgba(2, 132, 199, ${0.25 + totalSurge * 0.45})`;
        ctx.fill();

        // Subtle outer aura on surge
        if (totalSurge > 0.4) {
          const auraRadius = Math.max(0.1, n.radius + totalSurge * 4.5);
          ctx.beginPath();
          ctx.arc(n.x, n.y, auraRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 63, 94, ${totalSurge * 0.15})`;
          ctx.fill();
        }
      });

      // -----------------------------------------------------------------------
      // F. Inter-Node Synaptic Connections & Photon Firing
      // -----------------------------------------------------------------------
      const maxDist = 145;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();

            // Emit biophoton action potential
            if (biophotons.length < 32 && Math.random() < 0.022) {
              biophotons.push({
                start: nodes[i],
                target: nodes[j],
                progress: 0,
                speed: 0.016 + Math.random() * 0.02,
                color: Math.random() > 0.3 ? "#DC2626" : "#0284C7",
              });
            }
          }
        }
      }

      // -----------------------------------------------------------------------
      // G. Render Traveling Action Potential Biophotons
      // -----------------------------------------------------------------------
      for (let k = biophotons.length - 1; k >= 0; k--) {
        const bp = biophotons[k];
        bp.progress += bp.speed;

        if (bp.progress >= 1) {
          biophotons.splice(k, 1);
          continue;
        }

        const curX = bp.start.x + (bp.target.x - bp.start.x) * bp.progress;
        const curY = bp.start.y + (bp.target.y - bp.start.y) * bp.progress;

        // Glowing photon core
        ctx.beginPath();
        ctx.arc(curX, curY, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = bp.color;
        ctx.shadowColor = bp.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // -----------------------------------------------------------------------
      // H. Continuous Horizon Clinical ECG Telemetry Wave (Bottom of Screen)
      // -----------------------------------------------------------------------
      ecgSweep += ecgSpeed * dt;
      const ecgY = h - 28;
      const ecgPeriod = (60 / 68) * ecgSpeed; // ~123px per beat

      ctx.beginPath();
      ctx.strokeStyle = "rgba(220, 38, 38, 0.22)";
      ctx.lineWidth = 1.4;

      for (let px = 0; px < w; px += 3) {
        const phase = (((px + ecgSweep) % ecgPeriod) / ecgPeriod);
        const deflection = ecgWave(phase) * 22; // 22px amplitude
        const py = ecgY - deflection;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
