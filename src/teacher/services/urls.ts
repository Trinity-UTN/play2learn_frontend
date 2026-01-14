export const urls = {
  // Activities
  PaginatedActivitiesTeacher: "/activity/teacher/paginated",
  DetailsActivityTeacher: (activityId: number) =>
    `/activity/teacher/${activityId}`,

  // No Ludica Review
  PendingNoLudicaPaginated: "/activity/teacher/pending/paginated",
  NoLudicaAttempt: (activityCompletedId: number) =>
    `/activity/teacher/no-ludica/${activityCompletedId}`,
  ReviewNoLudica: "/activity/teacher/review-no-ludica",

  // Teacher subjects, courses, years
  SubjectCoursesYearsTeacher: "/teacher/subjects",

  // Benefits
  CreateBenefit: "/benefits",
  DeleteBenefit: (benefitId: number) => `/benefits/teacher/${benefitId}`,
  Benefits: "/benefits/teacher",
  BenefitPurchases: (benefitId: number) =>
    `/benefits/teacher/purchases/${benefitId}`,
  PaginatedBenefitTeacher: "/benefits/teacher/paginated",
  PaginatedBenefitUseRequested: "/benefits/teacher/use-requested/paginated",
  PaginatedBenefitPurchases: (benefitId: number) =>
    `/benefits/teacher/purchases/paginated/${benefitId}`,
  AcceptUseBenefit: (id: number) => `/benefits/teacher/accept-use/${id}`,

  // Stats
  Statistics: "/statistics/home/teacher",
};
