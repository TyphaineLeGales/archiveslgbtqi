import React from "react";
import CustomImage from "../custom-image";

type SingleImageProps = {
  imageUrl: string;
  imageTitle: string;
};

export default function SingleImage({
  imageUrl,
  imageTitle,
}: SingleImageProps) {
  return <CustomImage imageUrl={imageUrl} title={imageTitle} />;
}
