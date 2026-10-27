"use client";

import React from "react";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import Footer from "@/components/navigation/Footer";
import ContactSection from "@/components/landing/ContactSection";
import ShapeGrid from "@/components/ui/ShapeGrid";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#FDF4F5] flex flex-col overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Background Architectural Clinic Tile Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <ShapeGrid
          shape="tile"
          direction="diagonal"
          lineColor="rgba(220, 38, 38, 0.08)"
          hoverColor="#DC2626"
          hoverFillColor="#FEE2E2"
          fillOpacity={0.14}
          cellSize={44}
          speed={0.25}
          rainbow={false}
        />
      </div>

      <FloatingNavbar />
      <main className="relative z-10 flex-grow pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
