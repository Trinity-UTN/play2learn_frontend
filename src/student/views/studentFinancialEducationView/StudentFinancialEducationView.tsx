import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaArrowLeft,
  FaBook,
  FaQuestionCircle,
  FaLightbulb,
} from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import ConceptCard from "../../components/studentFinancialEducationViewComponents/conceptCard/ConceptCard";
import InteractiveExample from "../../components/studentFinancialEducationViewComponents/interactiveExample/InteractiveExample";
import QuizSection from "../../components/studentFinancialEducationViewComponents/quizSection/QuizSection";
import type { EducationalConcept } from "../../types/generalType";
import styles from "./StudentFinancialEducationView.module.css";
import { useNavigate } from "react-router-dom";

const StudentFinancialEducationView = () => {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string>("concepts");
  const navigate = useNavigate();
  const concepts: EducationalConcept[] = [
    {
      id: "liquidity",
      title: "Liquidez",
      description:
        "La facilidad con la que puedes convertir tus activos en dinero efectivo para usar inmediatamente.",
      example:
        "Tener monedas en tu billetera = alta liquidez. Tenerlas invertidas = baja liquidez pero más ganancia futura.",
      icon: "💧",
      color: "#10B981",
      difficulty: "Básico",
    },
    {
      id: "investment",
      title: "Inversión",
      description:
        "Usar tu dinero para generar más dinero en el futuro, aunque no puedas usarlo inmediatamente.",
      example:
        "Inviertes 100 monedas por 30 días y recibes 115 monedas. Ganaste 15 monedas por esperar.",
      icon: "📈",
      color: "#3B82F6",
      difficulty: "Intermedio",
    },
    {
      id: "planned-spending",
      title: "Gasto Planificado",
      description:
        "Decidir con anticipación en qué vas a gastar tu dinero para evitar compras impulsivas.",
      example:
        "Planificas comprar un avatar de 200 monedas. Ahorras 50 monedas por semana durante 4 semanas.",
      icon: "🎯",
      color: "#F59E0B",
      difficulty: "Básico",
    },
    {
      id: "savings",
      title: "Ahorro",
      description:
        "Guardar parte de tu dinero para usarlo en el futuro, ya sea para metas específicas o emergencias.",
      example:
        "Ahorras 20 monedas cada semana. En 10 semanas tendrás 200 monedas para algo especial.",
      icon: "🐷",
      color: "#8B5CF6",
      difficulty: "Básico",
    },
    {
      id: "risk-return",
      title: "Riesgo vs Retorno",
      description:
        "A mayor riesgo, mayor posible ganancia, pero también mayor posible pérdida.",
      example:
        "Inversión segura: +5% garantizado. Inversión arriesgada: +20% posible, pero puedes perder -10%.",
      icon: "⚖️",
      color: "#EF4444",
      difficulty: "Avanzado",
    },
    {
      id: "compound-interest",
      title: "Interés Compuesto",
      description:
        "Ganar dinero no solo sobre tu inversión inicial, sino también sobre las ganancias anteriores.",
      example:
        "Inviertes 100 monedas al 10% anual. Año 1: 110. Año 2: 121. Año 3: 133. ¡Las ganancias crecen!",
      icon: "🚀",
      color: "#06B6D4",
      difficulty: "Avanzado",
    },
  ];

  const tabs = [
    { id: 1, name: "concepts", icon: <FaBook />, label: "Conceptos" },
    { id: 2, name: "examples", icon: <FaLightbulb />, label: "Ejemplos" },
    { id: 3, name: "quiz", icon: <FaQuestionCircle />, label: "Quiz" },
  ];
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
      className={styles.education}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/student/wallet")}
            className={styles.backButton}
          >
            <FaArrowLeft />
            Volver a Billetera
          </Button>
          <h1 className={styles.title}>
            <FaGraduationCap className={styles.titleIcon} />
            Educación Financiera
          </h1>
          <p className={styles.subtitle}>
            Aprende conceptos clave para manejar mejor tu dinero
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.navigation}>
        <div className={styles.navTabs}>
          {tabs.map((tab) => (
            <Button
              variant={"ghost"}
              onClick={() => setCurrentSection(tab.name)}
              className={`${styles.navTab} ${
                currentSection === tab.name && styles.navTabSelect
              }`}
              key={tab.id}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </motion.div>

      <div className={styles.content}>
        {currentSection === "concepts" && (
          <motion.div variants={itemVariants} className={styles.conceptsGrid}>
            {concepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                concept={concept}
                isSelected={selectedConcept === concept.id}
                onClick={() =>
                  setSelectedConcept(
                    selectedConcept === concept.id ? null : concept.id
                  )
                }
              />
            ))}
          </motion.div>
        )}

        {currentSection === "examples" && (
          <motion.div variants={itemVariants}>
            <InteractiveExample />
          </motion.div>
        )}

        {currentSection === "quiz" && (
          <motion.div variants={itemVariants}>
            <QuizSection />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StudentFinancialEducationView;
