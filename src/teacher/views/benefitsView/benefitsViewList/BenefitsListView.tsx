import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BenefitHeader from "../../../components/benefitsView/benefitHeader/BenefitHeader";
import BenefitsList from "../../../components/benefitsView/benefitsList/BenefitsList";
import BenefitSearch from "../../../components/benefitsView/benefitSearch/BenefitSearch";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";
import styles from "./BenefitsListView.module.css";

const BenefitsListView: React.FC = () => {
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
    handleSearch,
  } = usePaginationParams();

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

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

      {/* Filtros */}
      <BenefitSearch
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Benefits List (Grid o Table) */}
      <motion.div variants={itemVariants}>
        <BenefitsList
          paginationParams={paginationParams}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          viewMode={viewMode}
        />
      </motion.div>
    </motion.div>
  );
};

export default BenefitsListView;
