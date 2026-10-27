"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import ColorBends from "@/components/ui/ColorBends";
import StarBorder from "@/components/ui/StarBorder";
import GlareHover from "@/components/ui/GlareHover";
import GooeyNav from "@/components/ui/GooeyNav";
import TiltedCard, { TiltedCardLayer } from "@/components/ui/TiltedCard";
import PulseHeart from "@/components/ui/PulseHeart";
import { 
  BookOpen, 
  Heart, 
  Send, 
  ShieldCheck, 
  Clock, 
  Tag, 
  Filter, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  UserCheck,
  X
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: "icu" | "surgery" | "recovery" | "near-death" | "chronic";
  categoryLabel: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  snippet: string;
  fullStory: string;
  clinicalReviewer: string;
  likes: number;
  tags: string[];
}

const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-01",
    title: "Forty-Eight Hours on ECMO: What Sepsis Survival Taught Me About Resilience",
    category: "icu",
    categoryLabel: "ICU Survival",
    author: "Rohan Mukherjee",
    authorRole: "Recovered ICU Patient",
    date: "October 18, 2026",
    readTime: "7 min read",
    snippet: "When septic shock plummeted my arterial pressure, the critical care team instituted veno-arterial ECMO. Here is what consciousness felt like between alarms, and how bio-algorithmic monitoring preserved my cognitive baseline.",
    fullStory: "The alarms felt distant, like echoes under deep water. When the clinical team instituted veno-arterial ECMO at Cuttack Advanced Facility, my family was told the odds were 30%. What saved my organ perfusion was continuous algorithmic micro-titration of vasopressors. This story is dedicated to the night-shift nurses who held my hand while the telemetry screens flashed green.",
    clinicalReviewer: "Dr. Sarah Lin, MD (Cardiovascular & Critical Care)",
    likes: 342,
    tags: ["ECMO", "Sepsis", "Critical Care", "Telemetry"]
  },
  {
    id: "art-02",
    title: "Awake Craniotomy: Navigating Language Mapping on the Operating Table",
    category: "surgery",
    categoryLabel: "Surgical Journey",
    author: "Elena Rostova",
    authorRole: "Post-Neurosurgical Patient",
    date: "October 12, 2026",
    readTime: "9 min read",
    snippet: "Sitting upright with my skull open, naming pictures of guitars and animals while the neuro-navigation laser tracked within 0.2mm of Broca's area. Demystifying the experience of awake brain surgery.",
    fullStory: "People imagine awake brain surgery is terrifying. In reality, the surgical suite was calmly illuminated in soft amber. With local scalp blocks and intra-operative cortico-cortical evoked potentials, the neuro-navigation system rendered a real-time hologram of my functional cortex. I felt zero pain, only gratitude for surgical precision.",
    clinicalReviewer: "Dr. Kenji Sato, MD, PhD (Neurosurgery)",
    likes: 512,
    tags: ["Neurosurgery", "Brain Mapping", "Awake Surgery", "Recovery"]
  },
  {
    id: "art-03",
    title: "Return from Asystole: 6 Minutes of Cardiac Arrest and the Cognitive Path Home",
    category: "near-death",
    categoryLabel: "Near-Death Experience",
    author: "David Vance",
    authorRole: "Sudden Cardiac Arrest Survivor",
    date: "September 29, 2026",
    readTime: "11 min read",
    snippet: "A sudden ventricular fibrillation arrest during an ordinary cycling commute. 6 minutes of mechanical CPR, targeted temperature management, and the profound perspective shift that followed.",
    fullStory: "There was no tunnel of light, but rather an absolute, serene quietude followed by cold saline infusion during targeted temperature management (TTM). Waking up 48 hours later with an automated external defibrillator shock recorded in my bio-data log redefined what it means to live intentionally.",
    clinicalReviewer: "Dr. Priya Sen, MD (Cardiology & Electrophysiology)",
    likes: 890,
    tags: ["Cardiac Arrest", "Resuscitation", "Hypothermia Protocol", "Perspective"]
  },
  {
    id: "art-04",
    title: "Reversing Early-Stage Steatohepatitis Through Continuous Metabolic Telemetry",
    category: "recovery",
    categoryLabel: "Illness Recovery",
    author: "Sunita Mohapatra",
    authorRole: "Metabolic Cohort Member",
    date: "October 5, 2026",
    readTime: "6 min read",
    snippet: "From an elevated FIB-4 score and grade 2 fatty liver to normalized ALT/AST enzymes within 180 days using bio-algorithmic nutritional guidance and glycemic tracking.",
    fullStory: "When my liver enzymes signaled progressive NASH, standard diet sheets felt generic. Switching to the AETHRIZ nutritional analysis pipeline allowed me to scan every daily meal for hidden fructose and inflammatory seed oils. Six months later, my ultrasound fibrosis stage regressed back to F0-F1.",
    clinicalReviewer: "Dr. Marcus Bell, MD (Endocrinology & Metabolism)",
    likes: 421,
    tags: ["Metabolism", "NASH Reversal", "Food AI", "Nutrition"]
  },
  {
    id: "art-05",
    title: "The Long Road After Guillain-Barré: From Quadriplegia to Running 5K",
    category: "recovery",
    categoryLabel: "Illness Recovery",
    author: "Tariq Al-Mansoor",
    authorRole: "Neurology Rehabilitation Alum",
    date: "September 15, 2026",
    readTime: "8 min read",
    snippet: "A post-viral autoimmune cascade left me paralyzed from the neck down in 72 hours. Plasma exchange, robotic exoskeleton retraining, and rediscovering neuroplasticity step by step.",
    fullStory: "When your own antibodies attack the myelin sheath of peripheral nerves, recovery is counted not in weeks but in microscopic millimeters of axonal regeneration. Today, crossing a 5K finish line with 98% motor unit recruitment is living proof of human resilience paired with modern neuro-rehabilitation.",
    clinicalReviewer: "Dr. Ananya Roy, MD (Physical Medicine & Rehab)",
    likes: 673,
    tags: ["GBS", "Neurology", "Neuroplasticity", "Exoskeleton"]
  }
];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "icu",
    authorName: "",
    email: "",
    story: "",
    hospitalOrDoctor: "",
    consentGiven: false,
  });

  const categories = [
    { id: "all", label: "All Experiences" },
    { id: "icu", label: "ICU Survival" },
    { id: "surgery", label: "Surgical Journeys" },
    { id: "recovery", label: "Illness Recovery" },
    { id: "near-death", label: "Near-Death Resuscitation" },
    { id: "chronic", label: "Chronic Healing" },
  ];

  const filteredArticles = INITIAL_ARTICLES.filter((art) => {
    const matchesCat = activeCategory === "all" || art.category === activeCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.authorName || !formData.story || !formData.email) {
      alert("Please fill in all mandatory fields before submitting.");
      return;
    }
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setIsSubmitOpen(false);
      setFormData({
        title: "",
        category: "icu",
        authorName: "",
        email: "",
        story: "",
        hospitalOrDoctor: "",
        consentGiven: false,
      });
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#FDF4F5] flex flex-col overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Background Liquid Bioluminescent Chromatic Waves with ColorBends */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-25">
        <ColorBends
          colors={["#DC2626", "#F43F5E", "#881337", "#FDA4AF"]}
          speed={0.2}
          transparent={true}
          autoResize={true}
          warp={1.2}
        />
      </div>

      <FloatingNavbar />
      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Header Banner */}
        <div className="backdrop-blur-2xl bg-white/80 rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl shadow-red-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-50 to-rose-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                Step 6: Clinical & Patient Experience Sharing
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Authentic Healthcare Journeys & <br />
                <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                  Survival Chronicles
                </span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Raw, human narratives from ICU survival, awake surgeries, near-death resuscitations, and chronic recovery. Every submission is clinically verified to protect patient dignity and clinical veracity.
              </p>
            </div>

            <div className="flex-shrink-0">
              <StarBorder
                as="button"
                onClick={() => setIsSubmitOpen(true)}
                color="#DC2626"
                trailColor="#F87171"
                glow={0.8}
                sparkle={true}
                radius={16}
                theme="light"
                backgroundColor="#DC2626"
                textColor="#FFFFFF"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 text-white font-semibold shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-white" />
                <span className="text-white">Submit Your Journey</span>
              </StarBorder>
            </div>
          </div>
        </div>

        {/* Spotlight 3D Clinical Case Study with TiltedCard */}
        <div className="bg-gradient-to-br from-slate-900 to-[#111318] rounded-3xl p-5 sm:p-10 border border-slate-800 text-white relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                SPOTLIGHT CLINICAL BREAKTHROUGH &bull; 3D INTERACTIVE RECORD
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                48 Hours on Veno-Arterial ECMO: <br />
                <span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
                  Bio-Algorithmic Vasopressor Recovery
                </span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Interact with this verified patient record. Hover to examine real-time depth parallax layers, or click to flip the record and examine the ICU arterial cannulation and norepinephrine titration charts.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Clinical Ethics Approved
                </span>
                <span>Case ID: AETH-ECMO-773</span>
                <span>Reviewer: Dr. Sarah Lin, MD</span>
              </div>
            </div>

            <div className="w-full lg:w-auto flex justify-center max-w-full overflow-hidden">
              <div className="scale-[0.88] sm:scale-100 origin-center">
                <TiltedCard
                  containerHeight="340px"
                  containerWidth="340px"
                  imageHeight="340px"
                  imageWidth="340px"
                rotateAmplitude={15}
                scaleOnHover={1.06}
                showTooltip={true}
                captionText="Click to Flip Clinical Telemetry"
                flipOnClick={true}
                backContent={
                  <div className="w-full h-full bg-[#0B0E14] text-white p-6 rounded-3xl border border-red-500/40 flex flex-col justify-between select-none">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">ICU Telemetry Record</span>
                        <span className="text-[10px] font-mono text-emerald-400">P/F Ratio 280 (Stable)</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Mean Arterial Pressure</span>
                          <span className="font-mono text-white font-bold">78 mmHg</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>VA-ECMO Circuit Flow</span>
                          <span className="font-mono text-white font-bold">4.2 L/min</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Lactate Clearance</span>
                          <span className="font-mono text-emerald-400 font-bold">1.4 mmol/L</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Cognitive Baseline</span>
                          <span className="font-mono text-white font-bold">MoCA: 29/30</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Click to flip front</span>
                      <span className="text-red-400 font-semibold">AETHRIZ Bio-Telemetry</span>
                    </div>
                  </div>
                }
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between relative overflow-hidden select-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-mono font-bold">
                      CRITICAL SURVIVAL CASE
                    </span>
                    <h3 className="text-lg font-bold text-white mt-3">
                      ECMO & Sepsis Survival
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-3">
                      &quot;What saved my organ perfusion was continuous algorithmic micro-titration while screens flashed green.&quot;
                    </p>
                  </div>

                  <TiltedCardLayer depth={30} className="w-full">
                    <div className="bg-red-950/70 backdrop-blur-md p-3 rounded-xl border border-red-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-slate-200">Patient: Rohan M.</span>
                      </div>
                      <span className="text-xs font-mono text-red-400 font-semibold">ECMO 48h</span>
                    </div>
                  </TiltedCardLayer>
                </div>
              </TiltedCard>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills with GooeyNav & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none flex justify-start">
            <GooeyNav
              items={categories.map((c) => ({ label: c.label }))}
              activeIndex={categories.findIndex((c) => c.id === activeCategory)}
              onChange={(idx) => setActiveCategory(categories[idx].id)}
              theme="light"
              color="#DC2626"
              activeTextColor="#FFFFFF"
            />
          </div>

          <div className="relative w-full lg:w-72 flex-shrink-0">
            <input
              type="text"
              placeholder="Search by diagnosis, ICU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            />
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <GlareHover
              key={article.id}
              width="100%"
              height="100%"
              borderRadius="24px"
              glareColor="#DC2626"
              glareOpacity={0.16}
              variant="streak"
              rimGlint={true}
              className="w-full h-full block"
            >
              <article
                className="bg-white w-full h-full rounded-3xl p-6 border border-slate-200 hover:border-red-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
                      {article.categoryLabel}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </div>
                      <PulseHeart
                        count={article.likes}
                        likedColor="#DC2626"
                        idleColor="#94A3B8"
                        pillColor="#F8FAFC"
                        textColor="#334155"
                        size={28}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {article.snippet}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[11px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{article.author}</p>
                      <p className="text-xs text-slate-500">{article.authorRole}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{article.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">Reviewed by {article.clinicalReviewer}</span>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-600 text-sm font-semibold transition-colors"
                  >
                    Read Full Experience
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </GlareHover>
          ))}
        </div>

        {/* Full Story Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                    {selectedArticle.categoryLabel}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>By <strong>{selectedArticle.author}</strong> ({selectedArticle.authorRole})</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-900">
                    <strong>AETHRIZ Clinical Verification Notice:</strong> This submission underwent medical ethics and clinical accuracy review by <em>{selectedArticle.clinicalReviewer}</em>. Personal identifiers have been safeguarded in accordance with patient data governance protocols.
                  </div>
                </div>

                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-4">
                  <p>{selectedArticle.fullStory}</p>
                  <p className="italic bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                    "{selectedArticle.snippet}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <PulseHeart
                      count={selectedArticle.likes}
                      likedColor="#DC2626"
                      idleColor="#94A3B8"
                      pillColor="#FEE2E2"
                      textColor="#991B1B"
                      size={36}
                    />
                    <button className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Close Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Journey Modal (Step 6 Workflow) */}
        {isSubmitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-red-100 shadow-2xl relative">
              <button
                onClick={() => setIsSubmitOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {submissionSuccess ? (
                <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Submission Received for Clinical Review</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for entrusting AETHRIZ with your journey. In adherence with Step 6 of the official Work Guide, your narrative will be reviewed by our clinical board before publication.
                  </p>
                  <p className="text-xs font-mono text-red-600">Reference: ART-REV-2026-X9402</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Step 6 Article Submission Workflow
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      Share Your Healthcare Experience
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">
                      Articles are not published automatically. Each story is reviewed by our medical board before syndication.
                    </p>
                  </div>

                  {/* Policy Alert */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800 leading-relaxed">
                      <strong>Editorial & Ethical Guidelines:</strong> Do not include private medical record numbers or unverified pharmaceutical dosages. All experiences are forwarded to <code>aethriz.ai@gmail.com</code> for clinical review.
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Title of Your Journey *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Navigating Quadruple Bypass Surgery at 38"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="icu">ICU Survival</option>
                          <option value="surgery">Surgery Experience</option>
                          <option value="recovery">Illness Recovery</option>
                          <option value="near-death">Near-Death Experience</option>
                          <option value="chronic">Living with Chronic Illness</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Author Full Name or Pseudonym *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Marcus Vance or Anonymous Survivor"
                          value={formData.authorName}
                          onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Contact Email (For Editorial Verification) *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. marcus@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Treating Institution / Clinician (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. AIIMS Cuttack / Dr. Sarah Lin"
                          value={formData.hospitalOrDoctor}
                          onChange={(e) => setFormData({ ...formData, hospitalOrDoctor: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Story / Healthcare Experience *
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Detail your symptoms, clinical turning points, emotions, and what medical or lifestyle innovations contributed to your recovery..."
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="flex items-start gap-2.5 pt-2">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        checked={formData.consentGiven}
                        onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                        className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 mt-0.5"
                      />
                      <label htmlFor="consent" className="text-xs text-slate-600">
                        I confirm that this experience is authentic and give consent to AETHRIZ AI Healthcare And Advanced Research Private Limited to review and syndicate this piece.
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsSubmitOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-sm shadow-md shadow-red-600/20 hover:shadow-red-600/30 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Submit for Editorial Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
