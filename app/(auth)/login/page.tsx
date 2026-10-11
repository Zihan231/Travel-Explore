import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage({ searchParams }: { searchParams: { role?: string } }) {
  return <AuthForm mode="login" role={searchParams.role === "admin" ? "admin" : "tourist"} />;
}
