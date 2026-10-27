"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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
  ShieldAlert
} from "lucide-react";

export default function FloatingNavbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, getRoleRedirectPath } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-red-500/25 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-gray-900 leading-none">
                AETHRIZ
              </span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-red-600 font-mono">
                BIO-HEALTH AI
              </span>
            </div>
          </Link>

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
          <div className="lg:hidden mt-2 glass-floating-nav rounded-2xl p-4 border border-white/80 shadow-xl space-y-3 pointer-events-auto animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-700">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      isActive
                        ? "bg-red-50 border-red-200 text-red-600 font-extrabold"
                        : "bg-white/60 border-gray-100 hover:bg-red-50/50"
                    }`}
                  >
                    <link.icon className="w-4 h-4 text-red-500" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Button */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              {isAuthenticated && user ? (
                <div className="w-full flex items-center justify-between">
                  <Link
                    href={getRoleRedirectPath(user.role)}
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-bold text-gray-900 flex items-center gap-2"
                  >
                    <span>Dashboard ({user.role})</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-500/20"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Portal Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
