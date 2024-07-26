import { HomepageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";
import {
  HeroSection,
  IntroductionText,
  SecondBlock,
  Video,
} from "./components/ui";
import { UpcomingEvents } from "./components/homepage";

export default async function Page() {
  const [homePage] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  console.log("Homepage: ", homePage);

  return (
    <div className="relative min-h-[100vh] overflow-hidden">
      <HeroSection heroes={homePage} />
      <SecondBlock multiBlocks={homePage} />
      <IntroductionText intro={homePage} />
      {/* <UpcomingEvents events={homePage} /> */}
      {/* <Video video={homePage} /> */}
    </div>
  );
}
