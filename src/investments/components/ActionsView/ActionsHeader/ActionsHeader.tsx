import { motion } from "framer-motion";
import { FaChartLine, FaFilter } from "react-icons/fa";
import styles from "./ActionsHeader.module.css";
import type { RiskLevel } from "../../../types/actions.type";
import { riskFilters } from "../../../contanst/actionsContanst/actions.contanst";
import { FILTER_TYPES, createFilterHandler } from "@/shared";

interface ActionsHeaderProps {
  totalActions: number;
  filterRisk: RiskLevel | "TODOS";
  onFilterChange: (risk: RiskLevel | "TODOS") => void;
  handleFilter: (filter: string[], value: string[]) => void;
}

const ActionsHeader: React.FC<ActionsHeaderProps> = ({
  totalActions,
  filterRisk,
  onFilterChange,
  handleFilter,
}) => {
  const handleClick = createFilterHandler({
    onFilterChange,
    handleFilter,
    filterType: FILTER_TYPES.ACCION_RISK,
  });
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.titleSection}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.iconWrapper}>
          <FaChartLine className={styles.icon} />
        </div>
        <div>
          <h1 className={styles.title}>
            Oportunidades de Inversión en Acciones
          </h1>
          <p className={styles.subtitle}>
            Descubre {totalActions} oportunidades para hacer crecer tu dinero
          </p>
        </div>
      </motion.div>

      <motion.div
        className={styles.filterSection}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className={styles.filterLabel}>
          <FaFilter />
          <span>Filtrar por riesgo:</span>
        </div>
        <div className={styles.filterButtons}>
          {riskFilters.map((filter, index) => (
            <motion.button
              key={filter.value}
              className={`${styles.filterButton} ${
                filterRisk === filter.value ? styles.active : ""
              }`}
              onClick={() => handleClick(filter)}
              style={
                {
                  "--filter-color": filter.color,
                } as React.CSSProperties
              }
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ActionsHeader;
