import type { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./StudentActivityHeader.module.css";

interface StudentActivityHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  itemVariants?: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
}

const StudentActivityHeader = ({
  icon,
  title,
  subtitle,
  itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}: StudentActivityHeaderProps) => {
  return (
    <motion.div variants={itemVariants} className={styles.header}>
      <div className={styles.titleSection}>
        <div className={styles.titleIcon}>{icon}</div>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentActivityHeader;
