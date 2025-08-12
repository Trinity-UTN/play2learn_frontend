import { useContext } from "react";
import { BenefitContext } from "../contexts/benefitsContext/BenefitContext";

export const useBenefit = () => {
  const context = useContext(BenefitContext);
  if (!context) {
    throw new Error("useBenefit must be used within an BenefitProvider");
  }
  return context;
};
