import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import ActionHeader from "../../components/ActionsDetailView/ActionsDetailHeader/ActionsDetailHeader";
import CandlestickChart from "../../components/ActionsDetailView/CandlestickChart/CandlestickChart";
import TradingPanel from "../../components/ActionsDetailView/TradingPanel/TradingPanel";
import AutomationPanel from "../../components/ActionsDetailView/AutomationPanel/AutomationPanel";
import ActionStats from "../../components/ActionsDetailView/ActionsDetailsStats/ActionsDetailsStats";
import styles from "./ActionsDetailView.module.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useActionsDetailsView } from "../../hooks/useActions/useActionsDetailsView";

const ActionDetailView = () => {
  const {
    candleStickValues,
    loading,
    userBalance,
    action,
    range,
    setRange,
    navigate,
    handleBuy,
    handleSell,
    handleSetAutomation,
  } = useActionsDetailsView();
  // console.log(action);
  if (loading && !candleStickValues) {
    return <LoadingScreen key="loading" titulo="Cargando Acción" />;
  }
  if (!action) {
    return (
      <div className={styles.error}>
        <p>¡Lo sentimos!</p>
        <p>No se pudo cargar la inversión</p>
        <button
          className={styles.backButton}
          onClick={() => navigate("/dashboard/student/actions/list")}
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
          onClick={() => navigate("/dashboard/student/actions/list")}
        >
          <FaArrowLeft />
          <span>Volver a Inversiones</span>
        </button>

        <ActionHeader action={action} />

        <div className={styles.mainContent}>
          <div className={styles.chartSection}>
            <CandlestickChart
              data={candleStickValues}
              actionName={action.name}
              setRange={setRange}
              range={range}
            />
            <ActionStats action={action} />
          </div>

          <div className={styles.tradingSection}>
            <TradingPanel
              action={action}
              onBuy={handleBuy}
              onSell={handleSell}
              userBalance={userBalance} // TODO: Obtener del contexto del usuario
            />
            <AutomationPanel
              currentPrice={action.currentPrice}
              onSetAutomation={handleSetAutomation}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ActionDetailView;
