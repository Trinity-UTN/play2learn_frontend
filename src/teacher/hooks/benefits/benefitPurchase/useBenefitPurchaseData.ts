import { useEffect, useState, useCallback } from "react";
import { useBenefitAPI } from "../../useBenefitAPI";
import type { BenefitPurchaseSimpleResponse } from "../../../../benefit/types/benefit.types";

/**
 * Hook para obtener los canjes de un beneficio específico
 */
export const useBenefitPurchasesData = (benefitId: number) => {
  const { getBenefitPurchases, loading } = useBenefitAPI();
  const [purchases, setPurchases] = useState<BenefitPurchaseSimpleResponse[]>(
    []
  );

  const loadPurchases = useCallback(async () => {
    if (benefitId) {
      try {
        const data = await getBenefitPurchases(benefitId);
        setPurchases(data);
      } catch (error) {
        console.error("Error loading purchases:", error);
        setPurchases([]);
      }
    }
  }, [benefitId, getBenefitPurchases]);

  useEffect(() => {
    loadPurchases();
  }, [loadPurchases]);

  return {
    purchases,
    loading,
    refetch: loadPurchases,
  };
};
