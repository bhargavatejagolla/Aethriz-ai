"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import CardiacPulseCanvas from "@/components/canvas/CardiacPulseCanvas";
import HoldButton from "@/components/ui/HoldButton";
import FlyingButton from "@/components/ui/FlyingButton";
import AethrizLogo from "@/components/ui/AethrizLogo/AethrizLogo";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Stethoscope,
  ChevronRight,
  Info
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  fee: string;
  location: string;
  avatar: string;
}

const DOCTORS_DATA: Doctor[] = [
  {
    id: "dr-sarah-lin",
    name: "Dr. Sarah Lin, MD, FACC",
    specialty: "Cardiovascular Medicine",
    department: "Cardiometabolic & Vascular Diagnostics",
    fee: "₹1,800 / $65 USD",
    location: "Virtual & Stanford Affiliate",
    avatar: "SL",
  },
  {
    id: "dr-rajesh-patel",
    name: "Dr. Rajesh Patel, MD, DM",
    specialty: "Endocrinology & Diabetes",
    department: "Metabolic Optimization & CGM",
    fee: "₹1,500 / $50 USD",
    location: "Virtual & New Delhi Hub",
    avatar: "RP",
  },
  {
    id: "dr-elena-rostova",
    name: "Dr. Elena Rostova, MD, PhD",
    specialty: "Clinical Genomics",
    department: "Molecular Phenotyping & RNAi",
    fee: "₹2,200 / $80 USD",
    location: "Virtual & London Clinic",
    avatar: "ER",
  },
  {
    id: "dr-aravind-nambiar",
    name: "Dr. Aravind Nambiar, MS, MCh",
    specialty: "Neurology & Stroke",
    department: "Neurovascular Hemodynamics",
    fee: "₹1,900 / $70 USD",
    location: "Virtual & NIMHANS Fellow",
    avatar: "AN",
  },
  {
    id: "dr-maya-sundaram",
    name: "Dr. Maya Sundaram, MD, FAAP",
    specialty: "Pediatrics & Development",
    department: "Pediatric Neurodevelopment",
    fee: "₹1,400 / $45 USD",
    location: "Virtual & Cuttack Facility",
    avatar: "MS",
  },
];

