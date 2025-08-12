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
import type { BenefitResponse } from "../../types/BeneficeType";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import styles from "./BenefitsView.module.css";
import type { IconType } from "react-icons";
import BenefitsList from "../../components/benefitsView/benefitsList/BenefitsList";
import { useBenefit } from "../../hooks/useBenefit";

const BenefitsView: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState<string>("all");
  // const [selectedStatus, setSelectedStatus] = useState<string>("all");
  // const [sortBy, setSortBy] = useState<string>("name");
  const { benefits, getBenefits } = useBenefit();
  const beneficiosEjemeplo: BenefitResponse[] = [
    // {
    //   id: 7,
    //   name: "Acceso a Material Extra",
    //   description:
    //     "Acceso exclusivo a material de estudio adicional y ejercicios",
    //   cost: 6,
    //   category: "Extras",
    //   status: "Inactivo",
    //   icon: "book",
    //   color: "#6b7280",
    //   duration: "1 mes",
    //   restrictions: ["Renovable"],
    //   usageCount: 89,
    //   isLimited: false,
    // },
    // {
    //   id: 8,
    //   name: "Segunda Oportunidad",
    //   description: "Posibilidad de rendir nuevamente un examen desaprobado",
    //   cost: 30,
    //   category: "Evaluaciones",
    //   status: "Activo",
    //   icon: "retry",
    //   color: "#dc2626",
    //   duration: "1 uso",
    //   restrictions: [
    //     "Solo para notas menores a 4",
    //     "Dentro del mismo cuatrimestre",
    //   ],
    //   usageCount: 12,
    //   maxUsage: 25,
    //   isLimited: true,
    //   isPremium: true,
    // },
  ];
  // const categories = [
  //   "all",
  //   "Evaluaciones",
  //   "Trabajos",
  //   "Asistencia",
  //   "Extras",
  // ];
  // const statuses = ["all", "Activo", "Inactivo"];

  // const getBenefitIcon = (iconName: string) => {
  //   const icons: { [key: string]: IconType } = {
  //     exam: FaGraduationCap,
  //     file: FaFileAlt,
  //     skip: FaStar,
  //     calendar: FaCalendarCheck,
  //     chat: FaUsers,
  //     clock: FaCoins,
  //     book: FaChartLine,
  //     retry: FaGift,
  //   };
  //   return icons[iconName] || FaGift;
  // };

  // const filteredBenefits = benefits
  //   .filter((benefit) => {
  //     const matchesSearch =
  //       benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       benefit.description.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesCategory =
  //       selectedCategory === "all" || benefit.category === selectedCategory;
  //     const matchesStatus =
  //       selectedStatus === "all" || benefit.status === selectedStatus;

  //     return matchesSearch && matchesCategory && matchesStatus;
  //   })
  //   .sort((a, b) => {
  //     switch (sortBy) {
  //       case "name":
  //         return a.name.localeCompare(b.name);
  //       case "cost":
  //         return a.cost - b.cost;
  //       case "category":
  //         return a.category.localeCompare(b.category);
  //       case "usage":
  //         return b.usageCount - a.usageCount;
  //       default:
  //         return 0;
  //     }
  //   });

  // const totalBenefits = benefits.length;
  // const activeBenefits = benefits.filter((b) => b.status === "Activo").length;
  // const totalUsage = benefits.reduce((sum, b) => sum + b.usageCount, 0);
  // const premiumBenefits = benefits.filter((b) => b.isPremium).length;

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
        <Button variant="primary" className={styles.createButton}>
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
            <span className={styles.statNumber}>Largo del array</span>
            <span className={styles.statLabel}>Total Beneficios</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#10b981" }}
          >
            <FaChartLine />
          </div>
          {/* <div className={styles.statContent}>
            <span className={styles.statNumber}>{activeBenefits}</span>
            <span className={styles.statLabel}>Activos</span>
          </div> */}
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#f59e0b" }}
          >
            <FaUsers />
          </div>
          {/* <div className={styles.statContent}>
            <span className={styles.statNumber}>{totalUsage}</span>
            <span className={styles.statLabel}>Usos Totales</span>
          </div> */}
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#8b5cf6" }}
          >
            <FaCrown />
          </div>
          {/* <div className={styles.statContent}>
            <span className={styles.statNumber}>{premiumBenefits}</span>
            <span className={styles.statLabel}>Premium</span>
          </div> */}
        </div>
      </motion.div>

      {/* Filters */}
      {/* <motion.div variants={itemVariants}>
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "Todas las categorías" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={styles.filterSelect}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "Todos los estados" : status}
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
      </motion.div> */}

      {/* Benefits Grid */}
      <motion.div variants={itemVariants} className={styles.benefitsSection}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>
            {benefits.length} beneficio
            {benefits.length !== 1 ? "s" : ""} encontrado
            {benefits.length !== 1 ? "s" : ""}
          </h2>
        </div>
        <BenefitsList filteredBenefits={benefits} />
      </motion.div>
    </motion.div>
  );
};

export default BenefitsView;
