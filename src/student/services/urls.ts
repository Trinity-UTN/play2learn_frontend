export const urls = {
  // Activities
  ActivityById: "/activity",
  ActivityNotApproved: "/activity/student/not-approved",
  ActivityApproved: "/activity/student/approved",
  PaginatedActivityNotApproved: "/activity/student/paginated/not-approved",
  PaginatedActivityApproved: "/activity/student/paginated/approved",
  ActivityStarted: "/activity/start",
  ActivityCompleted: "/activity/completed",
  ActivityNoLudicaComplete: "/activity/completed/no-ludica",

  // Student
  StudentByToken: "/student",

  // Benefits
  PaginatedBenefitStudent: "/benefits/student/paginated",
  BenefitStudentStats: "/benefits/student/count",
  PurchaseBenefitStudent: "/benefits/student/purchase",
  RequestUseBenefitStudent: (benefitId: number) =>
    `/benefits/student/request-use/${benefitId}`,

  // Profile & Aspects
  ProfileAddAspect: "/profile/add-aspect-to-inventory",
  ProfileEditAspect: "/profile/select-aspect",
  ProfileUnselectAspect: "/profile/unselect-aspect",
  Aspect: "/profile/avatar/aspect/paginated",
  AspectToInventory: "/profile/add-aspect-to-inventory",

  // Wallet
  Wallet: "/wallet",
  LastTransactionsWallet: "/wallet/last-transactions",

  // Home
  Statistics: "/statistics/home/student",
};
