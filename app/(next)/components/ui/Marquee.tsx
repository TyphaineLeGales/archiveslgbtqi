import React from "react";
import clsx from "clsx";

interface MarqueeProps {
  text: string;
  className?: string;
}

export default function Marquee({ text, className }: MarqueeProps) {
  const items = new Array(2).fill(text).map((item, index) => (
    <span key={index} className="inline-block last:ml-[1rem]">
      {item}
    </span>
  ));

  return <h2 className={className}>{items}</h2>;
}
