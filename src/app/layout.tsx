import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/data/site";
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
  metadataBase: new URL(site.url),
  title:
    "Haider Alwaqfi | SENAITE LIMS Consultant for Lab Deployment & Training",
  description: site.description,
  applicationName: "Haider Alwaqfi SENAITE LIMS Portfolio",
  authors: [{ name: site.owner, url: site.linkedin }],
  creator: site.owner,
  publisher: site.owner,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "SENAITE LIMS",
    "senaitelims",
    "SENAITE consultant",
    "SENAITE LIMS consultant",
    "LIMS consultant",
    "laboratory information management system",
    "medical lab LIMS",
    "industrial lab LIMS",
    "SENAITE training",
    "SENAITE cloud deployment",
    "SENAITE configuration",
    "Haider Alwaqfi",
  ],
  openGraph: {
    title: "Haider Alwaqfi | SENAITE LIMS Consultant",
    description: site.description,
    url: site.url,
    siteName: "Haider Alwaqfi SENAITE LIMS Consultant",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haider Alwaqfi | SENAITE LIMS Consultant",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
