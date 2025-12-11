import type React from "react";
import {
  FaChartPie,
  FaBullseye,
  FaChartLine,
  FaPiggyBank,
} from "react-icons/fa";
import { Card } from "@/shared";
import type { FinancialSummary } from "../../../types/generalType";
import styles from "./FinancialOverview.module.css";

interface FinancialOverviewProps {
  data: FinancialSummary;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ data }) => {
  const savingsProgress = (data.currentSavings / data.savingsGoal) * 100;
  const availablePercentage = (data.availableCoins / data.totalBalance) * 100;
  const investedPercentage = (data.investedCoins / data.totalBalance) * 100;

  return (
    <div className={styles.overviewGrid}>
      <Card className={styles.chartCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            <FaChartPie className={styles.titleIcon} />
            Distribución de Monedas
          </h3>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.pieChart}>
            <svg viewBox="0 0 100 100" className={styles.pieChartSvg}>
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10B981"
                strokeWidth="20"
                strokeDasharray={`${availablePercentage * 2.51} 251`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="20"
                strokeDasharray={`${investedPercentage * 2.51} 251`}
                strokeDashoffset={`-${availablePercentage * 2.51}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className={styles.chartCenter}>
              <span className={styles.totalAmount}>
                {data.totalBalance.toLocaleString()}
              </span>
              <span className={styles.totalLabel}>Total</span>
            </div>
          </div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: "#10B981" }}
              />
              <span>Líquidas ({availablePercentage.toFixed(1)}%)</span>
            </div>
            <div className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: "#3B82F6" }}
              />
              <span>Invertidas ({investedPercentage.toFixed(1)}%)</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className={styles.savingsCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            <FaBullseye className={styles.titleIcon} />
            Meta de Ahorro
          </h3>
        </div>
        <div className={styles.savingsContent}>
          <div className={styles.savingsProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.min(savingsProgress, 100)}%` }}
              />
            </div>
            <div className={styles.progressLabels}>
              <span className={styles.currentSavings}>
                {data.currentSavings.toLocaleString()}
              </span>
              <span className={styles.savingsGoal}>
                {data.savingsGoal.toLocaleString()}
              </span>
            </div>
          </div>
          <div className={styles.savingsStats}>
            <div className={styles.savingsStat}>
              <FaPiggyBank className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statValue}>
                  {savingsProgress.toFixed(1)}%
                </span>
                <span className={styles.statLabel}>Completado</span>
              </div>
            </div>
            <div className={styles.savingsStat}>
              <FaChartLine className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statValue}>
                  {(data.savingsGoal - data.currentSavings).toLocaleString()}
                </span>
                <span className={styles.statLabel}>Faltan</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.educationalNote}>
          <strong>💡 Tip:</strong> El ahorro te ayuda a alcanzar metas grandes.
          ¡Cada moneda cuenta!
        </div>
      </Card>
    </div>
  );
};

export default FinancialOverview;
