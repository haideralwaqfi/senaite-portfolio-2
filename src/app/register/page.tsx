import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = {
  title: "Register | SENAITE Portfolio",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
        >
          ← Back to portfolio
        </Link>
        <Suspense fallback={<p className="text-center text-slate-500">Loading…</p>}>
          <AuthForm mode="register" />
        </Suspense>
      </div>
    </main>
  );
}
