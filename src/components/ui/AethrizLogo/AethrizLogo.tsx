"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface AethrizLogoProps {
  variant?: "full" | "wordmark" | "symbol" | "pill" | "image";
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
  const textColor = isDark ? "#F8FAFC" : "#0B0E14";
  const crimsonColor = isDark ? "#EF4444" : "#D20117";

  // Scale multipliers for each size preset
  const sizeConfig = {
    xs: { emblemSize: 24, wordmarkHeight: 16, pillPadding: "px-3 py-1", fontSize: "text-[8px]" },
    sm: { emblemSize: 30, wordmarkHeight: 20, pillPadding: "px-3.5 py-1.5", fontSize: "text-[9px]" },
    md: { emblemSize: 38, wordmarkHeight: 26, pillPadding: "px-5 py-2", fontSize: "text-[10px]" },
    lg: { emblemSize: 48, wordmarkHeight: 32, pillPadding: "px-6 py-2.5", fontSize: "text-xs" },
    xl: { emblemSize: 60, wordmarkHeight: 42, pillPadding: "px-8 py-3.5", fontSize: "text-sm" },
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
            <stop offset="60%" stopColor="#D20117" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id={`emblemDark-${size}-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B0E14" />
          </linearGradient>
          <filter id={`emblemGlow-${size}-${theme}`} x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#D20117" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* White Circular Badge Base */}
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke={isDark ? "#334155" : "#E2E8F0"} strokeWidth="2" />
        <circle cx="50" cy="50" r="43.5" fill="none" stroke="rgba(210, 1, 23, 0.15)" strokeWidth="1.2" />

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

  // 2. Exact Vector Wordmark: ∧ ≡ T H R I Z (Matching official geometry 100%)
  const renderWordmark = () => {
    // Exact proportional width based on 920:110 aspect ratio (~8.36x)
    const width = Math.round(sizeConfig.wordmarkHeight * 8.36);

    return (
      <svg
        viewBox="0 0 920 110"
        width={width}
        height={sizeConfig.wordmarkHeight}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-label="AETHRIZ"
      >
        {/* A: Caret Apex */}
        <path
          d="M 18 97 L 55 13 L 92 97"
          stroke={textColor}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* E: 3 Bio-Crimson Parallel Rectangular Bars */}
        <rect x="156" y="20" width="100" height="13.5" rx="1.5" fill={crimsonColor} />
        <rect x="156" y="53" width="100" height="13.5" rx="1.5" fill={crimsonColor} />
        <rect x="156" y="86" width="100" height="13.5" rx="1.5" fill={crimsonColor} />

        {/* T */}
        <path
          d="M 322 13 L 388 13 M 355 13 L 355 97"
          stroke={textColor}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* H */}
        <path
          d="M 464 13 L 464 97 M 530 13 L 530 97 M 464 55 L 530 55"
          stroke={textColor}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* R */}
        <path
          d="M 616 13 L 616 97 M 616 13 L 656 13 C 674 13 681 21 681 34 C 681 47 674 55 656 55 L 616 55 M 650 55 L 681 97"
          stroke={textColor}
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* I */}
        <line x1="753" y1="13" x2="753" y2="97" stroke={textColor} strokeWidth="8.5" strokeLinecap="round" />

        {/* Z */}
        <path
          d="M 842 13 L 904 13 L 842 97 L 904 97"
          stroke={textColor}
          strokeWidth="8.5"
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

    case "image":
      content = (
        <div className="flex items-center gap-2">
          <Image
            src="/brand/aethriz-wordmark.png"
            alt="AETHRIZ"
            width={Math.round(sizeConfig.wordmarkHeight * 8.36)}
            height={sizeConfig.wordmarkHeight}
            className="h-auto object-contain"
            priority
          />
        </div>
      );
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
