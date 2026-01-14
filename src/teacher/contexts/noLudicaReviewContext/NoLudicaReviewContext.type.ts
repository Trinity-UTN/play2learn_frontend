import type { GetPaginated, PaginatedData } from "@/shared";
import type {
  ActivityCompletedPendingDto,
  NoLudicaAttemptResponseDto,
  AttemptReviewStoredData,
  ActivityReviewNoLudicaRequestDto,
} from "../../types/NoLudicaReview.type";

export interface NoLudicaReviewContextType {
  // Estados generales
  loadingPending: boolean;
  loadingAttempt: boolean;
  submitting: boolean;

  // Estados de actividades pendientes
  pendingAttempts: ActivityCompletedPendingDto[];
  paginatedPendingData: PaginatedData<ActivityCompletedPendingDto> | null;

  // Estados de revisión de intento
  currentAttempt: NoLudicaAttemptResponseDto | null;
  storedAttemptData: AttemptReviewStoredData | null;

  // Funciones principales
  getPendingAttemptsPaginated: (params: GetPaginated) => Promise<void>;
  getAttemptDetails: (activityCompletedId: number) => Promise<void>;
  submitReview: (data: ActivityReviewNoLudicaRequestDto) => Promise<boolean>;

  // Funciones auxiliares
  setStoredAttemptData: (data: AttemptReviewStoredData) => void;
  clearStoredAttemptData: () => void;
}
