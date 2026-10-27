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

    const mouse = { x: w / 2, y: h / 2, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 48 Synaptic Nodes
    const nodes = Array.from({ length: 48 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 1.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
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

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Update & draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            n.x += dx * 0.006;
            n.y += dy * 0.006;
          }
        }

        const glow = (Math.sin(n.pulse) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + glow * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${0.35 + glow * 0.45})`;
        ctx.fill();
      });

      // Inter-node links & photon emission
      const maxDist = 135;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            if (biophotons.length < 24 && Math.random() < 0.02) {
              biophotons.push({
                start: nodes[i],
                target: nodes[j],
                progress: 0,
                speed: 0.015 + Math.random() * 0.018,
                color: Math.random() > 0.3 ? "#DC2626" : "#0284C7",
              });
            }
          }
        }
      }

      // Update & draw traveling biophotons
      for (let k = biophotons.length - 1; k >= 0; k--) {
        const bp = biophotons[k];
        bp.progress += bp.speed;

        if (bp.progress >= 1) {
          biophotons.splice(k, 1);
          continue;
        }

        const curX = bp.start.x + (bp.target.x - bp.start.x) * bp.progress;
        const curY = bp.start.y + (bp.target.y - bp.start.y) * bp.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = bp.color;
        ctx.shadowColor = bp.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 opacity-80"
    />
  );
}
