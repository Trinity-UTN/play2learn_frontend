import { Button } from "@/shared";
import styles from "./DifficultySelector.module.css";

interface DifficultyOption {
  value: string;
  label: string;
  color: string;
  icon: string;
}

interface DifficultySelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: DifficultyOption[];
  error?: string;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <div className={styles.difficultyGrid}>
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`${styles.difficultyOption} ${
            value === option.value ? styles.selected : error ? styles.error : ""
          }`}
          style={{
            borderColor: value === option.value ? option.color : undefined,
          }}
          variant="ghost"
        >
          <span className={styles.difficultyIcon}>{option.icon}</span>
          <span className={styles.difficultyText}>{option.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default DifficultySelector;
