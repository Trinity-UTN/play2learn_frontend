import { useEffect, useState } from "react";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import { useCajaDeAhorroStudent } from "../useCajaDeAhorroAPI";
import type { PaginationInfo } from "../../../shared/types/PaginacionType";
import type { RegisterCajaDeAhorro } from "../../types/cajaAhorro.type";

export const useCajaDeAhorroView = () => {
  const { wallet } = useCurrentStudent();
  const {
    getPaginatedCajaDeAhorro,
    cajaDeAhorro,
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

  const totalSaved = cajaDeAhorro
    ? cajaDeAhorro.results.reduce((sum, caja) => sum + caja.currentAmount, 0)
    : 0;
  const totalInterest = cajaDeAhorro
    ? cajaDeAhorro.results.reduce(
        (sum, caja) => sum + caja.accumulatedInterest,
        0
      )
    : 0;
  const activeCajas = cajaDeAhorro ? cajaDeAhorro.results.length : 0;

  return {
    cajaDeAhorro,
    userBalance,
    openForm,
    paginationInfo,
    totalSaved,
    totalInterest,
    activeCajas,
    setOpenForm,
    handleCreateCaja,
    handleDeposit,
    handleWithdraw,
    handleDelete,
  };
};
