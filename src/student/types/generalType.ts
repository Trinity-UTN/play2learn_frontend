export interface StudentWallet {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: "earned" | "spent";
  amount: number;
  description: string;
  date: string;
  category: string;
  icon: string;
}
export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "benefits" | "cosmetics" | "power-ups" | "themes";
  icon: string;
  color: string;
  isPopular?: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  discount?: number;
}

export interface RankingStudent {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  rank: number;
  badge: string;
  streak: number;
  activitiesCompleted: number;
}
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedDate?: string;
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
}
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  points: number;
  rank: number;
  streak: number;
  joinDate: string;
  achievements: Achievement[];
}
export interface StudentBenefit {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  icon: string;
  color: string;
  isOwned: boolean;
  isActive: boolean;
  expiryDate?: string;
  usesRemaining?: number;
}

export interface StudentActivity {
  id: string;
  name: string;
  type: string;
  subject: string;
  difficulty: "Fácil" | "Medio" | "Difícil";
  points: number;
  duration: string;
  dueDate?: string;
  completedDate?: string;
  score?: number;
  status: "pending" | "completed" | "overdue";
  icon: string;
  color: string;
}

export type StudentDashboardView =
  | "overview"
  | "wallet"
  | "activities"
  | "benefits"
  | "store"
  | "ranking";

export interface EducationalConcept {
  id: string;
  title: string;
  description: string;
  example: string;
  icon: string;
  color: string;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
}

// Student Dashboard Types
export interface StudentWallet {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: "earned" | "spent";
  amount: number;
  description: string;
  date: string;
  category: string;
  icon: string;
}
export interface FinancialSummary {
  availableCoins: number;
  investedCoins: number;
  totalBalance: number;
  lastMovementDate: string;
  monthlyGrowth: number;
  savingsGoal: number;
  currentSavings: number;
}
