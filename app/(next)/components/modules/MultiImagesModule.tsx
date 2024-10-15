/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

type Props = {
  item: {
    multiImages: { imageUrl: string; alt: string; credits: string }[];
  };
};

export default function MultiImagesModule({ item }: Props) {
  return (
    <div className="grid grid-flow-row gap-[.5rem] lg:grid-flow-col">
      {item.multiImages?.map(
        (
          image: { imageUrl: string; alt: string; credits: string },
          index: any,
        ) => (
          <div key={index}>
            <img
              src={image.imageUrl}
              alt={image.alt}
              width="960"
              height="540"
              // className="min-h-full object-contain object-left-top"
            />
            <p className="mt-[.4rem] pr-[4rem] font-jetbrains text-[.65rem] font-light leading-[.7rem]">
              {image.credits}
            </p>
          </div>
        ),
      )}
    </div>
  );
}
