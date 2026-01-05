import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  ActivityNotApprovedResponseInterface,
  ActivityApprovedResponseInterface,
  CurrentActivityInterface,
  ActivityStatsResponse,
  ActivityResultsResponseInterface,
} from "../../../types/Activity.type";
import type {
  ActivityCompletedInterface,
  ActivityCompletedResponseInterface,
} from "../../../types/ActivityCompleted.type";

export interface CurrentActivityAttemptInfo {
  remainingAttempts: number;
  completedAt?: string;
}

export interface ActivityStudentContextType {
  // Estados principales
  loading: boolean;
  activityNotApproved: ActivityNotApprovedResponseInterface[];
  activityApproved: ActivityApprovedResponseInterface[];
  paginatedActivitiesNotApproved: PaginatedData<ActivityNotApprovedResponseInterface> | null;
  paginatedActivitiesApproved: PaginatedData<ActivityApprovedResponseInterface> | null;
  currentActivity: CurrentActivityInterface | null;
  activityCompleted: ActivityCompletedResponseInterface | null;
  activityStudentStats: ActivityStatsResponse | null;
  activityResults: ActivityResultsResponseInterface | null;
  currentActivityAttemptInfo: CurrentActivityAttemptInfo | null;

  // Funciones Principales
  getActivityNotApproved: () => Promise<void>;
  getActivityApproved: () => Promise<void>;
  getActivityById: (id: number) => Promise<void>;
  getPaginatedActivitiesNotApproved: (params: GetPaginated) => Promise<void>;
  getPaginatedActivitiesApproved: (params: GetPaginated) => Promise<void>;
  getActivityStudentStats: () => Promise<void>;
  getActivityResults: (activityId: number) => Promise<void>;
  registerActivityStarted: (id: number) => Promise<void>;
  registerActivityCompleted: (
    payload: ActivityCompletedInterface
  ) => Promise<void>;
  registerActivityNoLudicaCompleted: (payload: FormData) => Promise<void>;

  // Funciones Auxiliares
  refreshActivityDataAfterCompletion: () => Promise<void>;
  setCurrentActivityAttemptInfo: (
    info: CurrentActivityAttemptInfo | null
  ) => void;
}
