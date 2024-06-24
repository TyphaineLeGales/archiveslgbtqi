import React from "react";
import Image from "next/image";

type SingleImageProps = {
  imageUrl: string;
  imageTitle: string;
};

export default function SingleImage({
  imageUrl,
  imageTitle,
}: SingleImageProps) {
  return <Image src={imageUrl} alt={imageTitle} width="1920" height="1080" />;
}
