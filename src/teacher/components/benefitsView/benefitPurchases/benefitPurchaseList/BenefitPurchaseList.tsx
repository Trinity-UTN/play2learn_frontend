import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { EmptyStateComponent } from "../../../../../shared/components/EmptyState/EmptyStateComponent";
import PaginateComponent from "../../../../../shared/components/PaginateComponent/PaginateComponent";
import BenefitPurchaseCard from "../benefitPurchaseCard/BenefitPurchaseCard";
import type { BenefitPurchaseSimpleResponse } from "../../../../../benefit/types/benefit.types";
import { benefitItemVariants } from "../../../../constants/animations/benefitTeacher.animations";
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
  return (
    <PaginateComponent pagination={paginationInfo || undefined}>
      <div className={styles.purchasesList}>
        {purchases.map((purchase) => (
          <motion.div
            key={purchase.id}
            variants={benefitItemVariants}
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
        <EmptyStateComponent
          title="No se encontraron canjes"
          message="No hay canjes registrados para este beneficio con los filtros
            seleccionados."
          icon={<FaShoppingCart className={styles.noResultsIcon} />}
        />
      )}
    </PaginateComponent>
  );
};

export default BenefitPurchaseList;
