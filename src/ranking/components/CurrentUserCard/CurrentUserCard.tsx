import { motion } from "framer-motion";
import { FaUser, FaCoins, FaGamepad } from "react-icons/fa";
import type { Position } from "../../types/ranking.type";
import styles from "./CurrentUserCard.module.css";

interface CurrentUserCardProps {
  position: Position;
  category: "coins" | "activities";
}

export const CurrentUserCard = ({
  position,
  category,
}: CurrentUserCardProps) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <FaUser className={styles.userIcon} />
        <h3 className={styles.title}>Tu Posición</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.positionSection}>
          <motion.div
            className={styles.positionNumber}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            #{position.position}
          </motion.div>
          <p className={styles.positionLabel}>Puesto</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              {category === "coins" ? <FaCoins /> : <FaGamepad />}
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statValue}>
                {position.quantity.toLocaleString()}{" "}
                <span>
                  {category === "coins"
                    ? "Monedas ganadas"
                    : "Actividades aprobadas"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.motivationalText}>
        {position.position <= 3
          ? "¡Excelente trabajo! Estás en el podio 🏆"
          : position.position <= 10
            ? "¡Casi en el top 10! Sigue así 💪"
            : "¡Sigue mejorando para subir de posición! 🚀"}
      </div>
    </motion.div>
  );
};
