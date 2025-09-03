// import type { GetPaginated } from "../../../shared/types/PaginacionType";
import type { ActivityNotApprovedResponseInterface } from "../../../types/Activity.type";

export interface ActivityStudentContextType {
  loading: boolean;
  activityNotApproved: ActivityNotApprovedResponseInterface[];
  // getPaginatedActivityNotApproved: (params: GetPaginated) => Promise<void>;
  getActivityNotApproved: () => Promise<void>;
}
