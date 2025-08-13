"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaGamepad,
  FaStore,
  FaGift,
  FaChartLine,
  FaFilter,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import type { WalletTransaction } from "../../types/walletType";
import styles from "./StudentWalletView.module.css";

const StudentWalletView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const walletData = {
    balance: 2450,
    totalEarned: 5680,
    totalSpent: 3230,
    monthlyEarned: 890,
    monthlySpent: 340,
  };

  const transactions: WalletTransaction[] = [
    {
      id: "1",
      type: "earned",
      amount: 85,
      description: "Clasificación de Animales completada",
      date: "2024-03-15T14:30:00Z",
      category: "Actividad",
      icon: "🎯",
    },
    {
      id: "2",
      type: "spent",
      amount: 50,
      description: "Beneficio: Extensión de tiempo",
      date: "2024-03-15T10:15:00Z",
      category: "Beneficio",
      icon: "⏰",
    },
    {
      id: "3",
      type: "earned",
      amount: 120,
      description: "Ecuaciones Cuadráticas completada",
      date: "2024-03-14T16:45:00Z",
      category: "Actividad",
      icon: "🎯",
    },
    {
      id: "4",
      type: "earned",
      amount: 25,
      description: "Bonus por racha de 7 días",
      date: "2024-03-14T09:00:00Z",
      category: "Bonus",
      icon: "🔥",
    },
    {
      id: "5",
      type: "spent",
      amount: 100,
      description: "Avatar personalizado",
      date: "2024-03-13T12:20:00Z",
      category: "Tienda",
      icon: "🛒",
    },
    {
      id: "6",
      type: "earned",
      amount: 75,
      description: "Historia de México completada",
      date: "2024-03-13T11:30:00Z",
      category: "Actividad",
      icon: "🎯",
    },
    {
      id: "7",
      type: "spent",
      amount: 30,
      description: "Pista extra para actividad",
      date: "2024-03-12T15:10:00Z",
      category: "Beneficio",
      icon: "💡",
    },
    {
      id: "8",
      type: "earned",
      amount: 95,
      description: "Secuencia de Química completada",
      date: "2024-03-12T14:00:00Z",
      category: "Actividad",
      icon: "🎯",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "earned") return transaction.type === "earned";
    if (selectedFilter === "spent") return transaction.type === "spent";
    return transaction.category.toLowerCase() === selectedFilter;
  });

  const filterOptions = [
    { value: "all", label: "Todas", icon: FaFilter },
    { value: "earned", label: "Ganadas", icon: FaArrowUp },
    { value: "spent", label: "Gastadas", icon: FaArrowDown },
    { value: "actividad", label: "Actividades", icon: FaGamepad },
    { value: "tienda", label: "Tienda", icon: FaStore },
    { value: "beneficio", label: "Beneficios", icon: FaGift },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.wallet}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <FaWallet className={styles.titleIcon} />
            Mi Billetera
          </h1>
          <p className={styles.subtitle}>
            Gestiona tus monedas y revisa tu historial
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.balanceSection}>
        <Card className={styles.balanceCard}>
          <div className={styles.balanceContent}>
            <div className={styles.mainBalance}>
              <div className={styles.balanceIcon}>
                <FaWallet />
              </div>
              <div className={styles.balanceInfo}>
                <h2 className={styles.balanceAmount}>
                  {walletData.balance.toLocaleString()}
                </h2>
                <p className={styles.balanceLabel}>Monedas Disponibles</p>
              </div>
            </div>
            <div className={styles.balanceStats}>
              <div className={styles.stat}>
                <div
                  className={styles.statIcon}
                  style={{ backgroundColor: "#10B98120", color: "#10B981" }}
                >
                  <FaArrowUp />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>
                    {walletData.totalEarned.toLocaleString()}
                  </span>
                  <span className={styles.statLabel}>Total Ganado</span>
                </div>
              </div>
              <div className={styles.stat}>
                <div
                  className={styles.statIcon}
                  style={{ backgroundColor: "#EF444420", color: "#EF4444" }}
                >
                  <FaArrowDown />
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>
                    {walletData.totalSpent.toLocaleString()}
                  </span>
                  <span className={styles.statLabel}>Total Gastado</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.monthlyStats}>
        <Card className={styles.monthlyCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <FaChartLine className={styles.cardIcon} />
              Este Mes
            </h3>
          </div>
          <div className={styles.monthlyContent}>
            <div className={styles.monthlyStat}>
              <div
                className={styles.monthlyIcon}
                style={{ backgroundColor: "#10B98120", color: "#10B981" }}
              >
                <FaArrowUp />
              </div>
              <div className={styles.monthlyInfo}>
                <span className={styles.monthlyValue}>
                  +{walletData.monthlyEarned}
                </span>
                <span className={styles.monthlyLabel}>Ganadas</span>
              </div>
            </div>
            <div className={styles.monthlyStat}>
              <div
                className={styles.monthlyIcon}
                style={{ backgroundColor: "#EF444420", color: "#EF4444" }}
              >
                <FaArrowDown />
              </div>
              <div className={styles.monthlyInfo}>
                <span className={styles.monthlyValue}>
                  -{walletData.monthlySpent}
                </span>
                <span className={styles.monthlyLabel}>Gastadas</span>
              </div>
            </div>
            <div className={styles.monthlyNet}>
              <span className={styles.netLabel}>Balance:</span>
              <span className={styles.netValue}>
                +{walletData.monthlyEarned - walletData.monthlySpent}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={styles.transactionsSection}
      >
        <Card className={styles.transactionsCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Historial de Transacciones</h3>
            <div className={styles.filters}>
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    selectedFilter === option.value ? "primary" : "ghost"
                  }
                  size="sm"
                  onClick={() => setSelectedFilter(option.value)}
                  className={styles.filterButton}
                >
                  <option.icon className={styles.filterIcon} />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.transactionsList}>
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className={styles.transactionItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <div className={styles.transactionLeft}>
                  <div className={styles.transactionIcon}>
                    {transaction.icon}
                  </div>
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
                  <span
                    className={`${styles.transactionAmount} ${
                      styles[transaction.type]
                    }`}
                  >
                    {transaction.type === "earned" ? "+" : "-"}
                    {transaction.amount}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StudentWalletView;
