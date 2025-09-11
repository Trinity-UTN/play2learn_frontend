import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { ActivityUI } from "../../types/Activity.type";
import ComingSoon from "../../../shared/components/comingSoon/ComingSoon";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import styles from "./StudentCompletedActivityView.module.css";

interface StudentCompletedActivityViewProps {
  activity?: ActivityUI;
}

const StudentCompletedActivityView: React.FC<
  StudentCompletedActivityViewProps
> = ({ activity }) => {
  const { loading, currentActivity } = useActivityStudent();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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
      <ComingSoon />
    </motion.div>
  );
};

export default StudentCompletedActivityView;
