import { motion, type Variants } from "framer-motion";
import styles from "./DetailsNoLudicaGame.module.css";
import {
  FaBullseye,
  FaCheck,
  FaCoins,
  FaRegChartBar,
  FaSync,
} from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";

const DetailsNoLudicaGame = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      className={styles.detailsContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Estado Principal de Revisión */}
      <motion.div className={styles.reviewStatus} variants={itemVariants}>
        <div className={styles.statusIconWrapper}>
          <motion.div
            className={styles.statusIcon}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            📋
          </motion.div>
          <motion.div
            className={styles.pulseRing}
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        </div>
        <div className={styles.statusContent}>
          <h3>¡Actividad Enviada con Éxito!</h3>
          <p className={styles.statusMessage}>
            Tu trabajo está siendo revisado por el docente
          </p>
          <div className={styles.reviewBadge}>
            <span className={styles.badgeIcon}>⏳</span>
            <span className={styles.badgeText}>Pendiente de Revisión</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline de Revisión */}
      <motion.div className={styles.reviewTimeline} variants={itemVariants}>
        <h4>Proceso de Revisión</h4>
        <div className={styles.timelineContainer}>
          <div className={`${styles.timelineStep} ${styles.completed}`}>
            <div className={styles.stepIcon}>
              <FaCheck />
            </div>
            <div className={styles.stepContent}>
              <span className={styles.stepTitle}>Actividad Enviada</span>
            </div>
          </div>

          <div className={`${styles.timelineStep} ${styles.active}`}>
            <div className={styles.stepIcon}>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <FaSync />
              </motion.span>
            </div>
            <div className={styles.stepContent}>
              <span className={styles.stepTitle}>
                En Revisión por el Docente
              </span>
              <span className={styles.stepTime}>En curso</span>
            </div>
          </div>

          <div className={styles.timelineStep}>
            <div className={styles.stepIcon}>
              <FaRegChartBar />
            </div>
            <div className={styles.stepContent}>
              <span className={styles.stepTitle}>Calificación y Feedback</span>
              <span className={styles.stepTime}>Pendiente</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Información Útil */}
      <motion.div className={styles.helpSection} variants={itemVariants}>
        <h4>¿Qué sigue ahora?</h4>
        <div className={styles.helpCards}>
          <div className={styles.helpCard}>
            <span className={styles.helpIcon}>
              <IoIosNotifications />
            </span>
            <div className={styles.helpContent}>
              <h5>Recibirás una Notificación</h5>
              <p>Te avisaremos cuando tu docente haya completado la revisión</p>
            </div>
          </div>

          <div className={styles.helpCard}>
            <span className={styles.helpIcon}>
              <FaBullseye />
            </span>
            <div className={styles.helpContent}>
              <h5>Verás tu Calificación</h5>
              <p>Podrás ver tu puntaje y comentarios del docente</p>
            </div>
          </div>

          <div className={styles.helpCard}>
            <span className={styles.helpIcon}>
              <FaCoins />
            </span>
            <div className={styles.helpContent}>
              <h5>Obtendrás tus Monedas</h5>
              <p>Las monedas se acreditarán según tu calificación final</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Consejos */}
      <motion.div className={styles.tipsSection} variants={itemVariants}>
        <h4>✨ Mientras Esperas...</h4>
        <div className={styles.tipsList}>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>
              <GiBookshelf />
            </span>
            <span>Puedes continuar con otras actividades disponibles</span>
          </div>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>
              <FaBullseye />
            </span>
            <span>Revisa tus actividades pendientes en el panel principal</span>
          </div>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>
              <FaCoins />
            </span>
            <span>Usa tus monedas en la tienda para obtener beneficios</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailsNoLudicaGame;
