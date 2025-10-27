export const urls = {
  // Benefits
  CreateBenefit: "/benefits",
  DeleteBenefit: (benefitId: number) => `/benefits/teacher/${benefitId}`,
  Benefits: "/benefits/teacher",
  BenefitById: (benefitId: number) =>
    `/benefits/teacher/purchases/${benefitId}`,
  PaginatedBenefitTeacher: "/benefits/teacher/paginated",
  PaginatedBenefitUseRequested: "/benefits/teacher/use-requested",
  AcceptUseBenefit: (benefitId: number) =>
    `/benefits/teacher/accept-use/${benefitId}`,

  // Stats
  Statistics: "/statistics/home/teacher",
};
