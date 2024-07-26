import React, { useRef } from "react";

import Link from "next/link";
import Image from "next/image";

import { HomepageQueryResult } from "@/sanity.types";

type Props = {
  multiBlocks: HomepageQueryResult;
};

type ScrollButtonProps = {
  to: string;
  targetId: string;
  children: React.ReactNode;
  className?: string;
};

// TODO: Scroll Button
const ScrollButton = ({
  to,
  targetId,
  children,
  className,
}: ScrollButtonProps) => {
  return (
    <Link href={`${to}#${targetId}`} passHref className={className}>
      {children}
    </Link>
  );
};

export default function SecondBlock({ multiBlocks }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="mx-auto grid min-h-full max-w-[1440px] grid-cols-1 place-content-center place-items-center gap-[5rem] px-[1rem] py-[4rem] lg:grid-cols-2 lg:px-[3rem]"
    >
      {multiBlocks?.secondPart?.map((block, index) => {
        return (
          <>
            {block.cta?.ctaScrollTo ? (
              <ScrollButton
                to={block.cta?.ctaLink?.slug || ""}
                targetId={block.cta?.ctaScrollTo || ""}
                key={block._key}
                className="group relative flex aspect-square h-max max-h-[80rem] w-full flex-col lg:max-h-[50rem] lg:max-w-[50rem]"
              >
                <div className="relative min-h-[75%] min-w-full">
                  <Image
                    src={block.image?.imageUrl || ""}
                    alt={block.image?.alt || ""}
                    width={300}
                    height={300}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 z-0 h-full w-full bg-black bg-opacity-40 transition-opacity duration-300 ease-tamisitée group-hover:opacity-0" />
                  <div className="] absolute bottom-[1rem] left-[1rem]">
                    <h2 className="heroTitle group-hover:mix-blend-difference">
                      {block.title}
                    </h2>
                  </div>
                </div>
                <div className="relative flex min-h-[25%] flex-col items-end justify-start text-white">
                  <div className="flex-1 bg-black p-[1rem] pb-[2rem]">
                    <p className="heroParagraph">{block.paragraph}</p>
                  </div>
                  <div className="heroCta heroButtonTransition absolute bottom-0 right-0 z-10 translate-y-[99%] bg-black px-[1.25rem] pb-[.75rem]">
                    {block.cta?.ctaLabel} [+]
                  </div>
                </div>
              </ScrollButton>
            ) : (
              <Link
                key={block._key}
                href={block.cta?.ctaLink?.slug || ""}
                className="group relative flex aspect-square h-max max-h-[80rem] w-full flex-col lg:max-h-[50rem] lg:max-w-[50rem]"
              >
                <div className="relative min-h-[75%] min-w-full">
                  <Image
                    src={block.image?.imageUrl || ""}
                    alt={block.image?.alt || ""}
                    width={300}
                    height={300}
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 z-0 h-full w-full bg-black bg-opacity-40 transition-opacity duration-300 ease-tamisitée group-hover:opacity-0" />
                  <div className="] absolute bottom-[1rem] left-[1rem]">
                    <h2 className="heroTitle group-hover:mix-blend-difference">
                      {block.title}
                    </h2>
                  </div>
                </div>
                <div className="relative flex min-h-[25%] flex-col items-end justify-start text-white">
                  <div className="flex-1 bg-black p-[1rem] pb-[2rem]">
                    <p className="heroParagraph">{block.paragraph}</p>
                  </div>
                  <div className="heroCta heroButtonTransition absolute bottom-0 right-0 z-10 translate-y-[99%] bg-black px-[1.25rem] pb-[.75rem]">
                    {block.cta?.ctaLabel} [+]
                  </div>
                </div>
              </Link>
            )}
          </>
        );
      })}
    </div>
  );
}
