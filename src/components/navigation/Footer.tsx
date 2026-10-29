"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, FileCheck, ArrowUpRight } from "lucide-react";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";

export default function Footer() {
  return (
    <footer className="bg-[#111318] text-gray-400 text-xs border-t border-gray-800 pt-16 pb-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Column 1 & 2: Corporate Identity & Address */}
          <div className="lg:col-span-2 space-y-4">
            {/* Official Corporate Logo */}
            <AethrizLogo href="/" size="md" variant="full" theme="dark" />

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              The Zenith of Bio-Algorithmic Health. Clinical AI decision-support systems, 
              interactive 3D multi-modal anatomy, continuous telemedicine, and longitudinal patient health intelligence.
            </p>

            {/* Official Registered Corporate Info */}
            <div className="space-y-2 pt-2 text-[11px] font-mono text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Aethriz AI Healthcare And Advanced Research Private Limited</strong><br />
                  1st Floor, Jagabandhu Lane, Darkhapatna, Cuttack, Odisha - 753013, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <a href="tel:+917852982003" className="hover:text-white transition-colors">
                  +91 7852982003
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <a href="mailto:aethriz.ai@gmail.com" className="hover:text-white transition-colors">
                  aethriz.ai@gmail.com
                </a>
              </div>
            </div>

            <div className="text-[10px] font-mono text-red-400 font-semibold pt-1">
              Work Guide Ref: AAHAAR/NTC/2026-27/02 &bull; CEO: Amrita Saini
            </div>
          </div>

          {/* Column 3: AI & Diagnostic Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              AI Diagnostics
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/health-analysis" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>AI Health Analysis</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/food-scanner" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Food & Product Scanner</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/body-explorer" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>3D Body Explorer</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Clinical Case Stories</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Clinical Network & Telehealth */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Clinical Telehealth
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/doctors" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Doctor Directory</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/join-team" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Join the Team (Faculty)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Contact Headquarters</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Role Portals & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Portals & Access
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Unified Role Sign In</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Patient Health HUD</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/doctor-portal" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Doctor Command Center</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-red-400 transition-colors flex items-center justify-between">
                  <span>Enterprise Cyber Admin</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Certifications */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Aethriz AI Healthcare And Advanced Research Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-5 font-mono text-[10px]">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              HIPAA Safe Harbor Certified
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <FileCheck className="w-3.5 h-3.5" />
              ISO 27001
            </span>
            <span className="text-red-400 font-bold">
              24+ Language Engine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
