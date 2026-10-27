"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole, UserProfile } from "@/types/auth";
import { Stethoscope, HeartPulse, ArrowRight, ArrowLeft, Mail, Lock, User, Award, ShieldCheck, Check } from "lucide-react";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";

export default function SignupPage() {
  const router = useRouter();
  const { registerUser, getRoleRedirectPath } = useAuth();

  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor">("patient");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [department, setDepartment] = useState("Cardiovascular Medicine");
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!agreed) {
      setError("Please consent to the clinical data governance protocol.");
      return;
    }

    setLoading(true);

    const newProfile: UserProfile = {
      id: `usr-${selectedRole}-${Date.now().toString().slice(-4)}`,
      email,
      fullName,
      role: selectedRole as UserRole,
      department: selectedRole === "doctor" ? department : "Preventive Health Member",
      licenseNo: selectedRole === "doctor" ? licenseNo : undefined,
    };

    setTimeout(() => {
      registerUser(newProfile);
      const destination = getRoleRedirectPath(selectedRole);
      router.push(destination);
    }, 700);
  };

  return (
    <div className="min-h-screen bio-grid-canvas flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <div className="w-full max-w-lg mb-6 flex justify-between items-center">
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

      {/* Main Registration Card */}
      <div className="w-full max-w-lg glass-panel p-5 sm:p-8 rounded-3xl relative z-10 shadow-xl border border-red-100">
        {/* Brand Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="mb-3">
            <AethrizLogo size="md" variant="full" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
            Create Your AETHRIZ Account
          </h1>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Select your account identity to activate personalized clinical access
          </p>
        </div>

        {/* Role Selection: Patient vs Doctor */}
        <div className="mb-6">
          <label className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
            Select Account Identity
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Patient Option */}
            <button
              type="button"
              onClick={() => setSelectedRole("patient")}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedRole === "patient"
                  ? "bg-rose-50/80 border-rose-500 text-rose-900 ring-2 ring-rose-500/30 shadow-sm"
                  : "bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4 text-rose-600" />
                </div>
                {selectedRole === "patient" && (
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="font-black text-sm text-gray-900">Patient Member</p>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Personal biometric telemetry &amp; consultations
              </p>
            </button>

            {/* Doctor Option */}
            <button
              type="button"
              onClick={() => setSelectedRole("doctor")}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedRole === "doctor"
                  ? "bg-red-50/80 border-red-500 text-red-900 ring-2 ring-red-500/30 shadow-sm"
                  : "bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-red-600" />
                </div>
                {selectedRole === "doctor" && (
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="font-black text-sm text-gray-900">Doctor / Clinician</p>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Physician telemetry HUD &amp; EHR decision tools
              </p>
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSignup} className="space-y-3.5 text-xs">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-bold mb-1 font-mono">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={selectedRole === "doctor" ? "Dr. Marcus Vance, MD" : "Marcus Vance"}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-xs"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-bold mb-1 font-mono">
              Account Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === "doctor" ? "dr.vance@stanford.edu" : "marcus.vance@gmail.com"}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-xs"
              />
            </div>
          </div>

          {/* Doctor-Specific Fields */}
          {selectedRole === "doctor" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-gray-700 font-bold mb-1 font-mono">
                  License / NPI Number
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={licenseNo}
                    onChange={(e) => setLicenseNo(e.target.value)}
                    placeholder="NPI-194029104"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 font-mono">
                  Department / Specialty
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-xs"
                >
                  <option value="Cardiovascular Medicine">Cardiovascular Medicine</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Endocrinology & Diabetology">Endocrinology &amp; Diabetology</option>
                  <option value="Critical Care / ICU">Critical Care / ICU</option>
                  <option value="Preventive Cardiology">Preventive Cardiology</option>
                  <option value="Clinical Genetics">Clinical Genetics</option>
                </select>
              </div>
            </div>
          )}

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-gray-700 font-bold mb-1 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1 font-mono">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-xs"
                />
              </div>
            </div>
          </div>

          {/* Terms and Consent Checkbox */}
          <div className="pt-2 flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
            />
            <label htmlFor="consent" className="text-[11px] text-gray-600 cursor-pointer leading-tight">
              I consent to the AETHRIZ clinical decision-support data governance framework and HIPAA Safe Harbor privacy provisions.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-4 cursor-pointer"
          >
            {loading ? (
              <span>Registering Profile...</span>
            ) : (
              <>
                <span>
                  {selectedRole === "doctor" ? "Register as Clinical Faculty" : "Create Patient Account"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-6 text-center text-xs text-gray-600 border-t border-gray-100 pt-5">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-red-600 hover:underline">
            Sign In to Account
          </Link>
        </div>

        {/* Security Compliance */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            256-bit AES Encryption
          </span>
          <span>HIPAA &amp; FDA SaMD Protocol</span>
        </div>
      </div>
    </div>
  );
}
