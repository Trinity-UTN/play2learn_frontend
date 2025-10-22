import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import BenefitPaginateComponent from "../benefitPaginateComponent/BenefitPaginateComponent";
import BenefitStudentCard from "../benefitStudentCard/BenefitStudentCard";
import BenefitStudentTable from "../benefitStudentTable/BenefitStudentTable";
import styles from "./BenefitStudentList.module.css";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface BenefitStudentListProps {
  loading: boolean;
  benefits: any[];
  paginationInfo: PaginationInfo;
  viewMode: "grid" | "table";
}

const BenefitStudentList: React.FC<BenefitStudentListProps> = ({
  loading,
  benefits,
  paginationInfo,
  viewMode,
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
        <p className={styles.loadingText}>Cargando beneficios...</p>
      </div>
    );
  }

  return (
    <BenefitPaginateComponent pagination={paginationInfo}>
      {viewMode === "grid" ? (
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <BenefitStudentCard benefit={benefit} />
            </motion.div>
          ))}
        </div>
      ) : (
        <BenefitStudentTable benefits={benefits} />
      )}

      {/* Sin resultados */}
      {benefits.length === 0 && !loading && (
        <motion.div variants={itemVariants} className={styles.noResults}>
          <FaGift className={styles.noResultsIcon} />
          <h3 className={styles.noResultsTitle}>
            No se encontraron beneficios
          </h3>
          <p className={styles.noResultsText}>
            Intenta ajustar los filtros para encontrar más beneficios.
          </p>
        </motion.div>
      )}
    </BenefitPaginateComponent>
  );
};

export default BenefitStudentList;
