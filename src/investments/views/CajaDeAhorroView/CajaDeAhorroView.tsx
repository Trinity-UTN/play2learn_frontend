import { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./CajaDeAhorroView.module.css";
import CreateCajaDeAhorroForm from "../../components/CajaDeAhorroView/CreateCajaDeAhorroForm/CreateCajaDeAhorroForm";
import CajaDeAhorroList from "../../components/CajaDeAhorroView/CajaDeAhorroList/CajaDeAhorroList";
import { useCajaDeAhorroStudent } from "../../hooks/useCajaDeAhorroAPI";
import { FaPiggyBank, FaCoins, FaChartLine, FaWallet } from "react-icons/fa";
import type { RegisterCajaDeAhorro } from "../../types/cajaAhorro.type";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import type { PaginationInfo } from "../../../shared/types/PaginacionType";

const CajaDeAhorroView = () => {
  const { wallet } = useCurrentStudent();
  const { getPaginatedCajaDeAhorro, cajaDeAhorro } = useCajaDeAhorroStudent();
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    // handleFilter,
  } = usePaginationParams();
  const userBalance = wallet ? wallet?.balance : 0;

  // Efecto para cargar los aspectos
  useEffect(() => {
    getPaginatedCajaDeAhorro(paginationParams);
  }, [paginationParams]);
  // 7️⃣ Paginación info

  const paginationInfo: PaginationInfo | null = cajaDeAhorro
    ? {
        currentPage: cajaDeAhorro.currentPage,
        totalPages: cajaDeAhorro.totalPages,
        pageSize: cajaDeAhorro.pageSize,
        totalItems: cajaDeAhorro.results.length,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }
    : null;

  const handleCreateCaja = async (data: RegisterCajaDeAhorro) => {
    console.log("[v0] Creating caja de ahorro:", data);
    // TODO: Llamar al backend para crear la caja de ahorro
    // const newCaja = await cajaDeAhorroService.create(data)
    // setCajasDeAhorro([...cajasDeAhorro, newCaja])
  };

  const handleDeposit = async (cajaId: number, amount: number) => {
    console.log("[v0] Depositing:", { cajaId, amount });
    // TODO: Llamar al backend para depositar
    // await cajaDeAhorroService.deposit({ id: cajaId, amount })
    // Actualizar la lista
  };

  const handleWithdraw = async (cajaId: number, amount: number) => {
    console.log("[v0] Withdrawing:", { cajaId, amount });
    // TODO: Llamar al backend para retirar
    // await cajaDeAhorroService.withdraw({ id: cajaId, amount })
    // Actualizar la lista
  };

  if (!cajaDeAhorro) {
    return null;
  }
  const totalSaved = cajaDeAhorro.results.reduce(
    (sum, caja) => sum + caja.currentAmount,
    0
  );
  const totalInterest = cajaDeAhorro.results.reduce(
    (sum, caja) => sum + caja.accumulatedInterest,
    0
  );
  const activeCajas = cajaDeAhorro.results.length;

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
            <motion.div
              className={styles.statCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div
                className={styles.statIcon}
                style={{
                  background: "linear-gradient(135deg, #22c55e, #15803d)",
                }}
              >
                <FaCoins />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>Total Ahorrado</span>
                <span className={styles.statValue}>
                  {totalSaved.toLocaleString("es-AR")}
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
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                }}
              >
                <FaChartLine />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>Interés Acumulado</span>
                <span className={styles.statValue}>
                  {totalInterest.toLocaleString("es-AR")}
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
                <FaWallet />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>Cajas Activas</span>
                <span className={styles.statValue}>{activeCajas}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Create Form */}
        <CreateCajaDeAhorroForm
          userBalance={userBalance}
          onSubmit={handleCreateCaja}
        />

        {/* List */}
        <CajaDeAhorroList
          cajasDeAhorro={cajaDeAhorro.results}
          userBalance={userBalance}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          paginationInfo={paginationInfo}
        />
      </div>
    </div>
  );
};

export default CajaDeAhorroView;
