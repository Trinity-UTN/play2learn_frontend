import type React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaTools } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import styles from "./ListSubjectView.module.css";

const ListStudentView: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div>
          <div className={styles.constructionBanner}>
            <FaTools className={styles.constructionIcon} />
            <h1 className={styles.title}>
              Visualización de Materias - En Construcción
            </h1>
            <p className={styles.subtitle}>Esta página está en desarrollo.</p>
          </div>
        </div>
        <Button variant="primary">
          <FaGraduationCap className={styles.buttonIcon} />
          Nueva Materia
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ListStudentView;
