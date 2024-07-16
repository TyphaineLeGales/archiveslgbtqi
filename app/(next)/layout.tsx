import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import { BannerAlert, ToastProviders } from "./components/ui";

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
    <html
      lang="en"
      className={`${inter.variable} bg-white-primary text-black-primary`}
    >
      <body>
        <section className="relative flex min-h-screen w-screen flex-grow flex-col overflow-hidden">
          {draftMode().isEnabled && <BannerAlert />}
          <Header />
          <main className="mt-[5rem]">
            <ToastProviders>{children}</ToastProviders>
          </main>
          <Footer />
        </section>
        {draftMode().isEnabled && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
