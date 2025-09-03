import { motion } from "framer-motion";
import ActivityHeader from "../../components/studentActivitiesViewComponents/activityHeader/ActivityHeader";
import ActivityStats from "../../components/studentActivitiesViewComponents/activityStats/ActivityStats";
import ActivityFilters from "../../components/studentActivitiesViewComponents/activityFilters/ActivityFilters";
import ActivityGrid from "../../components/studentActivitiesViewComponents/activityGrid/ActivityGrid";
import styles from "./StudentActivitiesView.module.css";
import { useActivityStudentUI } from "../../hooks/useActivityStudentUI";

const StudentActivitiesView: React.FC = () => {
  const {
    activeFilter,
    setActiveFilter,
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredActivities,
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

      <ActivityGrid activities={filteredActivities} />
    </motion.div>
  );
};

export default StudentActivitiesView;
