"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Patient Consultation Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Patient Consultation Inquiry",
        message: "",
      });
    }, 5000);
  };

  return (
    <section id="contact-section" className="py-12 relative z-10 scroll-mt-24">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-red-100 shadow-xl space-y-8">
        <div className="max-w-3xl">
          <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
            HEADQUARTERS & CLINICAL SUPPORT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
            Contact AETHRIZ Healthcare & Advanced Research
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium leading-relaxed">
            Reach out to our clinical engineering team, schedule an institutional demonstration, or inquire about healthcare tenant onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Official Registered Corporate Information */}
          <div className="space-y-6">
            <div className="bg-white/80 p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 font-mono uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Registered Headquarters</span>
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                <strong>Aethriz AI Healthcare And Advanced Research Private Limited</strong><br />
                1st Floor, Jagabandhu Lane, Darkhapatna,<br />
                Cuttack, Odisha - 753013, India
              </p>
              <div className="text-[11px] font-mono text-red-600 font-semibold">
                Ref. No: AAHAAR/NTC/2026-27/02
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/80 p-5 rounded-2xl border border-gray-200 space-y-2 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-gray-900">Direct Telephone</div>
                <a href="tel:+917852982003" className="text-xs font-mono text-red-600 hover:underline block font-semibold">
                  +91 7852982003
                </a>
              </div>

              <div className="bg-white/80 p-5 rounded-2xl border border-gray-200 space-y-2 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-gray-900">Official Email</div>
                <a href="mailto:aethriz.ai@gmail.com" className="text-xs font-mono text-red-600 hover:underline block font-semibold">
                  aethriz.ai@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="text-xs text-gray-700 font-medium">
                <strong>Clinical Support Hours:</strong> Mon &ndash; Sat, 09:00 &ndash; 18:00 IST. Emergency AI telemetry services operate 24/7/365.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Inquiry Transmitted</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto font-medium">
                  Thank you, <strong>{formData.name || "Colleague"}</strong>. Your message has been routed to our clinical coordination desk at <code>aethriz.ai@gmail.com</code>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Sharma"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1 font-mono">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 font-mono">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-1 font-mono">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:bg-white font-medium"
                    >
                      <option>Patient Consultation Inquiry</option>
                      <option>Hospital Tenant Integration</option>
                      <option>Faculty & Doctor Onboarding</option>
                      <option>Clinical Research Trial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1 font-mono">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your clinical enquiry..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 font-sans focus:outline-none focus:border-red-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Headquarters</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
