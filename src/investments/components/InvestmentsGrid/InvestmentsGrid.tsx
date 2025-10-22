import { motion } from "framer-motion";
import styles from "./InvestmentsGrid.module.css";
import type { InvestmentResponse } from "../../types/investment.type";
import InvestmentCard from "../InvestmentCard/InvestmentCard";
import type { PaginationInfo } from "../../../student/context/activityStudentContext/activityStudentContextUI/ActivityStudentProviderUI";
import PaginateComponent from "../../../shared/components/PaginateComponent/PaginateComponent";

interface InvestmentsGridProps {
  investments: InvestmentResponse[] | undefined;
  onInvestmentClick: (investmentId: number) => void;
  paginationInfo: PaginationInfo | null;
}

const InvestmentsGrid: React.FC<InvestmentsGridProps> = ({
  investments,
  onInvestmentClick,
  paginationInfo,
}) => {
  if (investments === undefined) {
    return (
      <div className={styles.emptyState}>
        <p>No hay inversiones disponibles con este filtro</p>
      </div>
    );
  }
  if (investments.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No hay inversiones disponibles con este filtro</p>
      </div>
    );
  }

  return (
    <PaginateComponent
      background="transparent"
      backgroundPagination="rgba(255, 255, 255, 0.54)"
      {...(paginationInfo && {
        pagination: {
          currentPage: paginationInfo.currentPage,
          totalPages: paginationInfo.totalPages,
          pageSize: paginationInfo.pageSize,
          totalItems: paginationInfo.totalItems,
          onPageChange: paginationInfo.onPageChange,
          onPageSizeChange: paginationInfo.onPageSizeChange,
        },
      })}
    >
      <div className={styles.grid}>
        {investments.map((investment, index) => (
          <motion.div
            key={investment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            <InvestmentCard
              investment={investment}
              onClick={() => onInvestmentClick(investment.id)}
            />
          </motion.div>
        ))}
      </div>
    </PaginateComponent>
  );
};

export default InvestmentsGrid;
