import React from "react";
import { motion } from "framer-motion";

export default function TextSplitting({ children, ...rest }: any) {
  let words = children.split(" ");
  return words.map((word: string | number, i: number) => {
    return (
      <div
        // key={children + i}
        key={i}
        style={{ display: "inline-block", overflow: "hidden" }}
      >
        <motion.div
          {...rest}
          style={{ display: "inline-block", willChange: "transform" }}
          custom={i}
        >
          {word + (i !== words.length - 1 ? "\u00A0" : "")}
        </motion.div>
      </div>
    );
  });
}
