import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";
import type { ActivityUI } from "../../types/Activity.type";
import StudentActivityHeader from "../../components/common/StudentActivityHeader/StudentActivityHeader";
import StudentActivityFooter from "../../components/common/StudentActivityFooter/StudentActivityFooter";
import GameRenderer from "../../components/common/StudentGameRenderer/StudentGameRenderer";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import { useActivityActions } from "../../hooks/activities/useActivityActions";
import { useActivityNavigation } from "../../hooks/activities/useActivityNavigation";
import { useActivityNavigationMessages } from "../../hooks/activities/useActivityNavigationMessages";
import styles from "./StudentPlayActivityView.module.css";
import {
  useNoLudicaGame,
  usePreventNavigation,
  useGameManager,
  LoadingSpinnerComponent,
} from "@/shared";

interface StudentPlayActivityViewProps {
  activity?: ActivityUI;
}

const StudentPlayActivityView: React.FC<StudentPlayActivityViewProps> = ({
  activity,
}) => {
  const { loading, currentActivity } = useActivityStudent();
  const { goBackToActivityView } = useActivityNavigation();
  const {
    finishActivity,
    forceFinishActivity,
    canNavigate,
    refreshActivitiesOnNavigationAway,
  } = useActivityActions();
  const { handleFinishNoLudica, validateNoLudicaSubmission } =
    useNoLudicaGame();
  const navigationMessages = useActivityNavigationMessages(currentActivity);

  // Registry Pattern: Obtener el hook del juego apropiado automáticamente
  const gameManager = useGameManager(currentActivity?.name || activity?.name);
  const isNoLudica = currentActivity?.name === "No Ludica" ? true : false;

  // No prevenir navegación en juegos no lúdicos
  const shouldPreventNavigation = !!currentActivity && !loading && !isNoLudica;

  // Prevenir navegación mientras el estudiante está jugando
  usePreventNavigation({
    when: shouldPreventNavigation,
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
    preventTabSwitch: true,
    disapproveOnTabSwitch: true,
    tabSwitchDisapproveTitle: navigationMessages.tabSwitchDisapproveTitle,
    tabSwitchDisapproveMessage: navigationMessages.tabSwitchDisapproveMessage,
    onTabSwitchDisapprove: () => {
      // Desaprobar automáticamente sin importar el progreso del juego
      forceFinishActivity(false, gameManager);
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

    if (isNoLudica) {
      if (!validateNoLudicaSubmission()) return;

      await finishActivity(
        !!gameManager?.isGameWon,
        gameManager,
        handleFinishNoLudica,
      );
    } else {
      await finishActivity(!!gameManager?.isGameWon, gameManager);
    }
  };

  const handleTimeUp = () => {
    forceFinishActivity(false, gameManager);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinnerComponent />
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
        // onBack={goBackToActivityView}
        onNext={handleFinishActivity}
        nextButtonText="Finalizar Intento"
        // backButtonText="DEBUG: Atras"
        showBackToList={false}
      />
    </motion.div>
  );
};

export default StudentPlayActivityView;
