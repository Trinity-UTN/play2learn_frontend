import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaEdit,
  FaFire,
  FaTrophy,
  FaStar,
} from "react-icons/fa";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button/ButtonComponent";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import styles from "./StudentProfileView.module.css";

const StudentProfileView: React.FC = () => {
  const { currentStudent, loading } = useCurrentStudent();
  const navigate = useNavigate();

  const getAvatarComponents = () => {
    const profile = currentStudent?.profile;
    return {
      body:
        profile?.selectedBody?.image || "/placeholder.svg?height=200&width=200",
      shirt:
        profile?.selectedShirt?.image ||
        "/placeholder.svg?height=200&width=200",
      hat:
        profile?.selectedHat?.image || "/placeholder.svg?height=200&width=200",
    };
  };

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
        <div className={styles.headerContent}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatarWrapper}>
                <img
                  src={getAvatarComponents().body}
                  alt="Profile Body"
                  className={`${styles.avatarImage} ${styles.avatarBody}`}
                />
                <img
                  src={getAvatarComponents().shirt}
                  alt="Profile Shirt"
                  className={`${styles.avatarImage} ${styles.avatarShirt}`}
                />
                <img
                  src={getAvatarComponents().hat}
                  alt="Profile Hat"
                  className={`${styles.avatarImage} ${styles.avatarHat}`}
                />
                <div className={styles.avatarRing}></div>
                <div className={styles.levelBadge}>
                  <FaStar size={12} />
                  <span>30</span>
                </div>
              </div>
            </div>

            <div className={styles.profileInfo}>
              <h1 className={styles.studentName}>
                {currentStudent?.name} {currentStudent?.lastname}
              </h1>
              <p className={styles.studentEmail}>
                {currentStudent?.user?.email}
              </p>
              <div className={styles.studentCourse}>
                <FaGraduationCap size={20} />
                <span>
                  {currentStudent?.course?.year?.name}{" "}
                  {currentStudent?.course?.name}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleEditAvatar}
            className={styles.editAvatarButton}
          >
            <FaEdit size={16} />
            Personalizar Avatar
          </Button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={`${styles.statIcon} ${styles.flame}`}>
              <FaFire size={24} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>10</span>
              <span className={styles.statLabel}>días de racha</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={`${styles.statIcon} ${styles.trophy}`}>
              <FaTrophy size={24} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>#8</span>
              <span className={styles.statLabel}>posición ranking</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={`${styles.statIcon} ${styles.star}`}>
              <FaStar size={24} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>12</span>
              <span className={styles.statLabel}>logros conseguidos</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentProfileView;
