import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#DC2626",
};

export const metadata: Metadata = {
  title: "AETHRIZ — The Zenith of Bio-Algorithmic Health",
  description: "Next-generation healthcare intelligence platform by Aethriz AI Healthcare And Advanced Research Private Limited. Real-time multi-modal diagnostics, 3D anatomical exploration, and clinical telehealth.",
  icons: {
    icon: [
      { url: "/brand/aethriz-emblem.svg", type: "image/svg+xml" },
      { url: "/brand/aethriz-emblem.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/brand/aethriz-emblem.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
