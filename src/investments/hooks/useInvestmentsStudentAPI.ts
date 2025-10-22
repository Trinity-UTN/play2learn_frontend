import { useContext } from "react";
import { InvestmentsContext } from "../contexts/investmentContext/InvestmentStudentContext";

export const useInvestmentsStudent = () => {
  const context = useContext(InvestmentsContext);
  if (!context) {
    throw new Error(
      "useInvestmentsStudent must be used within an InvestmentsStudentProvider"
    );
  }
  return context;
};
