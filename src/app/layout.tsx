import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SENAITE LIMS Consultant | Training, Cloud & Lab Configuration",
  description:
    "Portfolio showcasing SENAITE training, cloud deployment, medical and industrial lab configuration, high-resolution project screenshots, and Shopify integration.",
  openGraph: {
    title: "SENAITE LIMS Consultant",
    description:
      "Training, cloud deployment, and lab configuration for medical and industrial laboratories.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} h-full scroll-smooth`}
      suppressHydrationWarning>
      <body
        className="min-h-full bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100"
        suppressHydrationWarning>
        <AuthSessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
