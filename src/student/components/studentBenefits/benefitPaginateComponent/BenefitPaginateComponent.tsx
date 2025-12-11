import { LoadingSpinnerComponent, PaginationComponent } from "@/shared";
import styles from "./BenefitPaginateComponent.module.css";

export interface BenefitPaginateComponentProps {
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

const BenefitPaginateComponent = ({
  loading = false,
  loadingText = "Cargando...",
  children,
  pagination,
}: BenefitPaginateComponentProps) => {
  return (
    <div className={styles.paginateContainer}>
      <div className={styles.contentWrapper}>
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
          background="rgba(255, 255, 255, 0.224)"
        />
      )}
    </div>
  );
};

export default BenefitPaginateComponent;
