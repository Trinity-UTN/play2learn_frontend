import Input from "../../../../../shared/components/Input/InputComponent";
import styles from "./BenefitBasicForm.module.css";
import { FaCoins } from "react-icons/fa";
import { useBenefitUI } from "../../../../hooks/useBenefitUI";

const BenefitBasicForm = () => {
  const { formData, handleChange } = useBenefitUI();
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Información Básica</h3>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Nombre del Beneficio *</label>
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
              onChange={(e) => handleChange("cost", Number(e.target.value))}
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
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          maxLength={1000}
          required
        />
      </div>
    </div>
  );
};

export default BenefitBasicForm;
