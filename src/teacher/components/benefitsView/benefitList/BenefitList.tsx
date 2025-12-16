import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";
import { PaginateComponent, EmptyStateComponent } from "@/shared";
import BenefitCard from "../benefitCardComponent/benefitCard/BenefitCard";
import BenefitTable from "../benefitTable/BenefitTable";
import type { TeacherBenefitType } from "../../../../benefit/types/benefit.types";
import { benefitsListItemVariants } from "../../../constants/animations/benefitTeacher.animations";
import { type BenefitActionHandlers } from "../../../utils/benefitList.utils";
import styles from "./BenefitList.module.css";

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
  actions: BenefitActionHandlers;
  loading?: boolean;
  showEmptyState?: boolean;
};

const BenefitList: React.FC<BenefitsListProps> = ({
  benefits,
  paginationInfo,
  viewMode,
  actions,
  loading = false,
  showEmptyState = false,
}) => {
  return (
    <PaginateComponent pagination={paginationInfo || undefined}>
      {viewMode === "grid" ? (
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={benefitsListItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <BenefitCard
                benefit={benefit}
                actions={actions}
                loading={loading}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <BenefitTable benefits={benefits} actions={actions} loading={loading} />
      )}

      {showEmptyState && (
        <EmptyStateComponent
          title="No se encontraron beneficios"
          message="Intenta ajustar los filtros o términos de búsqueda para encontrar beneficios."
          icon={<FaGift className={styles.noResultsIcon} />}
        />
      )}
    </PaginateComponent>
  );
};

export default BenefitList;
