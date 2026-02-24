import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";
import styles from "./CandlestickChart.module.css";
import type {
  CandleStickValuesResponse,
  RangeValue,
} from "../../../types/actions.type";
import { useCandlestickChart } from "../../../hooks/useActions/useCandlestickChart";
import { timeRanges } from "../../../contanst/actionsContanst/candlestickChar.contanst";
interface CandlestickChartProps {
  data: CandleStickValuesResponse[];
  actionName: string;
  setRange: (range: RangeValue) => void;
  range: RangeValue;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  actionName,
  setRange,
  range,
}) => {
  const { chartContainerRef } = useCandlestickChart(data);
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <FaChartLine className={styles.icon} />
          <h3 className={styles.title}>
            Gráfico de Precios - {actionName} - {range}
          </h3>
        </div>
        <div>
          <div className={styles.containerRange}>
            {timeRanges.map((rangeValue, index) => (
              <motion.button
                key={rangeValue.range}
                className={`${styles.button} ${rangeValue.range === range ? styles.active : ""
                  }`}
                onClick={() => setRange(rangeValue.range)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {rangeValue.abbreviation}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div ref={chartContainerRef} className={styles.chartContainer}></div>
    </motion.div>
  );
};

export default CandlestickChart;
