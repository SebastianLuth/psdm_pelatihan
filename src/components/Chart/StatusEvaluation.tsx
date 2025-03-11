'use client'
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface Evaluation {
    label: string;
    value: number;
    max?: number;
    color: string;
}

interface StatusEvaluationProps {
    evaluation1TotalParticipant : number;
    evaluation1TotalEvaluated : number;
    evaluation1TotalFreetext: number;
    evaluation3TotalEvaluated : number;
}



const StatusEvaluation = ( {evaluation1TotalParticipant, evaluation1TotalEvaluated, evaluation1TotalFreetext, evaluation3TotalEvaluated} : StatusEvaluationProps) => {
    const chartRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const evaluations: Evaluation[] = [
        { label: "Evaluasi Level 1", value: evaluation1TotalEvaluated, max: evaluation1TotalParticipant, color: "#34D399" }, // Hijau
        { label: "Evaluasi Level 3", value: evaluation3TotalEvaluated, color: "#8B5CF6" }, // Ungu
        { label: "Evaluasi Feedback", value: evaluation1TotalFreetext, max: evaluation1TotalParticipant, color: "#FB923C" }, // Orange
    ];

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
    }, [evaluations]);

    return (
        
        <div className="p-6 bg-white rounded-2xl shadow-md w-full lg:w-[450px]">
            <div className = "flex items-center justify-between">
             <h2 className="text-xl font-bold text-gray-900">Status Evaluasi </h2>
            </div>
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
                                    width: `${(evaluation.value / (evaluation.max || 1)) * 100}%`,
                                    backgroundColor: evaluation.color,
                                }}
                            ></div>
                        </div>
                        <span
                            className="text-xs font-semibold px-2 py-1 border rounded-md"
                            style={{ color: evaluation.color, borderColor: evaluation.color }}
                        >   {
                                evaluation.max ? `${evaluation.value}/${evaluation.max}` : evaluation.value
                             }
                            
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusEvaluation;
