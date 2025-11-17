import { useContext } from "react";
import { ArbolDecisionContext } from "../contexts/arbolDecisionContext/ArbolDecisionContext";

export const useCreateArbolDecision = () => {
  const context = useContext(ArbolDecisionContext);
  if (!context)
    throw new Error(
      "useCreateArbolDecision debe usarse dentro de ArbolDecisionProvider"
    );
  return context;
};
