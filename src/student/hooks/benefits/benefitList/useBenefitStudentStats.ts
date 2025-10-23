import { useMemo } from "react";
import { BENEFIT_STATS_CONFIG } from "../../../constants/benefitStudent.constants";
import { useBenefitStudent } from "../../useBenefitStudent";

/**
 * Hook para obtener estadísticas de beneficios del estudiante
 * Ahora consume los datos del contexto, que a su vez consulta al endpoint:
 * GET /benefits/student/count
 */
export const useBenefitStudentStats = () => {
  const { benefitStats } = useBenefitStudent();

  const counts = useMemo(() => {
    if (!benefitStats) {
      return {
        available: 0,
        purchased: 0,
        use_requested: 0,
        used: 0,
        expired: 0,
      };
    }
    return benefitStats;
  }, [benefitStats]);

  const stats = useMemo(() => {
    return BENEFIT_STATS_CONFIG.map((config) => ({
      ...config,
      value: counts[config.key as keyof typeof counts],
    }));
  }, [counts]);

  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return { stats, counts, totalCount };
};
