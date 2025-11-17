import type React from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({ className = "", error, ...props }) => {
  const inputClass = [styles.input, error ? styles.error : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      <input className={inputClass} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
