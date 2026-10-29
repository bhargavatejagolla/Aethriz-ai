"use client";

import React, { useState } from "react";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import CardiacPulseCanvas from "@/components/canvas/CardiacPulseCanvas";
import GlareHover from "@/components/ui/GlareHover";
import SpotlightCard from "@/components/ui/SpotlightCard";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { 
  Stethoscope, 
  Star, 
  Calendar, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Award, 
  Video, 
  ShieldCheck, 
  BookOpen, 
  X, 
  ArrowRight,
  ExternalLink
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  affiliation: string;
  license: string;
  experience: string;
  rating: string;
  reviews: number;
  location: string;
  bio: string;
  avatar: string;
  available: string;
  boardCert: string;
  publications: number;
  consultationFee: string;
}

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [inspectDoctor, setInspectDoctor] = useState<Doctor | null>(null);

  const specialties = [
    "All Specialties",
    "Cardiovascular Medicine",
    "Endocrinology & Diabetes",
    "Clinical Genomics",
    "Neurology & Stroke",
    "Preventive Health",
  ];

  const doctors: Doctor[] = [
    {
      id: "dr-sarah-lin",
      name: "Dr. Sarah Lin, MD, FACC",
      specialty: "Cardiovascular Medicine",
      affiliation: "Associate Professor, Stanford Medicine Clinical Affiliate",
      license: "NPI: 1849204918",
      experience: "16+ Years Experience",
      rating: "4.96",
      reviews: 312,
      location: "San Francisco / Virtual Clinic",
      bio: "Specializes in early subclinical coronary plaque identification, multi-modal imaging, and ApoB lipid optimization.",
      avatar: "SL",
      available: "Today &bull; 10:30 AM Slot Ready",
      boardCert: "American Board of Internal Medicine (Cardiovascular Disease)",
      publications: 28,
      consultationFee: "₹1,800 / $65 USD",
    },
    {
      id: "dr-rajesh-patel",
      name: "Dr. Rajesh Patel, MD, DM",
      specialty: "Endocrinology & Diabetes",
      affiliation: "Senior Consultant, Apollo Hospitals & AIIMS Fellow",
      license: "MCI: 4920194",
      experience: "19+ Years Experience",
      rating: "4.94",
      reviews: 428,
      location: "New Delhi / Telehealth India",
      bio: "Pioneer in continuous glucose monitoring (CGM) analytics and personalized multi-omics metabolic reversal.",
      avatar: "RP",
      available: "Tomorrow &bull; 02:00 PM Slot Ready",
      boardCert: "National Board of Examinations (Endocrinology & Metabolism)",
      publications: 34,
      consultationFee: "₹1,500 / $50 USD",
    },
    {
      id: "dr-elena-rostova",
      name: "Dr. Elena Rostova, MD, PhD",
      specialty: "Clinical Genomics",
      affiliation: "Director of Molecular Phenotyping, Charité Affiliate",
      license: "GMC: 7891042",
      experience: "14+ Years Experience",
      rating: "4.98",
      reviews: 215,
      location: "London / Global Virtual",
      bio: "Focuses on familial hypercholesterolemia gene variants (PCSK9, LDLR, APOE-e4) and targeted RNAi therapeutics.",
      avatar: "ER",
      available: "Thursday &bull; 11:15 AM Slot Ready",
      boardCert: "European Board of Medical Genetics & Molecular Medicine",
      publications: 42,
      consultationFee: "₹2,200 / $80 USD",
    },
    {
      id: "dr-aravind-nambiar",
      name: "Dr. Aravind Nambiar, MS, MCh",
      specialty: "Neurology & Stroke",
      affiliation: "Professor of Neurovascular Health, NIMHANS Senior Faculty",
      license: "MCI: 3829104",
      experience: "22+ Years Experience",
      rating: "4.92",
      reviews: 380,
      location: "Bengaluru / Virtual Hub",
      bio: "Leader in ambulatory EEG arrhythmia detection, stroke prevention, and microvascular cognitive preservation.",
      avatar: "AN",
      available: "Friday &bull; 04:30 PM Slot Ready",
      boardCert: "Royal College of Physicians & Surgeons / NIMHANS Faculty",
      publications: 51,
      consultationFee: "₹1,900 / $70 USD",
    },
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.affiliation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec =
      selectedSpecialty === "All Specialties" || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <CardiacPulseCanvas />
      <FloatingNavbar />

      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-red-100 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <AethrizLogo variant="pill" size="xs" />
              <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                STEP 1 &bull; DOCTOR DIRECTORY
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED MEDICAL CREDENTIALS
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
              Board-Certified Medical Faculty Directory
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium leading-relaxed">
              Explore leading cardiovascular, metabolic, and genomic specialists affiliated with AETHRIZ AI. Verified credentials, clinical departments, and integrated telehealth scheduling.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 pt-2">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by physician name, hospital affiliation, specialty, or condition..."
                className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-2xs"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSpecialty === spec
                      ? "bg-red-600 text-white shadow-sm shadow-red-500/20"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDoctors.map((doc) => (
            <GlareHover
              key={doc.id}
              width="100%"
              height="100%"
              borderRadius="24px"
              glareColor="#DC2626"
              glareOpacity={0.16}
              variant="streak"
              rimGlint={true}
              className="w-full h-full block"
            >
              <SpotlightCard
                theme="light"
                spotlightColor="rgba(220, 38, 38, 0.16)"
                intensity={0.3}
                spotlightSize={280}
                softness={0.75}
                borderGlow={0.8}
                proximity={90}
                className="w-full h-full p-6 sm:p-7 rounded-3xl border border-red-100/80 shadow-sm transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-red-500/20 flex-shrink-0">
                        {doc.avatar}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-gray-900 hover:text-red-600 transition-colors">
                          {doc.name}
                        </h2>
                        <p className="text-xs font-bold text-red-600 font-sans">
                          {doc.specialty}
                        </p>
                        <span className="text-[11px] font-mono text-gray-500 block">
                          {doc.license} &bull; {doc.experience}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-amber-800 text-xs font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {doc.bio}
                  </p>

                  <div className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100 flex items-center justify-between text-[11px] text-gray-700 font-medium">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{doc.location}</span>
                    </div>
                    <span className="font-mono font-bold text-gray-900 shrink-0">{doc.consultationFee}</span>
                  </div>
                </div>

                {/* Actions & Availability */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-emerald-700 font-semibold font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span dangerouslySetInnerHTML={{ __html: doc.available }} />
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInspectDoctor(doc)}
                      className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Credentials
                    </button>
                    <Link
                      href={`/booking?doctorId=${doc.id}`}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-500/20 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </GlareHover>
          ))}
        </div>

        {/* Credentials Inspection Modal */}
        {inspectDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-5 relative">
              <button
                onClick={() => setInspectDoctor(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-red-600/20">
                  {inspectDoctor.avatar}
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">{inspectDoctor.name}</h3>
                  <span className="text-xs text-red-600 font-bold">{inspectDoctor.specialty}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 space-y-1">
                  <span className="text-[10px] text-gray-500 font-sans block">BOARD CERTIFICATION</span>
                  <span className="text-gray-900 font-bold block">{inspectDoctor.boardCert}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 space-y-1">
                  <span className="text-[10px] text-gray-500 font-sans block">PRIMARY INSTITUTIONAL AFFILIATION</span>
                  <span className="text-gray-900 font-bold block">{inspectDoctor.affiliation}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-sans block">LICENSE NUMBER</span>
                    <span className="text-red-700 font-bold">{inspectDoctor.license}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-sans block">PEER PUBLICATIONS</span>
                    <span className="text-emerald-700 font-bold">{inspectDoctor.publications} PubMed Articles</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <span className="text-xs text-gray-500 font-mono">Verified by AETHRIZ Committee</span>
                <Link
                  href={`/booking?doctorId=${inspectDoctor.id}`}
                  onClick={() => setInspectDoctor(null)}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md shadow-red-600/20 hover:bg-red-500 transition-all flex items-center gap-1.5"
                >
                  <span>Book with {inspectDoctor.name.split(" ")[1]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
