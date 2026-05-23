import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminPortfolioManager } from "@/components/AdminPortfolioManager";

export const metadata = {
  title: "Admin | SENAITE Portfolio",
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">
          ← Back to portfolio
        </Link>

        <header className="rounded-2xl border border-teal-500/30 bg-linear-to-br from-teal-50 to-slate-100 p-8 dark:from-teal-950/50 dark:to-slate-900 dark:border-teal-500/20">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
            Admin area
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Welcome, {session.user.name ?? session.user.email}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            You have administrator access. Use this space for exclusive features
            such as managing portfolio screenshots, client notes, or Shopify
            integration settings.
          </p>
        </header>

        <section className="mt-8">
          <AdminPortfolioManager />
        </section>

        <section className="mt-8 flex flex-wrap gap-4">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}>
            <button
              type="submit"
              className="rounded-full border border-slate-300 px-6 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/5">
              Sign out
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
