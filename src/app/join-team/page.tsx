"use client";

import React, { useState } from "react";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import DnaHelixCanvas from "@/components/canvas/DnaHelixCanvas";
import { Users, ShieldCheck, FileCheck, CheckCircle2, Upload, AlertCircle, Send } from "lucide-react";

export default function JoinTeamPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Clinical Cardiologist",
    licenseNo: "",
    hospitalAffiliation: "",
    yearsExperience: "8",
    cvFileName: "",
    statement: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <DnaHelixCanvas />
      <FloatingNavbar />

      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-red-100 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
              STEP 1 &bull; JOIN THE MEDICAL FACULTY
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Physician & Specialist Credentialing Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              Apply to join the board-certified clinical faculty at AETHRIZ AI Healthcare And Advanced Research Private Limited.
            </p>
          </div>

          {/* Submission Notice adhering to Step 4 rules */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">
              <strong>Compliance Protocol (Step 4):</strong> Submission of this form transmits your credentials to <code>aethriz.ai@gmail.com</code> for primary source verification. Submissions will not automatically create a public profile; credentials are published only upon internal committee credentialing.
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Credentialing Packet Received</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-medium">
                Thank you, <strong>{formData.fullName}</strong>. Your credentialing dossier has been dispatched to <code>aethriz.ai@gmail.com</code> under reference <code>AAHAAR/NTC/2026-27/02</code>. Our clinical credentials committee will review your primary medical qualifications within 48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md shadow-red-500/25 hover:bg-red-700 transition-all"
              >
                Submit Additional Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 font-mono">
                    Physician Full Name (with Degrees) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Sarah Lin, MD, FACC"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1 font-mono">
                    Professional Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="doctor@institution.org"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Row 2: Specialty & Medical License */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 font-mono">
                    Professional Role / Medical Department *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-red-500 font-medium"
                  >
                    <option>Clinical Cardiologist</option>
                    <option>Endocrinologist & Diabetologist</option>
                    <option>Clinical Geneticist</option>
                    <option>Neurologist & Stroke Specialist</option>
                    <option>Preventive Medicine Physician</option>
                    <option>AI Biomedical Research Fellow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1 font-mono">
                    NPI / MCI Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.licenseNo}
                    onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                    placeholder="e.g. NPI: 1849204918 or MCI-49201"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Row 3: Affiliation & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 font-mono">
                    Primary Hospital / Academic Affiliation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hospitalAffiliation}
                    onChange={(e) => setFormData({ ...formData, hospitalAffiliation: e.target.value })}
                    placeholder="e.g. Stanford Medicine / Apollo Hospitals"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1 font-mono">
                    Years of Post-Residency Experience
                  </label>
                  <input
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              {/* Statement of Interest */}
              <div>
                <label className="block text-gray-700 font-bold mb-1 font-mono">
                  Clinical Expertise & Bio-Algorithmic Focus *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Detail your clinical sub-specialties, research publications, or tele-health consulting experience..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Faculty Credentialing Application</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
