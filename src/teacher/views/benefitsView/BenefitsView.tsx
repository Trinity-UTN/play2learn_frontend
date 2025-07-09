"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGift,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaEdit,
  FaTrash,
  FaEye,
  FaGraduationCap,
  FaFileAlt,
  FaCalendarCheck,
  FaStar,
  FaCoins,
  FaCrown,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import type { Benefit } from "../../types/BeneficeType";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import styles from "./BenefitsView.module.css";
import type { IconType } from "react-icons";

const BenefitsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const benefits: Benefit[] = [
    {
      id: 1,
      name: "Descuento en Parcial",
      description: "Obtén 2 puntos adicionales en tu próximo examen parcial",
      cost: 15,
      category: "Evaluaciones",
      status: "Activo",
      icon: "exam",
      color: "#007bff",
      duration: "1 uso",
      restrictions: ["Solo aplicable a parciales", "No acumulable"],
      usageCount: 23,
      maxUsage: 50,
      isLimited: true,
    },
    {
      id: 2,
      name: "Reentrega de Trabajo",
      description:
        "Posibilidad de reentregar un trabajo después de la fecha límite",
      cost: 10,
      category: "Trabajos",
      status: "Activo",
      icon: "file",
      color: "#ff6f3c",
      duration: "7 días",
      restrictions: ["Máximo 1 semana de retraso", "Penalización del 10%"],
      usageCount: 45,
      maxUsage: 100,
      isLimited: true,
      isPremium: false,
    },
    {
      id: 3,
      name: "Exención de Parcial",
      description:
        "Saltear el próximo examen parcial manteniendo la nota anterior",
      cost: 25,
      category: "Evaluaciones",
      status: "Activo",
      icon: "skip",
      color: "#b9e769",
      duration: "1 uso",
      restrictions: [
        "Nota anterior mínima de 7",
        "Solo 1 vez por cuatrimestre",
      ],
      usageCount: 8,
      maxUsage: 20,
      isLimited: true,
      isPremium: true,
    },
    {
      id: 4,
      name: "Falta Justificada",
      description: "Justificar una falta sin presentar certificado médico",
      cost: 5,
      category: "Asistencia",
      status: "Activo",
      icon: "calendar",
      color: "#10b981",
      duration: "Inmediato",
      restrictions: ["Máximo 2 por mes"],
      usageCount: 67,
      maxUsage: 200,
      isLimited: true,
    },
    {
      id: 5,
      name: "Consulta Privada",
      description:
        "Sesión de consulta individual de 30 minutos con el profesor",
      cost: 12,
      category: "Extras",
      status: "Activo",
      icon: "chat",
      color: "#8b5cf6",
      duration: "30 min",
      restrictions: ["Previa coordinación", "Horarios limitados"],
      usageCount: 15,
      maxUsage: 30,
      isLimited: true,
    },
    {
      id: 6,
      name: "Extensión de Plazo",
      description:
        "3 días adicionales para entregar cualquier trabajo práctico",
      cost: 8,
      category: "Trabajos",
      status: "Activo",
      icon: "clock",
      color: "#f59e0b",
      duration: "3 días",
      restrictions: ["No aplicable a exámenes"],
      usageCount: 34,
      maxUsage: 75,
      isLimited: true,
    },
    {
      id: 7,
      name: "Acceso a Material Extra",
      description:
        "Acceso exclusivo a material de estudio adicional y ejercicios",
      cost: 6,
      category: "Extras",
      status: "Inactivo",
      icon: "book",
      color: "#6b7280",
      duration: "1 mes",
      restrictions: ["Renovable"],
      usageCount: 89,
      isLimited: false,
    },
    {
      id: 8,
      name: "Segunda Oportunidad",
      description: "Posibilidad de rendir nuevamente un examen desaprobado",
      cost: 30,
      category: "Evaluaciones",
      status: "Activo",
      icon: "retry",
      color: "#dc2626",
      duration: "1 uso",
      restrictions: [
        "Solo para notas menores a 4",
        "Dentro del mismo cuatrimestre",
      ],
      usageCount: 12,
      maxUsage: 25,
      isLimited: true,
      isPremium: true,
    },
  ];

  const categories = [
    "all",
    "Evaluaciones",
    "Trabajos",
    "Asistencia",
    "Extras",
  ];
  const statuses = ["all", "Activo", "Inactivo"];

  const getBenefitIcon = (iconName: string) => {
    const icons: { [key: string]: IconType } = {
      exam: FaGraduationCap,
      file: FaFileAlt,
      skip: FaStar,
      calendar: FaCalendarCheck,
      chat: FaUsers,
      clock: FaCoins,
      book: FaChartLine,
      retry: FaGift,
    };
    return icons[iconName] || FaGift;
  };

  const filteredBenefits = benefits
    .filter((benefit) => {
      const matchesSearch =
        benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        benefit.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || benefit.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" || benefit.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "cost":
          return a.cost - b.cost;
        case "category":
          return a.category.localeCompare(b.category);
        case "usage":
          return b.usageCount - a.usageCount;
        default:
          return 0;
      }
    });

  const totalBenefits = benefits.length;
  const activeBenefits = benefits.filter((b) => b.status === "Activo").length;
  const totalUsage = benefits.reduce((sum, b) => sum + b.usageCount, 0);
  const premiumBenefits = benefits.filter((b) => b.isPremium).length;

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
            <span className={styles.statNumber}>{totalBenefits}</span>
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
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{activeBenefits}</span>
            <span className={styles.statLabel}>Activos</span>
          </div>
        </div>

        <div className={styles.statCard}>
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
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#8b5cf6" }}
          >
            <FaCrown />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{premiumBenefits}</span>
            <span className={styles.statLabel}>Premium</span>
          </div>
        </div>
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
      </motion.div>

      {/* Benefits Grid */}
      <motion.div variants={itemVariants} className={styles.benefitsSection}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>
            {filteredBenefits.length} beneficio
            {filteredBenefits.length !== 1 ? "s" : ""} encontrado
            {filteredBenefits.length !== 1 ? "s" : ""}
          </h2>
        </div>

        <div className={styles.benefitsGrid}>
          {filteredBenefits.map((benefit) => {
            const IconComponent = getBenefitIcon(benefit.icon);
            return (
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={styles.benefitCard}>
                  {/* Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.badges}>
                      {benefit.isPremium && (
                        <Badge
                          variant="warning"
                          className={styles.premiumBadge}
                        >
                          <FaCrown className={styles.badgeIcon} />
                          Premium
                        </Badge>
                      )}
                      {benefit.isLimited && (
                        <Badge
                          variant="secondary"
                          className={styles.limitedBadge}
                        >
                          Limitado
                        </Badge>
                      )}
                    </div>
                    <Badge
                      variant={
                        benefit.status === "Activo" ? "success" : "secondary"
                      }
                    >
                      {benefit.status}
                    </Badge>
                  </div>

                  {/* Icon and Title */}
                  <div className={styles.benefitHeader}>
                    <div
                      className={styles.iconWrapper}
                      style={{ backgroundColor: benefit.color }}
                    >
                      <IconComponent className={styles.benefitIcon} />
                    </div>
                    <div className={styles.benefitInfo}>
                      <h3 className={styles.benefitName}>{benefit.name}</h3>
                      <p className={styles.benefitCategory}>
                        {benefit.category}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={styles.benefitDescription}>
                    {benefit.description}
                  </p>

                  {/* Cost and Usage */}
                  <div className={styles.benefitStats}>
                    <div className={styles.costSection}>
                      <FaCoins className={styles.costIcon} />
                      <span className={styles.costValue}>
                        {benefit.cost} puntos
                      </span>
                    </div>
                    <div className={styles.usageSection}>
                      <span className={styles.usageText}>
                        {benefit.usageCount} uso
                        {benefit.usageCount !== 1 ? "s" : ""}
                        {benefit.maxUsage && ` / ${benefit.maxUsage}`}
                      </span>
                      {benefit.maxUsage && (
                        <div className={styles.usageBar}>
                          <div
                            className={styles.usageProgress}
                            style={{
                              width: `${
                                (benefit.usageCount / benefit.maxUsage) * 100
                              }%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Duration and Restrictions */}
                  {benefit.duration && (
                    <div className={styles.benefitDetails}>
                      <span className={styles.duration}>
                        Duración: {benefit.duration}
                      </span>
                    </div>
                  )}

                  {benefit.restrictions && benefit.restrictions.length > 0 && (
                    <div className={styles.restrictions}>
                      <span className={styles.restrictionsTitle}>
                        Restricciones:
                      </span>
                      <ul className={styles.restrictionsList}>
                        {benefit.restrictions
                          .slice(0, 2)
                          .map((restriction, idx) => (
                            <li key={idx} className={styles.restrictionItem}>
                              {restriction}
                            </li>
                          ))}
                        {benefit.restrictions.length > 2 && (
                          <li className={styles.moreRestrictions}>
                            +{benefit.restrictions.length - 2} más
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className={styles.cardActions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={styles.actionButton}
                    >
                      <FaEye className={styles.actionIcon} />
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={styles.actionButton}
                    >
                      <FaEdit className={styles.actionIcon} />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={styles.deleteButton}
                    >
                      <FaTrash className={styles.actionIcon} />
                      Eliminar
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredBenefits.length === 0 && (
          <motion.div variants={itemVariants} className={styles.noResults}>
            <FaGift className={styles.noResultsIcon} />
            <h3 className={styles.noResultsTitle}>
              No se encontraron beneficios
            </h3>
            <p className={styles.noResultsText}>
              Intenta ajustar los filtros o términos de búsqueda para encontrar
              beneficios.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BenefitsView;
