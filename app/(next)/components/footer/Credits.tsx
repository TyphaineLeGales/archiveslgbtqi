"use client";
import React, { useEffect, useRef } from "react";

import clsx from "clsx";

type CreditsProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Credits() {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const handleCreditsOpen = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      <button
        onClick={handleCreditsOpen}
        className="footerText footerTextHover"
      >
        Crédits
      </button>
      <div
        // className="fixed inset-x-0 bottom-0 z-40 h-[100px] bg-pink-arch p-[1rem] text-white"
        className={clsx(
          "fixed inset-x-0 bottom-0 z-40 h-auto bg-pink-arch p-[1rem] py-[1rem] text-white transition-[transform,colors] duration-500 ease-tamisitée hover:text-black lg:h-[50px]",
          {
            "translate-y-[0%]": open,
          },
          { "translate-y-[100%]": !open },
        )}
      >
        <p>
          Design & Dévellopement <br className="md:hidden" /> réalisé par{" "}
          Gilles, Florent & Thibaut <br className="md:hidden" /> du{" "}
          <a
            href="https://www.instagram.com/affaireasuivre_studio/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Studio Affaire à Suivre
          </a>
        </p>
      </div>
    </div>
  );
}
