import { FaPiggyBank } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./CajaDeAhorroHeader.module.css";
import { useStatsHeader } from "../../../hooks/useCajaDeAhorro/useStatsHeader";
type Props = {
  open: boolean;
  setOpen: (data: boolean) => void;
  totalSaved: number;
  totalInterest: number;
  activeCajas: number;
};

const CajaDeAhorroHeader = ({
  open,
  setOpen,
  totalInterest,
  totalSaved,
  activeCajas,
}: Props) => {
  const { stats } = useStatsHeader({ totalInterest, totalSaved, activeCajas });

  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.titleSection}>
        <motion.div
          className={styles.iconWrapper}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <FaPiggyBank />
        </motion.div>
        <div>
          <h1 className={styles.title}>Cajas de Ahorro</h1>
          <p className={styles.subtitle}>
            Ahorra y gana interés diario automáticamente
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={styles.statCard}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: stat.delay }}
          >
            <div
              className={styles.statIcon}
              style={{ background: stat.gradient }}
            >
              {stat.icon}
            </div>

            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <button onClick={() => setOpen(!open)} className={styles.buttonForm}>
        {!open ? "Nueva Caja de Ahorro" : "Cerrar formulario"}
      </button>
    </motion.div>
  );
};

export default CajaDeAhorroHeader;
