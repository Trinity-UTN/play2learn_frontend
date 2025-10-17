// En proximas refactor, traer todas las types de la wallet a este archivo

export type TransactionType = "INGRESO" | "EGRESO";

export interface LastTransactions {
  amount: number;
  createdAt: string;
  description: string;
  type: TransactionType;
}
