import styles from "./PlazoFijoFilter.module.css";
import { motion } from "framer-motion";
import { useMemo } from "react";
import type React from "react";
import { type FIXED_TERM_STATES } from "../../../types/plazoFijo.type";

import { FaFilter } from "react-icons/fa";
import { createFilterHandler, FILTER_TYPES } from "@/shared";
import { statusFilters } from "../../../contanst/plazoFijoContanst/plazoFijoContanst";

type Props = {
  filterStatus: FIXED_TERM_STATES;
  onFilterChange: (status: FIXED_TERM_STATES) => void;
  handleFilter: (filter: string[], value: string[]) => void;
};

const PlazoFijoFilter = ({
  filterStatus,
  handleFilter,
  onFilterChange,
}: Props) => {
  const handleClick = useMemo(
    () =>
      createFilterHandler({
        onFilterChange,
        handleFilter,
        filterType: FILTER_TYPES.PLAZO_FIJO_STATUS,
      }),
    [onFilterChange, handleFilter]
  );
  return (
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

      <div
        className={styles.filterButtons}
        role="group"
        aria-label="Filtros de riesgo de plazo fijo"
      >
        {statusFilters.map((statusOption, index) => (
          <motion.button
            key={statusOption.value}
            className={`${styles.filterButton} ${
              filterStatus === statusOption.value ? styles.active : ""
            }`}
            onClick={() => handleClick(statusOption)}
            style={
              {
                "--filter-color": statusOption.color,
              } as React.CSSProperties
            }
            type="button"
            aria-pressed={filterStatus === statusOption.value}
            aria-label={`Filtrar por ${statusOption.label}`}
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
            {statusOption.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default PlazoFijoFilter;
