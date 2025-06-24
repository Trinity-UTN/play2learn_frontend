import { useContext } from "react";
import { YearContext } from "../contexts/YearContext";

export const useYear = () => {
  const context = useContext(YearContext);
  if (!context) {
    throw new Error("useYear must be used within an YearProvider");
  }
  return context;
};
