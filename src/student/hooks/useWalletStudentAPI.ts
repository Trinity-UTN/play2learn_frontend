import { useContext } from "react";
import { WalletStudentContext } from "../context/walletStudentContext/WalletStudentContext";

export const useWalletStudent = () => {
  const context = useContext(WalletStudentContext);
  if (!context) {
    throw new Error(
      "useWalletStudent must be used within an WalletStudentProvider"
    );
  }
  return context;
};
