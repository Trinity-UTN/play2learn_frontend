import styles from "./BenefitAppearance.module.css";
import { useBenefitUI } from "../../../../hooks/useBenefitUI";

const BenefitAppearance = () => {
  const { categories, formData, handleChange, iconOptions, colorOptions } =
    useBenefitUI();
  return (
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
                  formData.category === category.value ? styles.selected : ""
                }`}
                onClick={() => handleChange("category", category.value)}
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
                  formData.icon === option.value ? styles.selected : ""
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
              key={color.value}
              type="button"
              className={`${styles.colorOption} ${
                formData.color === color.value ? styles.selected : ""
              }`}
              style={{ backgroundColor: color.color }}
              onClick={() => handleChange("color", color.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitAppearance;
