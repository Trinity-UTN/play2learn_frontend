import type { JSX } from "react";
import type { PaginationInfo } from "./ActivityStudentProviderUI";

export interface ActivityStudentContextUIType {
  activeFilter: "CREATED" | "PUBLISHED" | "FINISHED" | "APPROVED";
  setActiveFilter: React.Dispatch<
    React.SetStateAction<"CREATED" | "PUBLISHED" | "FINISHED" | "APPROVED">
  >;
  selectedSubject: string;
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedDifficulty: string;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string>>;
  filteredActivities: any[];
  pendingCount: number;
  defeatedCount: number;
  stats: any[];
  statusFilters: { key: string; label: string; emoji: string }[];
  subjects: string[];
  difficulties: string[];
  getRandomIcon: () => JSX.Element;
  getDaysUntilDue: (endDate: string) => string;
  getRandomColor: () => string;
  getStatusConfig: (status: string) => any;
  //Metodos de paginacion
  paginationInfo: PaginationInfo | null;
}
