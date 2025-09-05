// import type { GetPaginated } from "../../../shared/types/PaginacionType";
import type {
  ActivityNotApprovedResponseInterface,
  ActivityApprovedResponseInterface,
} from "../../../types/Activity.type";

export interface ActivityStudentContextType {
  loading: boolean;
  activityNotApproved: ActivityNotApprovedResponseInterface[];
  activityApproved: ActivityApprovedResponseInterface[];
  // getPaginatedActivityNotApproved: (params: GetPaginated) => Promise<void>;
  getActivityNotApproved: () => Promise<void>;
  getActivityApproved: () => Promise<void>;
}
