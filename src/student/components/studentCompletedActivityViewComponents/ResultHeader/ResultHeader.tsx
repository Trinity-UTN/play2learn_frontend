import { motion } from "framer-motion";
import styles from "./ResultHeader.module.css";
import { useCurrentStudent } from "../../../hooks/useCurrentStudent";
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

  return (
    <div
      className={`${styles.header} ${passed ? styles.success : styles.failure}`}
    >
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
