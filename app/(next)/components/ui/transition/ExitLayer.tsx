import React from "react";
import { motion } from "framer-motion";

export default function ExitLayer() {
  return (
    <motion.div
      initial={{ translateY: "100%" }}
      animate={{ translateY: 0 }}
      exit={{ translateY: "100%" }}
      transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
      className="fixed inset-0 z-50 h-screen w-screen bg-yellow-200"
    />
  );
}
