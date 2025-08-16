import type React from "react";
import Tooltip from "../Tooltip/TooltipComponent";
import styles from "./Label.module.css";

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  hint?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  required?: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  hint,
  tooltip,
  tooltipPosition = "right",
  required = false,
  className = "",
}) => {
  const labelClass = [styles.label, className].filter(Boolean).join(" ");

  return (
    <div className={styles.labelContainer}>
      <label htmlFor={htmlFor} className={labelClass}>
        {children}
        {required && <span className={styles.required}>*</span>}
        {tooltip && <Tooltip content={tooltip} position={tooltipPosition} />}
      </label>
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
};

export default Label;
