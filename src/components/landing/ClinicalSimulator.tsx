"use client";

import React from "react";
import Stepper, { Step } from "@/components/ui/Stepper";
import StrokeText from "@/components/ui/StrokeText";
import { CheckCircle2, ShieldAlert, Cpu, Heart, FileText, Send, Sparkles } from "lucide-react";

export default function ClinicalSimulator() {
  const steps = [
    {
      title: "Multi-Modal Ingestion",
      tag: "Phase 1: Ambient Capture",
      icon: <Cpu className="w-5 h-5 text-red-600" />,
      detail:
        "Wearable 12-lead ECG stream, optical food scan photos, and serum ApoB/HbA1c biomarkers are normalized into encrypted biometric tensors.",
      metrics: { "Latency": "18ms", "Signal Fidelity": "99.8%", "Encryption": "AES-256 GCM" },
    },
    {
      title: "Bayesian Risk Stratification",
      tag: "Phase 2: Neural Inference",
      icon: <Heart className="w-5 h-5 text-rose-600" />,
      detail:
        "Deep convolutional attention networks cross-examine clinical biomarkers against 140,000 longitudinal patient cohorts to detect subclinical plaque.",
      metrics: { "Confidence": "94.2%", "AUC-ROC": "0.984", "Hazard Ratio": "0.42" },
    },
    {
      title: "Longitudinal Phenotype Mapping",
      tag: "Phase 3: Multi-Omics",
      icon: <FileText className="w-5 h-5 text-amber-600" />,
      detail:
        "Genomic SNPs (PCSK9, APOE-e4) and continuous glycemic excursions are synthesized to forecast 5-year cardiovascular and metabolic trajectories.",
      metrics: { "Genomic SNPs": "14 Targets", "Trajectory Horizon": "60 Months", "FPR": "1.2%" },
    },
    {
      title: "Human-in-the-Loop Sign-off",
      tag: "Phase 4: Clinician Review",
      icon: <ShieldAlert className="w-5 h-5 text-indigo-600" />,
      detail:
        "Board-certified physician (Dr. Sarah Lin, MD) inspects confidence intervals and approves precision statin titration via the AI Review Queue.",
      metrics: { "Reviewer NPI": "1849204918", "Protocol": "FDA SaMD II", "Status": "Certified" },
    },
    {
      title: "Closed-Loop Intervention",
      tag: "Phase 5: Telehealth Care",
      icon: <Send className="w-5 h-5 text-emerald-600" />,
      detail:
        "Patient receives verified prescription adjustments and can launch an immediate WebRTC encrypted video consult room with their cardiologist.",
      metrics: { "Delivery": "Instant Push", "Video Latency": "34ms", "Adherence Target": "92%" },
    },
  ];

  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl relative overflow-hidden border border-red-100 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-4 border-b border-gray-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REACT BITS CLINICAL PIPELINE & STEPPER</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-2">
            The 5-Phase Bio-Algorithmic Diagnostic Pipeline
          </h2>
          <p className="text-xs text-gray-600 mt-1 font-medium max-w-xl">
            Simulate how AETHRIZ transforms raw ambient biometrics into verified physician clinical interventions in real time.
          </p>
        </div>

        <div className="hidden md:block w-72">
          <StrokeText
            text="AI PIPELINE"
            strokeColor="#DC2626"
            fillColor="#111827"
            fontSize={36}
            fontWeight={900}
            strokeWidth={1.2}
            trigger="scroll"
            fillMode="wipe"
            wipeFrom="left"
            className="w-full"
          />
        </div>
      </div>

      {/* Stepper Pipeline */}
      <Stepper
        initialStep={1}
        theme="light"
        accentColor="#DC2626"
        orientation="horizontal"
        indicator="numbers"
        transition="slide"
        width="100%"
        frame={false}
        backButtonText="Previous Phase"
        nextButtonText="Next Phase"
        completeButtonText="Intervention Complete"
        className="w-full"
      >
        {steps.map((st, i) => (
          <Step key={i} title={st.title} description={st.tag}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center py-2">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    {st.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-red-600 uppercase">
                      {st.tag}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">
                      {st.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {st.detail}
                </p>

                {/* Metric Chips */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {Object.entries(st.metrics).map(([key, val]) => (
                    <div key={key} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center font-mono">
                      <span className="text-[10px] text-gray-500 block font-sans">{key}</span>
                      <span className="text-xs font-black text-gray-900 mt-0.5 block">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Box */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-md shadow-red-500/25">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Phase Telemetry Active</h4>
                  <p className="text-[11px] text-gray-600 mt-1 font-mono font-semibold">
                    Step {i + 1} of 5 &bull; Real-time AI Pipeline
                  </p>
                </div>
              </div>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
