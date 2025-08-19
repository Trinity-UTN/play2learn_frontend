import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import ProfileInfo from "../../components/profile/profileInfo/ProfileInfo";
import ProfileStats from "../../components/profile/profileStats/ProfileStats";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import styles from "./StudentProfileView.module.css";

const StudentProfileView: React.FC = () => {
  const { currentStudent, loading } = useCurrentStudent();
  const navigate = useNavigate();

  const handleEditAvatar = () => {
    navigate("/dashboard/student/profile/avatar");
  };

  if (loading && !currentStudent) {
    return (
      <motion.div
        className={styles.loadingContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.spinner} />
        <LoadingSpinnerComponent />
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
        <ProfileInfo
          currentStudent={currentStudent}
          onEditAvatar={handleEditAvatar}
          avatarSize="large"
          showLevel={true}
          showRing={true}
        />

        <ProfileStats
          streakDays={10}
          rankingPosition={8}
          achievementsCount={12}
        />
      </div>
    </motion.div>
  );
};

export default StudentProfileView;
