"use client";
import React, { useState } from "react";

import Image from "next/image";

import clsx from "clsx";

export type ButtonImageProps = {
  event: {
    image: {
      imageUrl: string;
      alt: string;
    };
  };
  status?: string;
};

export default function ButtonImage({ event, status }: ButtonImageProps) {
  const imageContainerRef = React.useRef<HTMLImageElement>(null);

  const [isImageClicked, setIsImageClicked] = React.useState(false);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);

    if (isImageClicked) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseClick = () => {
    setIsImageClicked(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        ref={imageContainerRef}
        className={clsx(
          "fixed inset-0 z-50 flex items-center justify-center bg-white p-[1rem] lg:p-[5rem]",
          isImageClicked ? "block" : "hidden",
        )}
      >
        <button
          aria-label="Fermer l'image"
          onClick={handleCloseClick}
          className="absolute right-[1rem] top-[1rem] font-tanker text-black"
        >
          <span>close</span>
        </button>
        <Image
          src={event.image?.imageUrl || ""}
          alt={event.image?.alt || ""}
          width={2000}
          height={2000}
          priority
          className="h-full w-full object-contain"
        />
      </div>
      <button
        aria-label="Voir l'image en grand"
        onClick={handleImageClick}
        className="group relative"
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-[background] duration-300 group-hover:bg-opacity-20"></div>
        <Image
          src={event.image?.imageUrl || ""}
          alt={event.image?.alt || ""}
          width={450}
          height={400}
          className={clsx(
            "object-contain lg:h-[400px] lg:w-[450px] lg:object-cover",
            status === "past" && "grayscale",
          )}
        />
      </button>
    </>
  );
}
