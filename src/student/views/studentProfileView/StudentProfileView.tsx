import { motion } from "framer-motion";
import { LoadingSpinnerComponent } from "@/shared";
import ProfileInfo from "../../components/profile/profileInfo/ProfileInfo";
import ProfileStats from "../../components/profile/profileStats/ProfileStats";
import { useStudentProfileView } from "../../hooks/profile/useStudentProfileView";
import styles from "./StudentProfileView.module.css";
import LevelDisplay from "@/student/components/LevelDisplay/LevelDisplay";

const StudentProfileView: React.FC = () => {
  const { isLoading, hasStudent, profileProps, statsProps } =
    useStudentProfileView();
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={styles.profileContainer}
    >
      <div className={styles.headerSection}>
        <ProfileInfo {...profileProps} />
        <ProfileStats {...statsProps} />
        {profile && (
          <LevelDisplay
            level={profile.level}
            xp={profile.xp}
            xpToNextLevel={profile.xpToNextLevel}
          />
        )}
      </div>
    </motion.div>
  );
};

export default StudentProfileView;
