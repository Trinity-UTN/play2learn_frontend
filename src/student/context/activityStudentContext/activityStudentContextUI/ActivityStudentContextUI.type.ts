import type { JSX } from "react";
import type { PaginationInfo } from "./ActivityStudentProviderUI";
import type React from "react";
export interface FilterOption {
  id: string;
  name: string;
}
export interface ActivityStudentContextUIType {
  activeFilter: "CREATED" | "PUBLISHED" | "EXPIRED" | "APPROVED";
  setActiveFilter: React.Dispatch<
    React.SetStateAction<"CREATED" | "PUBLISHED" | "EXPIRED" | "APPROVED">
  >;

  selectedSubject: FilterOption | null;
  setSelectedSubject: React.Dispatch<React.SetStateAction<FilterOption | null>>;

  selectedDifficulty: string;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string>>;

  filteredActivities: any[];
  pendingCount: number;
  defeatedCount: number;
  stats: any[];
  statusFilters: { key: string; label: string; emoji: React.ReactNode }[];
  subjects: FilterOption[];
  difficulties: string[];
  getRandomIcon: () => JSX.Element;
  getDaysUntilDue: (endDate: string) => string;
  getRandomColor: () => string;
  getStatusConfig: (status: string) => any;
  //Metodos de paginacion
  paginationInfo: PaginationInfo | null;
}
