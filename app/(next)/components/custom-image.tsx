import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  imageUrl: string;
};

export default function CustomImage({ imageUrl, title }: Props) {
  return <Image src={imageUrl} alt={title} width="960" height="540" />;
}
