import { useState } from "react";

export function useLayout() {
  const [isRow, setIsRow] = useState(false);

  const toggleLayout = (data: boolean) => setIsRow(data);

  return { isRow, toggleLayout };
}
