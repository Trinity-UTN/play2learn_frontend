import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";
import type { ActivityUI } from "../../types/Activity.type";
import StudentActivityHeader from "../../components/common/StudentActivityHeader/StudentActivityHeader";
import StudentActivityFooter from "../../components/common/StudentActivityFooter/StudentActivityFooter";
import GameRenderer from "../../components/common/StudentGameRenderer/StudentGameRenderer";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import { useGameManager } from "../../../shared/hooks/games/useGameManager";
import { useActivityActions } from "../../hooks/activities/useActivityActions";
import { useActivityNavigation } from "../../hooks/activities/useActivityNavigation";
import { useActivityNavigationMessages } from "../../hooks/activities/useActivityNavigationMessages";
import { usePreventNavigation } from "../../../shared/hooks/usePreventNavigation";
import styles from "./StudentPlayActivityView.module.css";

interface StudentPlayActivityViewProps {
  activity?: ActivityUI;
}

const StudentPlayActivityView: React.FC<StudentPlayActivityViewProps> = ({
  activity,
}) => {
  const { loading, currentActivity } = useActivityStudent();
  const { goBackToActivityView } = useActivityNavigation();
  const { finishActivity, canNavigate, refreshActivitiesOnNavigationAway } =
    useActivityActions();
  const navigationMessages = useActivityNavigationMessages(currentActivity);

  // EXPO: Registry Pattern: Obtener el hook del juego apropiado automáticamente
  const gameManager = useGameManager(currentActivity?.name || activity?.name);

  // Prevenir navegación mientras el estudiante está jugando
  usePreventNavigation({
    when: !!currentActivity && !loading,
    title: navigationMessages.confirmTitle,
    message: navigationMessages.confirmMessage,
    type: navigationMessages.confirmType,
    confirmText: "Sí, salir",
    cancelText: "No, continuar",
    allowNavigation: canNavigate,
    showToastOnBlock: true,
    toastTitle: navigationMessages.toastTitle,
    toastMessage: navigationMessages.toastMessage,
    toastType: navigationMessages.toastType,
    toastPosition: "bottom-right",
    toastDuration: 6000,
    onNavigationAttempt: () => {
      refreshActivitiesOnNavigationAway();
      // Aca podriamos guardar el progreso del juego en un futuro
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleFinishActivity = async () => {
    if (!currentActivity) return;

    await finishActivity(!!gameManager?.isGameWon);
  };

  const handleTimeUp = () => {
    finishActivity(false);
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
          onClick={() => goBackToActivityView()}
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
        maxTime={currentActivity?.maxTime}
        showTimer={!!currentActivity?.maxTime}
        onTimeUp={handleTimeUp}
      />

      <div className={styles.gameContent}>
        <GameRenderer currentActivity={currentActivity} />
      </div>

      <StudentActivityFooter
        loading={loading}
        //isFormValid={isGameFinished}
        onBack={goBackToActivityView}
        onNext={handleFinishActivity}
        nextButtonText="Finalizar Intento"
        backButtonText="DEBUG: Atras"
        showBackToList={false}
      />
    </motion.div>
  );
};

export default StudentPlayActivityView;
