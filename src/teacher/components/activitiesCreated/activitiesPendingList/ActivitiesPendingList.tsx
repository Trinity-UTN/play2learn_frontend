import { motion } from "framer-motion";
import { FaClipboardCheck } from "react-icons/fa";
import type { ActivityCompletedPendingDto } from "../../../types/NoLudicaReview.type";
import {
  PaginateComponent,
  EmptyStateComponent,
  type PaginationInfo,
} from "@/shared";
import ActivitiesPendingCard from "../activitiesPendingCard/ActivitiesPendingCard";
import ActivitiesPendingTable from "../activitiesPendingTable/ActivitiesPendingTable";
import { activitiesListItemVariants } from "../../../constants/animations/activityTeacher.animations";
import styles from "./ActivitiesPendingList.module.css";

interface PendingActionHandlers {
  onViewAttempt: (attempt: ActivityCompletedPendingDto) => void;
}

type ActivitiesPendingListProps = {
  attempts: ActivityCompletedPendingDto[];
  paginationInfo: PaginationInfo | null;
  viewMode: "grid" | "table";
  actions: PendingActionHandlers;
  loading?: boolean;
  showEmptyState?: boolean;
};

const ActivitiesPendingList: React.FC<ActivitiesPendingListProps> = ({
  attempts,
  paginationInfo,
  viewMode,
  actions,
  loading = false,
  showEmptyState = false,
}) => {
  return (
    <PaginateComponent pagination={paginationInfo || undefined}>
      {viewMode === "grid" ? (
        <div className={styles.attemptsGrid}>
          {attempts.map((attempt) => (
            <motion.div
              key={attempt.activityCompletedId}
              variants={activitiesListItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <ActivitiesPendingCard
                attempt={attempt}
                actions={actions}
                loading={loading}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={activitiesListItemVariants}
          initial="hidden"
          animate="visible"
        >
          <ActivitiesPendingTable
            attempts={attempts}
            actions={actions}
            loading={loading}
          />
        </motion.div>
      )}

      {showEmptyState && (
        <EmptyStateComponent
          title="No hay intentos pendientes"
          message="Todos los intentos de actividades No Lúdicas han sido corregidos."
          icon={<FaClipboardCheck className={styles.noResultsIcon} />}
        />
      )}
    </PaginateComponent>
  );
};

export default ActivitiesPendingList;
