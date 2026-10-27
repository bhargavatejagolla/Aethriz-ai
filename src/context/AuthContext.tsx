"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserProfile, UserRole } from "@/types/auth";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const MOCK_PROFILES: Record<UserRole, UserProfile> = {
  patient: {
    id: "usr-pat-1049",
    email: "marcus.vance@gmail.com",
    fullName: "Marcus Vance",
    role: "patient",
    department: "Cardiometabolic Care Cohort",
  },
  doctor: {
    id: "usr-doc-8942",
    email: "sarah.lin@stanford.edu",
    fullName: "Dr. Sarah Lin, MD, FACC",
    role: "doctor",
    department: "Cardiovascular Medicine",
    licenseNo: "NPI-1849204918",
  },
  nurse: {
    id: "usr-nur-3301",
    email: "ananya.sharma@aethriz.com",
    fullName: "Ananya Sharma, RN, BSN",
    role: "nurse",
    department: "Clinical Triage & Telemetry",
    licenseNo: "MCI-RN-884210",
  },
  admin: {
    id: "usr-adm-0001",
    email: "secops@aethriz.com",
    fullName: "Aethriz SecOps Admin",
    role: "admin",
    department: "Platform Governance & Compliance",
  },
};

export function getRoleRedirectPath(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "doctor":
      return "/doctor-portal";
    case "nurse":
      return "/nurse-queue";
    case "patient":
    default:
      return "/dashboard";
  }
}

export function detectRoleFromCredentials(email: string): UserRole {
  const clean = (email || "").trim().toLowerCase();

  // 1. Check if user is in registered profiles storage
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("aethriz_registered_users");
      if (stored) {
        const users = JSON.parse(stored);
        const match = users.find((u: any) => (u.email || "").toLowerCase() === clean);
        if (match && match.role) return match.role as UserRole;
      }
    }
  } catch {
    // storage error
  }

  // 2. Intelligent clinical domain & credential pattern matching
  if (
    clean.includes("doctor") ||
    clean.includes("dr.") ||
    clean.includes("sarah.lin") ||
    clean.includes("stanford.edu") ||
    clean.includes("aiims.edu") ||
    clean.includes("oxford.ac.uk") ||
    clean.includes("apollo") ||
    clean.includes("cardio") ||
    clean.includes("physician")
  ) {
    return "doctor";
  }

  if (
    clean.includes("nurse") ||
    clean.includes("ananya") ||
    clean.includes("triage") ||
    clean.includes("icu") ||
    clean.includes("staff")
  ) {
    return "nurse";
  }

  if (
    clean.includes("admin") ||
    clean.includes("secops") ||
    clean.includes("governance") ||
    clean.includes("compliance") ||
    clean.includes("root@")
  ) {
    return "admin";
  }

  // 3. Default to patient member
  return "patient";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // 1. If Supabase is active, listen to session changes
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          fetchSupabaseProfile(session.user.id, session.user.email || "");
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          fetchSupabaseProfile(session.user.id, session.user.email || "");
        } else {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }

    // 2. Fallback to local storage persistence for dev/demo mode
    try {
      const stored = localStorage.getItem("aethriz_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // storage error
    }
  }, []);

  const fetchSupabaseProfile = async (userId: string, email: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        setUser({
          id: data.id,
          email: data.email || email,
          fullName: data.full_name || email.split("@")[0],
          role: (data.role as UserRole) || "patient",
          department: data.department,
          licenseNo: data.license_no,
        });
      }
    } catch (err) {
      console.warn("Could not fetch Supabase profile", err);
    }
  };

  const loginWithSupabase = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) {
      return { success: false, error: "Supabase credentials not configured in .env.local" };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (data.user) {
      await fetchSupabaseProfile(data.user.id, data.user.email || email);
      return { success: true };
    }
    return { success: false, error: "Authentication failed" };
  };

  const login = (role: UserRole, email?: string) => {
    const profile = { ...MOCK_PROFILES[role] };
    if (email) profile.email = email;
    setUser(profile);
    try {
      localStorage.setItem("aethriz_auth_user", JSON.stringify(profile));
    } catch {
      // storage unavailable
    }
  };

  const registerUser = (profile: UserProfile) => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("aethriz_registered_users");
        const list = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((u: any) => u.email.toLowerCase() !== profile.email.toLowerCase());
        filtered.push(profile);
        localStorage.setItem("aethriz_registered_users", JSON.stringify(filtered));
        localStorage.setItem("aethriz_auth_user", JSON.stringify(profile));
      }
    } catch {
      // storage unavailable
    }
    setUser(profile);
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    try {
      localStorage.removeItem("aethriz_auth_user");
    } catch {
      // storage unavailable
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        isSupabaseActive: isSupabaseConfigured,
        login,
        loginWithSupabase,
        logout,
        getRoleRedirectPath,
        detectRoleFromCredentials,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
