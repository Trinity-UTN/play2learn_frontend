import type { ReactNode } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./FormInputGroup.module.css";

interface FormInputGroupProps {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

const FormInputGroup: React.FC<FormInputGroupProps> = ({
  label,
  hint,
  error,
  children,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {label}
        {hint && <span className={styles.labelHint}>{hint}</span>}
      </label>
      {children}
      {error && (
        <span className={styles.errorMessage}>
          <FaExclamationTriangle />
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInputGroup;
