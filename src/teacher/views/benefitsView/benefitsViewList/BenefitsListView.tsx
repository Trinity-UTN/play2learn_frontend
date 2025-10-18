import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import BenefitsList from "../../../components/benefitsView/benefitsList/BenefitsList";
import BenefitSearch from "../../../components/benefitsView/benefitSearch/BenefitSearch";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";
import { useBenefitAPI } from "../../../hooks/useBenefitAPI";
import styles from "./BenefitsListView.module.css";

const BenefitsListView: React.FC = () => {
  const { paginatedBenefits } = useBenefitAPI();
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
        <div>
          <h1 className={styles.title}>Gestión de Beneficios</h1>
          <p className={styles.subtitle}>
            Administra las recompensas disponibles para los estudiantes
          </p>
        </div>
        <Button
          variant="primary"
          className={styles.createButton}
          onClick={() => navigate("/dashboard/teacher/beneficio/create")}
        >
          <FaGift className={styles.buttonIcon} />
          Nuevo Beneficio
        </Button>
      </motion.div>

      {/* Estadísticas */}
      <motion.div variants={itemVariants} className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FaGift />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>
              {paginatedBenefits?.results.length}
            </span>
            <span className={styles.statLabel}>Beneficios Encontrados</span>
          </div>
        </div>
      </motion.div>

      {/* Filtros */}
      <BenefitSearch
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Benefits List (Grid o Table) */}
      <motion.div variants={itemVariants} className={styles.benefitsSection}>
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
