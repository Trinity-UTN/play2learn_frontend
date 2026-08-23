import { useParams } from "react-router-dom";
import ActivityDetailsHeader from "../../components/activityDetails/activityDetailsHeader/ActivityDetailsHeader";
import ActivityDetailsConfig from "../../components/activityDetails/activityDetailsConfig/ActivityDetailsConfig";
import ActivityDetailsMetrics from "../../components/activityDetails/activityDetailsMetrics/ActivityDetailsMetrics";
import ActivityDetailsTable from "../../components/activityDetails/ActivityDetailsTable/ActivityDetailsTable";
import { useActivityDetailsTeacherData } from "../../hooks/activities/activityDetails/useActivityDetailsTeacherData";
import { useActivityDetailsTeacherActions } from "../../hooks/activities/activityDetails/useActivityDetailsTeacherActions";
import styles from "./ActivityDetailsView.module.css";
import { LoadingSpinnerComponent } from "@/shared";

const ActivityDetailsView = () => {
  const { activityId } = useParams<{ activityId: string }>();

  const { activity, loading } = useActivityDetailsTeacherData(activityId);
  const { handleGoBack, handleReexposeActivity } =
    useActivityDetailsTeacherActions();

  if (loading || !activityId) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinnerComponent />
      </div>
    );
  }

  if (!activity) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>No se encontró la actividad</p>
          <button onClick={handleGoBack} className={styles.backButtonError}>
            Volver
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <ActivityDetailsHeader
          activity={activity}
          onBack={handleGoBack}
          onEdit={() => {}}
          onReexpose={handleReexposeActivity}
          onDelete={() => {}}
        />
      </div>

      <div className={styles.section}>
        <ActivityDetailsConfig activity={activity} />
      </div>

      <div className={styles.section}>
        <ActivityDetailsMetrics activity={activity} />
      </div>

      <div className={styles.section}>
        <ActivityDetailsTable students={activity.activityStudentGetDtos} />
      </div>
    </div>
  );
};

export default ActivityDetailsView;
