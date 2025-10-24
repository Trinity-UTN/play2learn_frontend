import { FaCoins, FaExclamationTriangle } from "react-icons/fa";
import Input from "../../../../../shared/components/Input/InputComponent";
import type {
  CreateBenefitInterface,
  BenefitValidationErrors,
} from "../../../../../benefit/types/benefit.types";
import {
  BENEFIT_FORM_PLACEHOLDERS,
  BENEFIT_VALIDATION,
} from "../../../../../benefit/constants/benefit.constants";
import styles from "./BenefitBasicForm.module.css";

type BenefitBasicFormProps = {
  formData: CreateBenefitInterface;
  errors: BenefitValidationErrors;
  touched: Record<string, boolean>;
  onChange: (
    field: keyof CreateBenefitInterface,
    value: string | number
  ) => void;
  onBlur: (field: keyof CreateBenefitInterface) => void;
};

const BenefitBasicForm = ({
  formData,
  errors,
  touched,
  onChange,
  onBlur,
}: BenefitBasicFormProps) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Información Básica</h3>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Nombre del Beneficio</label>
          <Input
            type="text"
            placeholder={BENEFIT_FORM_PLACEHOLDERS.NAME}
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            onBlur={() => onBlur("name")}
            maxLength={BENEFIT_VALIDATION.NAME_MAX_LENGTH}
            className={`${styles.input} ${
              touched.name && errors.name ? styles.inputError : ""
            }`}
          />
          {touched.name && errors.name && (
            <span className={styles.errorMessage}>
              <FaExclamationTriangle />
              {errors.name}
            </span>
          )}
          <span className={styles.charCount}>
            {formData.name.length}/{BENEFIT_VALIDATION.NAME_MAX_LENGTH}
          </span>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Costo en Monedas</label>
          <div className={styles.costInput}>
            <FaCoins className={styles.costIcon} />
            <Input
              type="number"
              placeholder={BENEFIT_FORM_PLACEHOLDERS.COST}
              value={formData.cost}
              onChange={(e) => onChange("cost", Number(e.target.value))}
              onBlur={() => onBlur("cost")}
              min={BENEFIT_VALIDATION.MIN_COST}
              className={`${styles.input} ${
                touched.cost && errors.cost ? styles.inputError : ""
              }`}
            />
          </div>
          {touched.cost && errors.cost && (
            <span className={styles.errorMessage}>
              <FaExclamationTriangle />
              {errors.cost}
            </span>
          )}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Descripción</label>
        <textarea
          className={`${styles.textarea} ${
            touched.description && errors.description ? styles.inputError : ""
          }`}
          placeholder={BENEFIT_FORM_PLACEHOLDERS.DESCRIPTION}
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          onBlur={() => onBlur("description")}
          rows={3}
          maxLength={BENEFIT_VALIDATION.DESCRIPTION_MAX_LENGTH}
        />
        {touched.description && errors.description && (
          <span className={styles.errorMessage}>
            <FaExclamationTriangle />
            {errors.description}
          </span>
        )}
        <span className={styles.charCount}>
          {formData.description.length}/
          {BENEFIT_VALIDATION.DESCRIPTION_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
};

export default BenefitBasicForm;
