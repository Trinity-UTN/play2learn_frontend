// import type { GetPaginated } from "../../../shared/types/PaginacionType";
import type {
  ActivityNotApprovedResponseInterface,
  ActivityApprovedResponseInterface,
  CurrentActivityInterface,
} from "../../../types/Activity.type";

export interface ActivityStudentContextType {
  loading: boolean;
  activityNotApproved: ActivityNotApprovedResponseInterface[];
  activityApproved: ActivityApprovedResponseInterface[];
  currentActivity: CurrentActivityInterface | null;
  // getPaginatedActivityNotApproved: (params: GetPaginated) => Promise<void>;
  getActivityNotApproved: () => Promise<void>;
  getActivityApproved: () => Promise<void>;
  getActivityById: (id: number) => Promise<void>;
}
