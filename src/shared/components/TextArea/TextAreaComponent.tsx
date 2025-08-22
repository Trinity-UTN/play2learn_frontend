import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const TextArea: React.FC<TextAreaProps> = ({
  error = false,
  helperText,
  maxLength,
  showCharCount = false,
  resize = "vertical",
  className = "",
  value = "",
  ...props
}) => {
  const textareaClass = [
    styles.textarea,
    error ? styles.error : "",
    styles[`resize-${resize}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const currentLength = typeof value === "string" ? value.length : 0;
  const isOverLimit = maxLength ? currentLength > maxLength : false;

  return (
    <div className={styles.textareaContainer}>
      <textarea
        className={textareaClass}
        value={value}
        maxLength={maxLength}
        {...props}
      />

      <div className={styles.footer}>
        {helperText && (
          <span
            className={`${styles.helperText} ${error ? styles.errorText : ""}`}
          >
            {helperText}
          </span>
        )}

        {showCharCount && maxLength && (
          <span
            className={`${styles.charCount} ${
              isOverLimit ? styles.overLimit : ""
            }`}
          >
            {currentLength}/{maxLength} caracteres
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
