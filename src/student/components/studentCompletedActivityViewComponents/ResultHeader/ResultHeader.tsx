import { motion, type Variants } from "framer-motion";
import styles from "./ResultHeader.module.css";
import { useCurrentStudent } from "../../../hooks/useCurrentStudent";
import { HiOutlineSparkles } from "react-icons/hi";
interface ResultHeaderProps {
  passed: boolean;
  activityTitle: string | undefined;
  subjectName: string | undefined;
}

export default function ResultHeader({
  passed,
  activityTitle,
  subjectName,
}: ResultHeaderProps) {
  const { currentStudent } = useCurrentStudent();
  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  return (
    <div
      className={`${styles.header} ${passed ? styles.success : styles.failure}`}
    >
      <motion.div
        className={styles.iconContainer}
        variants={iconVariants}
        initial="hidden"
        animate="visible"
      >
        {passed && (
          <motion.div
            className={styles.sparkles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <HiOutlineSparkles />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className={styles.textContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className={styles.title}>
          {passed
            ? `¡Felicitaciones ${currentStudent?.name}!`
            : "¡Sigue intentando!"}
        </h1>
        <h2 className={styles.subtitle}>
          {passed ? "Has completado la actividad" : "No has aprobado esta vez"}
        </h2>
        <div className={styles.activityInfo}>
          <span className={styles.activityTitle}>{activityTitle}</span>
          <span className={styles.subject}>{subjectName}</span>
        </div>
      </motion.div>
    </div>
  );
}
