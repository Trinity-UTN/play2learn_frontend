import { useContext } from "react";
import { BenefitUIContext } from "../contexts/benefitsUIContext/BenefitUIContext";

export const useBenefitUI = () => {
  const context = useContext(BenefitUIContext);
  if (!context) {
    throw new Error("useBenefitUI must be used within an BenefitUIProvider");
  }
  return context;
};
