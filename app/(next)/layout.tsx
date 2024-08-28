import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity";

import { draftMode } from "next/headers";
import { Suspense } from "react";

import localFont from "next/font/local";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BannerAlert, ToastProviders } from "./components/ui";
import { IntroAnimation } from "./components/ui/IntroAnimation";
import CookieBanner from "./components/ui/CookieBanner";
import { CTAmarquee } from "./components/homepage";

const cityBurn = localFont({
  src: "./fonts/cityburn/cityburn.ttf",
  variable: "--font-cityburn",
});

const jetBrains = localFont({
  variable: "--font-jetbrains",
  src: [
    {
      path: "./fonts/jet-brains/jetbrains-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/jet-brains/jetbrains-medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/jet-brains/jetbrains-mediumitalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/jet-brains/jetbrains-extrabold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const tanker = localFont({
  variable: "--font-tanker",
  display: "swap",
  src: "./fonts/tanker/tanker.otf",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${cityBurn.variable} ${jetBrains.variable} ${tanker.variable} bg-white`}
    >
      <body>
        <section className="flex min-h-screen flex-grow flex-col">
          {draftMode().isEnabled && <BannerAlert />}
          <IntroAnimation />
          <Header />
          <main id="main-content">
            <ToastProviders>{children}</ToastProviders>
          </main>
          <Suspense>
            <Footer />
          </Suspense>
          <CookieBanner />
        </section>
        {draftMode().isEnabled && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
