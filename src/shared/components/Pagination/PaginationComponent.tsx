import type React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import Button from "../Button/ButtonComponent";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showInfo?: boolean;
  maxVisiblePages?: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  showPageSizeSelector = true,
  showInfo = true,
  maxVisiblePages = 5,
}) => {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Ajustar si estamos cerca del inicio o final
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }
    if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    // Agregar primera página y puntos suspensivos si es necesario
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Agregar páginas visibles
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Agregar puntos suspensivos y última página si es necesario
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (newPageSize !== pageSize) {
      onPageSizeChange(newPageSize);
    }
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.paginationContainer}>
      {showInfo && (
        <div className={styles.paginationInfo}>
          <span>
            Mostrando {startItem} a {endItem} de {totalItems} elementos
          </span>
        </div>
      )}

      <div className={styles.paginationControls}>
        {/* Botón primera página */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
          title="Primera página"
        >
          <FaAngleDoubleLeft />
        </Button>

        {/* Botón página anterior */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
          title="Página anterior"
        >
          <FaChevronLeft />
        </Button>

        {/* Números de página */}
        <div className={styles.pageNumbers}>
          {getVisiblePages().map((page, index) => (
            <span key={index}>
              {typeof page === "number" ? (
                <Button
                  variant={page === currentPage ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={`${styles.pageButton} ${
                    page === currentPage ? styles.activePage : ""
                  }`}
                >
                  {page}
                </Button>
              ) : (
                <span className={styles.ellipsis}>{page}</span>
              )}
            </span>
          ))}
        </div>

        {/* Botón página siguiente */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
          title="Página siguiente"
        >
          <FaChevronRight />
        </Button>

        {/* Botón última página */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
          title="Última página"
        >
          <FaAngleDoubleRight />
        </Button>
      </div>

      {showPageSizeSelector && (
        <div className={styles.pageSizeSelector}>
          <label htmlFor="pageSize">Elementos por página:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className={styles.pageSizeSelect}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default PaginationComponent;
