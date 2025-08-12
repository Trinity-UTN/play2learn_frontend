import { useState } from "react";
import { motion } from "framer-motion";
import { FaCog, FaArrowRight } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import type { ArbolDecisionConfig } from "../../../types/ArbolDecision.type";
import { useCreateArbolDecision } from "../../../hooks/useCreateArbolDecision";
import DecisionTreeNode from "../decisionTreeNode/DecisionTreeNode";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const {
    config,
    handleConfigSubmit,
    updateNodeName,
    addSubOptions,
    addConsequence,
    removeContent,
    updateConsequence,
  } = useCreateArbolDecision();

  const [formData, setFormData] = useState<ArbolDecisionConfig>(config);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (
    field: keyof ArbolDecisionConfig,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validar introducción
    if (!formData.introduction.trim()) {
      newErrors.introduction = "La introducción es obligatoria";
    } else if (formData.introduction.length > 500) {
      newErrors.introduction =
        "La introducción no puede superar los 500 caracteres";
    }

    // Validar que haya exactamente 2 opciones iniciales
    if (formData.decisionTree.length !== 2) {
      newErrors.decisionTree = "Debe haber exactamente 2 opciones iniciales";
    }

    // Validar cada nodo del árbol recursivamente
    const validateNode = (node: any, path: number[], nodeName: string) => {
      // Validar nombre del nodo
      if (!node.name.trim()) {
        newErrors[
          `node_${path.join("_")}_name`
        ] = `El nombre de ${nodeName} es obligatorio`;
      } else if (node.name.length > 200) {
        newErrors[
          `node_${path.join("_")}_name`
        ] = `El nombre de ${nodeName} no puede superar los 200 caracteres`;
      }

      // Validar que tenga opciones O consecuencia, no ambas ni ninguna
      const hasOptions = node.options && node.options.length > 0;
      const hasConsequence = node.consecuence !== null;

      if (!hasOptions && !hasConsequence) {
        newErrors[
          `node_${path.join("_")}_content`
        ] = `${nodeName} debe tener opciones o una consecuencia`;
      }

      if (hasOptions && hasConsequence) {
        newErrors[
          `node_${path.join("_")}_content`
        ] = `${nodeName} no puede tener opciones y consecuencia al mismo tiempo`;
      }

      // Si tiene opciones, debe tener exactamente 2
      if (hasOptions && node.options.length !== 2) {
        newErrors[
          `node_${path.join("_")}_options`
        ] = `${nodeName} debe tener exactamente 2 opciones`;
      }

      // Validar consecuencia si existe
      if (hasConsequence && node.consecuence) {
        if (!node.consecuence.name.trim()) {
          newErrors[
            `node_${path.join("_")}_consequence_name`
          ] = `La consecuencia de ${nodeName} es obligatoria`;
        } else if (node.consecuence.name.length > 200) {
          newErrors[
            `node_${path.join("_")}_consequence_name`
          ] = `La consecuencia de ${nodeName} no puede superar los 200 caracteres`;
        }
      }

      // Validar opciones recursivamente
      if (hasOptions) {
        node.options.forEach((option: any, index: number) => {
          validateNode(
            option,
            [...path, index],
            `la opción ${index + 1} de ${nodeName}`
          );
        });
      }
    };

    formData.decisionTree.forEach((node, index) => {
      validateNode(node, [index], `la decisión ${index + 1}`);
    });

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleConfigSubmit(formData);
    }
  };

  const handleNodeNameUpdate = (path: number[], name: string) => {
    updateNodeName(path, name);
    setFormData((prev) => {
      const newConfig = { ...prev };
      newConfig.decisionTree = [...config.decisionTree];
      return newConfig;
    });
  };

  const handleAddOptions = (path: number[]) => {
    addSubOptions(path);
    setFormData((prev) => {
      const newConfig = { ...prev };
      newConfig.decisionTree = [...config.decisionTree];
      return newConfig;
    });
  };

  const handleAddConsequence = (path: number[]) => {
    addConsequence(path);
    setFormData((prev) => {
      const newConfig = { ...prev };
      newConfig.decisionTree = [...config.decisionTree];
      return newConfig;
    });
  };

  const handleRemoveContent = (path: number[]) => {
    removeContent(path);
    setFormData((prev) => {
      const newConfig = { ...prev };
      newConfig.decisionTree = [...config.decisionTree];
      return newConfig;
    });
  };

  const handleUpdateConsequence = (
    path: number[],
    field: keyof import("../../../types/ArbolDecision.type").Consequence,
    value: string | boolean
  ) => {
    updateConsequence(path, field, value);
    setFormData((prev) => {
      const newConfig = { ...prev };
      newConfig.decisionTree = [...config.decisionTree];
      return newConfig;
    });
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaCog className={styles.headerIcon} />
        <div>
          <h3 className={styles.title}>Configuración del Árbol de Decisión</h3>
          <p className={styles.description}>
            Define la situación inicial y construye un árbol de decisiones
            interactivo.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Introducción */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>
              Introducción de la Situación
            </h4>
            <p className={styles.sectionDescription}>
              Describe el escenario sobre el que los estudiantes tomarán
              decisiones. Máximo 500 caracteres.
            </p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Situación *
              <span className={styles.labelHint}>
                Presenta un contexto claro que requiera tomar decisiones
                importantes
              </span>
            </label>
            <textarea
              value={formData.introduction}
              onChange={(e) =>
                handleInputChange("introduction", e.target.value)
              }
              className={`${styles.textarea} ${
                formErrors.introduction ? styles.error : ""
              }`}
              placeholder="Ej: Año 1810. Sos un joven criollo con formación ilustrada, testigo del colapso del poder virreinal en el Río de la Plata..."
              rows={4}
              maxLength={500}
            />
            {formErrors.introduction && (
              <span className={styles.errorMessage}>
                {formErrors.introduction}
              </span>
            )}
            <div className={styles.charCount}>
              <span
                className={
                  formData.introduction.length > 500 ? styles.overLimit : ""
                }
              >
                {formData.introduction.length}/500 caracteres
              </span>
            </div>
          </div>
        </div>

        {/* Árbol de Decisiones */}
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Árbol de Decisiones</h4>
            <p className={styles.sectionDescription}>
              Construye tu árbol de decisiones. Cada nodo debe tener exactamente
              2 opciones O una consecuencia.
            </p>
          </div>

          <div className={styles.treeContainer}>
            <div className={styles.treeWrapper}>
              {config.decisionTree.map((decision, decisionIndex) => (
                <DecisionTreeNode
                  key={decisionIndex}
                  node={decision}
                  path={[decisionIndex]}
                  depth={0}
                  onUpdateName={handleNodeNameUpdate}
                  onAddOptions={handleAddOptions}
                  onAddConsequence={handleAddConsequence}
                  onRemoveContent={handleRemoveContent}
                  onUpdateConsequence={handleUpdateConsequence}
                />
              ))}
            </div>
          </div>

          {/* Mostrar errores de validación */}
          {Object.entries(formErrors).map(([key, error]) => {
            if (key !== "introduction" && key !== "decisionTree") {
              return (
                <div key={key} className={styles.errorMessage}>
                  {error}
                </div>
              );
            }
            return null;
          })}

          {formErrors.decisionTree && (
            <span className={styles.errorMessage}>
              {formErrors.decisionTree}
            </span>
          )}
        </div>

        <div className={styles.submitSection}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className={styles.submitButton}
          >
            <FaArrowRight />
            Continuar con el Árbol
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default GeneralConfiguration;
