import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface PieChartProps {
  value: number;
  title: string;
  color: string;
  total: number;
}

export const PieChartRealisasiStatusEvaluasi: React.FC<PieChartProps> = ({ 
  value, 
  title, 
  color, 
  total 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    // Initialize chart if container exists and no instance exists
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
      
      const handleResize = () => {
        chartInstance.current?.resize();
      };
      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
        chartInstance.current = null;
      };
    }
  }, []);

  useEffect(() => {
    // Update chart options when dependencies change
    if (chartInstance.current) {
      chartInstance.current.setOption({
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
    }
  }, [value, title, color, total]);

  return <div ref={chartRef} style={{ width: "100%", height: "200px" }} />;
};