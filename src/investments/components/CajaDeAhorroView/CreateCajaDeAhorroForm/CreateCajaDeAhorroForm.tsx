import { useState } from "react";
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

interface CreateCajaDeAhorroFormProps {
  userBalance: number;
  onSubmit: (data: RegisterCajaDeAhorro) => void;
}

const CreateCajaDeAhorroForm: React.FC<CreateCajaDeAhorroFormProps> = ({
  userBalance,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");

  const numericAmount = Number.parseFloat(amount) || 0;
  const dailyInterestRate = 0.1; // 0.1% diario
  const monthlyInterest = numericAmount * (dailyInterestRate / 100) * 30;

  const isValid =
    numericAmount > 0 && numericAmount <= userBalance && name.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({
        initialAmount: numericAmount,
        name: name.trim(),
      });
      setAmount("");
      setName("");
    }
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };
  const handleQuickName = (value: string) => {
    setName(value);
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Crear Nueva Caja de Ahorro</h2>
        <div className={styles.balanceInfo}>
          <FaCoins className={styles.coinIcon} />
          <span>
            Saldo disponible: {userBalance.toLocaleString("es-AR")} monedas
          </span>
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
            <button
              type="button"
              onClick={() => handleQuickName("Comprar skins")}
              className={styles.quickButton}
            >
              Comprar skins
            </button>
            <button
              type="button"
              onClick={() => handleQuickName("Ahorro Épico")}
              className={styles.quickButton}
            >
              Ahorro Épico
            </button>
            <button
              type="button"
              onClick={() => handleQuickName("Desbloquear beneficios")}
              className={styles.quickButton}
            >
              Desbloquear beneficios
            </button>
            <button
              type="button"
              onClick={() => handleQuickName("Vacaciones")}
              className={styles.quickButton}
            >
              Vacaciones
            </button>
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
            <button
              type="button"
              onClick={() => handleQuickAmount(1000)}
              className={styles.quickButton}
            >
              1,000
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(5000)}
              className={styles.quickButton}
            >
              5,000
            </button>
            <button
              type="button"
              onClick={() => handleQuickAmount(10000)}
              className={styles.quickButton}
            >
              10,000
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
                  +{monthlyInterest.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.estimateItem}>
                <span className={styles.estimateLabel}>Total estimado</span>
                <span
                  className={styles.estimateValue}
                  style={{ fontWeight: 700 }}
                >
                  {(numericAmount + monthlyInterest).toLocaleString("es-AR")}
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
