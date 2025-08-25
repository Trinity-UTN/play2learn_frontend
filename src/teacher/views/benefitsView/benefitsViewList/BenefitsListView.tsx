import type React from "react";
import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./BenefitsListView.module.css";
import { useBenefitAPI } from "../../../hooks/useBenefitAPI";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";
import BenefitSearch from "../../../components/benefitsView/benefitSearch/BenefitSearch";
import BenefitsList from "../../../components/benefitsView/benefitsList/BenefitsList";
import Button from "../../../../shared/components/Button/ButtonComponent";

const BenefitsListView: React.FC = () => {
  const { paginatedBenefits } = useBenefitAPI();
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
    handleSearch,
  } = usePaginationParams();

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

      {/* Stats */}
      <motion.div variants={itemVariants} className={styles.statsSection}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#007bff" }}
          >
            <FaGift />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>
              {paginatedBenefits?.results.length}
            </span>
            <span className={styles.statLabel}>Beneficios Encontrados</span>
          </div>
        </div>

        {/* <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#10b981" }}
          >
            <FaChartLine />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}></span>
            <span className={styles.statLabel}>Activos</span>
          </div>
        </div> */}

        {/* <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#f59e0b" }}
          >
            <FaUsers />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{totalUsage}</span>
            <span className={styles.statLabel}>Usos Totales</span>
          </div>
        </div> */}
      </motion.div>

      {/* Filters */}
      <BenefitSearch handleFilter={handleFilter} handleSearch={handleSearch} />

      {/* Benefits Grid */}
      <motion.div variants={itemVariants} className={styles.benefitsSection}>
        <BenefitsList
          paginationParams={paginationParams}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </motion.div>
    </motion.div>
  );
};

export default BenefitsListView;
