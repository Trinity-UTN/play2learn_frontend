import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { LoadingSpinnerComponent } from "@/shared";
import StudentActivityHeader from "../../components/common/StudentActivityHeader/StudentActivityHeader";
import StudentActivityFooter from "../../components/common/StudentActivityFooter/StudentActivityFooter";
import ActivityResultsDetails from "../../components/studentActivityResults/activityResultsDetails/ActivityResultsDetails";
import ActivityResultsStats from "../../components/studentActivityResults/activityResultsStats/ActivityResultsStats";
import ActivityResultsFeedback from "../../components/studentActivityResults/activityResultsFeedback/ActivityResultsFeedback";
import { useActivityResults } from "../../hooks/activities/activityResults/useActivityResults";
import { useActivityNavigation } from "../../hooks/activities/useActivityNavigation";
import styles from "./StudentActivityResultsView.module.css";

const StudentActivityResultsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { results, activity, loading, error } = useActivityResults(Number(id));
  const { goBackToList } = useActivityNavigation();

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
        <LoadingSpinnerComponent />
      </div>
    );
  }

  if (error || !results || !activity) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error al cargar resultados</h2>
        <p>
          {error || "No se pudieron cargar los resultados de la actividad."}
        </p>
        <button onClick={goBackToList} className={styles.backButton}>
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
        icon={<FaTrophy />}
        title={activity.name}
        subtitle="Resultados de la actividad"
      />

      <div className={styles.mainContent}>
        <ActivityResultsDetails activity={activity} />
        <ActivityResultsStats results={results} activity={activity} />
        <ActivityResultsFeedback
          teacherComment={"El docente no ha realizado comentarios aún"}
        />
        {/* <ActivityResultsFeedback teacherComment={results.teacherComment} /> */}
      </div>

      <StudentActivityFooter
        loading={false}
        onBack={goBackToList}
        showBackToList={true}
      />
    </motion.div>
  );
};

export default StudentActivityResultsView;
