import { useEffect, useState } from "react";
import { usePaginationParams, type PaginationInfo } from "@/shared";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import { useCajaDeAhorroStudent } from "../useCajaDeAhorroAPI";
import type { RegisterCajaDeAhorro } from "../../types/cajaAhorro.type";

export const useCajaDeAhorroView = () => {
  const { wallet } = useCurrentStudent();
  const {
    cajaDeAhorro,
    statsView,
    getPaginatedCajaDeAhorro,
    getCajaDeAhorroStats,
    registerCajaDeAhorro,
    depositCajaDeAhorro,
    withdrawalCajaDeAhorro,
    deleteCajaDeAhorro,
  } = useCajaDeAhorroStudent();
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    // handleFilter,
  } = usePaginationParams();
  const userBalance = wallet ? wallet?.balance : 0;
  const [openForm, setOpenForm] = useState(false);

  // Efecto para cargar las cajas de ahoro
  useEffect(() => {
    getPaginatedCajaDeAhorro(paginationParams);
  }, [paginationParams]);
  useEffect(() => {
    getCajaDeAhorroStats();
  }, []);
  // 7️⃣ Paginación info

  const paginationInfo: PaginationInfo | null = cajaDeAhorro
    ? {
        currentPage: cajaDeAhorro.currentPage,
        totalPages: cajaDeAhorro.totalPages,
        pageSize: cajaDeAhorro.pageSize,
        totalItems: cajaDeAhorro.results.length,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }
    : null;

  const handleCreateCaja = async (data: RegisterCajaDeAhorro) => {
    await registerCajaDeAhorro(data);
    setOpenForm(false);
    await getPaginatedCajaDeAhorro(paginationParams);
  };

  const handleDeposit = async (cajaId: number, amount: number) => {
    await depositCajaDeAhorro({ id: cajaId, amount });
    await getPaginatedCajaDeAhorro(paginationParams);
  };

  const handleWithdraw = async (cajaId: number, amount: number) => {
    await withdrawalCajaDeAhorro({ id: cajaId, amount });
    await getPaginatedCajaDeAhorro(paginationParams);
  };
  const handleDelete = async (cajaId: number) => {
    await deleteCajaDeAhorro(cajaId);
    await getPaginatedCajaDeAhorro(paginationParams);
  };

  return {
    cajaDeAhorro,
    statsView,
    userBalance,
    openForm,
    paginationInfo,
    setOpenForm,
    handleCreateCaja,
    handleDeposit,
    handleWithdraw,
    handleDelete,
  };
};
