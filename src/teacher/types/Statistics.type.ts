interface SubjectStatistics {
  id: number;
  name: string;
  totalStudents: number;
  totalActivities: number;
}
interface ActivitiesStatistics {
  name: string;
  totalRealizations: number;
  createdDayAgo: number;
}
export interface StatisticsResponse {
  totalStudents: number;
  totalActivities: number;
  totalCourses: number;
  totalBenefits: number;
  subjectsStatistics: SubjectStatistics[];
  activitiesStatistics: ActivitiesStatistics[];
}
