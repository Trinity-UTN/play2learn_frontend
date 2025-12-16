import { motion } from "framer-motion";
import {
  FaCoins,
  FaPlus,
  FaInfoCircle,
  FaEdit,
  FaChartLine,
} from "react-icons/fa";
import styles from "./CreateCajaDeAhorroForm.module.css";
import type { RegisterCajaDeAhorro } from "../../../types/cajaAhorro.type";
import { useCreatedCajaDeAhorro } from "../../../hooks/useCajaDeAhorro/useCreateCajaDeAhorro";
import {
  quickAmounts,
  quickOptions,
} from "../../../contanst/cajaDeAhorroContanst/cajaDeAhorroContanst";
import { formatPrice } from "@/shared";
interface CreateCajaDeAhorroFormProps {
  userBalance: number;
  onSubmit: (data: RegisterCajaDeAhorro) => void;
}

const CreateCajaDeAhorroForm: React.FC<CreateCajaDeAhorroFormProps> = ({
  userBalance,
  onSubmit,
}) => {
  const {
    name,
    amount,
    numericAmount,
    dailyInterestRate,
    monthlyInterest,
    isValid,
    handleSubmit,
    handleQuickAmount,
    handleQuickName,
    setName,
    setAmount,
  } = useCreatedCajaDeAhorro({ userBalance, onSubmit });
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ delay: 0.2 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Crear Nueva Caja de Ahorro</h2>
        <div className={styles.balanceInfo}>
          <FaCoins className={styles.coinIcon} />
          <span>Saldo disponible: {formatPrice(userBalance)} monedas</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name Input */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaEdit />
            Nombre de la Caja
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese el nombre de la caja de ahorro..."
            className={styles.input}
            maxLength={50}
          />
          <div className={styles.quickButtons}>
            {quickOptions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleQuickName(label)}
                className={styles.quickButton}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaCoins />
            Monto Inicial
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingresa el monto inicial"
            className={styles.input}
            min="0"
            max={userBalance}
          />
          <div className={styles.quickButtons}>
            {quickAmounts.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  handleQuickAmount(item.value ? item.value : userBalance)
                }
                className={styles.quickButton}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interest Info */}
        <motion.div
          className={styles.infoCard}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styles.infoHeader}>
            <FaInfoCircle />
            <span>Información de Intereses</span>
          </div>
          <div className={styles.infoContent}>
            <p>
              Tasa de interés: <strong>{dailyInterestRate}% diario</strong>
            </p>
            <p>Acceso inmediato a tu dinero en cualquier momento</p>
            <p>Los intereses se calculan y acreditan diariamente</p>
          </div>
        </motion.div>

        {/* Estimated Interest */}
        {numericAmount > 0 && (
          <motion.div
            className={styles.estimateCard}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.estimateHeader}>
              <FaChartLine />
              <span>Proyección Mensual</span>
            </div>
            <div className={styles.estimateGrid}>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Monto inicial</span>
                <span className={styles.estimateValue}>
                  {numericAmount.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>
                  Interés estimado (30 días)
                </span>
                <span
                  className={styles.estimateValue}
                  style={{ color: "#22c55e" }}
                >
                  +{formatPrice(monthlyInterest)}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Total estimado</span>
                <span
                  className={styles.estimateValue}
                  style={{ fontWeight: 700 }}
                >
                  {formatPrice(numericAmount + monthlyInterest)}
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
          <span>Crear Caja de Ahorro</span>
        </motion.button>

        {numericAmount > userBalance && (
          <div className={styles.errorMessage}>
            No tienes suficiente saldo para este depósito inicial
          </div>
        )}
        {numericAmount > 0 && name.trim() === "" && (
          <div className={styles.errorMessage}>
            Debes ingresar un nombre para la caja de ahorro
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default CreateCajaDeAhorroForm;
