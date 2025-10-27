import { useState, useMemo, useCallback } from "react";

interface UsePriceAutomationParams {
  currentPrice: number;
  onSetAutomation: (min: number, max: number) => void;
}

export const useAutomationPanel = ({
  currentPrice,
  onSetAutomation,
}: UsePriceAutomationParams) => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  const isValid = useMemo(() => {
    if (!minPrice || !maxPrice) return false;

    const min = Number.parseFloat(minPrice);
    const max = Number.parseFloat(maxPrice);

    return min < max && min < currentPrice && max > currentPrice;
  }, [minPrice, maxPrice, currentPrice]);

  const handleActivate = useCallback(() => {
    const min = Number.parseFloat(minPrice);
    const max = Number.parseFloat(maxPrice);

    if (isValid) {
      onSetAutomation(min, max);
      setIsActive(true);
    }
  }, [minPrice, maxPrice, isValid, onSetAutomation]);

  const handleDeactivate = useCallback(() => {
    setIsActive(false);
    setMinPrice("");
    setMaxPrice("");
  }, []);

  return {
    minPrice,
    maxPrice,
    isActive,
    isValid,
    setMinPrice,
    setMaxPrice,
    handleActivate,
    handleDeactivate,
  };
};
