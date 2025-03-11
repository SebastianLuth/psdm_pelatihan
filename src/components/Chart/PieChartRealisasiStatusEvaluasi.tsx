import { useEffect, useRef, useCallback } from "react";
import * as echarts from "echarts";

interface PieChartProps {
  value: number;
  title: string;
  color: string;
  total: number;
}

export const PieChartRealisasiStatusEvaluasi: React.FC<PieChartProps> = ({ value, title, color, total }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const renderChart = useCallback((container: HTMLDivElement | null) => {
    if (!container) return;

    const chart = echarts.init(container);
    chart.setOption({
      title: {
        text: `${Math.round((value / total) * 100)}%`,
        left: "center",
        top: "center",
        textStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["70%", "90%"],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value, name: title, itemStyle: { color } },
            {
              value: total - value,
              name: "Remaining",
              itemStyle: { color: "#e0e0e0" },
            },
          ],
        },
      ],
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [value, title, color, total]);

  useEffect(() => {
    if (chartRef.current) {
      renderChart(chartRef.current);
    }
  }, [renderChart]);

  return <div ref={chartRef} style={{ width: "100%", height: "200px" }} />;
};
