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
    selectedActivityName,
    setSelectedActivityName,
    filteredActivities,
    subjects,
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
        selectedActivityName={selectedActivityName}
        onFilterChange={setActiveFilter}
        onSubjectChange={setSelectedSubject}
        onDifficultyChange={setSelectedDifficulty}
        onActivityNameChange={setSelectedActivityName}
        subjects={subjects}
      />
      <ActivityGrid activities={filteredActivities} loading={loading} />
    </motion.div>
  );
};

export default StudentActivitiesView;
