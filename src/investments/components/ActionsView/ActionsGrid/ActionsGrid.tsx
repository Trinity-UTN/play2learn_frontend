import { motion } from "framer-motion";
import styles from "./ActionsGrid.module.css";
import type { ActionsResponse } from "../../../types/actions.type";
import ActionCard from "../ActionsCard/ActionsCard";
import PaginateComponent from "../../../../shared/components/PaginateComponent/PaginateComponent";
import type { PaginationInfo } from "../../../../shared/types/PaginacionType";

interface ActionsGridProps {
  actions: ActionsResponse[] | undefined;
  paginationInfo: PaginationInfo | null;
}

const ActionsGrid: React.FC<ActionsGridProps> = ({
  actions,
  paginationInfo,
}) => {
  if (actions === undefined) {
    return (
      <div className={styles.emptyState}>
        <p>No hay inversiones disponibles con este filtro</p>
      </div>
    );
  }
  if (actions.length === 0) {
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
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            <ActionCard actions={action} />
          </motion.div>
        ))}
      </div>
    </PaginateComponent>
  );
};

export default ActionsGrid;
