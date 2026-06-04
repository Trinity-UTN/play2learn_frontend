import { FaCoins, FaChartLine, FaLightbulb } from "react-icons/fa";
import type { FinancialSummary } from "../../../types/generalType";
import styles from "./WalletSummary.module.css";
import { useCountUp, Card } from "@/shared";
import { formatPriceWithNoDecimals } from "@/shared/utils/formatPrice";

interface WalletSummaryProps {
  data: FinancialSummary;
}

const WalletSummary: React.FC<WalletSummaryProps> = ({ data }) => {
  const totalBalance = useCountUp(data.totalBalance, 1, {
    steps: 20,
    interval: 50,
  });

  const liquidityPercentage = data.totalBalance
    ? (data.availableCoins / data.totalBalance) * 100
    : 0;

  const investmentPercentage = data.totalBalance
    ? (data.investedCoins / data.totalBalance) * 100
    : 0;

  return (
    <Card className={styles.summaryCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>
          <FaCoins className={styles.titleIcon} />
          Resumen Financiero
        </h2>
      </div>

      <div className={styles.balanceSection}>
        <div className={styles.mainBalance}>
          <div className={styles.balanceCard}>
            <div className={styles.balanceIcon}>
              <FaCoins />
            </div>
            <div className={styles.balanceInfo}>
              <h3 className={styles.balanceAmount}>
                {formatPriceWithNoDecimals(totalBalance)} Monedas
              </h3>
              <p className={styles.balanceLabel}>Balance Total</p>
            </div>
          </div>
        </div>

        <div className={styles.balanceBreakdown}>
          <div className={styles.breakdownItem}>
            <div
              className={styles.breakdownIcon}
              style={{ backgroundColor: "#10B98120", color: "#10B981" }}
            >
              <FaCoins />
            </div>
            <div className={styles.breakdownInfo}>
              <span className={styles.breakdownAmount}>
                {formatPriceWithNoDecimals(data.availableCoins)}
              </span>
              <span className={styles.breakdownLabel}> Monedas Líquidas</span>
              <div className={styles.liquidityBar}>
                <div
                  className={styles.liquidityFill}
                  style={{ width: `${liquidityPercentage}%` }}
                />
              </div>
              <span className={styles.liquidityText}>
                {liquidityPercentage.toFixed(1)}% de liquidez
              </span>
            </div>
          </div>

          <div className={styles.breakdownItem}>
            <div
              className={styles.breakdownIcon}
              style={{ backgroundColor: "#3B82F620", color: "#3B82F6" }}
            >
              <FaChartLine />
            </div>
            <div className={styles.breakdownInfo}>
              <span className={styles.breakdownAmount}>
                {formatPriceWithNoDecimals(data.investedCoins)}
              </span>
              <span className={styles.breakdownLabel}> Monedas Invertidas</span>
              <div className={styles.liquidityBar}>
                <div
                  className={styles.investmentFill}
                  style={{
                    width: `${investmentPercentage}%`,
                  }}
                />
              </div>
              <span className={styles.investmentText}>
                {investmentPercentage.toFixed(1)}% de monedas invertidas
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.educationalNote}>
        <FaLightbulb className={styles.noteIcon} />
        <div className={styles.noteContent}>
          <strong>Concepto clave:</strong> La <em>liquidez</em> es la facilidad
          con la que puedes usar tu dinero. Si algo tiene alta liquidez, como el
          efectivo o el dinero en tu cuenta, puedes usarlo de inmediato. Si
          tiene baja liquidez, como una inversión a plazo fijo, no puedes usarlo
          hasta que termine el período de inversión.
        </div>
      </div>
    </Card>
  );
};

export default WalletSummary;
