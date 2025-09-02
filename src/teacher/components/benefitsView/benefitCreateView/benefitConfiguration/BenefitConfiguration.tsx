import Input from "../../../../../shared/components/Input/InputComponent";
import styles from "./BenefitConfiguration.module.css";
import { useBenefitUI } from "../../../../hooks/useBenefitUI";

const BenefitConfiguration = () => {
  const { formData, handleChange, subjects } = useBenefitUI();
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Configuración</h3>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Límite de Uso Total</label>
          <Input
            type="number"
            placeholder="50"
            className={styles.input}
            value={
              formData.totalRedeemableAmount
                ? formData.totalRedeemableAmount
                : "Ilimitado"
            }
            onChange={(e) =>
              handleChange("totalRedeemableAmount", Number(e.target.value))
            }
            min="1"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Límite de Uso Por Estudiante</label>
          <Input
            type="number"
            placeholder="4"
            className={styles.input}
            value={
              formData.redeemableAmountPerStudent
                ? formData.redeemableAmountPerStudent
                : "Ilimitado"
            }
            onChange={(e) =>
              handleChange("redeemableAmountPerStudent", Number(e.target.value))
            }
            min="1"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Fecha de Fin *</label>
          <Input
            type="datetime-local"
            value={formData.endAt}
            onChange={(e) => handleChange("endAt", e.target.value)}
            className={styles.dateInput}
            required
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Materia *</label>
        <select
          value={formData.subjectId}
          onChange={(e) =>
            handleChange("subjectId", Number.parseInt(e.target.value))
          }
          className={`${styles.select} 
                      // errors.subjectId ? styles.inputError : ""
                    `}
        >
          <option value={0}>Seleccionar materia...</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.course.year.name} {subject.course.name} - {subject.name}
            </option>
          ))}
        </select>
        {/* {errors.subjectId && (
                    <span className={styles.errorMessage}>
                      <FaExclamationTriangle />
                      {errors.subjectId}
                    </span>
        )} */}
      </div>
    </div>
  );
};

export default BenefitConfiguration;
