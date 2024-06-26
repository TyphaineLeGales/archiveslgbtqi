"use client";
import React from "react";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <motion.div
        initial={{ translateY: 0 }}
        animate={{ translateY: "-100%" }}
        transition={{ duration: 1.1, ease: [0.6, 0.01, 0.05, 0.95] }}
        className="fixed inset-0 z-50 bg-yellow-200"
      /> */}
      <motion.div>{children}</motion.div>
    </>
  );
}
