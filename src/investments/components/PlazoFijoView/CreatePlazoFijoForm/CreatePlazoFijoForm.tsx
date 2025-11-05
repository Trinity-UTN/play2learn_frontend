import { useState } from "react";
import { motion } from "framer-motion";
import { FaCoins, FaClock, FaPlus, FaInfoCircle } from "react-icons/fa";

import styles from "./CreatePlazoFijoForm.module.css";
import type {
  FIXED_TERM_DAYS,
  RegisterPlazoFijo,
} from "../../../types/plazoFijo.type";
import formatPrice from "../../../../shared/utils/formatPrice";
import ConfirmationModal from "../../../../shared/components/ConfirmationModal/ConfirmationModal";

interface CreatePlazoFijoFormProps {
  userBalance: number;
  onSubmit: (data: RegisterPlazoFijo) => void;
}

const TERM_OPTIONS: {
  value: FIXED_TERM_DAYS;
  label: string;
  days: number;
  rate: number;
}[] = [
  { value: "SEMANAL", label: "Semanal", days: 7, rate: 2.877 },
  { value: "QUINCENAL", label: "Quincenal", days: 15, rate: 6.165 },
  { value: "MENSUAL", label: "Mensual", days: 30, rate: 12.33 },
];

const CreatePlazoFijoForm: React.FC<CreatePlazoFijoFormProps> = ({
  userBalance,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<FIXED_TERM_DAYS>("MENSUAL");
  const [isOpen, setIsOpen] = useState(false);

  const selectedTermConfig = TERM_OPTIONS.find(
    (opt) => opt.value === selectedTerm
  )!;
  const numericAmount = Number.parseFloat(amount) || 0;
  const estimatedReward = numericAmount * (selectedTermConfig.rate / 100);
  const totalReturn = numericAmount + estimatedReward;

  const isValid = numericAmount > 0 && numericAmount <= userBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const handleSubmitConfirm = () => {
    const data = { amountInvested: numericAmount, fixedTermDays: selectedTerm };
    if (isValid) {
      onSubmit(data);
      setAmount("");
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Crear Nuevo Plazo Fijo</h2>
        <div className={styles.balanceInfo}>
          <FaCoins className={styles.coinIcon} />
          <span>Saldo disponible: {formatPrice(userBalance)} monedas</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Amount Input */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaCoins />
            Monto a Invertir
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingresa el monto"
            className={styles.input}
            min="0"
            max={userBalance}
          />
          <div className={styles.quickButtons}>
            <button
              type="button"
              onClick={() => handleQuickAmount(1)}
              className={styles.quickButton}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(5)}
              className={styles.quickButton}
            >
              5
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(50)}
              className={styles.quickButton}
            >
              50
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(100)}
              className={styles.quickButton}
            >
              100
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(userBalance)}
              className={styles.quickButton}
            >
              Todo
            </button>
          </div>
        </div>

        {/* Term Selection */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaClock />
            Plazo
          </label>
          <div className={styles.termOptions}>
            {TERM_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setSelectedTerm(option.value)}
                className={`${styles.termButton} ${
                  selectedTerm === option.value ? styles.termButtonActive : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.termLabel}>{option.label}</span>
                <span className={styles.termDays}>{option.days} días</span>
                <span className={styles.termRate}>{option.rate}% interés</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Estimated Return */}
        {numericAmount > 0 && (
          <motion.div
            className={styles.estimateCard}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.estimateHeader}>
              <FaInfoCircle />
              <span>Resumen de la Inversión</span>
            </div>
            <div className={styles.estimateGrid}>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Monto invertido</span>
                <span className={styles.estimateValue}>
                  {numericAmount.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Ganancia estimada</span>
                <span
                  className={styles.estimateValue}
                  style={{ color: "#22c55e" }}
                >
                  +{estimatedReward.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Total a recibir</span>
                <span
                  className={styles.estimateValue}
                  style={{ fontWeight: 700 }}
                >
                  {totalReturn.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Plazo</span>
                <span className={styles.estimateValue}>
                  {selectedTermConfig.days} días
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={styles.submitButton}
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          <FaPlus />
          <span>Crear Plazo Fijo</span>
        </motion.button>

        {numericAmount > userBalance && (
          <div className={styles.errorMessage}>
            No tienes suficiente saldo para esta inversión
          </div>
        )}
      </form>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message="Una vez creado el plazo fijo no se podra borrar"
        title="¿Estas seguro que desea crear el Plazo Fijo?"
        onConfirm={handleSubmitConfirm}
      />
    </motion.div>
  );
};

export default CreatePlazoFijoForm;
