"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  glowIntensity: number;
  color: string;
}

interface Biophoton {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
}

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

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      lastMoveTime: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!mouse.active) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.active = true;
      mouse.lastMoveTime = performance.now();
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Initialize 52 Synaptic Neural Nodes
    const nodeCount = 52;
    const nodes: Node[] = Array.from({ length: nodeCount }, () => {
      const bVx = (Math.random() - 0.5) * 0.5;
      const bVy = (Math.random() - 0.5) * 0.5;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: bVx,
        vy: bVy,
        baseVx: bVx,
        baseVy: bVy,
        radius: Math.random() * 2.2 + 1.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        glowIntensity: 0,
        color: Math.random() > 0.28 ? "#DC2626" : "#0284C7",
      };
    });

    const biophotons: Biophoton[] = [];
    const maxBiophotons = 36;
    const mouseRadius = 190;
    const connectionDist = 140;

    let lastTime = 0;

    const render = (now: number) => {
      if (!canvas || !ctx) return;

      if (lastTime === 0) {
        lastTime = now;
        animId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.max(0.001, Math.min((now - lastTime) / 1000, 0.05));
      lastTime = now;

      // Smooth mouse interpolation (spring lag for liquid organic feel)
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;

        // Auto-fade mouse activity if idle for > 4 seconds
        if (now - mouse.lastMoveTime > 4000) {
          mouse.active = false;
        }
      }

      ctx.clearRect(0, 0, w, h);

      // -----------------------------------------------------------------------
      // 1. Interactive Mouse Beacon Aura & Direct Neural Synaptic Links
      // -----------------------------------------------------------------------
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        // Soft radial bio-field around cursor
        const auraGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius
        );
        auraGrad.addColorStop(0, "rgba(220, 38, 38, 0.16)");
        auraGrad.addColorStop(0.4, "rgba(220, 38, 38, 0.06)");
        auraGrad.addColorStop(1, "rgba(220, 38, 38, 0)");

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
        ctx.fillStyle = auraGrad;
        ctx.fill();

        // Pulsing cursor nucleus
        const cursorPulse = Math.sin(now * 0.006) * 1.2 + 3.2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, Math.max(0.1, cursorPulse), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 38, 38, 0.85)";
        ctx.shadowColor = "#DC2626";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // -----------------------------------------------------------------------
      // 2. Update & Draw Neural Nodes with Mouse Attraction Physics
      // -----------------------------------------------------------------------
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;

        // Mouse interaction & attraction physics
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const proximity = 1 - dist / mouseRadius;
            // Gentle magnetic attraction towards cursor
            const pullForce = proximity * proximity * 0.8;
            n.vx += (dx / (dist || 1)) * pullForce;
            n.vy += (dy / (dist || 1)) * pullForce;

            // Excite node glow
            n.glowIntensity = Math.min(1, n.glowIntensity + proximity * 0.15);

            // Draw direct dynamic synaptic wire from cursor to node
            const lineAlpha = proximity * 0.45;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${lineAlpha})`;
            ctx.lineWidth = 1.0 + proximity * 0.8;
            ctx.stroke();

            // Emit biophoton directly from cursor to this node
            if (biophotons.length < maxBiophotons && Math.random() < 0.035) {
              biophotons.push({
                startX: mouse.x,
                startY: mouse.y,
                targetX: n.x,
                targetY: n.y,
                progress: 0,
                speed: 0.02 + Math.random() * 0.025,
                color: Math.random() > 0.3 ? "#DC2626" : "#E11D48",
              });
            }
          }
        }

        // Decay glow intensity smoothly
        n.glowIntensity = Math.max(0, n.glowIntensity - 0.02);

        // Fluid friction: gently return node to natural baseline velocity
        n.vx = n.vx * 0.94 + n.baseVx * 0.06;
        n.vy = n.vy * 0.94 + n.baseVy * 0.06;

        n.x += n.vx;
        n.y += n.vy;

        // Soft bounce off boundaries
        const padding = 20;
        if (n.x < padding) {
          n.x = padding;
          n.vx = Math.abs(n.vx) * 0.8;
          n.baseVx = Math.abs(n.baseVx);
        } else if (n.x > w - padding) {
          n.x = w - padding;
          n.vx = -Math.abs(n.vx) * 0.8;
          n.baseVx = -Math.abs(n.baseVx);
        }

        if (n.y < padding) {
          n.y = padding;
          n.vy = Math.abs(n.vy) * 0.8;
          n.baseVy = Math.abs(n.baseVy);
        } else if (n.y > h - padding) {
          n.y = h - padding;
          n.vy = -Math.abs(n.vy) * 0.8;
          n.baseVy = -Math.abs(n.baseVy);
        }

        // Draw node with rhythmic bio-glow
        const pulseSine = (Math.sin(n.pulse) + 1) * 0.5;
        const totalGlow = pulseSine * 0.4 + n.glowIntensity * 0.6;
        const currentRadius = Math.max(0.1, n.radius + totalGlow * 2.2);

        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle =
          n.color === "#DC2626"
            ? `rgba(220, 38, 38, ${0.32 + totalGlow * 0.55})`
            : `rgba(2, 132, 199, ${0.3 + totalGlow * 0.5})`;
        ctx.fill();

        // Outer halo on excited node
        if (n.glowIntensity > 0.25) {
          const haloRadius = Math.max(0.1, currentRadius + n.glowIntensity * 4);
          ctx.beginPath();
          ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 63, 94, ${n.glowIntensity * 0.18})`;
          ctx.fill();
        }
      });

      // -----------------------------------------------------------------------
      // 3. Inter-Node Synaptic Network Connections
      // -----------------------------------------------------------------------
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const proximity = 1 - dist / connectionDist;
            const alpha = proximity * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Inter-node action potential photon firing
            if (biophotons.length < maxBiophotons && Math.random() < 0.016) {
              biophotons.push({
                startX: nodes[i].x,
                startY: nodes[i].y,
                targetX: nodes[j].x,
                targetY: nodes[j].y,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                color: Math.random() > 0.3 ? "#DC2626" : "#0284C7",
              });
            }
          }
        }
      }

      // -----------------------------------------------------------------------
      // 4. Traveling Action Potential Biophotons
      // -----------------------------------------------------------------------
      for (let k = biophotons.length - 1; k >= 0; k--) {
        const bp = biophotons[k];
        bp.progress += bp.speed;

        if (bp.progress >= 1) {
          biophotons.splice(k, 1);
          continue;
        }

        const curX = bp.startX + (bp.targetX - bp.startX) * bp.progress;
        const curY = bp.startY + (bp.targetY - bp.startY) * bp.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = bp.color;
        ctx.shadowColor = bp.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

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
      style={{ opacity: 0.9 }}
    />
  );
}
