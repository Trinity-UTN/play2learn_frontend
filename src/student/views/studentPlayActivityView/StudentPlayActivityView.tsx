import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";
import type { ActivityUI } from "../../types/Activity.type";
import StudentActivityHeader from "../../components/common/StudentActivityHeader/StudentActivityHeader";
import StudentActivityFooter from "../../components/common/StudentActivityFooter/StudentActivityFooter";
import GameRenderer from "../../components/common/StudentGameRenderer/StudentGameRenderer";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import { useGameManager } from "../../../shared/hooks/games/useGameManager";
import styles from "./StudentPlayActivityView.module.css";

interface StudentPlayActivityViewProps {
  activity?: ActivityUI;
}

const StudentPlayActivityView: React.FC<StudentPlayActivityViewProps> = ({
  activity,
}) => {
  const {
    loading,
    currentActivity,
    registerActivityCompleted,
    refreshStudentDataAfterCompletion,
  } = useActivityStudent();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // EXPO: Registry Pattern: Obtener el hook del juego apropiado automáticamente
  const gameManager = useGameManager(currentActivity?.name || activity?.name);
  const isGameFinished = gameManager?.isGameWon || gameManager?.isGameLost;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleGoBack = () => {
    if (id) {
      navigate(`/dashboard/student/actividades/${id}/view`);
    }
  };

  const handleFinishActivity = async () => {
    if (!currentActivity) return;

    await registerActivityCompleted({
      activityId: currentActivity.id,
      state: gameManager?.isGameWon ? "APPROVED" : "DISAPPROVED",
    });
    await refreshStudentDataAfterCompletion();

    gameManager?.resetGame();
    navigate(`/dashboard/student/actividades/${id}/review`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentActivity && !activity) {
    return (
      <div className={styles.errorContainer}>
        <h2>Actividad no encontrada</h2>
        <p>No se pudo cargar la información de la actividad.</p>
        <button
          onClick={() => navigate("/dashboard/student/actividades/list")}
          className={styles.backButton}
        >
          Volver a actividades
        </button>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.playActivityView}
    >
      <StudentActivityHeader
        icon={<FaGamepad />}
        title={currentActivity?.name || "Juego"}
        subtitle={currentActivity?.description || ""}
      />

      <div className={styles.gameContent}>
        <GameRenderer currentActivity={currentActivity} />
      </div>

      <StudentActivityFooter
        loading={loading}
        isFormValid={isGameFinished}
        onBack={handleGoBack}
        onNext={handleFinishActivity}
        nextButtonText="Finalizar"
        showBackToList={false}
      />
    </motion.div>
  );
};

export default StudentPlayActivityView;
