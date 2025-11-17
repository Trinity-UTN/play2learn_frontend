import { useContext } from "react";
import { ConfirmationContext } from "../contexts/confirmationContext/ConfirmationContext";

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      "useConfirmation must be used within an ConfirmationProvider"
    );
  }
  return context;
};
