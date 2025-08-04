import { useContext } from "react";
import { NoLudicaContext } from "../contexts/noLudicaContext/NoLudicaContext";

export const useCreateNoLudica = () => {
  const context = useContext(NoLudicaContext);
  if (!context) {
    throw new Error(
      "useCreateNoLudica must be used within an NoLudicaProvider"
    );
  }
  return context;
};
