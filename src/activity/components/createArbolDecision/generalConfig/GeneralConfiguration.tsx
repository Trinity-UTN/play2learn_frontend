import { useState } from "react";
import { motion } from "framer-motion";
import { FaCog, FaTree, FaLightbulb } from "react-icons/fa";
import { Tooltip, TextArea } from "@/shared";
import type { ArbolDecisionConfig } from "../../../types/ArbolDecision.type";
import { useCreateArbolDecision } from "../../../hooks/useCreateArbolDecision";
import ActivityFormError from "../../common/ActivityFormError/ActivityFormError";
import DecisionTreeNode from "../decisionTreeNode/DecisionTreeNode";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const {
    config,
    handleConfigSubmit,
    updateNodeName,
    updateNodeContext,
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

  const handleNodeContextUpdate = (path: number[], context: string) => {
    updateNodeContext(path, context);
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

  const handleDismissError = (key: string) => {
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaCog className={styles.headerIcon} />
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Configuración de Actividad</h3>
          <p className={styles.description}>
            Define la situación inicial y construye un árbol de decisiones
            interactivo para que los estudiantes exploren diferentes caminos.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaLightbulb className={styles.sectionIcon} />
                Introducción de la Situación
                <span className={styles.sectionTooltip}>
                  <Tooltip content="La introducción no puede tener mas de 500 caracteres" />
                </span>
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Describe el escenario sobre el que los estudiantes tomarán
              decisiones.
            </p>
          </div>

          <div className={styles.inputGroup}>
            <TextArea
              id="introduction"
              value={formData.introduction}
              onChange={(e) =>
                handleInputChange("introduction", e.target.value)
              }
              error={!!formErrors.introduction}
              helperText={formErrors.introduction}
              placeholder="Ej: Año 1810. Sos un joven criollo con formación ilustrada, testigo del colapso del poder virreinal en el Río de la Plata..."
              rows={4}
              maxLength={500}
              showCharCount={true}
              resize="vertical"
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaTree className={styles.sectionIcon} />
                Arbol de Decisiones
                <span className={styles.sectionTooltip}>
                  <Tooltip content="Cada nodo debe tener exactamente 2 opciones o una consecuencia." />
                </span>
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Construye tu árbol de decisiones.
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
                  onUpdateContext={handleNodeContextUpdate}
                  onAddOptions={handleAddOptions}
                  onAddConsequence={handleAddConsequence}
                  onRemoveContent={handleRemoveContent}
                  onUpdateConsequence={handleUpdateConsequence}
                />
              ))}
            </div>
          </div>
        </div>
        <ActivityFormError
          errors={formErrors}
          onDismiss={handleDismissError}
          showToaster
        />
      </form>
    </motion.div>
  );
};

export default GeneralConfiguration;
