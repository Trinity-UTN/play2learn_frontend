import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaChartLine,
  FaArrowRight,
  FaArrowLeft,
  FaEye,
  FaBook,
  FaInfoCircle,
  FaExclamationTriangle,
  FaColumns,
  FaList,
  FaGamepad,
  FaRedoAlt,
  FaAward,
  FaCoins,
} from "react-icons/fa";
import type {
  ConfigurationActivity,
  ConfigurationErrors,
} from "../../types/Configuration.type";
import Button from "../../../shared/components/Button/ButtonComponent";
import Input from "../../../shared/components/Input/InputComponent";
import Card from "../../../shared/components/Card/CardComponent";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import styles from "./ConfigureActivityView.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSubject } from "../../../admin/hooks/useSubject";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";

const ConfigureActivityView: React.FC = () => {
  const [configuration, setConfiguration] = useState<ConfigurationActivity>({
    description: "",
    startDate: new Date().toISOString().slice(0, 16), // Fecha actual por defecto
    endDate: "",
    dificulty: "",
    maxTime: 30,
    subjectId: 0,
    attempts: 1,
    initialBalance: 0,
  });

  const { code_game } = useParams();
  const [errors, setErrors] = useState<ConfigurationErrors>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isVerticalLayout, setIsVerticalLayout] = useState(true);
  const { subjects, getSubjectByTeacher } = useSubject();
  const { registerConfigurationActivity } = useConfigurationActivity();
  const navigate = useNavigate();

  useEffect(() => {
    getSubjectByTeacher();
  }, []);

  // Mapeo de nombres de actividades TODO: Traerlo bien de otro lado
  const getActivityName = (code: string) => {
    const activityNames: { [key: string]: string } = {
      ahorcado_educativo: "Ahorcado",
      arbol_decision: "Árbol de Decisión",
      completar_oraciones: "Completar Oraciones",
      desafio_clasificacion: "Desafío de Clasificación",
      memorama: "Memorama",
      no_ludica: "No Lúdica",
      ordenar_secuencia: "Ordenar Secuencia",
      preguntados: "Preguntados",
    };
    return activityNames[code] || "Actividad";
  };

  // Opciones de dificultad que coinciden con el enum del backend
  const difficultyOptions = [
    {
      value: "FACIL",
      label: "Fácil",
      color: "#10B981",
      icon: "🟢",
    },
    {
      value: "MEDIO",
      label: "Medio",
      color: "#F59E0B",
      icon: "🟡",
    },
    {
      value: "DIFICIL",
      label: "Difícil",
      color: "#EF4444",
      icon: "🔴",
    },
  ];

  const handleInputChange = (
    field: keyof ConfigurationActivity,
    value: string | number
  ) => {
    setConfiguration((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ConfigurationErrors> = {};

    if (!configuration.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (configuration.description.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    if (!configuration.startDate) {
      newErrors.startDate = "La fecha de inicio es requerida";
    }

    if (!configuration.endDate) {
      newErrors.endDate = "La fecha de fin es requerida";
    } else if (
      configuration.startDate &&
      new Date(configuration.endDate) <= new Date(configuration.startDate)
    ) {
      newErrors.endDate =
        "La fecha de fin debe ser posterior a la fecha de inicio";
    }

    if (!configuration.dificulty) {
      newErrors.dificulty = "La dificultad es requerida";
    }

    if (configuration.maxTime <= 0) {
      newErrors.maxTime = "El tiempo máximo debe ser mayor a 0";
    } else if (configuration.maxTime > 180) {
      newErrors.maxTime = "El tiempo máximo no puede exceder 180 minutos";
    }

    if (configuration.subjectId === 0) {
      newErrors.subjectId = "Debe seleccionar una materia";
    }

    if (configuration.attempts <= 0) {
      newErrors.attempts = "El numero de intentos debe ser mayor a 0";
    }

    if (configuration.initialBalance <= 0) {
      newErrors.initialBalance = "El balance inicial debe ser mayor a 0";
    }

    const selectedSubject = getSelectedSubject();
    const ssActualBalance = selectedSubject?.actualBalance || 0;
    if (configuration.initialBalance > ssActualBalance) {
      newErrors.initialBalance =
        "El balance inicial debe ser mayor al balance actual de la materia";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      registerConfigurationActivity(configuration);
      navigate(`/dashboard/teacher/actividad/configuration/${code_game}`);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard/teacher/actividades/list");
  };

  const getSelectedSubject = () => {
    return subjects.find((subject) => subject.id === configuration.subjectId);
  };

  const getDifficultyLabel = (value: string) => {
    const option = difficultyOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const getMaximumInitialBalance = () => {
    const selectedSubject = getSelectedSubject();
    if (selectedSubject) {
      return selectedSubject.initialBalance * 0.3;
    } else {
      return 1;
    }
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.iconWrapper}>
            <FaGamepad className={styles.titleIcon} />
          </div>
          <div>
            <h1 className={styles.title}>
              Creando Actividad: {getActivityName(code_game || "")}
            </h1>
            <p className={styles.subtitle}>
              Personaliza los parámetros de tu actividad educativa
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            variant="ghost"
            onClick={() => setIsVerticalLayout(!isVerticalLayout)}
            className={styles.layoutButton}
            title={
              isVerticalLayout
                ? "Cambiar a diseño horizontal"
                : "Cambiar a diseño vertical"
            }
          >
            {isVerticalLayout ? <FaColumns /> : <FaList />}
          </Button>
          <Button
            variant={isPreviewMode ? "primary" : "ghost"}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={styles.previewButton}
          >
            <FaEye />
            {isPreviewMode ? "Editar" : "Vista Previa"}
          </Button>
        </div>
      </motion.div>

      <div className={styles.content}>
        {!isPreviewMode ? (
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div
              className={`${styles.formGrid} ${
                isVerticalLayout ? styles.verticalLayout : ""
              }`}
            >
              {/* Descripción */}
              <motion.div
                variants={itemVariants}
                className={styles.formSection}
              >
                <Card className={styles.formCard}>
                  <div className={styles.cardHeader}>
                    <FaInfoCircle className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>Información General</h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>
                        Descripción de la Actividad *
                        <span className={styles.labelHint}>
                          Describe claramente el objetivo de la actividad
                        </span>
                      </label>
                      <textarea
                        value={configuration.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        className={`${styles.textarea} ${
                          errors.description ? styles.inputError : ""
                        }`}
                        placeholder="Ej: Resolver ecuaciones cuadráticas aplicando la fórmula general..."
                        rows={4}
                      />
                      {errors.description && (
                        <span className={styles.errorMessage}>
                          <FaExclamationTriangle />
                          {errors.description}
                        </span>
                      )}
                      <div className={styles.charCount}>
                        {configuration.description.length}/500 caracteres
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Fechas */}
              <motion.div
                variants={itemVariants}
                className={styles.formSection}
              >
                <Card className={styles.formCard}>
                  <div className={styles.cardHeader}>
                    <FaCalendarAlt className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>Período de Actividad</h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.dateGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>
                          Fecha de Inicio *
                        </label>
                        <Input
                          type="datetime-local"
                          value={configuration.startDate}
                          onChange={(e) =>
                            handleInputChange("startDate", e.target.value)
                          }
                          error={errors.startDate}
                          className={styles.dateInput}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Fecha de Fin *</label>
                        <Input
                          type="datetime-local"
                          value={configuration.endDate}
                          onChange={(e) =>
                            handleInputChange("endDate", e.target.value)
                          }
                          error={errors.endDate}
                          className={styles.dateInput}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Configuración */}
              <motion.div
                variants={itemVariants}
                className={styles.formSection}
              >
                <Card className={styles.formCard}>
                  <div className={styles.cardHeader}>
                    <FaChartLine className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>
                      Configuración de Dificultad
                    </h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>
                        Nivel de Dificultad *
                      </label>
                      <div className={styles.difficultyGrid}>
                        {difficultyOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              handleInputChange("dificulty", option.value);
                            }}
                            className={`${styles.difficultyOption} ${
                              configuration.dificulty === option.value
                                ? styles.selected
                                : ""
                            }`}
                            style={{
                              borderColor:
                                configuration.dificulty === option.value
                                  ? option.color
                                  : undefined,
                            }}
                          >
                            <span className={styles.difficultyIcon}>
                              {option.icon}
                            </span>
                            <span className={styles.difficultyText}>
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.dificulty && (
                        <span className={styles.errorMessage}>
                          <FaExclamationTriangle />
                          {errors.dificulty}
                        </span>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>
                        Tiempo Máximo (minutos) *
                        <span className={styles.labelHint}>
                          Tiempo límite para completar la actividad
                        </span>
                      </label>
                      <div className={styles.dcInputWrapper}>
                        <FaClock className={styles.dcIcon} />
                        <Input
                          type="number"
                          value={configuration.maxTime}
                          onChange={(e) =>
                            handleInputChange(
                              "maxTime",
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                          error={errors.maxTime}
                          min="1"
                          max="180"
                          className={styles.timeInput}
                        />
                        <span className={styles.dcUnit}>min</span>
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>
                        Número de Intentos *
                        <span className={styles.labelHint}>
                          Número de intentos para completar la actividad
                        </span>
                      </label>
                      <div className={styles.dcInputWrapper}>
                        <FaRedoAlt className={styles.dcIcon} />
                        <Input
                          type="number"
                          value={configuration.attempts}
                          onChange={(e) =>
                            handleInputChange(
                              "attempts",
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                          error={errors.attempts}
                          min="1"
                          max="10"
                          className={styles.attemptsInput}
                        />
                        <span className={styles.dcUnit}>intentos</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Materia */}
              <motion.div
                variants={itemVariants}
                className={styles.formSection}
              >
                <Card className={styles.formCard}>
                  <div className={styles.cardHeader}>
                    <FaBook className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>Asignación de Materia</h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Materia *</label>
                      <select
                        value={configuration.subjectId}
                        onChange={(e) =>
                          handleInputChange(
                            "subjectId",
                            Number.parseInt(e.target.value)
                          )
                        }
                        className={`${styles.select} ${
                          errors.subjectId ? styles.inputError : ""
                        }`}
                      >
                        <option value={0}>Seleccionar materia...</option>
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name} - {subject.course.year.name}{" "}
                            {subject.course.name}{" "}
                          </option>
                        ))}
                      </select>
                      {errors.subjectId && (
                        <span className={styles.errorMessage}>
                          <FaExclamationTriangle />
                          {errors.subjectId}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Recompensa */}
              <motion.div
                variants={itemVariants}
                className={styles.formSection}
              >
                <Card className={styles.formCard}>
                  <div className={styles.cardHeader}>
                    <FaAward className={styles.cardIcon} />
                    <h3 className={styles.cardTitle}>Recompensa</h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>
                        Balance Inicial
                        <span className={styles.labelHint}>
                          Cantidad de recompensa que entregará la actividad si
                          es aprobada
                        </span>
                      </label>
                      <div className={styles.dcInputWrapper}>
                        <FaCoins className={styles.dcIcon} />
                        <Input
                          type="number"
                          value={configuration.initialBalance}
                          onChange={(e) =>
                            handleInputChange(
                              "initialBalance",
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                          disabled={!configuration.subjectId}
                          error={errors.initialBalance}
                          max={getMaximumInitialBalance()}
                          className={styles.rewardInput}
                        />
                        <span className={styles.dcUnit}>monedas</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className={styles.submitSection}
            >
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleGoBack}
                className={styles.backButton}
              >
                <FaArrowLeft />
                Volver
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className={styles.submitButton}
              >
                <FaArrowRight />
                Siguiente
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div variants={itemVariants} className={styles.preview}>
            <Card className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <h3 className={styles.previewTitle}>
                  Vista Previa de la Configuración
                </h3>
                <Badge variant="success">Configuración Completa</Badge>
              </div>
              <div className={styles.previewContent}>
                <div className={styles.previewGrid}>
                  <div className={styles.previewItem}>
                    <FaInfoCircle className={styles.previewIcon} />
                    <div>
                      <h4>Descripción</h4>
                      <p>{configuration.description || "Sin descripción"}</p>
                    </div>
                  </div>
                  <div className={styles.previewItem}>
                    <FaCalendarAlt className={styles.previewIcon} />
                    <div>
                      <h4>Período</h4>
                      <p>
                        {configuration.startDate
                          ? new Date(configuration.startDate).toLocaleString()
                          : "Sin fecha"}{" "}
                        -{" "}
                        {configuration.endDate
                          ? new Date(configuration.endDate).toLocaleString()
                          : "Sin fecha"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.previewItem}>
                    <FaChartLine className={styles.previewIcon} />
                    <div>
                      <h4>Dificultad</h4>
                      <Badge variant="primary">
                        {getDifficultyLabel(configuration.dificulty) ||
                          "Sin definir"}
                      </Badge>
                    </div>
                  </div>
                  <div className={styles.previewItem}>
                    <FaClock className={styles.previewIcon} />
                    <div>
                      <h4>Tiempo Máximo</h4>
                      <p>{configuration.maxTime} minutos</p>
                    </div>
                  </div>
                  <div className={styles.previewItem}>
                    <FaRedoAlt className={styles.previewIcon} />
                    <div>
                      <h4>Cantidad de Intentos</h4>
                      <p>{configuration.attempts} intento/s</p>
                    </div>
                  </div>
                  <div className={styles.previewItem}>
                    <FaGraduationCap className={styles.previewIcon} />
                    <div>
                      <h4>Materia</h4>
                      <p>{getSelectedSubject()?.name || "Sin asignar"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ConfigureActivityView;
