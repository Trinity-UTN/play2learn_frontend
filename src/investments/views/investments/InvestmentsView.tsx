import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./InvestmentsView.module.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import InvestmentsHeader from "../../components/InvestmentView/InvestmentsHeader/InvestmentsHeader";
import InvestmentsGrid from "../../components/InvestmentView/InvestmentsGrid/InvestmentsGrid";
import type { RiskLevel } from "../../types/investment.type";
import { useInvestmentsStudent } from "../../hooks/useInvestmentsStudentAPI";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import type { PaginationInfo } from "../../../student/context/activityStudentContext/activityStudentContextUI/ActivityStudentProviderUI";

interface InvestmentsViewProps {
  onSelectInvestment?: (investmentId: number) => void;
}

const InvestmentsView: React.FC<InvestmentsViewProps> = ({
  onSelectInvestment,
}) => {
  // Paginación
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
  } = usePaginationParams();
  const { getPaginatedInvestments, investments } = useInvestmentsStudent();
  const [isLoading, setIsLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState<RiskLevel | "TODOS">("TODOS");

  // Efecto para cargar los aspectos
  useEffect(() => {
    getPaginatedInvestments(paginationParams);
  }, [paginationParams]);
  // 7️⃣ Paginación info
  const paginationInfo: PaginationInfo | null = investments
    ? {
        currentPage: investments.currentPage,
        totalPages: investments.totalPages,
        pageSize: investments.pageSize,
        totalItems: investments.results.length,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }
    : null;

  useEffect(() => {
    // Tiempo de carga aleatorio entre 3 y 5 segundos
    const loadingTime = Math.random() * 2000 + 3000;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, []);

  const handleInvestmentClick = (investmentId: number) => {
    if (onSelectInvestment) {
      onSelectInvestment(investmentId);
    }
  };

  if (!investments?.results) {
    return <LoadingScreen key="loading" />;
  }
  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.content}
          >
            <InvestmentsHeader
              totalInvestments={investments.results.length}
              filterRisk={filterRisk}
              onFilterChange={setFilterRisk}
              handleFilter={handleFilter}
            />
            <InvestmentsGrid
              investments={investments.results}
              onInvestmentClick={handleInvestmentClick}
              paginationInfo={paginationInfo}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvestmentsView;
