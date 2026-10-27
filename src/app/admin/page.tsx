"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import BioNeuralCanvas from "@/components/landing/BioNeuralCanvas";
import { useAuth } from "@/context/AuthContext";
import { 
  ShieldAlert, 
  Users, 
  BookOpen, 
  Activity, 
  Server, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Lock, 
  LogOut, 
  FileCheck, 
  AlertCircle,
  Eye,
  Sparkles
} from "lucide-react";

interface CandidateApplication {
  id: string;
  name: string;
  role: string;
  email: string;
  specialty: string;
  submittedAt: string;
  status: "Pending Review" | "Approved" | "Rejected";
}

interface ArticleSubmission {
  id: string;
  title: string;
  author: string;
  category: string;
  submittedAt: string;
  status: "Pending Review" | "Approved" | "Rejected";
}

export default function AdminPage() {
  const { user, logout } = useAuth();

  // Step 4 Review Queue (Join Team)
  const [candidates, setCandidates] = useState<CandidateApplication[]>([
    {
      id: "APP-DOC-2026-081",
      name: "Dr. Vikram Sethi, MD, DM",
      role: "Cardiothoracic Surgeon",
      email: "vikram.sethi@aiims.edu",
      specialty: "Minimally Invasive Valve Repair & ECMO",
      submittedAt: "2 hours ago",
      status: "Pending Review",
    },
    {
      id: "APP-RES-2026-042",
      name: "Dr. Priyanka Das, PhD",
      role: "AI Healthcare Researcher",
      email: "p.das@stanford.edu",
      specialty: "Transformer Models in Real-Time 12-Lead ECG Synthesis",
      submittedAt: "1 day ago",
      status: "Pending Review",
    },
  ]);

  // Step 6 Review Queue (Articles)
  const [articles, setArticles] = useState<ArticleSubmission[]>([
    {
      id: "ART-SUB-9402",
      title: "Surviving 14 Days on Invasive Mechanical Ventilation in Bhubaneswar",
      author: "Debabrata Rout",
      category: "ICU Survival",
      submittedAt: "3 hours ago",
      status: "Pending Review",
    },
    {
      id: "ART-SUB-8812",
      title: "Awake Robotic Assisted Nephrectomy: A Clinical Perspective",
      author: "Pooja Hegde",
      category: "Surgical Journey",
      submittedAt: "5 hours ago",
      status: "Pending Review",
    },
  ]);

  const handleCandidateAction = (id: string, newStatus: "Approved" | "Rejected") => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleArticleAction = (id: string, newStatus: "Approved" | "Rejected") => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <BioNeuralCanvas />
      <FloatingNavbar />
      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-red-100 shadow-xl shadow-red-500/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              AETHRIZ Enterprise Cyber-Governance Deck &bull; Role: SecOps Admin
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Governance Control: <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{user?.fullName || "SecOps Administrator"}</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm">
              Ref: <span className="font-mono font-bold text-slate-800">AAHAAR/NTC/2026-27/02</span> &bull; Facility: Cuttack Headquarters, Odisha
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-mono font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>SUPERADMIN ACCESS GRANTED</span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Server Health & Infrastructure HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0B0E14] text-white p-5 rounded-2xl border border-white/10 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Cluster Uptime</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-2xl font-mono font-bold text-emerald-400">99.992%</p>
            <span className="text-[11px] text-slate-400">Edge Gateway Cuttack-01</span>
          </div>

          <div className="bg-[#0B0E14] text-white p-5 rounded-2xl border border-white/10 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Inference Latency</span>
              <Activity className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <p className="text-2xl font-mono font-bold text-sky-400">14.2 ms</p>
            <span className="text-[11px] text-slate-400">Bayesian Diagnostic Engine</span>
          </div>

          <div className="bg-[#0B0E14] text-white p-5 rounded-2xl border border-white/10 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Encrypted Tunnels</span>
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <p className="text-2xl font-mono font-bold text-indigo-400">1,248</p>
            <span className="text-[11px] text-slate-400">Active WebRTC Telehealth</span>
          </div>

          <div className="bg-[#0B0E14] text-white p-5 rounded-2xl border border-white/10 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Compliance Status</span>
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-2xl font-mono font-bold text-emerald-400">HIPAA & ISO</p>
            <span className="text-[11px] text-slate-400">Zero Security Anomalies</span>
          </div>
        </div>

        {/* Step 4 Review Queue: Join Team Applications */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 font-semibold text-xs mb-1">
                <Users className="w-3.5 h-3.5" />
                Step 4 Reviewer Workflow
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Clinician & Faculty Applications
              </h2>
              <p className="text-xs text-slate-500">
                Applications submitted via <code>/join-team</code> awaiting designated reviewer sign-off before profile syndication.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
              {candidates.filter(c => c.status === "Pending Review").length} Pending
            </span>
          </div>

          <div className="space-y-4">
            {candidates.map((cand) => (
              <div
                key={cand.id}
                className="p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/40 hover:bg-white transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                      {cand.id}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{cand.name}</h3>
                    <span className="text-xs font-semibold text-red-600">&bull; {cand.role}</span>
                  </div>
                  <p className="text-xs text-slate-600">{cand.specialty}</p>
                  <p className="text-[11px] text-slate-400">Contact: {cand.email} &bull; Received {cand.submittedAt}</p>
                </div>

                <div className="flex items-center gap-2">
                  {cand.status === "Approved" ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Approved & Profile Created
                    </span>
                  ) : cand.status === "Rejected" ? (
                    <span className="px-3 py-1.5 rounded-xl bg-red-100 text-red-800 text-xs font-semibold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-red-600" />
                      Application Declined
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleCandidateAction(cand.id, "Approved")}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve & Publish
                      </button>
                      <button
                        onClick={() => handleCandidateAction(cand.id, "Rejected")}
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-red-50 text-slate-700 hover:text-red-600 font-semibold text-xs transition-colors"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 6 Review Queue: User Article Submissions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 font-semibold text-xs mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                Step 6 Reviewer Workflow
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Healthcare Narrative Submissions
              </h2>
              <p className="text-xs text-slate-500">
                Patient experiences submitted via <code>/articles</code>. Articles are not published automatically until verified.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
              {articles.filter(a => a.status === "Pending Review").length} Awaiting Verification
            </span>
          </div>

          <div className="space-y-4">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/40 hover:bg-white transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                      {art.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-semibold">
                      {art.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{art.title}</h3>
                  <p className="text-[11px] text-slate-400">By {art.author} &bull; Received {art.submittedAt}</p>
                </div>

                <div className="flex items-center gap-2">
                  {art.status === "Approved" ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified & Published
                    </span>
                  ) : art.status === "Rejected" ? (
                    <span className="px-3 py-1.5 rounded-xl bg-red-100 text-red-800 text-xs font-semibold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-red-600" />
                      Rejected
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleArticleAction(art.id, "Approved")}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs shadow-md shadow-red-600/20 hover:scale-105 transition-all flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verify & Syndicate
                      </button>
                      <button
                        onClick={() => handleArticleAction(art.id, "Rejected")}
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-red-50 text-slate-700 hover:text-red-600 font-semibold text-xs transition-colors"
                      >
                        Flag / Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
