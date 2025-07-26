"use client";

import type React from "react";
import { motion } from "framer-motion";
import styles from "./ActivityView.module.css";
import { useParams } from "react-router-dom";
import { activityComponentMap } from "../../utils/activityComponentMap";

const ActivityView: React.FC = () => {
  const { code_game } = useParams();
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  if (!code_game) return <p>Actividad no especificada</p>;
  const SelectedComponent = activityComponentMap[code_game];

  if (!SelectedComponent) {
    return <p>Actividad no encontrada: "{code_game}"</p>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <SelectedComponent />
    </motion.div>
  );
};

export default ActivityView;
