import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";
import type { GetPaginated } from "../../../../shared/types/PaginacionType";
import PaginateComponent from "../../../../shared/components/PaginateComponent/PaginateComponent";
import BenefitCard from "../benefitCard/BenefitCard";
import BenefitTable from "../benefitTable/BenefitTable";
import { useBenefitAPI } from "../../../hooks/useBenefitAPI";
import styles from "./BenefitsList.module.css";

type BenefitsListProps = {
  paginationParams: GetPaginated;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  viewMode: "grid" | "table";
};

const BenefitsList = ({
  paginationParams,
  handlePageChange,
  handlePageSizeChange,
  viewMode,
}: BenefitsListProps) => {
  const { getPaginatedBenefits, paginatedBenefits } = useBenefitAPI();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    getPaginatedBenefits(paginationParams);
  }, [paginationParams, getPaginatedBenefits]);

  return (
    <PaginateComponent
      pagination={
        paginatedBenefits
          ? {
              currentPage: paginatedBenefits.currentPage,
              totalPages: paginatedBenefits.totalPages,
              pageSize: paginatedBenefits.pageSize,
              totalItems: paginatedBenefits.count,
              onPageChange: handlePageChange,
              onPageSizeChange: handlePageSizeChange,
            }
          : undefined
      }
    >
      {viewMode === "grid" ? (
        <div className={styles.benefitsGrid}>
          {paginatedBenefits?.results.map((benefit) => (
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
        <BenefitTable benefits={paginatedBenefits?.results || []} />
      )}

      {/* Sin resultados */}
      {paginatedBenefits?.results.length === 0 && (
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
