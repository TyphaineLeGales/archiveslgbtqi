import { HomepageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";
import { HeroSection, MultiBlocks, Outro, Video } from "./components/ui";
import { StickyMultiBlocks } from "./components/ui/mutli-blocks";

export default async function Page() {
  const [homePage] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  console.log("Homepage: ", homePage);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroSection heroes={homePage} />
      {/* <MultiBlocks multiBlocks={homePage} /> */}
      <StickyMultiBlocks multiBlocks={homePage} />
      <Video video={homePage} />
      <Outro outro={homePage} />
    </div>
  );
}
