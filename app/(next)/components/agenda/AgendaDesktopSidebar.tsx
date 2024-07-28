"use client";

import React from "react";

export default function AgendaDesktopSidebar() {
  const scrollToElement = (elementId: string, marginTop = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - marginTop;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToPast = () => {
    scrollToElement("past", 164); // Adjust the margin as needed
  };

  const scrollToFuture = () => {
    scrollToElement("future", 164);
  };

  return (
    <div className="fixed left-[calc(50%-720px)] top-[7.25rem] ml-[3.5rem] mt-[3rem] hidden flex-col gap-[1rem] lg:flex">
      <button onClick={scrollToFuture} className="sidebarButton">
        Événements à venir
      </button>
      <button onClick={scrollToPast} className="sidebarButton">
        Événements passés
      </button>
    </div>
  );
}
