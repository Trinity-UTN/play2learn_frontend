import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import InvestmentHeader from "../../components/InvestmentDetailView/InvestmentDetailHeader/InvestmentDetailHeader";
import CandlestickChart from "../../components/InvestmentDetailView/CandlestickChart/CandlestickChart";
import TradingPanel from "../../components/InvestmentDetailView/TradingPanel/TradingPanel";
import AutomationPanel from "../../components/InvestmentDetailView/AutomationPanel/AutomationPanel";
import InvestmentStats from "../../components/InvestmentDetailView/InvestmentsDetailsStats/InvestmentsDetailsStats";
import styles from "./InvestmentsDetailView.module.css";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useLocation } from "react-router-dom";
import { useInvestmentsStudent } from "../../hooks/useInvestmentsStudentAPI";
import type { RangeValue } from "../../types/investment.type";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";

const InvestmentDetailView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCandleStickValues, candleStickValues, loading } =
    useInvestmentsStudent();
  const { currentStudent } = useCurrentStudent();
  const userBalance = currentStudent?.wallet.balance || 0;
  const investment = location.state;
  const [range, setRange] = useState<RangeValue>("HISTORICO");

  useEffect(() => {
    if (investment) {
      getCandleStickValues(investment.id, range);
    }
  }, [range]);
  const handleBuy = (amount: number) => {
    console.log("Comprando", amount, "acciones");
    // TODO: Implementar lógica de compra
  };

  const handleSell = (amount: number) => {
    console.log("Vendiendo", amount, "acciones");
    // TODO: Implementar lógica de venta
  };

  const handleSetAutomation = (minPrice: number, maxPrice: number) => {
    console.log("Configurando automatización:", { minPrice, maxPrice });
    // TODO: Implementar lógica de automatización
  };

  if (loading && !candleStickValues) {
    return <LoadingScreen key="loading" />;
  }

  if (!investment) {
    return (
      <div className={styles.error}>
        <p>No se pudo cargar la inversión</p>
        <button
          className={styles.backButton}
          onClick={() => navigate("/dashboard/student/investments/list")}
        >
          <FaArrowLeft />
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className={styles.backButton}
          onClick={() => navigate("/dashboard/student/investments/list")}
        >
          <FaArrowLeft />
          <span>Volver a Inversiones</span>
        </button>

        <InvestmentHeader investment={investment} />

        <div className={styles.mainContent}>
          <div className={styles.chartSection}>
            <CandlestickChart
              data={candleStickValues}
              investmentName={investment.name}
              setRange={setRange}
              range={range}
            />
            <InvestmentStats investment={investment} />
          </div>

          <div className={styles.tradingSection}>
            <TradingPanel
              investment={investment}
              onBuy={handleBuy}
              onSell={handleSell}
              userBalance={userBalance} // TODO: Obtener del contexto del usuario
            />
            <AutomationPanel
              currentPrice={investment.currentPrice}
              onSetAutomation={handleSetAutomation}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InvestmentDetailView;