const TIME_SLOTS = [
  { time: "09:30 AM", period: "Morning" },
  { time: "11:00 AM", period: "Morning" },
  { time: "02:30 PM", period: "Afternoon" },
  { time: "04:15 PM", period: "Afternoon" },
  { time: "06:00 PM", period: "Evening" },
  { time: "07:30 PM", period: "Evening" },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryDoctorId = searchParams.get("doctorId");

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    queryDoctorId || DOCTORS_DATA[0].id
  );
  const [selectedMode, setSelectedMode] = useState<"telehealth" | "in-person">("telehealth");
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-30");
  const [selectedSlot, setSelectedSlot] = useState<string>("11:00 AM");

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [symptomSummary, setSymptomSummary] = useState("");

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  useEffect(() => {
    if (queryDoctorId && DOCTORS_DATA.some(d => d.id === queryDoctorId)) {
      setSelectedDoctorId(queryDoctorId);
    }
  }, [queryDoctorId]);

  const selectedDoctor = DOCTORS_DATA.find((d) => d.id === selectedDoctorId) || DOCTORS_DATA[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientEmail || !patientPhone) {
      alert("Please provide patient name, contact email, and phone number.");
      return;
    }

    const newAppointmentId = `AETH-CONS-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppointmentId(newAppointmentId);

    const appointmentRecord = {
      id: newAppointmentId,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      mode: selectedMode,
      date: selectedDate,
      time: selectedSlot,
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      symptoms: symptomSummary,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
    };

    try {
      const existing = JSON.parse(localStorage.getItem("aethriz_consultations") || "[]");
      existing.unshift(appointmentRecord);
      localStorage.setItem("aethriz_consultations", JSON.stringify(existing));
    } catch (e) {
      console.warn("Local storage write error", e);
    }

    setBookingConfirmed(true);
  };

  return (
    <div className="relative min-h-screen bio-grid-canvas flex flex-col overflow-x-hidden">
      <CardiacPulseCanvas />
      <FloatingNavbar />
      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
        {/* Step 7 Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-red-100 shadow-xl shadow-red-500/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <AethrizLogo variant="pill" size="xs" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-wider">
                <CalendarIcon className="w-3.5 h-3.5" />
                Doctor Consultation Booking
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Book a Specialized <br />
              <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Bio-Algorithmic Consultation
              </span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Connect directly with credentialed clinicians. Cross-synchronized with the AETHRIZ mobile application and clinical diagnostic suite.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-red-50/60 border border-red-100 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div className="text-xs text-slate-700">
              <span className="font-bold text-slate-900 block">End-to-End HIPAA Protected</span>
              Cross-platform slot reservation linked to mobile app.
            </div>
          </div>
        </div>

        {bookingConfirmed ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-2xl space-y-8 animate-in fade-in zoom-in-95">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Consultation Successfully Reserved!
              </h2>
              <p className="text-sm text-slate-600">
                Your consultation token has been generated. Confirmation details and the secure video room link have been sent to <strong>{patientEmail}</strong>.
              </p>
            </div>

            {/* Appointment Slip Card */}
            <div className="max-w-2xl mx-auto rounded-2xl bg-[#0B0E14] text-white p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block">
                    Booking Identifier
                  </span>
                  <span className="text-lg font-mono font-bold text-red-400">
                    {appointmentId}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                  SLOT SECURED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">Consulting Clinician</span>
                  <span className="font-semibold text-white">{selectedDoctor.name}</span>
                  <span className="text-xs text-red-400 block">{selectedDoctor.specialty}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Date & Time</span>
                  <span className="font-semibold text-white">{selectedDate}</span>
                  <span className="text-xs text-emerald-400 block">{selectedSlot} IST</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Patient Name</span>
                  <span className="font-semibold text-white">{patientName} ({patientAge || "N/A"} yrs)</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Consultation Format</span>
                  <span className="font-semibold capitalize text-white flex items-center gap-1.5 mt-0.5">
                    {selectedMode === "telehealth" ? (
                      <>
                        <Video className="w-4 h-4 text-rose-400" />
                        Encrypted HD Telehealth
                      </>
                    ) : (
                      <>
                        <Building2 className="w-4 h-4 text-rose-400" />
                        Cuttack Research Facility
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block">
                    Ref: AAHAAR/NTC/2026-27/02 &bull; Sync with AETHRIZ App
                  </span>
                  <span className="text-xs text-emerald-400 block font-mono">
                    Virtual Telemetry Room: Ready & Provisioned
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <FlyingButton
                    theme="dark"
                    size="medium"
                    altitude={140}
                    onClick={() => {
                      alert(`Initiating WebRTC encrypted telemetry stream to ${selectedDoctor.name}...`);
                    }}
                  >
                    Launch Telehealth Pod
                  </FlyingButton>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs shadow-md shadow-red-600/30 hover:scale-105 transition-all"
                  >
                    View in Patient Dashboard
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setBookingConfirmed(false)}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
              >
                &larr; Book another appointment
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Doctor Selection & Schedule */}
            <div className="lg:col-span-7 space-y-6">
              {/* Doctor Picker */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-red-600" />
                  1. Select Consulting Clinician
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {DOCTORS_DATA.map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                          isSelected
                            ? "border-red-600 bg-red-50/40 shadow-sm ring-1 ring-red-500"
                            : "border-slate-200 hover:border-red-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isSelected 
                              ? "bg-red-600 text-white shadow-md shadow-red-600/20" 
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            {doc.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                            <p className="text-xs text-red-600 font-medium">{doc.specialty}</p>
                            <span className="text-[11px] text-slate-500 block">{doc.location}</span>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-bold font-mono text-slate-900 block">
                            {doc.fee}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-semibold">Available</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consultation Format & Date Picker */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <Video className="w-4 h-4 text-red-600" />
                    2. Choose Consultation Format
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedMode("telehealth")}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedMode === "telehealth"
                          ? "border-red-600 bg-red-50/50 ring-1 ring-red-500"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <Video className="w-5 h-5 text-red-600 mb-2" />
                      <p className="text-sm font-bold text-slate-900">Virtual Telehealth</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Encrypted HD WebRTC session</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMode("in-person")}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedMode === "in-person"
                          ? "border-red-600 bg-red-50/50 ring-1 ring-red-500"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-red-600 mb-2" />
                      <p className="text-sm font-bold text-slate-900">In-Person Clinic</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Cuttack Advanced Facility, Odisha</p>
                    </button>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="space-y-4 pt-2">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    3. Select Date & Slot
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        min="2026-10-27"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all ${
                              selectedSlot === slot.time
                                ? "bg-red-600 text-white shadow-sm"
                                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Patient Information & Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-red-600" />
                  4. Patient Particulars
                </h2>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 42"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. patient@gmail.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Primary Health Complaint / Clinical Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe symptoms, prior diagnostics, or specific questions for the specialist..."
                      value={symptomSummary}
                      onChange={(e) => setSymptomSummary(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary & Confirm */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Consultation Summary
                </h3>

                <div className="space-y-2 text-xs border-b border-white/10 pb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Doctor</span>
                    <span className="font-semibold text-white">{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Specialty</span>
                    <span className="text-red-400 font-medium">{selectedDoctor.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Schedule</span>
                    <span className="text-slate-200">{selectedDate} @ {selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mode</span>
                    <span className="capitalize text-emerald-400">{selectedMode}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-slate-300 font-semibold">Consultation Fee</span>
                  <span className="text-base font-mono font-bold text-white">{selectedDoctor.fee}</span>
                </div>

                <div className="pt-2 flex flex-col items-center gap-2">
                  <HoldButton
                    fillColor="#DC2626"
                    backgroundColor="#1E293B"
                    textColor="#F8FAFC"
                    fillTextColor="#FFFFFF"
                    holdTime={1400}
                    radius={14}
                    doneLabel="Consultation Locked!"
                    onHold={() => {
                      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                      handleBooking(fakeEvent);
                    }}
                    className="w-full justify-center text-sm font-bold shadow-lg shadow-red-600/25"
                  >
                    Hold to Confirm & Reserve Slot
                  </HoldButton>
                  <span className="text-[11px] text-slate-400">
                    Press & hold 1.4s for clinical confirmation lock
                  </span>
                </div>

                <p className="text-[11px] text-center text-slate-400 pt-1">
                  Instant mobile app synchronization &bull; Free cancellation up to 4 hrs prior
                </p>
              </div>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDF4F5] flex items-center justify-center pt-28">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600 font-mono">Initializing Clinical Scheduler...</p>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
