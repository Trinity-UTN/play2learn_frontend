import type {
  GetPaginated,
  PaginatedData,
} from "../../../../shared/types/PaginacionType";
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
  getActivityNotApproved: () => Promise<void>;
  getActivityApproved: () => Promise<void>;
  getActivityById: (id: number) => Promise<void>;
  getPaginatedActivitiesNotApproved: (params: GetPaginated) => Promise<void>;
  getPaginatedActivitiesApproved: (params: GetPaginated) => Promise<void>;
  paginatedActivitiesNotApproved: PaginatedData<ActivityNotApprovedResponseInterface> | null;
  paginatedActivitiesApproved: PaginatedData<ActivityApprovedResponseInterface> | null;
}
