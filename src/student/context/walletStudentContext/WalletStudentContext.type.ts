import type { LastTransactions } from "../../types/Wallet.type";

export interface WalletStudentContextType {
  // Estados principales
  loading: boolean;
  getLastTransactions: () => void;
  lastTransactions: LastTransactions[];
}
