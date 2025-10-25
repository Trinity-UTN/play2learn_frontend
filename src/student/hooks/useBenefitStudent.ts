import { useContext } from "react";
import { BenefitStudentContext } from "../context/benefitStudentContext/BenefitStudentContext";
import type { BenefitStudentContextType } from "../context/benefitStudentContext/BenefitStudentContext.type";

export const useBenefitStudent = (): BenefitStudentContextType => {
  const context = useContext(BenefitStudentContext);
  if (context === undefined) {
    throw new Error(
      "useBenefitStudent must be used within a BenefitStudentProvider"
    );
  }
  return context;
};
