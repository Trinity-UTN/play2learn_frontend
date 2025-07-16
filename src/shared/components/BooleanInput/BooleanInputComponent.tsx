import type React from "react";
import styles from "./BooleanInput.module.css";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const BooleanInput: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  error,
  className = "",
  size = "md",
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const toggleClass = [
    styles.toggle,
    styles[size],
    checked ? styles.checked : "",
    disabled ? styles.disabled : "",
    error ? styles.error : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      <div className={styles.toggleContainer}>
        <button
          type="button"
          className={toggleClass}
          onClick={handleToggle}
          disabled={disabled}
          aria-checked={checked}
          role="switch"
        >
          <span className={styles.slider}>
            <span className={styles.thumb} />
          </span>
        </button>
        {label && (
          <label className={styles.label} onClick={handleToggle}>
            {label}
          </label>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default BooleanInput;
