import type { CourseResponseDto } from "../../admin/services/course/CourseService";
import type { SubjectSimplifiedResponseDto } from "../../admin/services/subject/SubjectService";
import type { YearResponseDto } from "../../admin/services/Year/YearService";
import type { PaginatedData } from "../../shared/types/PaginacionType";

export interface Activity {
  id: number;
  code_game: string;
  name: string;
  type: string;
  description: string;
  color: string;
  isPopular?: boolean;
  isNew?: boolean;
}

type ActivityTeacherStatus = "CREATED" | "PUBLISHED" | "EXPIRED";

type ActivityStudentState =
  | "APPROVED"
  | "IN_PROGRESS"
  | "DISAPPROVED"
  | "NOT_COMPLETED";

export interface ActivityTeacherResponse {
  id: number;
  name: string;
  description: string;
  subjectId: number;
  subjectName: string;
  courseId: number;
  course: string;
  yearId: number;
  status: ActivityTeacherStatus;
  date: string; // Depende de status. EXPIRED -> fecha de expiración, PUBLISHED -> fecha de publicación
}

export interface ActivityStudentGetDto {
  studentName: string;
  state: ActivityStudentState;
  attempts: number;
  reward: number;
}

export interface ActivityTeacherDetailsResponse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ActivityTeacherStatus;
  difficulty: string;
  maxTime: number;
  subjectName: string;
  courseName: string;
  attempts: number;
  reward: number;
  typeReward: string;
  studentsAttemptedCount: number;
  studentsApprovedCount: number;
  participationPercentage: number;
  averageCompletionTime: number;
  successPercentage: number;
  activityStudentGetDtos: ActivityStudentGetDto[];
}

export interface PaginatedActivityTeacherResponseInterface {
  data: PaginatedData<ActivityTeacherResponse>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface SubjectCoursesYearsTeacherResponse {
  subjects: SubjectSimplifiedResponseDto[];
  courses: CourseResponseDto[];
  years: YearResponseDto[];
}
