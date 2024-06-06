/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  imageUrl: string;
  title: string;
};

export default function CustomImage({ imageUrl, title }: Props) {
  return (
    <div>
      <img src={imageUrl} alt={title} width="100%" height="auto" />
    </div>
  );
}
