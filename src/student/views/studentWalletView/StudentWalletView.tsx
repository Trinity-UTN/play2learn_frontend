import { motion } from "framer-motion";
import { FaWallet, FaGraduationCap } from "react-icons/fa";
import WalletSummary from "../../components/studentWalletViewComponents/walletSummary/WalletSummary";
// import FinancialOverview from "../../components/studentWalletViewComponents/financialOverview/FinancialOverview";
import QuickActions from "../../components/studentWalletViewComponents/quickActions/QuickActions";
import RecentTransactions from "../../components/studentWalletViewComponents/recentTransactions/RecentTransactions";
import EducationalTips from "../../components/studentWalletViewComponents/educationalTips/EducationTips";
import Button from "../../../shared/components/Button/ButtonComponent";
import type { FinancialSummary } from "../../types/generalType";
import styles from "./StudentWalletView.module.css";
import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
const StudentWalletView = () => {
  const { wallet, loading } = useCurrentStudent();

  const financialData: FinancialSummary = {
    availableCoins: Number(wallet?.balance) - Number(wallet?.invertedBalance),
    investedCoins: Number(wallet?.invertedBalance),
    totalBalance: Number(wallet?.balance),
    lastMovementDate: "2024-03-15T14:30:00Z",
    monthlyGrowth: 12.5,
    savingsGoal: 5000,
    currentSavings: 1200,
  };

  const navigate = useNavigate();
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

  {
    if (loading) return <LoadingSpinnerComponent />;
  }
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
            Mi Billetera Digital
          </h1>
          <p className={styles.subtitle}>
            Aprende a gestionar tus finanzas mientras juegas
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate("financial-education")}
          className={styles.educationButton}
        >
          <FaGraduationCap className={styles.educationIcon} />
          Aprende Finanzas
        </Button>
      </motion.div>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <motion.div variants={itemVariants}>
            <WalletSummary data={financialData} />
          </motion.div>

          {/* <motion.div variants={itemVariants}>
          </motion.div> */}
          {/* TODO: Componente para agregar en el panel principal */}
          {/* <FinancialOverview data={financialData} /> */}
          <motion.div variants={itemVariants}>
            <EducationalTips />
          </motion.div>
        </div>

        <div className={styles.sideSection}>
          <motion.div variants={itemVariants}>
            <QuickActions />
          </motion.div>
          <motion.div variants={itemVariants}>
            <RecentTransactions />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentWalletView;
