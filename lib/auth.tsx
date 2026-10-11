"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Role = "tourist" | "admin";

type Ctx = {
  role: Role;
  isAdmin: boolean;
  signIn: (role: Role) => void;
  signOut: () => void;
};

const AuthContext = createContext<Ctx | null>(null);
const KEY = "ruchi-tour-role";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("tourist");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "admin" || saved === "tourist") setRole(saved);
    } catch {}
  }, []);

  const signIn = (r: Role) => {
    setRole(r);
    try {
      localStorage.setItem(KEY, r);
    } catch {}
  };

  const signOut = () => {
    setRole("tourist");
    try {
      localStorage.removeItem(KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ role, isAdmin: role === "admin", signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
