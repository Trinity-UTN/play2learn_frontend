import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import styles from "./StudentCompletedActivityView.module.css";
import { useEffect, useState } from "react";
import ConfettiEffect from "../../components/studentCompletedActivityViewComponents/ConfettiEffect/ConfettiEffect";
import ResultHeader from "../../components/studentCompletedActivityViewComponents/ResultHeader/ResultHeader";
import CoinsReward from "../../components/studentCompletedActivityViewComponents/CoinsReward/CoinsReward";
import ActionButtons from "../../components/studentCompletedActivityViewComponents/ActionButtons/ActionButtons";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import DetailsGeneral from "../../../shared/components/DetailsGame/DetailsGeneral/DetailsGeneral";

const StudentCompletedActivityView = () => {
  const { loading, currentActivity, activityCompleted } = useActivityStudent();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [passed, setPassed] = useState<boolean>(false);

  useEffect(() => {
    if (activityCompleted?.state === "APPROVED") {
      setPassed(true);
    } else {
      setPassed(false);
    }
  });

  useEffect(() => {
    if (passed) {
      setShowConfetti(true);
      // Secuencia de animaciones
      const timer1 = setTimeout(() => setAnimationPhase(1), 500);
      const timer2 = setTimeout(() => setAnimationPhase(2), 1500);
      const timer3 = setTimeout(() => setAnimationPhase(3), 2500);
      const timer4 = setTimeout(() => setShowConfetti(false), 5000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [passed]);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentActivity) {
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
    <div className={styles.container}>
      <AnimatePresence>{showConfetti && <ConfettiEffect />}</AnimatePresence>

      <motion.div
        className={`${styles.resultCard} ${
          passed ? styles.success : styles.failure
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <ResultHeader
            passed={passed}
            activityTitle={currentActivity?.name}
            subjectName={currentActivity?.subject.name}
          />
        </motion.div>

        {passed && (
          <motion.div variants={itemVariants}>
            <CoinsReward
              coinsEarned={activityCompleted?.reward} //Monedas ganadas
              animationPhase={animationPhase}
            />
          </motion.div>
        )}
        <motion.div variants={itemVariants}>
          <DetailsGeneral activityName={currentActivity?.name} />
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <ActionButtons passed={passed} activity={currentActivity} />
      </motion.div>
    </div>
  );
};

export default StudentCompletedActivityView;
