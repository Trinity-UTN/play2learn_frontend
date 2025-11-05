import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./PlazoFijoView.module.css";
import CreatePlazoFijoForm from "../../components/PlazoFijoView/CreatePlazoFijoForm/CreatePlazoFijoForm";
import PlazoFijoList from "../../components/PlazoFijoView/PlazoFijoList/PlazoFijoList";
import { FaClock, FaCoins, FaChartLine, FaCheckCircle } from "react-icons/fa";
import type {
  PlazoFijoResponse,
  RegisterPlazoFijo,
} from "../../types/plazoFijo.type";

// Mock data para desarrollo
const mockPlazosFijos: PlazoFijoResponse[] = [
  {
    id: 1,
    amountInvested: 5000,
    amountReward: 5250,
    fixedTermDays: "MENSUAL",
    startDate: "2025-01-05",
    endDate: "2025-02-05",
    fixedTermState: "IN_PROGRESS",
  },
  {
    id: 2,
    amountInvested: 10000,
    amountReward: 10150,
    fixedTermDays: "QUINCENAL",
    startDate: "2024-12-20",
    endDate: "2025-01-04",
    fixedTermState: "FINISHED",
  },
  {
    id: 3,
    amountInvested: 3000,
    amountReward: 3045,
    fixedTermDays: "SEMANAL",
    startDate: "2025-01-01",
    endDate: "2025-01-08",
    fixedTermState: "IN_PROGRESS",
  },
];

interface PlazoFijoViewProps {
  userBalance?: number;
}

const PlazoFijoView: React.FC<PlazoFijoViewProps> = ({
  userBalance = 50000,
}) => {
  const [plazosFijos] = useState<PlazoFijoResponse[]>(mockPlazosFijos);

  const handleCreatePlazoFijo = async (data: RegisterPlazoFijo) => {
    console.log("[v0] Creating plazo fijo:", data);
    // TODO: Llamar al backend para crear el plazo fijo
    // const newPlazoFijo = await plazoFijoService.create(data)
    // setPlazosFijos([...plazosFijos, newPlazoFijo])
  };

  const totalInvested = plazosFijos.reduce(
    (sum, pf) => sum + pf.amountInvested,
    0
  );
  const totalRewards = plazosFijos.reduce(
    (sum, pf) => sum + (pf.amountReward - pf.amountInvested),
    0
  );
  const activePlazosFijos = plazosFijos.filter(
    (pf) => pf.fixedTermState === "IN_PROGRESS"
  ).length;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
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
              <FaClock />
            </motion.div>
            <div>
              <h1 className={styles.title}>Plazos Fijos</h1>
              <p className={styles.subtitle}>
                Inversión segura con retorno garantizado
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <motion.div
              className={styles.statCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div
                className={styles.statIcon}
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                }}
              >
                <FaCoins />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>Total Invertido</span>
                <span className={styles.statValue}>
                  {totalInvested.toLocaleString("es-AR")}
                </span>
              </div>
            </motion.div>

            <motion.div
              className={styles.statCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className={styles.statIcon}
                style={{
                  background: "linear-gradient(135deg, #22c55e, #15803d)",
                }}
              >
                <FaChartLine />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>Ganancias Totales</span>
                <span className={styles.statValue}>
                  {totalRewards.toLocaleString("es-AR")}
                </span>
              </div>
            </motion.div>

            <motion.div
              className={styles.statCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className={styles.statIcon}
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                }}
              >
                <FaCheckCircle />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>Plazos Activos</span>
                <span className={styles.statValue}>{activePlazosFijos}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Create Form */}
        <CreatePlazoFijoForm
          userBalance={userBalance}
          onSubmit={handleCreatePlazoFijo}
        />

        {/* List */}
        <PlazoFijoList plazosFijos={plazosFijos} />
      </div>
    </div>
  );
};

export default PlazoFijoView;
