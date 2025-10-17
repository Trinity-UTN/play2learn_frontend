import { FaExclamationTriangle } from "react-icons/fa";
import Input from "../../../../../shared/components/Input/InputComponent";
import type { SubjectResponseDto } from "../../../../../admin/services/subject/SubjectService";
import type {
  CreateBenefitInterface,
  BenefitValidationErrors,
} from "../../../../types/Benefits.type";
import styles from "./BenefitConfiguration.module.css";

type BenefitConfigurationProps = {
  formData: CreateBenefitInterface;
  errors: BenefitValidationErrors;
  touched: Record<string, boolean>;
  subjects: SubjectResponseDto[];
  onChange: (
    field: keyof CreateBenefitInterface,
    value: string | number
  ) => void;
  onBlur: (field: keyof CreateBenefitInterface) => void;
};

const BenefitConfiguration = ({
  formData,
  errors,
  touched,
  subjects,
  onChange,
  onBlur,
}: BenefitConfigurationProps) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Configuración</h3>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Límite de Uso Total</label>
          <Input
            type="number"
            placeholder="Ilimitado"
            className={`${styles.input} ${
              touched.purchaseLimit && errors.purchaseLimit
                ? styles.inputError
                : ""
            }`}
            value={formData.purchaseLimit ?? ""}
            onChange={(e) => onChange("purchaseLimit", Number(e.target.value))}
            onBlur={() => onBlur("purchaseLimit")}
            min="1"
          />
          {touched.purchaseLimit && errors.purchaseLimit && (
            <span className={styles.errorMessage}>
              <FaExclamationTriangle />
              {errors.purchaseLimit}
            </span>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Límite de Uso Por Estudiante</label>
          <Input
            type="number"
            placeholder="Ilimitado"
            className={`${styles.input} ${
              touched.purchaseLimitPerStudent && errors.purchaseLimitPerStudent
                ? styles.inputError
                : ""
            }`}
            value={formData.purchaseLimitPerStudent ?? ""}
            onChange={(e) =>
              onChange("purchaseLimitPerStudent", Number(e.target.value))
            }
            onBlur={() => onBlur("purchaseLimitPerStudent")}
            min="1"
          />
          {touched.purchaseLimitPerStudent &&
            errors.purchaseLimitPerStudent && (
              <span className={styles.errorMessage}>
                <FaExclamationTriangle />
                {errors.purchaseLimitPerStudent}
              </span>
            )}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Fecha de Fin *</label>
          <Input
            type="datetime-local"
            value={formData.endAt}
            onChange={(e) => onChange("endAt", e.target.value)}
            onBlur={() => onBlur("endAt")}
            className={`${styles.dateInput} ${
              touched.endAt && errors.endAt ? styles.inputError : ""
            }`}
            required
          />
          {touched.endAt && errors.endAt && (
            <span className={styles.errorMessage}>
              <FaExclamationTriangle />
              {errors.endAt}
            </span>
          )}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Materia *</label>
        <select
          value={formData.subjectId}
          onChange={(e) =>
            onChange("subjectId", Number.parseInt(e.target.value))
          }
          onBlur={() => onBlur("subjectId")}
          className={`${styles.select} ${
            touched.subjectId && errors.subjectId ? styles.inputError : ""
          }`}
        >
          <option value={0}>Seleccionar materia...</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.course.year.name} {subject.course.name} - {subject.name}
            </option>
          ))}
        </select>
        {touched.subjectId && errors.subjectId && (
          <span className={styles.errorMessage}>
            <FaExclamationTriangle />
            {errors.subjectId}
          </span>
        )}
      </div>
    </div>
  );
};

export default BenefitConfiguration;
