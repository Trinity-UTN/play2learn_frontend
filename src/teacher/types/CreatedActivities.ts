export type TeacherActivityStatus =
  | "PENDING_PUBLICATION"
  | "PUBLISHED"
  | "EXPIRED";
export interface TeacherActivity {
  id: string;
  name: string;
  description: string;
  status: TeacherActivityStatus;
  startDate: string;
  endDate: string;
  subjectName: string;
  courseName: string;
  type: "ahorcado" | "sequence" | "classification" | "quiz";
  totalStudents: number;
  completedStudents: number;
  averageScore: number;
  createdAt: string;
}

export interface PendingReviewActivity {
  id: string;
  activityName: string;
  studentName: string;
  studentId: string;
  submittedAt: string;
  activityType: string;
  courseName: string;
}

export type StudentActivityStatus =
  | "NOT_STARTED"
  | "APPROVED"
  | "FAILED"
  | "IN_PROGRESS";

export interface StudentActivityProgress {
  id: string;
  studentId: string;
  studentName: string;
  studentLastName: string;
  status: StudentActivityStatus;
  attemptsUsed: number;
  score?: number;
  timeSpent?: number;
  lastAttempt?: string;
  completedAt?: string;
}

export interface ActivityDetailMetrics {
  totalStudents: number;
  studentsCompleted: number;
  studentsApproved: number;
  participationPercentage: number;
  averageTime: number;
  successPercentage: number;
  averageScore: number;
}

export interface ActivityDetail extends TeacherActivity {
  metrics: ActivityDetailMetrics;
  students: StudentActivityProgress[];
  maxAttempts: number;
}
