import type React from "react";
import { motion } from "framer-motion";
import { FaHistory, FaArrowUp, FaArrowDown, FaEye } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import type { WalletTransaction } from "../../../types/generalType";
import styles from "./RecentTransactions.module.css";

const RecentTransactions: React.FC = () => {
  const recentTransactions: WalletTransaction[] = [
    {
      id: "1",
      type: "earned",
      amount: 85,
      description: "Clasificación completada",
      date: "2024-03-15T14:30:00Z",
      category: "Actividad",
      icon: "🎯",
    },
    {
      id: "2",
      type: "spent",
      amount: 50,
      description: "Extensión de tiempo",
      date: "2024-03-15T10:15:00Z",
      category: "Beneficio",
      icon: "⏰",
    },
    {
      id: "3",
      type: "earned",
      amount: 120,
      description: "Ecuaciones completadas",
      date: "2024-03-14T16:45:00Z",
      category: "Actividad",
      icon: "🎯",
    },
    {
      id: "4",
      type: "earned",
      amount: 25,
      description: "Bonus racha 7 días",
      date: "2024-03-14T09:00:00Z",
      category: "Bonus",
      icon: "🔥",
    },
  ];

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
        {recentTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            className={styles.transactionItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className={styles.transactionLeft}>
              <div className={styles.transactionIcon}>{transaction.icon}</div>
              <div className={styles.transactionInfo}>
                <h4 className={styles.transactionDescription}>
                  {transaction.description}
                </h4>
                <div className={styles.transactionMeta}>
                  <span className={styles.transactionCategory}>
                    {transaction.category}
                  </span>
                  <span className={styles.transactionDate}>
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.transactionRight}>
              <div className={styles.transactionAmount}>
                <div
                  className={`${styles.amountIcon} ${styles[transaction.type]}`}
                >
                  {transaction.type === "earned" ? (
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
                  {transaction.type === "earned" ? "+" : "-"}
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
