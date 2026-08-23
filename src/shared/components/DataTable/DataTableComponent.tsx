import type React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Button from "../Button/ButtonComponent";
import Card from "../Card/CardComponent";
import Input from "../Input/InputComponent";
import PaginationComponent from "../Pagination/PaginationComponent";
import styles from "./DataTable.module.css";

export interface DataTableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export interface DataTableAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (item: T) => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
  title?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (column: string) => void;
  emptyStateIcon?: React.ReactNode;
  emptyStateTitle?: string;
  emptyStateSubtitle?: string;
  loadingText?: string;
  className?: string;
  getRowKey?: (item: T, index: number) => string | number;
  showResultsInfo?: boolean;
  totalItems?: number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
  filterChildren?: React.ReactNode;
}

const DataTable = <T,>({
  data,
  columns,
  actions,
  loading = false,
  searchable = true,
  searchPlaceholder = "Buscar...",
  searchValue = "",
  onSearchChange,
  sortBy,
  sortOrder = "asc",
  onSort,
  emptyStateIcon,
  emptyStateTitle = "No se encontraron datos",
  emptyStateSubtitle,
  className,
  getRowKey,
  showResultsInfo = true,
  totalItems,
  pagination,
  filterChildren,
}: DataTableProps<T>) => {
  const getSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return <FaSort className={styles.sortIcon} />;
    }
    return sortOrder === "asc" ? (
      <FaSortUp className={styles.sortIcon} />
    ) : (
      <FaSortDown className={styles.sortIcon} />
    );
  };

  const handleSort = (columnKey: string) => {
    if (onSort) {
      onSort(columnKey);
    }
  };

  const handleSearch = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const getDefaultRowKey = (item: T, index: number): string | number => {
    if (getRowKey) {
      return getRowKey(item, index);
    }

    // Intentar usar 'id' si existe
    if (item && typeof item === "object" && "id" in item) {
      return (item as any).id;
    }
    return index;
  };

  const renderCellContent = (
    column: DataTableColumn<T>,
    item: T,
    index: number,
  ) => {
    if (column.render) {
      return column.render(item, index);
    }

    // Renderizado por defecto basado en la key
    if (item && typeof item === "object" && column.key in item) {
      return (item as any)[column.key];
    }

    return null;
  };

  return (
    <Card className={`${styles.tableCard} ${className || ""}`}>
      {searchable && (
        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          {showResultsInfo && (
            <div className={styles.resultsInfo}>
              {searchValue ? (
                <span>
                  Mostrando {data.length} de {totalItems || data.length}{" "}
                  elementos
                </span>
              ) : (
                <span>Total: {totalItems || data.length} elementos</span>
              )}
            </div>
          )}
        </div>
      )}
      {filterChildren && (
        <div className={styles.filterSection}>{filterChildren}</div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${column.className || ""} ${
                    column.sortable ? styles.sortableHeader : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={
                    column.sortable ? () => handleSort(column.key) : undefined
                  }
                >
                  <div className={styles.headerContent}>
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className={styles.actionsColumn}>Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <motion.tr
                  key={getDefaultRowKey(item, index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={styles.tableRow}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={column.className || ""}>
                      {renderCellContent(column, item, index)}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className={styles.actionsCell}>
                      <div className={styles.actions}>
                        {actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant={action.variant || "ghost"}
                            size="sm"
                            onClick={() => action.onClick(item)}
                            className={action.className || ""}
                            title={action.title || action.label}
                          >
                            {action.icon}
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length + (actions && actions.length > 0 ? 1 : 0)
                  }
                  className={styles.emptyState}
                >
                  <div className={styles.emptyContent}>
                    {emptyStateIcon}
                    <p>{emptyStateTitle}</p>
                    {emptyStateSubtitle && <small>{emptyStateSubtitle}</small>}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && !loading && (
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageSize={pagination.pageSize}
          totalItems={pagination.totalItems}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </Card>
  );
};

export default DataTable;
