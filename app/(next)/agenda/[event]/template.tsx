"use client";
import React, { useEffect } from "react";
import { animatePageIn } from "./../../utils/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <>
      {/* <div
        id="transitionLayer"
        className="fixed inset-0 min-h-screen bg-neutral-600"
      /> */}
      {children}
    </>
  );
}
