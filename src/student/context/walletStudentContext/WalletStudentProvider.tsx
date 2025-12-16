import { useCallback, useState, type ReactNode } from "react";
import { WalletStudentContext } from "./WalletStudentContext";
import type { WalletStudentContextType } from "./WalletStudentContext.type";
import { WalletService } from "../../services/wallet/WalletService";
import { useHandleApiError } from "@/shared";
import type { LastTransactions } from "../../types/Wallet.type";

interface WalletStudentProviderProps {
  children: ReactNode;
}

export const WalletStudentProvider: React.FC<WalletStudentProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(true);
  const [lastTransactions, setLastTransactions] = useState<LastTransactions[]>(
    []
  );

  // Funciones Principales
  const getLastTransactions = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await WalletService.getLastTransactionsStudentApi();
      setLastTransactions(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las ultimas transacciones");
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: WalletStudentContextType = {
    // Estados principales
    loading,
    lastTransactions,
    getLastTransactions,
  };

  return (
    <WalletStudentContext.Provider value={contextValue}>
      {children}
    </WalletStudentContext.Provider>
  );
};
