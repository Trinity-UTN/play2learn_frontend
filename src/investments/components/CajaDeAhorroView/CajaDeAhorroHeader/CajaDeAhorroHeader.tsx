import { FaPiggyBank, FaCoins, FaChartLine, FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./CajaDeAhorroHeader.module.css";
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
  const stats = [
    {
      icon: <FaCoins />,
      label: "Total Ahorrado",
      value: totalSaved.toLocaleString("es-AR"),
      gradient: "linear-gradient(135deg, #22c55e, #15803d)",
      delay: 0.1,
    },
    {
      icon: <FaChartLine />,
      label: "Interés Acumulado",
      value: totalInterest.toLocaleString("es-AR"),
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      delay: 0.2,
    },
    {
      icon: <FaWallet />,
      label: "Cajas Activas",
      value: activeCajas,
      gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
      delay: 0.3,
    },
  ];

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
