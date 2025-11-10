import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBenefitPurchaseData } from "./useBenefitPurchaseData";
import { useBenefitPurchasesActions } from "./useBenefitPurchaseActions";
import { useBenefitAPI } from "../../useBenefitAPI";

export const useBenefitPurchaseView = () => {
  const { id } = useParams<{ id: string }>();
  const benefitId = Number.parseInt(id || "0", 10);

  const {
    loading: dataLoading,
    activeFilter,
    setActiveFilter,
    selectedBenefit,
    filteredPurchases,
    paginationInfo,
    hasPagination,
    refetch,
  } = useBenefitPurchaseData(benefitId);

  const { actions, loading: actionLoading } = useBenefitPurchasesActions();

  const { setSelectedBenefit } = useBenefitAPI();

  useEffect(() => {
    if (selectedBenefit) {
      const currentId =
        "benefitId" in selectedBenefit
          ? selectedBenefit.benefitId
          : selectedBenefit.id;
      if (currentId !== benefitId) {
        setSelectedBenefit(null);
      }
    }
  }, [benefitId, selectedBenefit, setSelectedBenefit]);

  const handleBack = () => {
    setSelectedBenefit(null);
    actions.onNavigateBack();
  };

  const handleAcceptUse = async (purchaseId: number) => {
    const success = await actions.onAcceptUse(purchaseId);
    if (success) {
      await refetch();
    }
  };

  const loading = dataLoading || actionLoading;

  return {
    selectedBenefit,
    loading,
    activeFilter,
    setActiveFilter,
    filteredPurchases,
    paginationInfo,
    hasPagination,
    handleBack,
    handleAcceptUse,
  };
};
