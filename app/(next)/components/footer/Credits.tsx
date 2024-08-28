"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function Credits() {
  const [open, setOpen] = useState(false);
  const creditsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCreditsOpen = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      creditsRef.current &&
      !creditsRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ensure the credits are closed when the component unmounts
  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <>
      <button
        aria-label="Crédits"
        onClick={handleCreditsOpen}
        className="footerText footerTextHover"
        ref={buttonRef}
      >
        Crédits
      </button>

      <div
        ref={creditsRef}
        className={clsx(
          "min-w-screen fixed inset-x-0 bottom-0 z-40 h-auto translate-y-[100%] bg-pink-arch p-[1rem] py-[1rem] text-white transition-[transform,colors] duration-500 ease-tamisitée hover:text-black lg:h-[50px]",
          open ? "translate-y-0" : "translate-y-[100%]",
        )}
      >
        <p>
          Design & Dévellopement <br className="md:hidden" /> réalisé par{" "}
          Gilles, Florent & Thibaut <br className="md:hidden" /> du{" "}
          <a
            href="https://www.instagram.com/affaireasuivre_studio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Studio Affaire à Suivre"
            className="underline"
          >
            Studio Affaire à Suivre
          </a>
        </p>
      </div>
    </>
  );
}
