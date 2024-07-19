"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(containerRef.current, {
        yPercent: -100,
      });
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black text-white"
    >
      <div className="text-[3rem] uppercase leading-[3rem] tracking-tighter">
        Test
      </div>
    </div>
  );
}
