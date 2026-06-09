import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { Card } from "@/shared";
import type { TransactionType } from "../../../types/Wallet.type";
import { formatDate } from "@/shared/utils/format";
import { useWalletStudent } from "../../../hooks/useWalletStudentAPI";
import styles from "./RecentTransactions.module.css";

const RecentTransactions: React.FC = () => {
  const { getLastTransactions, lastTransactions } = useWalletStudent();
  useEffect(() => {
    getLastTransactions();
  }, [getLastTransactions]);

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
