"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import customEase from "@/app/(next)/utils/CustomCurves";

import ArchLogo from "../Svg/ArchLogo";

export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    gsap.set(logoRef.current, { opacity: 1 });
    gsap.from("#archives", {
      xPercent: -150,
      duration: 1,
      delay: 0.5,
      ease: customEase,
    });
    gsap.from("#lgbtqi", {
      xPercent: 150,
      duration: 0.75,
      delay: 0.75,
      ease: customEase,
    });
    gsap.from("#centre", {
      xPercent: -100,
      opacity: 0,
      duration: 1,
      delay: 1.5,
      ease: customEase,
    });
    gsap.to(logoRef.current, {
      scale: 1.25,
      duration: 1,
      delay: 1.5,
      ease: customEase,
    });
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      delay: 2.75,
      ease: customEase,
    });
  }, {});

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-white"
    >
      <ArchLogo
        logoRef={logoRef}
        className="h-[12.5rem] opacity-0 lg:h-[20rem]"
      />
    </div>
  );
}
