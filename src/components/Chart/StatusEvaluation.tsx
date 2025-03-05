'use client'
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface Evaluation {
    label: string;
    value: number;
    max: number;
    color: string;
}

const evaluations: Evaluation[] = [
    { label: "Evaluasi Level 1", value: 750, max: 1500, color: "#34D399" }, // Hijau
    { label: "Evaluasi Level 2", value: 300, max: 1200, color: "#8B5CF6" }, // Ungu
    { label: "Evaluasi Feedback", value: 700, max: 1100, color: "#FB923C" }, // Orange
];

const StatusEvaluation: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chartInstance = echarts.init(chartRef.current);

        const option: echarts.EChartsOption = {
            tooltip: { trigger: "axis" },
            xAxis: { type: "value", max: Math.max(...evaluations.map((e) => e.value)) + 100, show: false },
            yAxis: { type: "category", data: evaluations.map((e) => e.label), axisTick: { show: false }, axisLine: { show: false } },
            series: [
                {
                    type: "bar",
                    data: evaluations.map((e) => ({ value: e.value, itemStyle: { color: e.color } })),
                    barWidth: 12,
                },
            ],
            grid: { left: "10%", right: "10%", top: "10%", bottom: "10%" },
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return (
        
        <div className="p-6 bg-white rounded-2xl shadow-md w-[450px]">
            <h2 className="text-xl font-bold text-gray-900">Status Evaluasi</h2>
            <div className="flex justify-between text-gray-500 text-sm mt-2 mb-4">
                <span>Evaluasi</span>
                <span>Jumlah</span>
            </div>
            <div className="space-y-3">
                {evaluations.map((evaluation, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <span className="text-gray-700 w-36">{evaluation.label}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-lg overflow-hidden">
                            <div
                                className="h-full"
                                style={{
                                    width: `${(evaluation.value / evaluation.max) * 100}%`,
                                    backgroundColor: evaluation.color,
                                }}
                            ></div>
                        </div>
                        <span
                            className="text-xs font-semibold px-2 py-1 border rounded-md"
                            style={{ color: evaluation.color, borderColor: evaluation.color }}
                        >
                            {evaluation.value}/{evaluation.max}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusEvaluation;
