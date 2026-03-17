import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTopRef = <T extends HTMLElement>() => {
  const { pathname } = useLocation();
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, [pathname]);

  return ref;
};
