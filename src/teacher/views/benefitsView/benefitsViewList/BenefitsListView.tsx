import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BenefitHeader from "../../../components/benefitsView/benefitHeader/BenefitHeader";
import BenefitsList from "../../../components/benefitsView/benefitsList/BenefitsList";
import BenefitFilters from "../../../components/benefitsView/benefitFilters/BenefitFilters";
import { useBenefitTeacherData } from "../../../hooks/benefits/benefitList/useBenefitTeacherData";
import styles from "./BenefitsListView.module.css";

const BenefitsListView: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const {
    loading,
    activeStatusFilter,
    selectedSubject,
    selectedCategory,
    setActiveStatusFilter,
    setSelectedSubject,
    setSelectedCategory,
    filteredBenefits,
    subjects,
    paginationInfo,
  } = useBenefitTeacherData();

  const navigate = useNavigate();
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
      className={styles.container}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className={styles.header}>
        <BenefitHeader
          onNavigate={() => navigate("/dashboard/teacher/beneficio/create")}
        />
      </motion.div>

      <BenefitFilters
        activeStatusFilter={activeStatusFilter}
        selectedCategory={selectedCategory}
        selectedSubject={selectedSubject}
        subjects={subjects}
        onStatusFilterChange={setActiveStatusFilter}
        onCategoryChange={setSelectedCategory}
        onSubjectChange={setSelectedSubject}
      />

      {/* Benefits List (Grid o Table) */}
      <motion.div variants={itemVariants}>
        <BenefitsList
          benefits={filteredBenefits}
          paginationInfo={paginationInfo}
          viewMode={viewMode}
          loading={loading}
        />
      </motion.div>
    </motion.div>
  );
};

export default BenefitsListView;
