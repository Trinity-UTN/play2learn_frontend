import type { JSX } from "react";
import type { ActivityNotApprovedResponseInterface } from "../../../types/Activity.type";

export interface ActivityStudentContextUIType {
  activityNotApproved: ActivityNotApprovedResponseInterface[];
  activeFilter: "CREATED" | "PUBLISHED" | "FINISHED" | "ALL";
  setActiveFilter: React.Dispatch<
    React.SetStateAction<"CREATED" | "PUBLISHED" | "FINISHED" | "ALL">
  >;
  selectedSubject: string;
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedDifficulty: string;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string>>;
  filteredActivities: any[];
  pendingCount: number;
  completedCount: number;
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
