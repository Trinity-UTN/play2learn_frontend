import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import PaginateComponent from "../../../../../shared/components/PaginateComponent/PaginateComponent";
import BenefitPurchaseCard from "../benefitPurchaseCard/BenefitPurchaseCard";
import type { BenefitPurchaseSimpleResponse } from "../../../../../benefit/types/benefit.types";
import styles from "./BenefitPurchaseList.module.css";

interface BenefitPurchaseListProps {
  purchases: BenefitPurchaseSimpleResponse[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  } | null;
  onAcceptUse: (purchaseId: number) => void;
  loading: boolean;
}

const BenefitPurchaseList: React.FC<BenefitPurchaseListProps> = ({
  purchases,
  paginationInfo,
  onAcceptUse,
  loading,
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <PaginateComponent pagination={paginationInfo || undefined}>
      <div className={styles.purchasesList}>
        {purchases.map((purchase) => (
          <motion.div
            key={purchase.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BenefitPurchaseCard
              purchase={purchase}
              onAcceptUse={onAcceptUse}
              loading={loading}
            />
          </motion.div>
        ))}
      </div>

      {/* Sin resultados */}
      {purchases.length === 0 && !loading && (
        <motion.div variants={itemVariants} className={styles.noResults}>
          <FaShoppingCart className={styles.noResultsIcon} />
          <h3 className={styles.noResultsTitle}>No se encontraron canjes</h3>
          <p className={styles.noResultsText}>
            No hay canjes registrados para este beneficio con los filtros
            seleccionados.
          </p>
        </motion.div>
      )}
    </PaginateComponent>
  );
};

export default BenefitPurchaseList;
