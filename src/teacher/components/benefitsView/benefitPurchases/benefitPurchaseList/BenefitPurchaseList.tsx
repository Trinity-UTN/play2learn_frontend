import { motion } from "framer-motion";
import BenefitPurchaseCard from "../benefitPurchaseCard/BenefitPurchaseCard";
import type { BenefitPurchaseSimpleResponse } from "../../../../../benefit/types/benefit.types";
import styles from "./BenefitPurchaseList.module.css";

interface BenefitPurchasesListProps {
  purchases: BenefitPurchaseSimpleResponse[];
  onAcceptUse: (purchaseId: number) => void;
  loading: boolean;
}

const BenefitPurchasesList: React.FC<BenefitPurchasesListProps> = ({
  purchases,
  onAcceptUse,
  loading,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (purchases.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>
          No hay canjes registrados para este beneficio
        </p>
      </div>
    );
  }

  console.log("Rendering BenefitPurchasesList with purchases:", purchases);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.purchasesList}
    >
      {purchases.map((purchase) => (
        <BenefitPurchaseCard
          key={purchase.id}
          purchase={purchase}
          onAcceptUse={onAcceptUse}
          loading={loading}
        />
      ))}
    </motion.div>
  );
};

export default BenefitPurchasesList;
