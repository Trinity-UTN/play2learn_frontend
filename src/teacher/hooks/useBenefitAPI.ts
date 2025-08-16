import { useContext } from "react";
import { BenefitAPIContext } from "../contexts/benefitsAPIContext/BenefitAPIContext";

export const useBenefitAPI = () => {
  const context = useContext(BenefitAPIContext);
  if (!context) {
    throw new Error("useBenefitAPI must be used within an BenefitAPIProvider");
  }
  return context;
};
