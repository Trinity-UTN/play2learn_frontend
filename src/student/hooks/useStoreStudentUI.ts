import { useEffect, useState } from "react";
import { usePaginationParams, type PaginationInfo } from "@/shared";
import { useStore } from "./useStoreStudent";
import { useCurrentStudent } from "./useCurrentStudent";
import type { BodyPart } from "../types/CurrentStudent.type";

export const useStoreStudentUI = () => {
  // Paginación
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
  } = usePaginationParams();

  // Store
  const { aspects, getPaginatedAspects, loading, buyAspect } = useStore();

  // Usuario actual
  const { currentStudent, getCurrentStudentByToken } = useCurrentStudent();

  // Estados locales
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkin, setSelectedSkin] = useState<BodyPart | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [userBalance, setUserBalance] = useState<string>("Sin saldo");

  // Efecto para cargar los aspectos
  useEffect(() => {
    getPaginatedAspects(paginationParams);
  }, [paginationParams]);

  // Actualizar saldo si cambia el estudiante
  useEffect(() => {
    if (currentStudent) {
      setUserBalance(currentStudent.wallet.balance.toFixed(2));
    }
  }, [currentStudent]);

  // 7️⃣ Paginación info
  const paginationInfo: PaginationInfo | null = aspects
    ? {
        currentPage: aspects.currentPage,
        totalPages: aspects.totalPages,
        pageSize: aspects.pageSize,
        totalItems: aspects.results.length,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }
    : null;

  // Acciones
  const handlePurchase = (skin: BodyPart) => {
    window.scrollTo(0, 0);
    setSelectedSkin(skin);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = async () => {
    if (!selectedSkin || !currentStudent) return;

    const data = {
      aspectId: selectedSkin.id,
      profileId: currentStudent.profile.id,
    };

    await buyAspect(data);
    await getCurrentStudentByToken();
    await getPaginatedAspects(paginationParams);
    setShowPurchaseModal(false);
    setSelectedSkin(null);
  };

  return {
    aspects,
    paginationInfo,
    handleFilter,
    selectedCategory,
    setSelectedCategory,
    showPurchaseModal,
    setShowPurchaseModal,
    setSelectedSkin,
    selectedSkin,
    handlePurchase,
    confirmPurchase,
    userBalance,
    loading,
  };
};
