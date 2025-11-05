import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaCoins, FaRocket, FaBullseye } from "react-icons/fa";
import styles from "./LoadingScreen.module.css";
import { useLockScroll } from "../../hooks/useLockScroll";

const loadingMessages = [
  "Preparando tu portafolio...",
  "Analizando el mercado...",
  "Cargando oportunidades...",
  "Calculando rentabilidades...",
  "¡Casi listo para invertir!",
];
const loadingImg = [
  "/inversiones/1.webp",
  "/inversiones/2.webp",
  "/inversiones/3.webp",
  "/inversiones/4.webp",
  "/inversiones/5.webp",
];

type Props = {
  titulo?: string;
};
const LoadingScreen = ({ titulo }: Props) => {
  useLockScroll();
  const [messageIndex, setMessageIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(() =>
    Math.floor(Math.random() * loadingImg.length)
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cambiar mensaje cada 800ms
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    const imgInterval = setInterval(() => {
      setImgIndex(Math.floor(Math.random() * loadingImg.length));
    }, 1800);

    // Incrementar progreso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearInterval(imgInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <img
        src={loadingImg[imgIndex]}
        alt={loadingImg[imgIndex]}
        className={styles.img}
      />
      <div className={styles.content}>
        {/* Iconos flotantes */}
        <div className={styles.floatingIcons}>
          <motion.div
            className={styles.icon}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <FaChartLine />
          </motion.div>
          <motion.div
            className={styles.icon}
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            <FaCoins />
          </motion.div>
          <motion.div
            className={styles.icon}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <FaRocket />
          </motion.div>
          <motion.div
            className={styles.icon}
            animate={{
              y: [0, -18, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.9,
            }}
          >
            <FaBullseye />
          </motion.div>
        </div>

        {/* Logo principal */}
        <motion.div
          className={styles.logo}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <FaChartLine className={styles.mainIcon} />
        </motion.div>

        {/* Título */}
        <motion.h1
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {titulo ? titulo : "Cargando Inversiones"}
        </motion.h1>

        {/* Mensaje dinámico */}
        <motion.p
          key={messageIndex}
          className={styles.message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loadingMessages[messageIndex]}
        </motion.p>

        {/* Barra de progreso */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className={styles.progressText}>{Math.round(progress)}%</span>
        </div>

        {/* Texto motivacional */}
        <motion.p
          className={styles.motivationalText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ¡Prepárate para hacer crecer tu dinero! 💰
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
