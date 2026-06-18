import { motion } from "framer-motion";
import { LoadingSpinnerComponent } from "@/shared";
import ProfileInfo from "../../components/profile/profileInfo/ProfileInfo";
import LevelDisplay from "@/student/components/LevelDisplay/LevelDisplay";
import { useStudentProfileView } from "../../hooks/profile/useStudentProfileView";
import styles from "./StudentProfileView.module.css";
import { useCurrentStudent } from "@/student/hooks/useCurrentStudent";
import QuickStats from "@/student/components/studentOverviewViewComponents/QuickStats/QuickStats";
import LastRealizationsComponents from "@/student/components/studentOverviewViewComponents/LastRealizations/LastRealizationsComponent";
import { FaCalendarAlt } from "react-icons/fa";

const StudentProfileView: React.FC = () => {
  const { statistics, loadingStatics } = useCurrentStudent();
  const { isLoading, hasStudent, profileProps } = useStudentProfileView();
  const profile = profileProps.currentStudent?.profile;

  if (isLoading && !hasStudent) {
    return (
      <motion.div
        className={styles.loadingContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LoadingSpinnerComponent size="lg" color="#f59e0b" />
      </motion.div>
    );
  }
  if (loadingStatics)
    return (
      <div className={styles.contLoading}>
        <LoadingSpinnerComponent colorText="white" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={styles.profileContainer}
    >
      <div className={styles.headerSection}>
        <div className={styles.dateInfo}>
          <FaCalendarAlt className={styles.dateIcon} />
          <span>
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <ProfileInfo {...profileProps} />
        {profile && (
          <LevelDisplay
            level={profile.level}
            xp={profile.xp}
            xpToNextLevel={profile.xpToNextLevel}
          />
        )}
      </div>
      <QuickStats statistics={statistics!} />

      <LastRealizationsComponents
        lastRealizations={statistics?.lastRealizations}
      />
    </motion.div>
  );
};

export default StudentProfileView;
