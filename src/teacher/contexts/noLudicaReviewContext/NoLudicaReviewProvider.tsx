import { useCallback, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { NoLudicaReviewService } from "../../services/noLudicaReview/NoLudicaReviewService";
import { NoLudicaReviewContext } from "./NoLudicaReviewContext";
import type { NoLudicaReviewContextType } from "./NoLudicaReviewContext.type";
import type {
  ActivityCompletedPendingDto,
  NoLudicaAttemptResponseDto,
  AttemptReviewStoredData,
  ActivityReviewNoLudicaRequestDto,
} from "../../types/NoLudicaReview.type";
import type { GetPaginated, PaginatedData } from "@/shared";
import {
  useHandleApiError,
  useToaster,
  StorageKeys,
  getItem,
  removeItem,
  setItem,
} from "@/shared";
import { TeacherRoutes } from "../../routes/routes";

interface NoLudicaReviewProviderProps {
  children: ReactNode;
}

export const NoLudicaReviewProvider: React.FC<NoLudicaReviewProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  // Estados generales
  const [loadingPending, setLoadingPending] = useState<boolean>(false);
  const [loadingAttempt, setLoadingAttempt] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Estados de actividades pendientes
  const [pendingAttempts, setPendingAttempts] = useState<
    ActivityCompletedPendingDto[]
  >([]);
  const [paginatedPendingData, setPaginatedPendingData] =
    useState<PaginatedData<ActivityCompletedPendingDto> | null>(null);

  // Estados de revisión de intento
  const [currentAttempt, setCurrentAttempt] =
    useState<NoLudicaAttemptResponseDto | null>(null);
  const [storedAttemptData, setStoredAttemptDataState] =
    useState<AttemptReviewStoredData | null>(() =>
      getItem<AttemptReviewStoredData>(StorageKeys.attemptReview),
    );

  // Funciones principales
  const getPendingAttemptsPaginated = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoadingPending(true);
      try {
        const response =
          await NoLudicaReviewService.getPendingPaginatedApi(params);
        setPendingAttempts(response.data.results);
        setPaginatedPendingData(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los intentos pendientes");
      } finally {
        setLoadingPending(false);
      }
    },
    [handleApiError],
  );

  const getAttemptDetails = useCallback(
    async (activityCompletedId: number): Promise<void> => {
      setCurrentAttempt(null);
      setLoadingAttempt(true);
      try {
        const response =
          await NoLudicaReviewService.getAttemptApi(activityCompletedId);
        setCurrentAttempt(response);
      } catch (error) {
        handleApiError(error, "Error al obtener los detalles del intento");
      } finally {
        setLoadingAttempt(false);
      }
    },
    [handleApiError],
  );

  const submitReview = useCallback(
    async (data: ActivityReviewNoLudicaRequestDto): Promise<boolean> => {
      setSubmitting(true);
      try {
        await NoLudicaReviewService.submitReviewApi(data);

        // Clear storage and show success
        removeItem(StorageKeys.attemptReview);
        setStoredAttemptDataState(null);
        setCurrentAttempt(null);

        showToast({
          title: "Revisión enviada correctamente",
          type: "success",
          position: "bottom-right",
        });

        navigate(`/dashboard/teacher/${TeacherRoutes.Actividades.CreatedList}`);
        return true;
      } catch (error) {
        handleApiError(error, "Error al enviar la revisión");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [handleApiError, showToast, navigate],
  );

  // Funciones auxiliares
  const setStoredAttemptData = useCallback((data: AttemptReviewStoredData) => {
    setItem(StorageKeys.attemptReview, data);
    setStoredAttemptDataState(data);
  }, []);

  const clearStoredAttemptData = useCallback(() => {
    removeItem(StorageKeys.attemptReview);
    setStoredAttemptDataState(null);
  }, []);

  const clearPendingAttempts = useCallback(() => {
    setPendingAttempts([]);
    setPaginatedPendingData(null);
  }, []);

  const contextValue: NoLudicaReviewContextType = {
    // Estados generales
    loadingPending,
    loadingAttempt,
    submitting,

    // Estados de actividades pendientes
    pendingAttempts,
    paginatedPendingData,

    // Estados de revisión de intento
    currentAttempt,
    storedAttemptData,

    // Funciones principales
    getPendingAttemptsPaginated,
    getAttemptDetails,
    submitReview,

    // Funciones auxiliares
    setStoredAttemptData,
    clearStoredAttemptData,
    clearPendingAttempts,
  };

  return (
    <NoLudicaReviewContext.Provider value={contextValue}>
      {children}
    </NoLudicaReviewContext.Provider>
  );
};
