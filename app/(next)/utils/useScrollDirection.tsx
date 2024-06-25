import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollDirection = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setVisible(currentScrollY < lastScrollY.current);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return visible;
};
