"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StudentDashboardView } from "../../types";
import StudentOverviewView from "../StudentViews/StudentOverviewView/StudentOverviewView";
import StudentWalletView from "../StudentViews/StudentWalletView/StudentWalletView";
import StudentActivitiesView from "../StudentViews/StudentActivitiesView/StudentActivitiesView";
import StudentBenefitsView from "../StudentViews/StudentBenefitsView/StudentBenefitsView";
import StudentStoreView from "../StudentViews/StudentStoreView/StudentStoreView";
import StudentRankingView from "../StudentViews/StudentRankingView/StudentRankingView";

interface StudentDashboardContentProps {
  currentView: StudentDashboardView;
}

const StudentDashboardContent: React.FC<StudentDashboardContentProps> = ({
  currentView,
}) => {
  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <StudentOverviewView />;
      case "wallet":
        return <StudentWalletView />;
      case "activities":
        return <StudentActivitiesView />;
      case "benefits":
        return <StudentBenefitsView />;
      case "store":
        return <StudentStoreView />;
      case "ranking":
        return <StudentRankingView />;
      default:
        return <StudentOverviewView />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default StudentDashboardContent;
