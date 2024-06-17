import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Chart = ({ ohlcData }) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!ohlcData || !ohlcData.length) return;

    // Sort data by time (ascending order)
    const sortedData = ohlcData.sort((a, b) => a.ts - b.ts);

    // Create a new chart instance if it doesn't exist
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });
    }

    const chart = chartInstanceRef.current;

    // Create candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4caf50",
      borderDownColor: "#e53935",
      borderUpColor: "#4caf50",
      wickDownColor: "#e53935",
      wickUpColor: "#4caf50",
    });

    // Map OHLC data to candlestick format
    const candlestickData = sortedData.map((item) => ({
      time: item.ts / 1000, // Convert timestamp to seconds
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    // Update candlestick series data
    candleSeries.setData(candlestickData);

    return () => {
      // Cleanup chart instance on component unmount
      if (chart) {
        chart.remove();
        chartInstanceRef.current = null;
      }
    };
  }, [ohlcData]);

  return <div ref={chartContainerRef} className="chart-container" />;
};

export default Chart;
