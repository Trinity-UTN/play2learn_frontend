import { motion } from "framer-motion";
import ActivityHeader from "../../components/studentActivitiesViewComponents/activityHeader/ActivityHeader";
import ActivityStats from "../../components/studentActivitiesViewComponents/activityStats/ActivityStats";
import ActivityFilters from "../../components/studentActivitiesViewComponents/activityFilters/ActivityFilters";
import ActivityGrid from "../../components/studentActivitiesViewComponents/activityGrid/ActivityGrid";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import { useActivityStudentUI } from "../../hooks/useActivityStudentUI";
import styles from "./StudentActivitiesView.module.css";

const StudentActivitiesView: React.FC = () => {
  const { loading } = useActivityStudent();
  const {
    activeFilter,
    setActiveFilter,
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredActivities,
    paginationInfo,
  } = useActivityStudentUI();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.activitiesView}
    >
      <ActivityHeader />
      <ActivityStats />
      <ActivityFilters
        activeFilter={activeFilter}
        selectedSubject={selectedSubject}
        selectedDifficulty={selectedDifficulty}
        onFilterChange={setActiveFilter}
        onSubjectChange={setSelectedSubject}
        onDifficultyChange={setSelectedDifficulty}
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
