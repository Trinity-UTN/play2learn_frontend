import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";
import type { ActivityTeacherResponse } from "../../../types/TeacherActivity.type";
import type { ActivityActionHandlers } from "../../../utils/activity/activityTeacher.utils";
import { PaginateComponent, EmptyStateComponent } from "@/shared";
import ActivitiesCreatedCard from "../activitiesCreatedCard/ActivitiesCreatedCard";
import ActivitiesCreatedTable from "../activitiesCreatedTable/ActivitiesCreatedTable";
import { activitiesListItemVariants } from "../../../constants/animations/activityTeacher.animations";
import styles from "./ActivitiesCreatedList.module.css";

type ActivitiesCreatedListProps = {
  activities: ActivityTeacherResponse[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  } | null;
  viewMode: "grid" | "table";
  actions: ActivityActionHandlers;
  loading?: boolean;
  showEmptyState?: boolean;
};

const ActivitiesCreatedList: React.FC<ActivitiesCreatedListProps> = ({
  activities,
  paginationInfo,
  viewMode,
  actions,
  loading = false,
  showEmptyState = false,
}) => {

  return (
    <PaginateComponent pagination={paginationInfo || undefined}>
      {viewMode === "grid" ? (
        <div className={styles.activitiesGrid}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              variants={activitiesListItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <ActivitiesCreatedCard
                activity={activity}
                actions={actions}
                loading={loading}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.tr
          variants={activitiesListItemVariants}
          initial="hidden"
          animate="visible"
        >
          <ActivitiesCreatedTable
            activities={activities}
            actions={actions}
            loading={loading}
          />
        </motion.tr>
      )}

      {showEmptyState && (
        <EmptyStateComponent
          title="No se encontraron actividades"
          message="Intenta ajustar los filtros o términos de búsqueda para encontrar actividades."
          icon={<FaGift className={styles.noResultsIcon} />}
        />
      )}
    </PaginateComponent>
  );
};

export default ActivitiesCreatedList;
