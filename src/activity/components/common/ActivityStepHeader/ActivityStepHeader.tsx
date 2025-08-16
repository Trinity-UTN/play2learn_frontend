import type { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./ActivityStepHeader.module.css";

interface ActivityStepHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  currentStep: number;
  totalSteps: 2 | 3;
  itemVariants?: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
}

const ActivityStepHeader = ({
  icon,
  title,
  subtitle,
  currentStep,
  totalSteps,
  itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}: ActivityStepHeaderProps) => {
  const getStepClass = (stepNumber: number) => {
    if (stepNumber < currentStep) return `${styles.step} ${styles.completed}`;
    if (stepNumber === currentStep) return `${styles.step} ${styles.active}`;
    return styles.step;
  };

  return (
    <motion.div variants={itemVariants} className={styles.header}>
      <div className={styles.titleSection}>
        <div className={styles.titleIcon}>{icon}</div>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <div className={styles.stepIndicator}>
        <div className={getStepClass(1)}>1</div>
        <div className={styles.stepLine}></div>
        <div className={getStepClass(2)}>2</div>
        {totalSteps === 3 && (
          <>
            <div className={styles.stepLine}></div>
            <div className={getStepClass(3)}>3</div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityStepHeader;
