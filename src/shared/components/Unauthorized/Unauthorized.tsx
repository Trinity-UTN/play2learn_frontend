"use client";

import type React from "react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaHome,
  FaArrowLeft,
  FaLock,
} from "react-icons/fa";
import Button from "../Button/ButtonComponent";
import Card from "../Card/CardComponent";
import styles from "./Unauthorized.module.css";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={styles.container}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.content}
      >
        {/* Elementos decorativos flotantes */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={styles.floatingIcon}
          style={{ top: "10%", left: "10%" }}
        >
          <FaLock className={styles.decorativeIcon} />
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={styles.floatingIcon}
          style={{ top: "20%", right: "15%", animationDelay: "1s" }}
        >
          <FaExclamationTriangle className={styles.decorativeIcon} />
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={styles.floatingIcon}
          style={{ bottom: "15%", left: "20%", animationDelay: "2s" }}
        >
          <FaLock className={styles.decorativeIcon} />
        </motion.div>

        <Card className={styles.errorCard}>
          <motion.div variants={itemVariants} className={styles.iconWrapper}>
            <motion.div variants={iconVariants} className={styles.errorIcon}>
              <FaExclamationTriangle />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.errorContent}>
            <h1 className={styles.errorCode}>401</h1>
            <h2 className={styles.errorTitle}>Acceso No Autorizado</h2>
            <p className={styles.errorMessage}>
              Lo sentimos, no tienes permisos para acceder a esta página. Es
              posible que necesites iniciar sesión con una cuenta que tenga los
              privilegios necesarios.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.errorDetails}>
            <div className={styles.detailItem}>
              <FaLock className={styles.detailIcon} />
              <span>Permisos insuficientes</span>
            </div>
            <div className={styles.detailItem}>
              <FaExclamationTriangle className={styles.detailIcon} />
              <span>Acceso restringido</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.actionButtons}>
            <Button
              variant="primary"
              onClick={handleGoHome}
              className={styles.primaryButton}
            >
              <FaHome className={styles.buttonIcon} />
              Ir al Login
            </Button>

            <Button
              variant="outline"
              onClick={handleGoBack}
              className={styles.secondaryButton}
            >
              <FaArrowLeft className={styles.buttonIcon} />
              Volver Atrás
            </Button>
          </motion.div>
        </Card>

        <motion.div variants={itemVariants} className={styles.helpText}>
          <p>
            Si crees que esto es un error, contacta al administrador del sistema
            o verifica que tengas los permisos necesarios para acceder a esta
            sección.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
