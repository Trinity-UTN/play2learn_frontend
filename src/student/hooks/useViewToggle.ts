import { useState } from "react";

export const useViewToggle = (initialState: boolean = true) => {
  const [isHorizontal, setIsHorizontal] = useState(initialState);

  const toggleView = () => setIsHorizontal(!isHorizontal);

  return {
    isHorizontal,
    toggleView,
    viewMode: isHorizontal ? "horizontal" : "vertical",
  };
};
