import styles from "./RewardTypeSelector.module.css";

interface RewardTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const typeRewardOptions = [
  {
    value: "EQUITATIVO",
    label: "Equitativo",
    description:
      "Distribuye el total de monedas de forma equitativa entre todos los alumnos.",
  },
  {
    value: "POISSON",
    label: "Poisson",
    description:
      "Usa una distribución de Poisson para asignar las monedas según el orden de aprobación.",
  },
];

const RewardTypeSelector: React.FC<RewardTypeSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const selected = typeRewardOptions.find((opt) => opt.value === value);

  return (
    <>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.select} ${error ? styles.inputError : ""}`}
      >
        <option value="">Seleccionar estrategia...</option>
        {typeRewardOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {selected && <p className={styles.labelHint}>{selected.description}</p>}

      {error && <span className={styles.errorMessage}>{error}</span>}
    </>
  );
};

export default RewardTypeSelector;
