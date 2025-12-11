import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaArrowUp, FaArrowDown, FaEye } from "react-icons/fa";
import { Card, Button } from "@/shared";
import { useWalletStudent } from "../../../hooks/useWalletStudentAPI";
import type { TransactionType } from "../../../types/Wallet.type";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import styles from "./RecentTransactions.module.css";

const RecentTransactions: React.FC = () => {
  const { getLastTransactions, lastTransactions } = useWalletStudent();
  useEffect(() => {
    getLastTransactions();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Hoy";
    if (diffDays === 2) return "Ayer";
    if (diffDays <= 7) return `Hace ${diffDays - 1} días`;
    return date.toLocaleDateString("es-ES");
  };

  const getTypeTransactions = (type: TransactionType) => {
    switch (type) {
      case "EGRESO":
        return {
          icono: <IoMdTrendingDown />,
          color: "var(--color-text-error)",
        };
      case "INGRESO":
        return { icono: <IoMdTrendingUp />, color: "var(--color-stat-3)" };
    }
  };

  return (
    <Card className={styles.transactionsCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          <FaHistory className={styles.titleIcon} />
          Movimientos Recientes
        </h3>
        <Button variant="ghost" size="sm" className={styles.viewAllButton}>
          <FaEye />
          Ver todos
        </Button>
      </div>

      <div className={styles.transactionsList}>
        {lastTransactions.map((transaction, index) => (
          <motion.div
            key={index}
            className={styles.transactionItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className={styles.transactionLeft}>
              <div
                className={styles.transactionIcon}
                style={{
                  background: getTypeTransactions(transaction.type).color,
                }}
              >
                {getTypeTransactions(transaction.type).icono}
              </div>
              <div className={styles.transactionInfo}>
                <h4 className={styles.transactionDescription}>
                  {transaction.description}
                </h4>
                <div className={styles.transactionMeta}>
                  <span className={styles.transactionCategory}>
                    {transaction.type}
                  </span>
                  <span className={styles.transactionDate}>
                    {formatDate(transaction.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.transactionRight}>
              <div className={styles.transactionAmount}>
                <div
                  className={`${styles.amountIcon} ${styles[transaction.type]}`}
                >
                  {transaction.type === "INGRESO" ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
                </div>
                <span
                  className={`${styles.amountValue} ${
                    styles[transaction.type]
                  }`}
                >
                  {transaction.type === "INGRESO" ? "+" : "-"}
                  {transaction.amount}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.educationalNote}>
        <strong>📊 Control de gastos:</strong> Revisar tus movimientos te ayuda
        a entender en qué gastas y cómo puedes mejorar tus decisiones
        financieras.
      </div>
    </Card>
  );
};

export default RecentTransactions;
