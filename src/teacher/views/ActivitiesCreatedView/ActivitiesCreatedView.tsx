import { motion } from "framer-motion";
import ActivitiesCreatedHeader from "../../components/activitiesCreated/activitiesCreatedHeader/ActivitiesCreatedHeader";
import ActivitiesCreatedFilters from "../../components/activitiesCreated/activitiesCreatedFilters/ActivitiesCreatedFilters";
import ActivitiesCreatedList from "../../components/activitiesCreated/activitiesCreatedList/ActivitiesCreatedList";
import {
  activityListContainerVariants,
  activityItemVariants,
} from "../../constants/animations/activityTeacher.animations";
import { useActivityTeacherData } from "../../hooks/activities/activityList/useActivityTeacherData";
import { useActivityTeacherActions } from "../../hooks/activities/activityList/useActivityTeacherActions";
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

  const loading = dataLoading || actionsLoading;
  const showEmptyState = filteredActivities.length === 0 && !loading;

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

      {/* Lista de Actividades (Grid o Table) */}
      <motion.div variants={activityItemVariants}>
        <ActivitiesCreatedList
          activities={filteredActivities}
          paginationInfo={paginationInfo}
          viewMode={viewMode}
          actions={actions}
          loading={loading}
          showEmptyState={showEmptyState}
        />
      </motion.div>
    </motion.div>
  );
};

export default ActivitiesCreatedView;
