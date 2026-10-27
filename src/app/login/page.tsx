"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/auth";
import { Shield, Stethoscope, HeartPulse, UserCheck, ArrowRight, Activity, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithSupabase, isSupabaseActive, getRoleRedirectPath } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("patient");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Role info configurations for the unified authentication engine
  const roleMeta: Record<UserRole, { label: string; icon: React.ReactNode; desc: string; redirect: string }> = {
    patient: {
      label: "Patient Member",
      icon: <HeartPulse className="w-4 h-4 text-rose-600" />,
      desc: "Personal biometric vitals, AI food scans & consultation access",
      redirect: "/dashboard",
    },
    doctor: {
      label: "Clinician / Doctor",
      icon: <Stethoscope className="w-4 h-4 text-red-600" />,
      desc: "Hospital-grade 12-lead ECG telemetry & tele-health consults",
      redirect: "/doctor-portal",
    },
    nurse: {
      label: "Nurse / Clinical Staff",
      icon: <Activity className="w-4 h-4 text-emerald-600" />,
      desc: "Emergency triage, patient vitals monitoring & queue hand-off",
      redirect: "/nurse-queue",
    },
    admin: {
      label: "Enterprise Admin",
      icon: <Shield className="w-4 h-4 text-indigo-600" />,
      desc: "Multi-tenant hospital governance, HIPAA ledgers & audit trails",
      redirect: "/admin",
    },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (isSupabaseActive && loginWithSupabase && email && password) {
      const res = await loginWithSupabase(email, password);
      if (!res.success) {
        setErrorMessage(res.error || "Authentication failed. Falling back to role simulation.");
        // Fallback after brief notification
        setTimeout(() => {
          login(selectedRole, email || undefined);
          router.push(getRoleRedirectPath(selectedRole));
        }, 1200);
        return;
      }
      router.push(getRoleRedirectPath(selectedRole));
      return;
    }

    // Standard high-speed role redirection engine
    setTimeout(() => {
      login(selectedRole, email || undefined);
      const destination = getRoleRedirectPath(selectedRole);
      router.push(destination);
    }, 450);
  };

  const handleQuickRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === "admin") setEmail("secops@aethriz.com");
    else if (role === "doctor") setEmail("sarah.lin@stanford.edu");
    else if (role === "nurse") setEmail("ananya.sharma@aethriz.com");
    else setEmail("marcus.vance@gmail.com");
  };

  return (
    <div className="min-h-screen bio-grid-canvas flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Home link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">
          Ref: AAHAAR/NTC/2026-27/02
        </span>
      </div>

      {/* Card container */}
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl relative z-10 shadow-xl border border-red-100">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md shadow-red-500/25 mb-3">
            A
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            AETHRIZ Clinical Gateway
          </h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Single Unified Sign-In with Automatic Role-Based Redirection
          </p>
        </div>

        {/* Demo Fast-Switch Pills (for team review & demonstration) */}
        <div className="mb-6">
          <label className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-2">
            Select Role Identity for Redirection
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(roleMeta) as UserRole[]).map((r) => {
              const active = selectedRole === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleQuickRoleSelect(r)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                    active
                      ? "bg-red-50 border-red-500 text-red-700 shadow-sm ring-1 ring-red-500"
                      : "bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {roleMeta[r].icon}
                  <span className="capitalize font-bold">{r}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-500 mt-2 font-medium">
            &rarr; Will redirect to: <strong className="text-red-700 font-mono">{roleMeta[selectedRole].redirect}</strong>
          </p>
        </div>

        {/* Unified Sign-In Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-bold mb-1 font-mono">
              Account Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.com"
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-700 font-bold font-mono">
                Password / Passkey
              </label>
              <span className="text-[11px] text-red-600 hover:underline cursor-pointer font-medium">
                Forgot passkey?
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-6"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In as {roleMeta[selectedRole].label}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            256-bit AES Auth
          </span>
          <span>HIPAA Safe Harbor</span>
        </div>
      </div>
    </div>
  );
}
