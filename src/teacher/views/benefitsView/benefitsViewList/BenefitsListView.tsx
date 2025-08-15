import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGift,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaGraduationCap,
  FaFileAlt,
  FaCalendarCheck,
  FaStar,
  FaCoins,
  FaCrown,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import type { BenefitResponseInterface } from "../../../types/BenefitType";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import styles from "./BenefitsListView.module.css";
import type { IconType } from "react-icons";
import BenefitsList from "../../../components/benefitsView/benefitsList/BenefitsList";
import { useBenefitAPI } from "../../../hooks/useBenefitAPI";
import { useNavigate } from "react-router-dom";
import Card from "../../../../shared/components/Card/CardComponent";
import { categories } from "../../../types/BenefitType";
const BenefitsListView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("name");
  const { benefits, getBenefits } = useBenefitAPI();

  const navigate = useNavigate();

  const categoriesForFilter = ["ALL", ...categories] as const;

  const filteredBenefits = benefits
    .filter((benefit) => {
      const matchesSearch =
        benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        benefit.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "ALL" || benefit.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "cost":
          return a.cost - b.cost;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  useEffect(() => {
    getBenefits();
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
            <span className={styles.statNumber}>{benefits.length}</span>
            <span className={styles.statLabel}>Total Beneficios</span>
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
      <motion.div variants={itemVariants}>
        <Card className={styles.filtersCard}>
          <div className={styles.filtersContent}>
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <Input
                placeholder="Buscar beneficios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <FaFilter className={styles.filterIcon} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.filterSelect}
                >
                  {categoriesForFilter.map((category) => (
                    <option key={category} value={category}>
                      {category === "ALL" ? "Todas las categorías" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <FaSortAmountDown className={styles.filterIcon} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="name">Ordenar por nombre</option>
                  <option value="cost">Ordenar por costo</option>
                  <option value="category">Ordenar por categoría</option>
                  <option value="usage">Ordenar por uso</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div variants={itemVariants} className={styles.benefitsSection}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>
            {benefits.length} beneficio
            {benefits.length !== 1 ? "s" : ""} encontrado
            {benefits.length !== 1 ? "s" : ""}
          </h2>
        </div>
        <BenefitsList filteredBenefits={filteredBenefits} />
      </motion.div>
    </motion.div>
  );
};

export default BenefitsListView;
