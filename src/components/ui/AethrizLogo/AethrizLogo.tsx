"use client";

import React from "react";
import Link from "next/link";

export interface AethrizLogoProps {
  variant?: "full" | "wordmark" | "symbol" | "pill";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  theme?: "light" | "dark";
  showSubtitle?: boolean;
  subtitle?: string;
  href?: string;
  className?: string;
  animate?: boolean;
}

export default function AethrizLogo({
  variant = "full",
  size = "md",
  theme = "light",
  showSubtitle = true,
  subtitle = "BIO-HEALTH AI",
  href,
  className = "",
  animate = true,
}: AethrizLogoProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "#F8FAFC" : "#0F172A";
  const crimsonColor = isDark ? "#EF4444" : "#DC2626";

  // Scale multipliers for each size preset
  const sizeConfig = {
    xs: { emblemSize: 24, wordmarkHeight: 18, pillPadding: "px-3 py-1", fontSize: "text-[8px]" },
    sm: { emblemSize: 30, wordmarkHeight: 22, pillPadding: "px-3.5 py-1.5", fontSize: "text-[9px]" },
    md: { emblemSize: 38, wordmarkHeight: 28, pillPadding: "px-5 py-2", fontSize: "text-[10px]" },
    lg: { emblemSize: 48, wordmarkHeight: 34, pillPadding: "px-6 py-2.5", fontSize: "text-xs" },
    xl: { emblemSize: 60, wordmarkHeight: 44, pillPadding: "px-8 py-3.5", fontSize: "text-sm" },
  }[size];

  // 1. Vector Circular Emblem Icon (3D Red & Black A)
  const renderEmblem = () => (
    <div
      className={`relative rounded-full flex-shrink-0 flex items-center justify-center transition-transform ${
        animate ? "group-hover:scale-105" : ""
      }`}
      style={{
        width: sizeConfig.emblemSize,
        height: sizeConfig.emblemSize,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={sizeConfig.emblemSize}
        height={sizeConfig.emblemSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id={`emblemRed-${size}-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id={`emblemDark-${size}-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B0E14" />
          </linearGradient>
          <filter id={`emblemGlow-${size}-${theme}`} x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#DC2626" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* White Circular Badge Base */}
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke={isDark ? "#334155" : "#E2E8F0"} strokeWidth="2" />
        <circle cx="50" cy="50" r="43.5" fill="none" stroke="rgba(220, 38, 38, 0.15)" strokeWidth="1.2" />

        {/* 3D Anatomical 'A' Monogram Group */}
        <g filter={`url(#emblemGlow-${size}-${theme})`}>
          {/* Top Apex Arch (Obsidian Black) */}
          <path
            d="M 37 46 L 47 23 C 48.2 20.5 51.8 20.5 53 23 L 63 46 L 56 46 L 50 31 L 44 46 Z"
            fill={`url(#emblemDark-${size}-${theme})`}
          />
          {/* Top Apex 3D Highlight Bevel */}
          <path d="M 50 21 L 53 23 L 47 23 Z" fill="#94A3B8" opacity="0.85" />

          {/* Red Crossbar */}
          <path d="M 32 54 L 68 54 L 64 46 L 36 46 Z" fill={`url(#emblemRed-${size}-${theme})`} />

          {/* Left Leg (Bio-Crimson 3D Ribbon) */}
          <path d="M 23 76 L 36 76 L 47 52 L 34 52 Z" fill={`url(#emblemRed-${size}-${theme})`} />
          <path d="M 23 76 L 28 76 L 38 54 L 34 52 Z" fill="#991B1B" opacity="0.55" />

          {/* Right Leg (Bio-Crimson 3D Ribbon) */}
          <path d="M 64 76 L 77 76 L 66 52 L 53 52 Z" fill={`url(#emblemRed-${size}-${theme})`} />
          <path d="M 72 76 L 77 76 L 66 52 L 62 52 Z" fill="#F87171" opacity="0.65" />
        </g>
      </svg>
    </div>
  );

  // 2. Vector Wordmark: ∧ ≡ T H R I Z
  const renderWordmark = () => {
    // Proportional width based on 256:40 aspect ratio (~6.4x)
    const width = Math.round(sizeConfig.wordmarkHeight * 6.4);

    return (
      <svg
        viewBox="0 0 256 40"
        width={width}
        height={sizeConfig.wordmarkHeight}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-label="AETHRIZ"
      >
        {/* A: Caret apex */}
        <path
          d="M 6 34 L 20 6 L 34 34"
          stroke={textColor}
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* E: 3 Red parallel horizontal bars */}
        <line x1="48" y1="11" x2="76" y2="11" stroke={crimsonColor} strokeWidth="2.7" strokeLinecap="round" />
        <line x1="48" y1="20" x2="76" y2="20" stroke={crimsonColor} strokeWidth="2.7" strokeLinecap="round" />
        <line x1="48" y1="29" x2="76" y2="29" stroke={crimsonColor} strokeWidth="2.7" strokeLinecap="round" />

        {/* T */}
        <path
          d="M 90 6 L 116 6 M 103 6 L 103 34"
          stroke={textColor}
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* H */}
        <path
          d="M 130 6 L 130 34 M 154 6 L 154 34 M 130 20 L 154 20"
          stroke={textColor}
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* R */}
        <path
          d="M 168 6 L 168 34 M 168 6 L 186 6 C 193.5 6 197.5 9 197.5 14 C 197.5 19 193.5 21.5 186 21.5 L 168 21.5 M 184 21.5 L 197.5 34"
          stroke={textColor}
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* I */}
        <line x1="211" y1="6" x2="211" y2="34" stroke={textColor} strokeWidth="2.7" strokeLinecap="round" />

        {/* Z */}
        <path
          d="M 224 6 L 248 6 L 224 34 L 248 34"
          stroke={textColor}
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // Content renderers for each variant
  let content = null;

  switch (variant) {
    case "symbol":
      content = renderEmblem();
      break;

    case "wordmark":
      content = (
        <div className="flex flex-col items-start gap-1">
          {renderWordmark()}
          {showSubtitle && (
            <span
              className={`font-mono font-bold tracking-[0.28em] uppercase ${
                isDark ? "text-red-400" : "text-red-600"
              } ${sizeConfig.fontSize}`}
              style={{ paddingLeft: Math.round(sizeConfig.wordmarkHeight * 0.9) }}
            >
              {subtitle}
            </span>
          )}
        </div>
      );
      break;

    case "pill":
      // Recreates the exact pill capsule from user image 1
      content = (
        <div
          className={`inline-flex items-center gap-3 rounded-full bg-white/95 border border-slate-200/90 shadow-md shadow-red-500/5 backdrop-blur-md ${sizeConfig.pillPadding}`}
        >
          {renderWordmark()}
        </div>
      );
      break;

    case "full":
    default:
      content = (
        <div className="flex items-center gap-2.5 sm:gap-3">
          {renderEmblem()}
          <div className="flex flex-col items-start">
            {renderWordmark()}
            {showSubtitle && (
              <span
                className={`font-mono font-bold tracking-[0.28em] uppercase leading-none mt-1 ${
                  isDark ? "text-red-400" : "text-red-600"
                } ${sizeConfig.fontSize}`}
                style={{ paddingLeft: 2 }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>
      );
      break;
  }

  // Wrap in Link if href is provided
  if (href) {
    return (
      <Link href={href} className={`group inline-flex items-center flex-shrink-0 ${className}`}>
        {content}
      </Link>
    );
  }

  return <div className={`inline-flex items-center flex-shrink-0 ${className}`}>{content}</div>;
}
