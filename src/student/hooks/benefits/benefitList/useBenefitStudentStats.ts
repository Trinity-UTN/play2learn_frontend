import { useMemo } from "react";
import { BENEFIT_STATS_CONFIG } from "../../../constants/benefitStudent.constants";

/**
 * Hook para calcular estadísticas desde los resultados paginados
 * En lugar de hacer una petición extra, muestra stats de la página actual
 */
export const useBenefitStudentStats = (paginatedData: any) => {
  const counts = useMemo(() => {
    if (!paginatedData || !paginatedData.results) {
      return { available: 0, purchased: 0, useRequested: 0, expired: 0 };
    }

    const benefits = paginatedData.results;

    return {
      available: benefits.filter((b: any) => b.state === "AVAILABLE").length,
      purchased: benefits.filter((b: any) => b.state === "PURCHASED").length,
      useRequested: benefits.filter((b: any) => b.state === "USE_REQUESTED")
        .length,
      expired: benefits.filter((b: any) => b.state === "EXPIRED").length,
    };
  }, [paginatedData]);

  const stats = useMemo(() => {
    return BENEFIT_STATS_CONFIG.map((config) => ({
      ...config,
      value: counts[config.key as keyof typeof counts],
    }));
  }, [counts]);

  // Total count desde el backend
  const totalCount = paginatedData?.count || 0;

  return { stats, counts, totalCount };
};
