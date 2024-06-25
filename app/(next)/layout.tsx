import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
// import { AlertBanner } from "./components/ui";
import { ToastProvider } from "./ToastProvider";

import { BannerAlert } from "./components/ui";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen">
          {draftMode().isEnabled && <BannerAlert />}
          <Header />
          <main className="py-[5rem]">
            <ToastProvider>{children}</ToastProvider>
          </main>
          <Footer />
        </section>
        {draftMode().isEnabled && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
