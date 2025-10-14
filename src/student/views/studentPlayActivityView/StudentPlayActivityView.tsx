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
import styles from "./StudentPlayActivityView.module.css";
import { useNoLudicaGame } from "../../../shared/hooks/games/useNoLudicaGame";

interface StudentPlayActivityViewProps {
  activity?: ActivityUI;
}

const StudentPlayActivityView: React.FC<StudentPlayActivityViewProps> = ({
  activity,
}) => {
  const { loading, currentActivity } = useActivityStudent();
  const { goBackToActivityView } = useActivityNavigation();
  const { finishActivity } = useActivityActions();
  const { handleFinishNoLudica } = useNoLudicaGame();
  // EXPO: Registry Pattern: Obtener el hook del juego apropiado automáticamente
  const gameManager = useGameManager(currentActivity?.name || activity?.name);
  //const isGameFinished = gameManager?.isGameWon || gameManager?.isGameLost;
  const isNoLudica = currentActivity?.name === "No Ludica" ? true : false;
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
      await finishActivity(!!gameManager?.isGameWon, handleFinishNoLudica);
    } else {
      await finishActivity(!!gameManager?.isGameWon);
    }
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
