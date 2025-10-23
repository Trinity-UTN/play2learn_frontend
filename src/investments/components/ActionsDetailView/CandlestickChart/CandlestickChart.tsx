import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";
import styles from "./CandlestickChart.module.css";
import type {
  CandleStickValuesResponse,
  RangeValue,
} from "../../../types/actions.type";
import {
  createChart,
  CrosshairMode,
  CandlestickSeries,
  type UTCTimestamp,
} from "lightweight-charts";
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
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    // Crear gráfico base
    const chart = createChart(chartContainerRef.current, {
      height: 600,
      layout: {
        background: { color: "#1a1a2e" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#2a2e39" },
        horzLines: { color: "#2a2e39" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });
    chart.applyOptions({
      rightPriceScale: {
        scaleMargins: {
          top: 0.3, // leave some space for the legend
          bottom: 0.25,
        },
      },
      crosshair: {
        // hide the horizontal crosshair line
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        // hide the vertical crosshair label
        vertLine: {
          labelVisible: false,
        },
      },
      // hide the grid lines
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });
    // Agregar serie de velas
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Formatear datos según el esquema de lightweight-charts
    const formattedData = data.map((candle) => ({
      time: Math.floor(new Date(candle.date).getTime() / 1000) as UTCTimestamp,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    candlestickSeries.setData(formattedData);
    chart.timeScale().fitContent();

    // Resize automático
    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      chart.applyOptions({ width });
      chart.timeScale().fitContent();
    });
    resizeObserver.observe(chartContainerRef.current);

    // Limpieza
    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data]);
  const timeRanges: { range: RangeValue; abbreviation: string }[] = [
    { range: "DIARIO", abbreviation: "D" },
    { range: "SEMANAL", abbreviation: "S" },
    { range: "QUINZENAL", abbreviation: "Q" },
    { range: "MENSUAL", abbreviation: "M" },
    { range: "HISTORICO", abbreviation: "H" },
  ];
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
                className={`${styles.button} ${
                  rangeValue.range === range ? styles.active : ""
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
