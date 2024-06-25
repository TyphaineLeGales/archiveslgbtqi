import React from "react";
import clsx from "clsx";

interface MarqueeProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export default function TextMarquee({
  text,
  className,
  onClick,
}: MarqueeProps) {
  const items = new Array(2).fill(text).map((item, index) => (
    <span key={index} className="inline-block lg:last:ml-[1rem]">
      {item}
    </span>
  ));

  return <h2 className={className}>{items}</h2>;
}
