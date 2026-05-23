"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="hidden h-9 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800 md:block" />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white md:inline"
      >
        Sign in
      </Link>
    );
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <>
      {isAdmin && (
        <Link
          href="/admin"
          className="hidden text-sm font-medium text-teal-600 transition hover:text-teal-500 dark:text-teal-400 md:inline"
        >
          Admin
        </Link>
      )}
      <Link
        href={isAdmin ? "/admin" : "/login"}
        className="hidden max-w-[140px] truncate text-sm text-slate-500 md:inline"
        title={session.user.email ?? undefined}
      >
        {session.user.name ?? session.user.email}
      </Link>
    </>
  );
}
