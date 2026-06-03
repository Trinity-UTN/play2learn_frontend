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
      "Todos reciben la misma cantidad de monedas.",
  },
  {
    value: "POISSON",
    label: "Recompensa dinamica",
    description:
      "Los primeros alumnos en completar la actividad obtienen más monedas.",
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
