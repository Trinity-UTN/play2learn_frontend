"use client";

import type React from "react";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FaGamepad,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaFire,
  FaStar,
  FaClock,
} from "react-icons/fa";
import type { Activity } from "../../types/ActivityType";
import Card from "../../../shared/components/Card/CardComponent";
import Input from "../../../shared/components/Input/InputComponent";
import ActivityCard from "../../components/activityCard/ActivityCard";
import styles from "./ActivitiesView.module.css";

const ActivitiesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const activities: Activity[] = [
    {
      id: 1,
      name: "Ahorcado Educativo",
      type: "Juego de Palabras",
      description:
        "Adivina la palabra oculta letra por letra. Perfecto para mejorar vocabulario y ortografía.",
      difficulty: "Fácil",
      duration: "10-15 min",
      subject: "Lengua",
      icon: "hangman",
      color: "#b9e769",
      features: ["Vocabulario", "Ortografía", "Concentración"],
      isPopular: true,
    },
    {
      id: 2,
      name: "Completar Oraciones",
      type: "Ejercicio Gramatical",
      description:
        "Completa las oraciones con las palabras correctas para formar textos coherentes.",
      difficulty: "Medio",
      duration: "15-20 min",
      subject: "Lengua",
      icon: "complete",
      color: "#ff6f3c",
      features: ["Gramática", "Comprensión", "Sintaxis", "Vocabulario"],
    },
    {
      id: 3,
      name: "Preguntados",
      type: "Trivia Educativa",
      description:
        "Responde preguntas de múltiple opción sobre diferentes materias y temas.",
      difficulty: "Medio",
      duration: "20-30 min",
      subject: "General",
      icon: "questions",
      color: "#007bff",
      features: ["Conocimiento", "Rapidez", "Memoria"],
      isPopular: true,
    },
    {
      id: 4,
      name: "Ordenar Secuencias",
      type: "Lógica y Orden",
      description:
        "Organiza elementos en el orden correcto según criterios específicos.",
      difficulty: "Medio",
      duration: "10-15 min",
      subject: "Matemáticas",
      icon: "sequence",
      color: "#9333ea",
      features: ["Lógica", "Secuencias", "Orden", "Análisis"],
    },
    {
      id: 5,
      name: "Rompecabezas Numérico",
      type: "Puzzle Matemático",
      description:
        "Resuelve puzzles numéricos y problemas matemáticos de forma interactiva.",
      difficulty: "Difícil",
      duration: "25-35 min",
      subject: "Matemáticas",
      icon: "puzzle",
      color: "#dc2626",
      features: ["Cálculo", "Lógica", "Resolución"],
      isNew: true,
    },
    {
      id: 6,
      name: "Memoria Visual",
      type: "Juego de Memoria",
      description:
        "Ejercita tu memoria visual recordando patrones, colores y secuencias.",
      difficulty: "Fácil",
      duration: "8-12 min",
      subject: "General",
      icon: "memory",
      color: "#059669",
      features: ["Memoria", "Atención", "Concentración"],
      isNew: true,
    },
    {
      id: 7,
      name: "Sopa de Letras",
      type: "Búsqueda de Palabras",
      description:
        "Encuentra palabras ocultas en una cuadrícula de letras aleatorias.",
      difficulty: "Fácil",
      duration: "12-18 min",
      subject: "Lengua",
      icon: "random",
      color: "#f59e0b",
      features: ["Vocabulario", "Atención", "Paciencia"],
    },
    {
      id: 8,
      name: "Quiz Científico",
      type: "Evaluación Interactiva",
      description:
        "Pon a prueba tus conocimientos científicos con preguntas desafiantes.",
      difficulty: "Difícil",
      duration: "30-40 min",
      subject: "Ciencias",
      icon: "questions",
      color: "#8b5cf6",
      features: ["Ciencia", "Análisis", "Conocimiento", "Razonamiento"],
      isPopular: true,
    },
  ];

  const difficulties = ["all", "Fácil", "Medio", "Difícil"];
  const subjects = ["all", "Lengua", "Matemáticas", "Ciencias", "General"];

  const filteredActivities = activities
    .filter((activity) => {
      const matchesSearch =
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        activity.difficulty === selectedDifficulty;
      const matchesSubject =
        selectedSubject === "all" || activity.subject === selectedSubject;

      return matchesSearch && matchesDifficulty && matchesSubject;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "difficulty":
          const difficultyOrder = { Fácil: 1, Medio: 2, Difícil: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "duration":
          return Number.parseInt(a.duration) - Number.parseInt(b.duration);
        case "popular":
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        default:
          return 0;
      }
    });

  const handleActivitySelect = (activity: Activity) => {
    console.log("Actividad seleccionada:", activity);
    // Aquí puedes navegar a la página de creación de la actividad específica
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const statsVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200 },
    },
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
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Actividades Educativas</h1>
            <p className={styles.subtitle}>
              Selecciona el tipo de actividad que deseas crear para tus
              estudiantes
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className={styles.statsSection}>
        <motion.div variants={statsVariants} className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#007bff" }}
          >
            <FaGamepad />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{activities.length}</span>
            <span className={styles.statLabel}>Actividades</span>
          </div>
        </motion.div>

        <motion.div variants={statsVariants} className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#f59e0b" }}
          >
            <FaStar />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>
              {activities.filter((a) => a.isPopular).length}
            </span>
            <span className={styles.statLabel}>Populares</span>
          </div>
        </motion.div>

        <motion.div variants={statsVariants} className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#10b981" }}
          >
            <FaFire />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>
              {activities.filter((a) => a.isNew).length}
            </span>
            <span className={styles.statLabel}>Nuevas</span>
          </div>
        </motion.div>

        <motion.div variants={statsVariants} className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#8b5cf6" }}
          >
            <FaClock />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>15</span>
            <span className={styles.statLabel}>Min Promedio</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card className={styles.filtersCard}>
          <div className={styles.filtersContent}>
            {/* Search */}
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <Input
                placeholder="Buscar actividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Filters */}
            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <FaFilter className={styles.filterIcon} />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={styles.filterSelect}
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === "all"
                        ? "Todas las dificultades"
                        : difficulty}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className={styles.filterSelect}
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject === "all" ? "Todas las materias" : subject}
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
                  <option value="difficulty">Ordenar por dificultad</option>
                  <option value="duration">Ordenar por duración</option>
                  <option value="popular">Ordenar por popularidad</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Activities Grid */}
      <motion.div variants={itemVariants} className={styles.activitiesSection}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>
            {filteredActivities.length} actividad
            {filteredActivities.length !== 1 ? "es" : ""} disponible
            {filteredActivities.length !== 1 ? "s" : ""}
          </h2>
        </div>

        <div className={styles.activitiesGrid}>
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <ActivityCard
                activity={activity}
                onSelect={handleActivitySelect}
              />
            </motion.div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <motion.div variants={itemVariants} className={styles.noResults}>
            <FaGamepad className={styles.noResultsIcon} />
            <h3 className={styles.noResultsTitle}>
              No se encontraron actividades
            </h3>
            <p className={styles.noResultsText}>
              Intenta ajustar los filtros o términos de búsqueda para encontrar
              actividades.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ActivitiesView;
