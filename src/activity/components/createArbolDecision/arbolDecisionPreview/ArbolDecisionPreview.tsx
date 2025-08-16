import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaTree,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaUndo,
  FaFlag,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import { useCreateArbolDecision } from "../../../hooks/useCreateArbolDecision";
import type { DecisionNode } from "../../../types/ArbolDecision.type";
import styles from "./ArbolDecisionPreview.module.css";

interface DecisionPath {
  nodeIndex: number;
  nodeName: string;
  depth: number;
}

const ArbolDecisionPreview: React.FC = () => {
  const { config } = useCreateArbolDecision();

  const [currentPath, setCurrentPath] = useState<DecisionPath[]>([]);
  const [availableOptions, setAvailableOptions] = useState<DecisionNode[]>(
    config.decisionTree
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalConsequence, setFinalConsequence] = useState<any>(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDecisionSelect = (
    selectedNode: DecisionNode,
    nodeIndex: number
  ) => {
    const newPathItem: DecisionPath = {
      nodeIndex,
      nodeName: selectedNode.name,
      depth: currentPath.length,
    };

    const newPath = [...currentPath, newPathItem];
    setCurrentPath(newPath);

    // Si el nodo seleccionado tiene una consecuencia, terminar la actividad
    if (selectedNode.consecuence) {
      setFinalConsequence(selectedNode.consecuence);
      setIsCompleted(true);
      setAvailableOptions([]);
    } else if (selectedNode.options.length > 0) {
      // Si tiene opciones, mostrarlas para la siguiente decisión
      setAvailableOptions(selectedNode.options);
    }
  };

  const handleReset = () => {
    setCurrentPath([]);
    setAvailableOptions(config.decisionTree);
    setIsCompleted(false);
    setFinalConsequence(null);
  };

  const getNodeStats = () => {
    let totalNodes = 0;
    let totalConsequences = 0;
    let maxDepth = 0;

    const countNodes = (nodes: DecisionNode[], depth = 0) => {
      maxDepth = Math.max(maxDepth, depth);
      nodes.forEach((node) => {
        totalNodes++;
        if (node.consecuence) {
          totalConsequences++;
        }
        if (node.options.length > 0) {
          countNodes(node.options, depth + 1);
        }
      });
    };

    countNodes(config.decisionTree);
    return { totalNodes, totalConsequences, maxDepth };
  };

  const stats = getNodeStats();

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h4 className={styles.title}>
              <FaEye className={styles.headerIcon} />
              Vista Previa de Actividad
              <span className={styles.tooltip}>
                <Tooltip content="Navega por las opciones para probar todos los caminos posibles." />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Esta es una simulación de cómo los estudiantes experimentarán tu
            árbol de decisión.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🌳</span>
            <div>
              <span className={styles.statLabel}>Nodos totales</span>
              <span className={styles.statValue}>{stats.totalNodes}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🎯</span>
            <div>
              <span className={styles.statLabel}>Consecuencias</span>
              <span className={styles.statValue}>
                {stats.totalConsequences}
              </span>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>📊</span>
            <div>
              <span className={styles.statLabel}>Profundidad máxima</span>
              <span className={styles.statValue}>
                {stats.maxDepth + 1} niveles
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.simulatorContainer}>
        {/* Introducción */}
        <div className={styles.scenarioCard}>
          <div className={styles.scenarioHeader}>
            <h5 className={styles.scenarioTitle}>Situación:</h5>
          </div>
          <div className={styles.scenarioContent}>
            <p className={styles.scenarioText}>{config.introduction}</p>
          </div>
        </div>

        {/* Camino de decisiones tomadas */}
        {currentPath.length > 0 && (
          <div className={styles.pathSection}>
            <h5 className={styles.pathTitle}>Tu camino de decisiones:</h5>
            <div className={styles.pathList}>
              {currentPath.map((pathItem, index) => (
                <motion.div
                  key={index}
                  className={styles.pathItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={styles.pathNumber}>{index + 1}</span>
                  <span className={styles.pathText}>{pathItem.nodeName}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Resultado final */}
        {isCompleted && finalConsequence && (
          <motion.div
            className={styles.resultSection}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`${styles.resultCard} ${
                finalConsequence.approvesActivity
                  ? styles.approved
                  : styles.rejected
              }`}
            >
              <div className={styles.resultHeader}>
                <FaFlag className={styles.resultIcon} />
                <h5 className={styles.resultTitle}>
                  {finalConsequence.approvesActivity
                    ? "¡Actividad Aprobada!"
                    : "Actividad No Aprobada"}
                </h5>
              </div>
              <div className={styles.resultContent}>
                <p className={styles.resultText}>{finalConsequence.name}</p>
              </div>
              <div className={styles.resultFooter}>
                {finalConsequence.approvesActivity ? (
                  <div className={styles.successBadge}>
                    <FaCheck />
                    <span>Resultado Positivo</span>
                  </div>
                ) : (
                  <div className={styles.failureBadge}>
                    <FaTimes />
                    <span>Resultado Negativo</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Opciones disponibles */}
        {!isCompleted && availableOptions.length > 0 && (
          <div className={styles.decisionsSection}>
            <div className={styles.decisionsSectionHeader}>
              <h5 className={styles.decisionsSectionTitle}>
                {currentPath.length === 0
                  ? "¿Qué decides hacer?"
                  : "¿Cuál es tu siguiente decisión?"}
              </h5>
              <div className={styles.decisionsInfo}>
                <FaTree />
                <span>Selecciona una opción para continuar</span>
              </div>
            </div>

            <div className={styles.decisionsGrid}>
              {availableOptions.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDecisionSelect(option, index)}
                  className={styles.decisionOption}
                  disabled={!option.name.trim()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={styles.optionHeader}>
                    <span className={styles.optionNumber}>{index + 1}</span>
                    <FaArrowRight className={styles.optionIcon} />
                  </div>
                  <div className={styles.optionContent}>
                    <p className={styles.optionText}>
                      {option.name || "Opción no configurada"}
                    </p>
                  </div>
                  <div className={styles.optionFooter}>
                    {option.name.trim() ? (
                      <span className={styles.optionStatus}>
                        <FaCheck className={styles.statusIcon} />
                        Disponible
                      </span>
                    ) : (
                      <span className={styles.optionStatusError}>
                        <FaTimes className={styles.statusIcon} />
                        No configurada
                      </span>
                    )}
                  </div>

                  {/* Indicador de qué hay después */}
                  <div className={styles.optionPreview}>
                    {option.consecuence ? (
                      <span className={styles.previewBadge}>
                        <FaFlag />
                        Resultado final
                      </span>
                    ) : option.options.length > 0 ? (
                      <span className={styles.previewBadge}>
                        <FaTree />
                        {option.options.length} opciones más
                      </span>
                    ) : (
                      <span className={styles.previewBadge}>
                        <FaTimes />
                        Sin configurar
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
        <div className={styles.simulatorHeader}>
          <Button
            variant="secondary"
            onClick={handleReset}
            className={styles.resetButton}
          >
            <FaUndo />
            Reiniciar Simulación
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArbolDecisionPreview;
