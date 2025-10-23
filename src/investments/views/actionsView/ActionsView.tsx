import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ActionsView.module.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ActionHeader from "../../components/ActionsView/ActionsHeader/ActionsHeader";
import ActionsGrid from "../../components/ActionsView/ActionsGrid/ActionsGrid";
import type { RiskLevel } from "../../types/actions.type";
import { useActionsStudent } from "../../hooks/useInvestmentsStudentAPI";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import type { PaginationInfo } from "../../../student/context/activityStudentContext/activityStudentContextUI/ActivityStudentProviderUI";

interface ActionsViewProps {
  onSelectAction?: (actionId: number) => void;
}

const ActionsView: React.FC<ActionsViewProps> = ({ onSelectAction }) => {
  // Paginación
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
  } = usePaginationParams();
  const { getPaginatedActions, actions } = useActionsStudent();
  const [isLoading, setIsLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState<RiskLevel | "TODOS">("TODOS");

  // Efecto para cargar los aspectos
  useEffect(() => {
    getPaginatedActions(paginationParams);
  }, [paginationParams]);
  // 7️⃣ Paginación info
  const paginationInfo: PaginationInfo | null = actions
    ? {
        currentPage: actions.currentPage,
        totalPages: actions.totalPages,
        pageSize: actions.pageSize,
        totalItems: actions.results.length,
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

  const handleActionClick = (actionId: number) => {
    if (onSelectAction) {
      onSelectAction(actionId);
    }
  };

  if (!actions?.results) {
    return <LoadingScreen key="loading" titulo="Cargando Acciones" />;
  }
  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" titulo="Cargando Acciones" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.content}
          >
            <ActionHeader
              totalActions={actions.results.length}
              filterRisk={filterRisk}
              onFilterChange={setFilterRisk}
              handleFilter={handleFilter}
            />
            <ActionsGrid
              actions={actions.results}
              onInvestmentClick={handleActionClick}
              paginationInfo={paginationInfo}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActionsView;
