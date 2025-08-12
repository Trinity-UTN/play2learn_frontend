"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCog,
  FaArrowRight,
  FaPlus,
  FaTrash,
  FaFlag,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import type {
  ArbolDecisionConfig,
  DecisionNode,
  Consequence,
} from "../../../types/ArbolDecision.type";
import { useCreateArbolDecision } from "../../../hooks/useCreateArbolDecision";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration: React.FC = () => {
  const { config, handleConfigSubmit, validateConfig, updateConsequence } =
    useCreateArbolDecision();
  const [formData, setFormData] = useState<ArbolDecisionConfig>(config);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (
    field: keyof ArbolDecisionConfig,
    value: string | DecisionNode[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const validationErrors = validateConfig(formData);
    const fieldErrors: { [key: string]: string } = {};

    validationErrors.forEach((error) => {
      if (error.field === "introduction") {
        fieldErrors.introduction = error.message;
      } else if (error.field === "decisionTree") {
        fieldErrors.decisionTree = error.message;
      }
    });

    setFormErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleConfigSubmit(formData);
    }
  };

  const initializeDecisionTree = () => {
    const newTree: DecisionNode[] = [
      {
        name: "",
        options: [],
        consecuence: null,
      },
      {
        name: "",
        options: [],
        consecuence: null,
      },
    ];
    handleInputChange("decisionTree", newTree);
  };

  if (formData.decisionTree.length === 0) {
    initializeDecisionTree();
  }

  const updateDecisionName = (path: number[], name: string) => {
    const newTree = [...formData.decisionTree];
    const node = getNodeByPath(newTree, path);
    if (node) {
      node.name = name;
      handleInputChange("decisionTree", newTree);
    }
  };

  const getNodeByPath = (
    tree: DecisionNode[],
    path: number[]
  ): DecisionNode | null => {
    let current: DecisionNode | null = null;

    if (path.length === 0) return null;

    current = tree[path[0]];

    for (let i = 1; i < path.length; i++) {
      if (current && current.options && current.options[path[i]]) {
        current = current.options[path[i]];
      } else {
        return null;
      }
    }

    return current;
  };

  const addSubOptions = (path: number[]) => {
    const newTree = [...formData.decisionTree];
    const node = getNodeByPath(newTree, path);

    if (node) {
      node.options = [
        { name: "", options: [], consecuence: null },
        { name: "", options: [], consecuence: null },
      ];
      node.consecuence = null;
      handleInputChange("decisionTree", newTree);
    }
  };

  const addConsequence = (path: number[]) => {
    const newTree = [...formData.decisionTree];
    const node = getNodeByPath(newTree, path);

    if (node) {
      node.consecuence = { name: "", approvesActivity: true };
      node.options = [];
      handleInputChange("decisionTree", newTree);
    }
  };

  const handleConsequenceUpdate = (
    path: number[],
    field: keyof Consequence,
    value: string | boolean
  ) => {
    updateConsequence(path, field, value);
  };

  const removeContent = (path: number[]) => {
    const newTree = [...formData.decisionTree];
    const node = getNodeByPath(newTree, path);

    if (node) {
      node.options = [];
      node.consecuence = null;
      handleInputChange("decisionTree", newTree);
    }
  };

  const hasContent = (node: DecisionNode): boolean => {
    return node.options.length > 0 || node.consecuence !== null;
  };

  const renderNode = (
    node: DecisionNode,
    path: number[],
    depth: number
  ): React.ReactNode => {
    const isRootLevel = depth === 0;
    const nodeClass = isRootLevel ? styles.decisionNode : styles.optionNode;
    const inputClass = isRootLevel ? styles.decisionInput : styles.optionInput;
    const placeholder = isRootLevel
      ? `Decisión ${path[0] + 1}`
      : `${depth === 1 ? "Opción" : "Sub-opción"} ${path[path.length - 1] + 1}`;

    return (
      <div
        key={path.join("-")}
        className={depth === 0 ? styles.decisionBranch : styles.subOptionBranch}
      >
        {/* Nodo actual */}
        <div className={nodeClass} data-depth={depth}>
          <input
            type="text"
            value={node.name}
            onChange={(e) => updateDecisionName(path, e.target.value)}
            placeholder={placeholder}
            className={inputClass}
          />

          {/* Botones de Acción */}
          {!hasContent(node) && (
            <div className={styles.nodeActions}>
              <button
                type="button"
                onClick={() => addSubOptions(path)}
                className={styles.actionBtn}
                title="Agregar opciones"
              >
                <FaPlus />
              </button>
              <button
                type="button"
                onClick={() => addConsequence(path)}
                className={styles.actionBtn}
                title="Agregar consecuencia"
              >
                <FaFlag />
              </button>
            </div>
          )}
          {hasContent(node) && (
            <div className={styles.nodeActions}>
              <button
                type="button"
                onClick={() => removeContent(path)}
                className={styles.removeBtn}
                title="Limpiar contenido"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        {/* Opciones hijas */}
        {node.options.length > 0 && (
          <div
            className={
              depth === 0 ? styles.optionsContainer : styles.subOptionsContainer
            }
          >
            {node.options.map((option, optionIndex) =>
              renderNode(option, [...path, optionIndex], depth + 1)
            )}
          </div>
        )}

        {/* Consecuencia */}
        {node.consecuence && (
          <div className={styles.consequenceContainer}>
            <div
              className={`${styles.consequenceNode} ${
                node.consecuence.approvesActivity
                  ? styles.approved
                  : styles.rejected
              }`}
            >
              <FaFlag className={styles.consequenceIcon} />
              <textarea
                value={node.consecuence.name}
                onChange={(e) =>
                  handleConsequenceUpdate(path, "name", e.target.value)
                }
                placeholder="Describe la consecuencia..."
                className={styles.consequenceTextarea}
                rows={2}
              />
              <div className={styles.approvalButtons}>
                <button
                  type="button"
                  onClick={() =>
                    handleConsequenceUpdate(path, "approvesActivity", true)
                  }
                  className={`${styles.approvalBtn} ${styles.approve} ${
                    node.consecuence.approvesActivity ? styles.active : ""
                  }`}
                >
                  <FaCheck /> Aprueba
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleConsequenceUpdate(path, "approvesActivity", false)
                  }
                  className={`${styles.approvalBtn} ${styles.reject} ${
                    !node.consecuence.approvesActivity ? styles.active : ""
                  }`}
                >
                  <FaTimes /> No Aprueba
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
              Construye tu árbol de decisiones de forma visual e interactiva.
              Puedes crear niveles infinitos de opciones anidadas.
            </p>
          </div>

          <div className={styles.treeContainer}>
            <div className={styles.treeWrapper}>
              {formData.decisionTree.map((decision, decisionIndex) =>
                renderNode(decision, [decisionIndex], 0)
              )}
            </div>
          </div>

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
