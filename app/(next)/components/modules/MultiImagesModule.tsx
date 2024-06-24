import React from "react";
import Image from "next/image";

type Props = {
  item: {
    multiImages: { imageUrl: string; alt: string }[];
  };
};

export default function MultiImagesModule({ item }: Props) {
  return (
    <div className="grid grid-flow-row gap-[.5rem] lg:grid-flow-col">
      {item.multiImages?.map(
        (image: { imageUrl: string; alt: string }, index: any) => (
          <Image
            key={index}
            src={image.imageUrl}
            alt={image.alt}
            width="960"
            height="540"
          />
        ),
      )}
    </div>
  );
}
