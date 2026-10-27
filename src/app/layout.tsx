import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "AETHRIZ — The Zenith of Bio-Algorithmic Health",
  description: "Next-generation healthcare intelligence platform by Aethriz AI Healthcare And Advanced Research Private Limited. Real-time multi-modal diagnostics, 3D anatomical exploration, and clinical telehealth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-[#FDF4F5] text-[#111318] antialiased selection:bg-red-600 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
