import { useState } from "react";
import type { BenefitPurchaseStatus } from "../../../../benefit/constants/benefitPurchase.constants";

/**
 * Hook para manejar los filtros de canjes de beneficios
 */
export const useBenefitPurchaseFilters = () => {
  const [activeFilter, setActiveFilter] =
    useState<BenefitPurchaseStatus>("USE_REQUESTED");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const handleViewModeChange = (mode: "grid" | "table") => {
    setViewMode(mode);
  };

  return {
    activeFilter,
    setActiveFilter,
    viewMode,
    handleViewModeChange,
  };
};
