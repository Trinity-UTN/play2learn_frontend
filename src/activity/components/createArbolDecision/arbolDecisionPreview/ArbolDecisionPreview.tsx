import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaTree, FaArrowRight, FaCheck, FaTimes } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import { useCreateArbolDecision } from "../../../hooks/useCreateArbolDecision";
import styles from "./ArbolDecisionPreview.module.css";

const ArbolDecisionPreview: React.FC = () => {
  const { config } = useCreateArbolDecision();
  const [currentPath, setCurrentPath] = useState<number[]>([]);
  const [selectedDecisions, setSelectedDecisions] = useState<string[]>([]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDecisionSelect = (
    decisionIndex: number,
    decisionText: string
  ) => {
    setCurrentPath([...currentPath, decisionIndex]);
    setSelectedDecisions([...selectedDecisions, decisionText]);
  };

  const handleReset = () => {
    setCurrentPath([]);
    setSelectedDecisions([]);
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.previewHeader}>
        <h3 className={styles.sectionTitle}>Vista Previa del Simulador</h3>
        <p className={styles.description}>
          Así es como verán el árbol de decisión tus estudiantes. Esta es una
          simulación básica con las opciones iniciales.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🌳</span>
            <div>
              <span className={styles.statLabel}>Tipo de actividad</span>
              <span className={styles.statValue}>Árbol de Decisión</span>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>📝</span>
            <div>
              <span className={styles.statLabel}>Longitud de introducción</span>
              <span className={styles.statValue}>
                {config.introduction.length} caracteres
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.simulatorContainer}>
        <div className={styles.simulatorHeader}>
          <div className={styles.simulatorTitle}>
            <FaEye className={styles.simulatorIcon} />
            <h4>Simulador de Decisiones</h4>
          </div>
          <Button
            variant="secondary"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reiniciar Simulación
          </Button>
        </div>

        <div className={styles.scenarioCard}>
          <div className={styles.scenarioHeader}>
            <h5 className={styles.scenarioTitle}>Situación:</h5>
          </div>
          <div className={styles.scenarioContent}>
            <p className={styles.scenarioText}>{config.introduction}</p>
          </div>
        </div>

        {selectedDecisions.length > 0 && (
          <div className={styles.pathSection}>
            <h5 className={styles.pathTitle}>Tu camino de decisiones:</h5>
            <div className={styles.pathList}>
              {selectedDecisions.map((decision, index) => (
                <div key={index} className={styles.pathItem}>
                  <span className={styles.pathNumber}>{index + 1}</span>
                  <span className={styles.pathText}>{decision}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.decisionsSection}>
          <div className={styles.decisionsSectionHeader}>
            <h5 className={styles.decisionsSectionTitle}>
              ¿Qué decides hacer?
            </h5>
            <div className={styles.decisionsInfo}>
              <FaTree />
              <span>Selecciona una opción para continuar</span>
            </div>
          </div>

          <div className={styles.decisionsGrid}>
            {config.decisionTree.map((decision, index) => (
              <button
                key={index}
                onClick={() => handleDecisionSelect(index, decision.name)}
                className={styles.decisionOption}
                disabled={!decision.name.trim()}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionNumber}>{index + 1}</span>
                  <FaArrowRight className={styles.optionIcon} />
                </div>
                <div className={styles.optionContent}>
                  <p className={styles.optionText}>
                    {decision.name || "Opción no configurada"}
                  </p>
                </div>
                <div className={styles.optionFooter}>
                  {decision.name.trim() ? (
                    <span className={styles.optionStatus}>
                      <FaCheck className={styles.statusIcon} />
                      Listo
                    </span>
                  ) : (
                    <span className={styles.optionStatusError}>
                      <FaTimes className={styles.statusIcon} />
                      Pendiente
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.nextStepsInfo}>
          <h5>Próximos pasos en la configuración:</h5>
          <ul>
            <li>
              Definir las consecuencias o siguientes decisiones para cada opción
            </li>
            <li>Configurar qué caminos aprueban o desaprueban la actividad</li>
            <li>Establecer el árbol completo de decisiones</li>
            <li>Probar todos los caminos posibles</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ArbolDecisionPreview;
