import styles from "./AspectSorter.module.css";

export type FilterType = "ALL" | "CUERPO" | "REMERA" | "SOMBRERO";

interface AspectSorterProps {
  showSortFilter: boolean;
  sortBy: "name" | "type";
  selectedFilter: FilterType;
  filterTypes: readonly FilterType[];
  onToggleSortFilter: () => void;
  onSortChange: (sortBy: "name" | "type") => void;
  onFilterChange: (filter: FilterType) => void;
  onReset: () => void;
  onApply: () => void;
  getFilterIcon: (filter: FilterType) => React.ReactNode;
}

const AspectSorter: React.FC<AspectSorterProps> = ({
  showSortFilter,
  sortBy,
  selectedFilter,
  filterTypes,
  onToggleSortFilter,
  onSortChange,
  onFilterChange,
  onReset,
  onApply,
  getFilterIcon,
}) => {
  return (
    <div className={styles.sortFilterContainer}>
      <button
        className={`${styles.sortFilterButton} ${
          showSortFilter ? styles.sortFilterButtonActive : ""
        }`}
        onClick={onToggleSortFilter}
      >
        <span>ORDENAR Y FILTRAR</span>
      </button>

      {showSortFilter && (
        <div className={styles.sortFilterDropdown}>
          <div className={styles.sortFilterSection}>
            <h4 className={styles.sortFilterTitle}>ORDENAR POR</h4>
            <div className={styles.sortOptions}>
              <button
                className={`${styles.sortOption} ${
                  sortBy === "name" ? styles.sortOptionActive : ""
                }`}
                onClick={() => onSortChange("name")}
              >
                NOMBRE
              </button>
              <button
                className={`${styles.sortOption} ${
                  sortBy === "type" ? styles.sortOptionActive : ""
                }`}
                onClick={() => onSortChange("type")}
              >
                TIPO
              </button>
            </div>
          </div>

          <div className={styles.sortFilterSection}>
            <h4 className={styles.sortFilterTitle}>FILTRAR POR TIPO</h4>
            <div className={styles.filterOptions}>
              {filterTypes.map((filter) => (
                <button
                  key={filter}
                  onClick={() => onFilterChange(filter)}
                  className={`${styles.filterOption} ${
                    selectedFilter === filter ? styles.filterOptionActive : ""
                  }`}
                >
                  <span className={styles.filterIcon}>
                    {getFilterIcon(filter)}
                  </span>
                  <span>{filter === "ALL" ? "TODOS" : filter}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sortFilterActions}>
            <button className={styles.resetButton} onClick={onReset}>
              RESETEAR
            </button>
            <button className={styles.applyButton} onClick={onApply}>
              APLICAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AspectSorter;
