import type { PaginationInfo } from "../../../student/context/activityStudentContext/activityStudentContextUI/ActivityStudentProviderUI";
import { PaginationComponent } from "../Pagination";
import styles from "./FlexBox.module.css";
import { FiList, FiGrid } from "react-icons/fi";

interface FlexBoxProps {
  isRow: boolean;
  onToggle: (data: boolean) => void;
  children: React.ReactNode;
  paginationInfo: PaginationInfo;
}

const FlexBox = ({
  children,
  isRow,
  onToggle,
  paginationInfo,
}: FlexBoxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.contButtons}>
        <button onClick={() => onToggle(false)}>
          <FiList />
        </button>
        <button onClick={() => onToggle(true)}>
          <FiGrid />
        </button>
      </div>
      <div
        style={{
          flexDirection: isRow ? "row" : "column",
          justifyContent: isRow ? "center" : "start",
        }}
        className={styles.box}
      >
        {children}
      </div>
      {paginationInfo && (
        <PaginationComponent
          currentPage={paginationInfo.currentPage}
          totalPages={paginationInfo.totalPages}
          pageSize={paginationInfo.pageSize}
          totalItems={paginationInfo.totalItems}
          onPageChange={paginationInfo.onPageChange}
          onPageSizeChange={paginationInfo.onPageSizeChange}
          background="rgba(255, 255, 255, 0.224)"
        />
      )}
    </div>
  );
};

export default FlexBox;
