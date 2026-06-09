import { motion } from "framer-motion";
import ActivityHeader from "../../components/studentActivitiesViewComponents/activityHeader/ActivityHeader";
import ActivityFilters from "../../components/studentActivitiesViewComponents/activityFilters/ActivityFilters";
import ActivityGrid from "../../components/studentActivitiesViewComponents/activityGrid/ActivityGrid";
import { useActivityData } from "../../hooks/activities/activityList/useActivityData";
import styles from "./StudentActivitiesView.module.css";
import { LoadingSpinnerComponent } from "@/shared";

const StudentActivitiesView: React.FC = () => {
  const {
    activeFilter,
    setActiveFilter,
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredActivities,
    subjects,
    paginationInfo,
    loading,
  } = useActivityData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinnerComponent />
      </div>
    );
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.activitiesView}
    >
      <ActivityHeader />
      {/* <ActivityStats stats={stats} /> */}
      <ActivityFilters
        activeFilter={activeFilter}
        selectedSubject={selectedSubject}
        selectedDifficulty={selectedDifficulty}
        onFilterChange={setActiveFilter}
        onSubjectChange={setSelectedSubject}
        onDifficultyChange={setSelectedDifficulty}
        subjects={subjects}
      />
      <ActivityGrid
        activities={filteredActivities}
        paginationInfo={paginationInfo!}
        loading={loading}
      />
    </motion.div>
  );
};

export default StudentActivitiesView;
