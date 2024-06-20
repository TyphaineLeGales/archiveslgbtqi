import { HomepageQueryResult } from "@/sanity.types";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery, pagesContentQuery } from "@/sanity/lib/queries";
import Hero from "./components/hero";
import Link from "next/link";
import homepage from "@/sanity/schemas/singletons/homepage";
import Image from "next/image";
import { useEffect } from "react";
import Lenis from "lenis";

export default async function Page() {
  const [homePage] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  return (
    <div className="relative min-h-screen pb-[100vh]">
      <Hero heroes={homePage} />
      <div>
        Ut ipsum enim officia cupidatat aliquip deserunt officia duis
        consectetur aute. Elit eiusmod pariatur anim adipisicing aliquip aute
        enim aliqua ad ullamco. Eiusmod esse est et cillum aliquip sit esse eu
        irure non do consequat reprehenderit exercitation elit. Adipisicing est
        dolore laboris magna eu in aliquip veniam velit amet quis fugiat
        nostrud. Nostrud proident in irure. Consequat nulla qui incididunt
        cupidatat sit ad ea cupidatat voluptate nulla duis excepteur. Duis sint
        do sit. Reprehenderit Lorem minim magna. Ad culpa tempor consequat culpa
        amet esse. Et est consequat laboris nostrud ad labore eu dolor. Fugiat
        aliqua culpa eu quis adipisicing fugiat sint labore. Labore
        reprehenderit Lorem do ex enim. Aliquip eu minim consequat elit Lorem
        aliqua occaecat et anim velit in consectetur. Velit laborum exercitation
        sit ea non. Deserunt exercitation duis et excepteur ex dolore irure
        cupidatat veniam sit fugiat sunt non ex et. Proident Lorem mollit magna
        qui aute est. Irure deserunt consequat fugiat nostrud commodo. Veniam
        incididunt eiusmod minim do commodo irure irure do sint ex Lorem
        exercitation reprehenderit laborum nostrud. Eu incididunt incididunt
        anim nisi occaecat adipisicing aute id sint velit irure ad non ad.
        Commodo tempor excepteur nulla qui et aliqua laborum et. Et duis non
        consequat. Pariatur do nisi aute nulla veniam pariatur. Proident quis
        eiusmod eiusmod culpa proident dolore consectetur enim consequat mollit
        officia ea. Dolor mollit duis non qui commodo culpa consectetur
        consequat Lorem consequat duis esse ut labore sit. Cupidatat ad tempor
        aliqua exercitation in dolor magna laborum consectetur aliquip. Esse
        ipsum quis quis commodo aliqua deserunt cillum duis Lorem tempor ipsum
        amet id ad sint.
      </div>
    </div>
  );
}
