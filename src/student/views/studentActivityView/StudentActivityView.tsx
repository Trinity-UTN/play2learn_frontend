import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";
import type { ActivityUI } from "../../types/Activity.type";
import StudentActivityHeader from "../../components/common/StudentActivityHeader/StudentActivityHeader";
import StudentActivityFooter from "../../components/common/StudentActivityFooter/StudentActivityFooter";
import ActivityDetails from "../../components/studentActivity/activityDetails/ActivityDetailts";
import ActivityStatus from "../../components/studentActivity/activityStatus/ActivityStatus";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import styles from "./StudentActivityView.module.css";

interface StudentActivityViewProps {
  activity?: ActivityUI;
}

const StudentActivityView: React.FC<StudentActivityViewProps> = ({
  activity,
}) => {
  const { loading, currentActivity } = useActivityStudent();
  const { id } = useParams<{ id: string }>();
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

  const isDetailedView = location.pathname.includes("view");

  const handleStartActivity = () => {
    if (id) {
      navigate(`/dashboard/student/actividades/${id}/play`);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard/student/actividades/list");
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
        <button onClick={handleGoBack} className={styles.backButton}>
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
      className={styles.activityView}
    >
      <StudentActivityHeader
        icon={<FaGamepad />}
        title={currentActivity?.name || "Actividad"}
        subtitle={"Detalles de la actividad"}
      />

      <div className={styles.mainContent}>
        <ActivityDetails
          currentActivity={currentActivity}
          activity={activity}
        />

        <ActivityStatus currentActivity={currentActivity} activity={activity} />
      </div>

      <StudentActivityFooter
        loading={loading}
        onNext={handleStartActivity}
        nextButtonText="Comenzar Actividad"
        showBackToList={isDetailedView}
      />
    </motion.div>
  );
};

export default StudentActivityView;
