import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";
import PaginateComponent from "../../../../shared/components/PaginateComponent/PaginateComponent";
import BenefitCard from "../benefitCardComponent/benefitCard/BenefitCard";
import BenefitTable from "../benefitTable/BenefitTable";
import type { TeacherBenefitType } from "../../../../benefit/types/benefit.types";
import styles from "./BenefitsList.module.css";

type BenefitsListProps = {
  benefits: TeacherBenefitType[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  } | null;
  viewMode: "grid" | "table";
  loading?: boolean;
};

const BenefitsList = ({
  benefits,
  paginationInfo,
  viewMode,
  loading,
}: BenefitsListProps) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <PaginateComponent pagination={paginationInfo || undefined}>
      {viewMode === "grid" ? (
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BenefitCard benefit={benefit} />
            </motion.div>
          ))}
        </div>
      ) : (
        <BenefitTable benefits={benefits} />
      )}

      {/* Sin resultados */}
      {benefits.length === 0 && !loading && (
        <motion.div variants={itemVariants} className={styles.noResults}>
          <FaGift className={styles.noResultsIcon} />
          <h3 className={styles.noResultsTitle}>
            No se encontraron beneficios
          </h3>
          <p className={styles.noResultsText}>
            Intenta ajustar los filtros o términos de búsqueda para encontrar
            beneficios.
          </p>
        </motion.div>
      )}
    </PaginateComponent>
  );
};

export default BenefitsList;
