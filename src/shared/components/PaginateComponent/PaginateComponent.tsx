import Card from "../Card/CardComponent";
import LoadingSpinnerComponent from "../LoadingSpinner/LoadingSpinnerComponent";
import { PaginationComponent } from "../Pagination";
import styles from "./PaginateComponent.module.css";

export interface PaginateComponentProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
}

const PaginateComponent = ({
  loading = false,
  loadingText = "Cargando...",

  children,
  pagination,
}: PaginateComponentProps) => {
  return (
    <Card className={`${styles.tableCard}`}>
      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <LoadingSpinnerComponent text={loadingText} />
          </div>
        ) : (
          <>{children}</>
        )}
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

export default PaginateComponent;
