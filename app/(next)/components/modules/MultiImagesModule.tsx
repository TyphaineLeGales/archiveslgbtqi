import React from "react";
import CustomImage from "../custom-image";

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
          <CustomImage
            key={`multi-image-${index}`}
            imageUrl={image.imageUrl}
            title={image.alt}
          />
        ),
      )}
    </div>
  );
}
