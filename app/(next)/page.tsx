import { HomepageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";
import {
  HeroCarousel,
  SecondSection,
  IntroTextAndNewsLetter,
  UpcomingEvents,
  CTAmarquee,
} from "./components/homepage";

export default async function Page() {
  const [homePage] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  console.log("Homepage: ", homePage);

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
