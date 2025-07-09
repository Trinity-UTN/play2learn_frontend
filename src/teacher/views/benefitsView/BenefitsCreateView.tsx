"use client";

import React from "react";

import type { ReactElement } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGift,
  FaSave,
  FaCoins,
  FaGraduationCap,
  FaFileAlt,
  FaCalendarCheck,
  FaStar,
  FaUsers,
  FaChartLine,
  FaCrown,
  FaPlus,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import styles from "./BenefitsCreateView.module.css";
import type { IconType } from "react-icons";

const BenefitCreateView: React.FC = (): ReactElement => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    category: "",
    icon: "",
    color: "#007bff",
    duration: "",
    maxUsage: "",
    isLimited: false,
    isPremium: false,
    restrictions: [""],
  });

  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    {
      value: "Evaluaciones",
      label: "Evaluaciones",
      icon: FaGraduationCap,
      color: "#007bff",
    },
    { value: "Trabajos", label: "Trabajos", icon: FaFileAlt, color: "#ff6f3c" },
    {
      value: "Asistencia",
      label: "Asistencia",
      icon: FaCalendarCheck,
      color: "#10b981",
    },
    { value: "Extras", label: "Extras", icon: FaStar, color: "#8b5cf6" },
  ];

  const iconOptions = [
    { value: "exam", label: "Examen", icon: FaGraduationCap },
    { value: "file", label: "Archivo", icon: FaFileAlt },
    { value: "skip", label: "Saltar", icon: FaStar },
    { value: "calendar", label: "Calendario", icon: FaCalendarCheck },
    { value: "chat", label: "Chat", icon: FaUsers },
    { value: "clock", label: "Reloj", icon: FaCoins },
    { value: "book", label: "Libro", icon: FaChartLine },
    { value: "retry", label: "Reintentar", icon: FaGift },
  ];

  const colorOptions = [
    "#007bff",
    "#ff6f3c",
    "#b9e769",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#dc2626",
    "#6b7280",
  ];

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log("Beneficio creado:", formData);
  };

  const handleChange = (
    field: string,
    value: string | boolean | number
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addRestriction = (): void => {
    setFormData((prev) => ({
      ...prev,
      restrictions: [...prev.restrictions, ""],
    }));
  };

  const removeRestriction = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      restrictions: prev.restrictions.filter((_, i) => i !== index),
    }));
  };

  const updateRestriction = (index: number, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      restrictions: prev.restrictions.map((restriction, i) =>
        i === index ? value : restriction
      ),
    }));
  };

  const getSelectedIcon = (): IconType => {
    const selected = iconOptions.find(
      (option) => option.value === formData.icon
    );
    return selected ? selected.icon : FaGift;
  };

  const getSelectedCategory = ():
    | { value: string; label: string; icon: IconType; color: string }
    | undefined => {
    return categories.find((cat) => cat.value === formData.category);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const previewVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
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
          <h1 className={styles.title}>Crear Nuevo Beneficio</h1>
          <p className={styles.subtitle}>
            Diseña una recompensa atractiva para motivar a los estudiantes
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className={styles.previewButton}
          >
            <FaInfoCircle className={styles.buttonIcon} />
            {previewMode ? "Ocultar Vista Previa" : "Vista Previa"}
          </Button>
        </div>
      </motion.div>

      <div className={styles.contentLayout}>
        {/* Form */}
        <motion.div variants={itemVariants} className={styles.formSection}>
          <Card className={styles.formCard}>
            <div className={styles.cardHeader}>
              <FaGift className={styles.headerIcon} />
              <h2 className={styles.cardTitle}>Información del Beneficio</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Basic Info */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Información Básica</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Nombre del Beneficio *
                    </label>
                    <Input
                      placeholder="Ej: Descuento en Parcial"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Costo en Puntos *</label>
                    <div className={styles.costInput}>
                      <FaCoins className={styles.costIcon} />
                      <Input
                        type="number"
                        placeholder="15"
                        value={formData.cost}
                        onChange={(e) => handleChange("cost", e.target.value)}
                        min="1"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Descripción *</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Describe detalladamente qué obtiene el estudiante con este beneficio..."
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows={3}
                    required
                  />
                </div>
              </div>

              {/* Category and Appearance */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Categoría y Apariencia</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Categoría *</label>
                    <div className={styles.categoryGrid}>
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          type="button"
                          className={`${styles.categoryOption} ${
                            formData.category === category.value
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() =>
                            handleChange("category", category.value)
                          }
                        >
                          <category.icon
                            className={styles.categoryIcon}
                            style={{ color: category.color }}
                          />
                          <span>{category.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Icono</label>
                    <div className={styles.iconGrid}>
                      {iconOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`${styles.iconOption} ${
                            formData.icon === option.value
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() => handleChange("icon", option.value)}
                          title={option.label}
                        >
                          <option.icon />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Color</label>
                  <div className={styles.colorGrid}>
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`${styles.colorOption} ${
                          formData.color === color ? styles.selected : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleChange("color", color)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Configuration */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Configuración</h3>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Duración/Validez</label>
                    <Input
                      placeholder="Ej: 1 uso, 7 días, 1 mes"
                      value={formData.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Límite de Uso</label>
                    <Input
                      type="number"
                      placeholder="Ej: 50"
                      value={formData.maxUsage}
                      onChange={(e) => handleChange("maxUsage", e.target.value)}
                      min="1"
                    />
                  </div>
                </div>

                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.isLimited}
                      onChange={(e) =>
                        handleChange("isLimited", e.target.checked)
                      }
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                      Beneficio limitado (cantidad restringida)
                    </span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.isPremium}
                      onChange={(e) =>
                        handleChange("isPremium", e.target.checked)
                      }
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                      <FaCrown className={styles.premiumIcon} />
                      Beneficio premium (exclusivo)
                    </span>
                  </label>
                </div>
              </div>

              {/* Restrictions */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Restricciones y Condiciones
                </h3>
                <div className={styles.restrictionsSection}>
                  {formData.restrictions.map((restriction, index) => (
                    <div key={index} className={styles.restrictionItem}>
                      <Input
                        placeholder="Ej: Solo aplicable a parciales"
                        value={restriction}
                        onChange={(e) =>
                          updateRestriction(index, e.target.value)
                        }
                      />
                      {formData.restrictions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRestriction(index)}
                          className={styles.removeButton}
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addRestriction}
                    className={styles.addButton}
                  >
                    <FaPlus className={styles.buttonIcon} />
                    Agregar Restricción
                  </Button>
                </div>
              </div>

              {/* Submit */}
              <div className={styles.submitSection}>
                <Button
                  type="submit"
                  variant="primary"
                  className={styles.submitButton}
                >
                  <FaSave className={styles.buttonIcon} />
                  Crear Beneficio
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={styles.cancelButton}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Preview */}
        {previewMode && (
          <motion.div
            variants={previewVariants}
            initial="hidden"
            animate="visible"
            className={styles.previewSection}
          >
            <Card className={styles.previewCard}>
              <h3 className={styles.previewTitle}>Vista Previa</h3>
              <div className={styles.benefitPreview}>
                {/* Preview Header */}
                <div className={styles.previewHeader}>
                  <div className={styles.previewBadges}>
                    {formData.isPremium && (
                      <span className={styles.premiumBadge}>
                        <FaCrown className={styles.badgeIcon} />
                        Premium
                      </span>
                    )}
                    {formData.isLimited && (
                      <span className={styles.limitedBadge}>Limitado</span>
                    )}
                  </div>
                  <span className={styles.statusBadge}>Activo</span>
                </div>

                {/* Preview Content */}
                <div className={styles.previewContent}>
                  <div
                    className={styles.previewIconWrapper}
                    style={{ backgroundColor: formData.color }}
                  >
                    {React.createElement(getSelectedIcon(), {
                      className: styles.previewIcon,
                    })}
                  </div>
                  <div className={styles.previewInfo}>
                    <h4 className={styles.previewName}>
                      {formData.name || "Nombre del Beneficio"}
                    </h4>
                    <p className={styles.previewCategory}>
                      {getSelectedCategory()?.label ||
                        "Selecciona una categoría"}
                    </p>
                  </div>
                </div>

                <p className={styles.previewDescription}>
                  {formData.description ||
                    "Descripción del beneficio aparecerá aquí..."}
                </p>

                <div className={styles.previewStats}>
                  <div className={styles.previewCost}>
                    <FaCoins className={styles.previewCostIcon} />
                    <span>{formData.cost || "0"} puntos</span>
                  </div>
                  {formData.duration && (
                    <div className={styles.previewDuration}>
                      Duración: {formData.duration}
                    </div>
                  )}
                </div>

                {formData.restrictions.some((r) => r.trim()) && (
                  <div className={styles.previewRestrictions}>
                    <span className={styles.previewRestrictionsTitle}>
                      Restricciones:
                    </span>
                    <ul className={styles.previewRestrictionsList}>
                      {formData.restrictions
                        .filter((r) => r.trim())
                        .slice(0, 2)
                        .map((restriction, idx) => (
                          <li key={idx}>{restriction}</li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BenefitCreateView;
