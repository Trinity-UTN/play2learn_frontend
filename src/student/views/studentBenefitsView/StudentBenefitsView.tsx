import { useState } from "react";
import { motion } from "framer-motion";
import BenefitStudentHeader from "../../components/studentBenefits/benefitStudentHeader/BenefitStudentHeader";
import BenefitStudentFilters from "../../components/studentBenefits/benefitStudentFilters/BenefitStudentFilters";
import BenefitStudentList from "../../components/studentBenefits/benefitStudentList/BenefitStudentList";
import { useBenefitStudentData } from "../../hooks/benefits/benefitList/useBenefitStudentData";
import styles from "./StudentBenefitsView.module.css";
import { LoadingSpinnerComponent } from "@/shared";

const StudentBenefitsView: React.FC = () => {
  const {
    activeFilter,
    setActiveFilter,
    selectedSubject,
    setSelectedSubject,
    selectedCategory,
    setSelectedCategory,
    filteredBenefits,
    subjects,

    paginationInfo,
    loading,
  } = useBenefitStudentData();

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.benefitsView}
    >
      {loading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinnerComponent />
        </div>
      ) : (
        <>
          <BenefitStudentHeader />
          <BenefitStudentFilters
            activeFilter={activeFilter}
            selectedSubject={selectedSubject}
            selectedCategory={selectedCategory}
            subjects={subjects}
            viewMode={viewMode}
            onFilterChange={setActiveFilter}
            onSubjectChange={setSelectedSubject}
            onCategoryChange={setSelectedCategory}
            onViewModeChange={setViewMode}
          />
          <motion.div
            variants={itemVariants}
            className={styles.benefitsSection}
          >
            <BenefitStudentList
              benefits={filteredBenefits}
              paginationInfo={paginationInfo!}
              loading={loading}
              viewMode={viewMode}
              onFilterChange={setActiveFilter}
            />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default StudentBenefitsView;
