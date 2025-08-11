import { useContext } from "react";
import { MemoramaContext } from "../contexts/memoramaContext/MemoramaContext";

export const useCreateMemorama = () => {
  const context = useContext(MemoramaContext);
  if (!context) {
    throw new Error(
      "useCreateMemorama must be used within an MemoramaProvider"
    );
  }
  return context;
};
