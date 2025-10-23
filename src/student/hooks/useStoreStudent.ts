import { useContext } from "react";
import { StoreContext } from "../context/storeStudentContext/StoreStudentContext";
import type { StoreContextType } from "../context/storeStudentContext/StoreStudentContext.type";

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
