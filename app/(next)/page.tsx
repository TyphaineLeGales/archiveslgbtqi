import { Metadata } from "next";

import { HomepageQueryResult, SettingsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery, settingsQuery } from "@/sanity/lib/queries";

import {
  HeroCarousel,
  SecondSection,
  IntroTextAndNewsLetter,
  UpcomingEvents,
  CTAmarquee,
} from "./components/homepage";

export async function generateMetadata() {
  const [settings] = await Promise.all([
    sanityFetch<SettingsQueryResult>({ query: settingsQuery }),
  ]);
  return {
    title: settings?.globalSettings.siteTitle,
    description: settings?.globalSettings.siteDescription as any,
    openGraph: {
      images: [
        {
          url: settings?.globalSettings.ogImage || "",
          alt: settings?.globalSettings.altText || "",
        },
      ],
    },
  } satisfies Metadata;
}

export default async function Page() {
  const [homePage] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  // console.log("Homepage: ", homePage);

  return (
    <div className="relative min-h-[100vh] overflow-hidden">
      <HeroCarousel heroes={homePage} />
      <SecondSection multiBlocks={homePage} />
      <IntroTextAndNewsLetter intro={homePage} />
      <UpcomingEvents events={homePage} />
      <CTAmarquee marquee={homePage} />
    </div>
  );
}
