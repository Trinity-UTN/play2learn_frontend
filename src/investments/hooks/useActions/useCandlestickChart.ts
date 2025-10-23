import { useEffect, useRef } from "react";
import type { CandleStickValuesResponse } from "../../types/actions.type";
import {
  createChart,
  CrosshairMode,
  CandlestickSeries,
  type UTCTimestamp,
} from "lightweight-charts";

export const useCandlestickChart = (data: CandleStickValuesResponse[]) => {
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
  return { chartContainerRef };
};
