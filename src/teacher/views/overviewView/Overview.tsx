import styles from "./Overview.module.css";
import { motion } from "framer-motion";
import { useStatistics } from "../../hooks/useStatistics";
import { useEffect } from "react";

//COMPONENTS
import { LoadingSpinnerComponent } from "@/shared";
import Header from "../../components/overvieViewComponents/Header/Header";
import MainStats from "../../components/overvieViewComponents/MainStats/MainStats";
import CourseGrid from "../../components/overvieViewComponents/CourseGrid/CourseGrid";
import RecentActivities from "../../components/overvieViewComponents/RecentActivities/RecentActivities";
import QuickActions from "../../components/overvieViewComponents/QuickActions/QuickActions";

export function OverviewView() {
  const { statistics, getStatistics, loading } = useStatistics();

  useEffect(() => {
    getStatistics();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (!statistics && loading) {
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
      className={styles.container}
    >
      <Header statistics={statistics!} />
      {/* Main Stats */}
      <MainStats statistics={statistics!} />

      {/* Courses Overview */}
      <CourseGrid statistics={statistics!} />
      {/* Content Grid */}

      <div className={styles.contentGrid}>
        {/* Recent Activities */}
        <RecentActivities statistics={statistics!} />
        {/* Quick Actions */}
        <QuickActions />
      </div>
    </motion.div>
  );
}

export default OverviewView;
