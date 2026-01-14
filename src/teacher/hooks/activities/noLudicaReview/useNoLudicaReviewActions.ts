import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmation } from "@/shared";
import { useNoLudicaReview } from "../../useNoLudicaReview";
import { getStateFromScore } from "../../../utils/activity/noLudicaReview.utils";
import type { ActivityCompletedPendingDto } from "../../../types/NoLudicaReview.type";

/**
 * Hook para manejar las acciones de revisión de No Lúdica
 */
export const useNoLudicaReviewActions = () => {
  const navigate = useNavigate();
  const { showConfirmation } = useConfirmation();
  const {
    submitting,
    currentAttempt,
    storedAttemptData,
    submitReview,
    setStoredAttemptData,
    clearStoredAttemptData,
  } = useNoLudicaReview();

  // Estados del form
  const [score, setScoreState] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const calculatedState = getStateFromScore(score);

  const setScore = useCallback((newScore: number) => {
    const clampedScore = Math.max(0, Math.min(100, newScore));
    setScoreState(clampedScore);
  }, []);

  const handleSubmitReview = useCallback(() => {
    if (!storedAttemptData || !currentAttempt) return;

    const isApproved = calculatedState === "APPROVED";

    showConfirmation({
      title: "Confirmar revisión",
      message: `¿Está seguro de que desea ${
        isApproved ? "aprobar" : "desaprobar"
      } al estudiante con un puntaje de ${score}/100?`,
      type: isApproved ? "info" : "warning",
      confirmText: isApproved ? "Sí, aprobar" : "Sí, desaprobar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        await submitReview({
          activityCompletedId: storedAttemptData.activityCompletedId,
          studentId: currentAttempt.studentId,
          state: calculatedState,
          score,
          comment: comment.trim() || undefined,
        });
      },
    });
  }, [
    storedAttemptData,
    currentAttempt,
    calculatedState,
    score,
    comment,
    submitReview,
    showConfirmation,
  ]);

  const handleGoBack = useCallback(() => {
    clearStoredAttemptData();
    navigate(-1);
  }, [clearStoredAttemptData, navigate]);

  const handleNavigateToReview = useCallback(
    (attempt: ActivityCompletedPendingDto) => {
      setStoredAttemptData({
        activityName: attempt.activityDto.name,
        activityDescription: attempt.activityDto.description,
        studentFullName: `${attempt.studentName} ${attempt.studentLastName}`,
        attemptDate: attempt.activityDto.startDate,
        activityCompletedId: attempt.activityCompletedId,
        studentId: 0,
      });

      navigate(
        `/dashboard/teacher/actividades/attempt/${attempt.activityCompletedId}/review`
      );
    },
    [navigate, setStoredAttemptData]
  );

  return {
    // Estado de form
    score,
    comment,
    calculatedState,

    // Estado de UI
    isSubmitting: submitting,

    // Handlers
    setScore,
    setComment,

    // Acciones
    handleSubmitReview,
    handleGoBack,
    handleNavigateToReview,
  };
};
