"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { 
  Heart, 
  Menu, 
  X, 
  Stethoscope, 
  Users, 
  Activity, 
  Scan, 
  BookOpen, 
  Calendar, 
  PhoneCall, 
  LogIn, 
  LogOut,
  User,
  ShieldAlert,
  Cpu,
  Zap,
  Sparkles,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";

export default function FloatingNavbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, getRoleRedirectPath } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [telemetryOpen, setTelemetryOpen] = useState(false);

  const navLinks = [
    { href: "/doctors", label: "Doctors", icon: Stethoscope },
    { href: "/join-team", label: "Join Team", icon: Users },
    { href: "/health-analysis", label: "AI Health", icon: Activity },
    { href: "/food-scanner", label: "Food Scanner", icon: Scan },
    { href: "/body-explorer", label: "3D Anatomy", icon: Heart },
    { href: "/articles", label: "Stories", icon: BookOpen },
    { href: "/booking", label: "Bookings", icon: Calendar },
    { href: "/contact", label: "Contact Us", icon: PhoneCall },
  ];

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "doctor":
        return "bg-red-100 text-red-700 border-red-200";
      case "nurse":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "patient":
      default:
        return "bg-rose-100 text-rose-700 border-rose-200";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <nav className="glass-floating-nav rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border border-white/80 shadow-lg shadow-red-500/5">
          {/* Official AETHRIZ Logo & Brand (Emblem + ∧ ≡ T H R I Z Wordmark) */}
          <AethrizLogo href="/" size="sm" variant="full" theme="light" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3 text-[11px] xl:text-xs font-semibold text-gray-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-1 xl:px-2.5 xl:py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "bg-red-50 text-red-600 font-extrabold shadow-xs border border-red-200/80"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50/50"
                  }`}
                >
                  <link.icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-red-600" : "text-gray-400 group-hover:text-red-500"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Live Clinical Telemetry Beacon & Interactive Telemetry HUD Dropdown */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setTelemetryOpen(!telemetryOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50/80 hover:bg-red-100/80 border border-red-200/80 text-[10px] font-mono font-bold text-gray-700 shadow-xs cursor-pointer transition-all group"
              title="Click to view live biophysical telemetry HUD"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span className="text-red-700 font-black">70 BPM</span>
              <svg className="w-9 h-3.5 text-red-600 overflow-visible group-hover:scale-105 transition-transform" viewBox="0 0 50 14" fill="none">
                <path
                  d="M 0 7 L 12 7 L 15 2 L 18 12 L 21 0 L 24 14 L 27 7 L 50 7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-gray-500 font-semibold tracking-wider text-[9px]">SINUS SYNC</span>
              <Zap className="w-3 h-3 text-red-500 group-hover:rotate-12 transition-transform" />
            </button>

            {/* Interactive Float Telemetry HUD Popover */}
            {telemetryOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 bg-slate-950/95 backdrop-blur-2xl border border-red-500/30 rounded-3xl p-4 shadow-2xl text-white font-mono z-50 animate-fadeIn space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Live Biophysical Stream</span>
                  </div>
                  <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    CONNECTED &bull; 12ms
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px]">HEART RATE</span>
                    <span className="text-emerald-400 font-bold text-sm">70 BPM</span>
                    <span className="text-[8px] text-slate-500 block">HRV: 62 ms</span>
                  </div>
                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px]">ARTERIAL SpO2</span>
                    <span className="text-cyan-400 font-bold text-sm">99.2%</span>
                    <span className="text-[8px] text-slate-500 block">Plethys Normal</span>
                  </div>
                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px]">BP INDEX</span>
                    <span className="text-white font-bold text-sm">120/80</span>
                    <span className="text-[8px] text-slate-500 block">MAP: 93.3 mmHg</span>
                  </div>
                  <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px]">AI INFERENCE</span>
                    <span className="text-rose-400 font-bold text-sm">99.4% AUC</span>
                    <span className="text-[8px] text-slate-500 block">Bayesian Tier 1</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    AES-256 Medical Sync
                  </span>
                  <Link
                    href="/health-analysis"
                    onClick={() => setTelemetryOpen(false)}
                    className="text-red-400 hover:text-red-300 font-bold flex items-center gap-0.5 hover:underline"
                  >
                    <span>Full Diagnostic Engine</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Session Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={getRoleRedirectPath(user.role)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:border-red-300 transition-all text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left font-sans">
                    <span className="font-bold text-gray-900 leading-none block text-[11px] truncate max-w-[100px]">
                      {user.fullName.split(" ")[0]}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1 rounded uppercase font-bold border ${getRoleBadgeStyle(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-500/20 hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Portal Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 glass-floating-nav rounded-2xl p-4 sm:p-5 border border-white/80 shadow-2xl space-y-4 pointer-events-auto animate-fadeIn max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-600">
                AETHRIZ Navigation Deck
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                Clinical Health Portal
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-700">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`p-3 min-h-[48px] rounded-xl border flex items-center gap-2.5 transition-all ${
                      isActive
                        ? "bg-red-50 border-red-300 text-red-600 font-extrabold shadow-xs"
                        : "bg-white/80 border-gray-100 hover:bg-red-50/50 text-gray-800"
                    }`}
                  >
                    <link.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-red-600" : "text-red-500"}`} />
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Button */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              {isAuthenticated && user ? (
                <div className="w-full flex items-center justify-between bg-white/80 p-3 rounded-xl border border-gray-100">
                  <Link
                    href={getRoleRedirectPath(user.role)}
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-bold text-gray-900 flex items-center gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block leading-tight text-gray-900 font-bold">{user.fullName.split(" ")[0]}</span>
                      <span className="text-[9px] font-mono text-red-600 uppercase font-bold">{user.role} Dashboard</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="text-xs text-red-600 font-bold hover:underline px-2 py-1 rounded-lg hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 min-h-[44px] rounded-xl bg-white border border-gray-200 hover:border-red-300 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Users className="w-3.5 h-3.5 text-red-600" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
