import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function TextSplitting({ children, ...rest }: any) {
  const [index, setIndex] = React.useState(0);

  useGSAP(() => {
    gsap.from(rest, {
      translateY: "100%",
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
    });
  }, [index]);
  let words = children.split(" ");
  return words.map((word: string | number, i: number) => {
    return (
      <div key={i} style={{ display: "inline-block", overflow: "hidden" }}>
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
