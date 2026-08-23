import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BenefitHeader from "../../../components/benefitsView/benefitHeader/BenefitHeader";
import BenefitList from "../../../components/benefitsView/benefitList/BenefitList";
import BenefitFilters from "../../../components/benefitsView/benefitFilters/BenefitFilters";
import {
  benefitListContainerVariants,
  benefitItemVariants,
} from "../../../constants/animations/benefitTeacher.animations";
import { useBenefitTeacherActions } from "../../../hooks/benefits/benefitList/useBenefitTeacherActions";
import { useBenefitTeacherData } from "../../../hooks/benefits/benefitList/useBenefitTeacherData";
import styles from "./BenefitsListView.module.css";
import { LoadingSpinnerComponent } from "@/shared";

const BenefitsListView: React.FC = () => {
  const navigate = useNavigate();
  const {
    loading: dataLoading,
    activeFilter,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    subjects,
    availableBenefits,
    filteredBenefits,
    paginationInfo,
    viewMode,
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,
    setSearch,
    setBenefitId,
    applyFilters,
    resetFilters,
    setViewMode,
  } = useBenefitTeacherData();

  const { actions, loading: actionsLoading } = useBenefitTeacherActions({
    paramsStatus: activeFilter,
  });

  const loading = dataLoading || actionsLoading;
  const showEmptyState = filteredBenefits.length === 0 && !loading;

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinnerComponent />
      </div>
    );
  }
  return (
    <motion.div
      variants={benefitListContainerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      {/* Header */}
      <motion.div variants={benefitItemVariants} className={styles.header}>
        <BenefitHeader
          onNavigate={() => navigate("/dashboard/teacher/beneficio/create")}
        />
      </motion.div>

      {/* Filtros */}
      <BenefitFilters
        activeFilter={activeFilter}
        searchValue={search}
        subjectValue={selectedSubject?.id ?? ""}
        selectedSubject={selectedSubject}
        selectedCategory={selectedCategory}
        subjects={subjects}
        benefitIdValue={benefitId}
        availableBenefits={availableBenefits}
        viewMode={viewMode}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearch}
        onSubjectChange={setSelectedSubject}
        onCategoryChange={setSelectedCategory}
        onBenefitIdChange={setBenefitId}
        onApplyFilters={applyFilters}
        onClearFilters={resetFilters}
        onViewModeChange={setViewMode}
      />

      {/* Lista de Beneficios (Grid o Table) */}
      <motion.div variants={benefitItemVariants}>
        <BenefitList
          benefits={filteredBenefits}
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

export default BenefitsListView;
