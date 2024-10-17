/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

type SingleImageProps = {
  imageUrl: string;
  imageTitle: string;
  credits: string;
};

export default function SingleImage({
  imageUrl,
  imageTitle,
  credits,
}: SingleImageProps) {
  return (
    <div>
      <img src={imageUrl} alt={imageTitle} width="1920" height="1080" />
      <p className="mt-[.4rem] pr-[3rem] font-jetbrains text-[.65rem] font-light leading-[.7rem]">
        {credits}
      </p>
    </div>
  );
}
