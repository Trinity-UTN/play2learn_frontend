import { motion } from "framer-motion";
import { FaListAlt } from "react-icons/fa";
import styles from "./PlazoFijoList.module.css";
import type { PlazoFijoResponse } from "../../../types/plazoFijo.type";
import PlazoFijoCard from "../PlazoFijoCard/PlazoFijoCard";
import type { PaginationInfo } from "../../../../shared/types/PaginacionType";
import PaginateComponent from "../../../../shared/components/PaginateComponent/PaginateComponent";
import LoadingSpinnerComponent from "../../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";

interface PlazoFijoListProps {
  plazosFijos: PlazoFijoResponse[] | undefined;
  paginationInfo: PaginationInfo | null;
}

const PlazoFijoList: React.FC<PlazoFijoListProps> = ({
  plazosFijos,
  paginationInfo,
}) => {
  if (!plazosFijos) {
    return <LoadingSpinnerComponent />;
  }

  if (plazosFijos.length === 0) {
    return (
      <motion.div
        className={styles.emptyState}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <FaListAlt className={styles.emptyIcon} />
        <h3>No tienes plazos fijos activos</h3>
        <p>Crea tu primer plazo fijo para comenzar a generar ganancias</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Mis Plazos Fijos</h2>
        <span className={styles.count}>{plazosFijos.length} inversiones</span>
      </div>
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
          {plazosFijos.map((plazoFijo, index) => (
            <PlazoFijoCard
              key={plazoFijo.id}
              plazoFijo={plazoFijo}
              index={index}
            />
          ))}
        </div>
      </PaginateComponent>
    </motion.div>
  );
};

export default PlazoFijoList;
