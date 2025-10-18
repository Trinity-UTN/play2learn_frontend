import type { CreateBenefitInterface } from "../../../../../shared/types/Benefits.type";
import {
  BENEFIT_CATEGORIES,
  BENEFIT_ICON_OPTIONS,
  BENEFIT_COLOR_OPTIONS,
} from "../../../../constants/benefits.constants";
import styles from "./BenefitAppearance.module.css";

type BenefitAppearanceProps = {
  formData: CreateBenefitInterface;
  onChange: (field: keyof CreateBenefitInterface, value: string) => void;
};

const BenefitAppearance = ({ formData, onChange }: BenefitAppearanceProps) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Categoría y Apariencia</h3>
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Categoría *</label>
          <div className={styles.categoryGrid}>
            {BENEFIT_CATEGORIES.map((category) => (
              <button
                key={category.value}
                type="button"
                className={`${styles.categoryOption} ${
                  formData.category === category.value ? styles.selected : ""
                }`}
                onClick={() => onChange("category", category.value)}
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
            {BENEFIT_ICON_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`${styles.iconOption} ${
                  formData.icon === option.value ? styles.selected : ""
                }`}
                onClick={() => onChange("icon", option.value)}
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
          {BENEFIT_COLOR_OPTIONS.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`${styles.colorOption} ${
                formData.color === color.value ? styles.selected : ""
              }`}
              style={{ backgroundColor: color.color }}
              onClick={() => onChange("color", color.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitAppearance;
