"use client";
import React from "react";

import { motion } from "framer-motion";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.87, 0, 0.13, 1],
      }}
    >
      <motion.div
        initial={{ translateY: "-100%" }}
        animate={{ translateY: "100%" }}
        transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
        className="fixed inset-0 z-50 bg-yellow-300"
      />
      {children}
    </motion.div>
  );
}
