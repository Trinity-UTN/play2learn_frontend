import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaChartLine,
  FaBook,
  FaInfoCircle,
  FaRedoAlt,
  FaAward,
  FaCoins,
} from "react-icons/fa";
import type {
  ConfigurationActivity,
  ConfigurationErrors,
} from "../../../types/Configuration.type";
import type { SubjectResponseDto } from "@/admin";
import { Input } from "@/shared";
import FormSectionCard from "../formSection/FormSection";
import FormInputGroup from "../formInputGroup/FormInputGroup";
import DifficultySelector from "../difficultySelector/DifficultySelector";
import RewardTypeSelector from "../rewardTypeSelector/RewardTypeSelector";
import RewardInfoPanel from "../rewardInfoPanel/RewardInfoPanel";
import styles from "./ConfigurationForm.module.css";

interface ConfigurationFormProps {
  configuration: ConfigurationActivity;
  activityCode?: string;
  errors: ConfigurationErrors;
  subjects: SubjectResponseDto[];
  isVerticalLayout: boolean;
  onFieldChange: (
    field: keyof ConfigurationActivity,
    value: string | number | boolean,
  ) => void;
  getSelectedSubject: () => SubjectResponseDto | undefined;
  getMaximumInitialBalance: () => number;
}

const difficultyOptions = [
  { value: "FACIL", label: "Fácil", color: "#10B981", icon: "🟢" },
  { value: "MEDIO", label: "Medio", color: "#F59E0B", icon: "🟡" },
  { value: "DIFICIL", label: "Difícil", color: "#EF4444", icon: "🔴" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  configuration,
  activityCode,
  errors,
  subjects,
  isVerticalLayout,
  onFieldChange,
  getSelectedSubject,
  getMaximumInitialBalance,
}) => {
  return (
    <div
      className={`${styles.formGrid} ${
        isVerticalLayout ? styles.verticalLayout : ""
      }`}
    >
      {/* Información General */}
      <motion.div variants={itemVariants} className={styles.formSection}>
        <FormSectionCard icon={FaInfoCircle} title="Información General">
          <FormInputGroup
            label="Descripción de la Actividad *"
            hint="Describe claramente el objetivo de la actividad"
            error={errors.description}
          >
            <textarea
              value={configuration.description}
              onChange={(e) => onFieldChange("description", e.target.value)}
              className={`${styles.textarea} ${
                errors.description ? styles.inputError : ""
              }`}
              placeholder="Ej: Resolver ecuaciones cuadráticas aplicando la fórmula general..."
              rows={4}
            />
            <div className={styles.charCount}>
              {configuration.description.length}/500 caracteres
            </div>
          </FormInputGroup>
        </FormSectionCard>
      </motion.div>

      {/* Período de Actividad */}
      <motion.div variants={itemVariants} className={styles.formSection}>
        <FormSectionCard icon={FaCalendarAlt} title="Período de Actividad">
          <div className={styles.dateGrid}>
            <FormInputGroup label="Fecha de Inicio *" error={errors.startDate}>
              <div className={styles.inputWrap}>
                <Input
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  value={
                    configuration.publishNow ? "" : configuration.startDate
                  }
                  onChange={(e) => onFieldChange("startDate", e.target.value)}
                  disabled={configuration.publishNow}
                  className={`${styles.dateInput} ${errors.startDate ? styles.inputError : ""} ${configuration.publishNow ? styles.dateInputDisabled : ""}`}
                />
                {configuration.publishNow && (
                  <div className={styles.publishOverlay}>
                    <span>Se publicará de inmediato</span>
                  </div>
                )}
              </div>

              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={configuration.publishNow}
                  onChange={(e) => {
                    onFieldChange("publishNow", e.target.checked);
                    if (e.target.checked) onFieldChange("startDate", "");
                  }}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxLabel}>Publicar ahora</span>
              </label>
            </FormInputGroup>
            <FormInputGroup label="Fecha de Fin *" error={errors.endDate}>
              <Input
                type="datetime-local"
                min={
                  configuration.startDate ||
                  new Date().toISOString().slice(0, 16)
                }
                value={configuration.endDate}
                onChange={(e) => onFieldChange("endDate", e.target.value)}
                className={`${styles.dateInput} ${
                  errors.endDate ? styles.inputError : ""
                }`}
              />
            </FormInputGroup>
          </div>
        </FormSectionCard>
      </motion.div>

      {/* Configuración de Dificultad */}
      <motion.div variants={itemVariants} className={styles.formSection}>
        <FormSectionCard icon={FaChartLine} title="Configuración de Dificultad">
          <FormInputGroup
            label="Nivel de Dificultad *"
            error={errors.difficulty}
          >
            <DifficultySelector
              value={configuration.difficulty}
              onChange={(val) => onFieldChange("difficulty", val)}
              options={difficultyOptions}
              error={errors.difficulty}
            />
          </FormInputGroup>

          {activityCode !== "no_ludica" && (
            <FormInputGroup
              label="Tiempo Máximo (minutos) *"
              hint="Tiempo límite para completar la actividad"
              error={errors.maxTime}
            >
              <div className={styles.dcInputWrapper}>
                <FaClock className={styles.dcIcon} />
                <Input
                  type="text"
                  value={configuration.maxTime}
                  onChange={(e) =>
                    onFieldChange("maxTime", parseInt(e.target.value) || 0)
                  }
                  className={`${styles.timeInput} ${
                    errors.maxTime ? styles.inputError : ""
                  }`}
                />
                <span className={styles.dcUnit}>min</span>
              </div>
            </FormInputGroup>
          )}

          <FormInputGroup
            label="Número de Intentos *"
            hint="Número de intentos para completar la actividad"
            error={errors.attempts}
          >
            <div className={styles.dcInputWrapper}>
              <FaRedoAlt className={styles.dcIcon} />
              <Input
                type="text"
                value={configuration.attempts}
                onChange={(e) =>
                  onFieldChange("attempts", parseInt(e.target.value) || 0)
                }
                className={`${styles.attemptsInput} ${
                  errors.attempts ? styles.inputError : ""
                }`}
              />
              <span className={styles.dcUnit}>intentos</span>
            </div>
          </FormInputGroup>
        </FormSectionCard>
      </motion.div>

      {/* Asignación de Materia */}
      <motion.div variants={itemVariants} className={styles.formSection}>
        <FormSectionCard icon={FaBook} title="Asignación de Materia">
          <FormInputGroup label="Materia *" error={errors.subjectId}>
            <select
              value={configuration.subjectId}
              onChange={(e) =>
                onFieldChange("subjectId", Number(e.target.value))
              }
              className={`${styles.select} ${
                errors.subjectId ? styles.inputError : ""
              }`}
            >
              <option value={0}>Seleccionar materia...</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.course.year.name} {subject.course.name} -{" "}
                  {subject.name}
                </option>
              ))}
            </select>
          </FormInputGroup>
        </FormSectionCard>
      </motion.div>

      {/* Recompensa */}
      <motion.div variants={itemVariants} className={styles.formSection}>
        <FormSectionCard icon={FaAward} title="Recompensas de la actividad">
          {configuration.subjectId === 0 ? (
            <p className={styles.noSubjectMessage}>
              Selecciona una materia para configurar la recompensa disponible.
            </p>
          ) : (
            <>
              <RewardInfoPanel
                actualBalance={getSelectedSubject()?.actualBalance || 0}
                maxReward={getMaximumInitialBalance()}
              />

              <FormInputGroup
                label="Monedas a repartir *"
                hint="Estas monedas se repartiran entre los alumnos que aprueben la actividad"
                error={errors.initialBalance}
              >
                <div className={styles.dcInputWrapper}>
                  <FaCoins className={styles.dcIcon} />
                  <Input
                    type="text"
                    value={configuration.initialBalance}
                    onChange={(e) =>
                      onFieldChange(
                        "initialBalance",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    placeholder="0"
                    className={`${styles.initialBalanceInput} ${
                      errors.initialBalance ? styles.inputError : ""
                    }`}
                  />
                  <span className={styles.dcUnit}>monedas</span>
                </div>
              </FormInputGroup>

              <FormInputGroup
                label="Cómo se repartirán las monedas *"
                hint="Selecciona cómo se distribuirá la recompensa entre los alumnos."
                error={errors.typeReward}
              >
                <RewardTypeSelector
                  value={configuration.typeReward}
                  onChange={(val) => onFieldChange("typeReward", val)}
                />
              </FormInputGroup>
            </>
          )}
        </FormSectionCard>
      </motion.div>
    </div>
  );
};

export default ConfigurationForm;
