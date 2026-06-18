interface SubjectStatistics {
  id: number;
  name: string;
  totalStudents: number;
  totalActivities: number;
}
interface ActivitiesStatistics {
  name: string;
  totalRealizations: number;
  createdDaysAgo: number;
  totalStudents: number;
  startDate: string;
}
export interface StatisticsResponse {
  totalStudents: number;
  totalActivities: number;
  totalCourses: number;
  totalBenefits: number;
  subjectsStatistics: SubjectStatistics[];
  activitiesStatistics: ActivitiesStatistics[];
}
