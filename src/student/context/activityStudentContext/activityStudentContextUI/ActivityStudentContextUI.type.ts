import type { JSX } from "react";

export interface ActivityStudentContextUIType {
  activeFilter: "CREATED" | "PUBLISHED" | "FINISHED" | "APPROVED" | "ALL";
  setActiveFilter: React.Dispatch<
    React.SetStateAction<
      "CREATED" | "PUBLISHED" | "FINISHED" | "APPROVED" | "ALL"
    >
  >;
  selectedSubject: string;
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedDifficulty: string;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string>>;
  filteredActivities: any[];
  pendingCount: number;
  defeatedCount: number;
  availableCount: number;
  stats: any[];
  statusFilters: { key: string; label: string; emoji: string }[];
  subjects: string[];
  difficulties: string[];
  getRandomIcon: () => JSX.Element;
  getDaysUntilDue: (endDate: string) => string;
  getRandomColor: () => string;
  getStatusConfig: (status: string) => any;
}
