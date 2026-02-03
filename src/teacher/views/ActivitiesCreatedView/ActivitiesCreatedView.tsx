import { motion } from "framer-motion";
import ActivitiesCreatedHeader from "../../components/activitiesCreated/activitiesCreatedHeader/ActivitiesCreatedHeader";
import ActivitiesCreatedFilters from "../../components/activitiesCreated/activitiesCreatedFilters/ActivitiesCreatedFilters";
import ActivitiesCreatedList from "../../components/activitiesCreated/activitiesCreatedList/ActivitiesCreatedList";
import ActivitiesPendingList from "../../components/activitiesCreated/activitiesPendingList/ActivitiesPendingList";
import {
  activityListContainerVariants,
  activityItemVariants,
} from "../../constants/animations/activityTeacher.animations";
import { ACTIVITY_TEACHER_STATUS } from "../../constants/activity/activityTeacher.constants";
import { useActivityTeacherData } from "../../hooks/activities/activityList/useActivityTeacherData";
import { useActivityTeacherActions } from "../../hooks/activities/activityList/useActivityTeacherActions";
import { usePendingNoLudicaData } from "../../hooks/activities/noLudicaReview/usePendingNoLudicaData";
import { useNoLudicaReviewActions } from "../../hooks/activities/noLudicaReview/useNoLudicaReviewActions";
import styles from "./ActivitiesCreatedView.module.css";

const ActivitiesCreatedView: React.FC = () => {
  const {
    // Estados
    loading: dataLoading,
    activeFilter,
    selectedSubject,
    selectedCourse,
    selectedYear,
    search,
    viewMode,

    // Handlers
    setActiveFilter,
    setSelectedSubject,
    setSelectedCourse,
    setSelectedYear,
    setSearch,
    setViewMode,
    applyFilters,
    resetFilters,

    // Datos
    subjects,
    courses,
    years,
    filteredActivities,
    paginationInfo,
  } = useActivityTeacherData();

  const { actions, loading: actionsLoading } = useActivityTeacherActions();

  // Pending data
  const {
    loading: pendingLoading,
    pendingAttempts,
    paginationInfo: pendingPaginationInfo,
  } = usePendingNoLudicaData({
    selectedSubject,
    selectedCourse,
    selectedYear,
    search,
  });

  const { handleNavigateToReview } = useNoLudicaReviewActions();

  const loading = dataLoading || actionsLoading;
  const isPendingFilter = activeFilter === ACTIVITY_TEACHER_STATUS.PENDING;

  // Show empty state logic
  const showActivityEmptyState = filteredActivities.length === 0 && !loading;
  const showPendingEmptyState = pendingAttempts.length === 0 && !pendingLoading;

  // Actions for pending list
  const pendingActions = {
    onViewAttempt: handleNavigateToReview,
  };

  return (
    <motion.div
      variants={activityListContainerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      {/* Header */}
      <motion.div variants={activityItemVariants} className={styles.header}>
        <ActivitiesCreatedHeader />
      </motion.div>

      {/* Filtros */}
      <motion.div variants={activityItemVariants}>
        <ActivitiesCreatedFilters
          activeFilter={activeFilter}
          searchValue={search}
          subjectValue={selectedSubject?.id ?? ""}
          courseValue={selectedCourse?.id ?? ""}
          yearValue={selectedYear?.id ?? ""}
          selectedSubject={selectedSubject}
          selectedCourse={selectedCourse}
          selectedYear={selectedYear}
          subjects={subjects}
          courses={courses}
          years={years}
          viewMode={viewMode}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearch}
          onSubjectChange={setSelectedSubject}
          onCourseChange={setSelectedCourse}
          onYearChange={setSelectedYear}
          onApplyFilters={applyFilters}
          onClearFilters={resetFilters}
          onViewModeChange={setViewMode}
        />
      </motion.div>

      {/* Lista de Actividades o Pendientes de Corrección */}
      <motion.div variants={activityItemVariants}>
        {isPendingFilter ? (
          <ActivitiesPendingList
            attempts={pendingAttempts}
            paginationInfo={pendingPaginationInfo}
            viewMode={viewMode}
            actions={pendingActions}
            loading={pendingLoading}
            showEmptyState={showPendingEmptyState}
          />
        ) : (
          <ActivitiesCreatedList
            activities={filteredActivities}
            paginationInfo={paginationInfo}
            viewMode={viewMode}
            actions={actions}
            loading={loading}
            showEmptyState={showActivityEmptyState}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ActivitiesCreatedView;
