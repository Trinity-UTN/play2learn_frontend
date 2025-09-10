// import type { GetPaginated } from "../../../shared/types/PaginacionType";
import type {
  ActivityNotApprovedResponseInterface,
  ActivityApprovedResponseInterface,
  CurrentActivityInterface,
} from "../../../types/Activity.type";
import type {
  ActivityCompletedInterface,
  ActivityCompletedResponseInterface,
} from "../../../types/ActivityCompleted.type";

export interface ActivityStudentContextType {
  // Estados principales
  loading: boolean;
  activityNotApproved: ActivityNotApprovedResponseInterface[];
  activityApproved: ActivityApprovedResponseInterface[];
  currentActivity: CurrentActivityInterface | null;
  activityCompleted: ActivityCompletedResponseInterface | null;

  // Funciones Principales
  // getPaginatedActivityNotApproved: (params: GetPaginated) => Promise<void>;
  getActivityNotApproved: () => Promise<void>;
  getActivityApproved: () => Promise<void>;
  getActivityById: (id: number) => Promise<void>;
  registerActivityCompleted: (
    payload: ActivityCompletedInterface
  ) => Promise<void>;
  refreshStudentDataAfterCompletion: () => Promise<void>;
}
