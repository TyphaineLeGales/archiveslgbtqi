import React from "react";

export default function TextSplitting({ children, ...rest }: any) {
  let words = children.split(" ");
  return words.map((word: string | number, i: number) => {
    return (
      <div
        // key={children + i}
        key={i}
        style={{ display: "inline-block", overflow: "hidden" }}
      >
        <div
          {...rest}
          style={{ display: "inline-block", willChange: "transform" }}
          custom={i}
        >
          {word + (i !== words.length - 1 ? "\u00A0" : "")}
        </div>
      </div>
    );
  });
}
