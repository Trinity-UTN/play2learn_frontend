import { useEffect } from "react";

export const useLockScroll = () => {
  useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();

    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);
};
