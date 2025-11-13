export const urls = {
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
