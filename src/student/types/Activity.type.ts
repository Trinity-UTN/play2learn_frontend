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
export interface ConfigurationActivity {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  difficulty: string;
  maxTime: number;
  subjectName: string;
  attempts: number;
  name: string;
  type: string;
  status: "pending" | "completed" | "overdue" | "available";
  points: number;
  icon: string;
  color: string;
  completedDate?: string;
  score?: number;
  progress?: number;
}
