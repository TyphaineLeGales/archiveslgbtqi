"use client";
import React, { useEffect } from "react";
import clsx from "clsx";

export default function CookieBanner() {
  const [isFirstVisit, setIsFirstVisit] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");

    if (!firstVisit) {
      localStorage.setItem("firstVisit", "true");
      setIsFirstVisit(true);
      setIsVisible(true);
    } else {
      setIsFirstVisit(false);
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsFirstVisit(false);
  };

  return (
    <>
      {/* {isFirstVisit && isVisible && ( */}
      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 flex h-auto items-center justify-between bg-blue-200 p-[1rem] transition-transform duration-300 ease-tamisitée",
          isVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <p>Cookie Banner</p>
        <button onClick={handleClose}>x</button>
      </div>
      {/* )} */}
    </>
  );
}
