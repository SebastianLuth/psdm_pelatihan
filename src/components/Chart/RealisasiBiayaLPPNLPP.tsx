"use client";
import React, { useEffect, useRef, useMemo } from "react";
import * as echarts from "echarts";
import { tahunOptions } from "@/types/budget-types";

const formatCurrency = (value: number): string => {
    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(1)} M`;
    } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(0)} JT`;
    }
    return value.toString();
};

type RealisasiBiayaChartProps = {
    dataLPP?: number[] | null;
    dataNonLPP?: number[] | null;
    dataKeseluruhan?: number[] | null;
    categories: string[];
    title: string;
    tahunAnggaran: number;
    onTahunChange: (tahun: number) => void; 
};

const RealisasiBiayaChart = ({ dataLPP, dataNonLPP, dataKeseluruhan,categories, title, tahunAnggaran, onTahunChange }: RealisasiBiayaChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);

    // Gunakan useMemo agar series tidak selalu dihitung ulang jika props tidak berubah
    const series = useMemo(() => {
        const result: echarts.SeriesOption[] = [];

        if (dataLPP && dataLPP.length > 0) {
            result.push({
                name: "LPP",
                type: "bar",
                data: dataLPP,
                itemStyle: { 
                    color: "#3B82F6", 
                    borderRadius: [6, 6, 0, 0], 
                },
                barWidth: 24,
            });
        }

        if (dataNonLPP && dataNonLPP.length > 0) {
            result.push({
                name: "Non LPP",
                type: "bar",
                data: dataNonLPP,
                itemStyle: { 
                    color: "#10B981", 
                    borderRadius: [6, 6, 0, 0], 
                },
                barWidth: 24,
            });
        }

        if (dataKeseluruhan && dataKeseluruhan.length > 0) {
            result.push({
                name: "Keseluruhan",
                type: "line",
                data: dataKeseluruhan,
                itemStyle: { color: "#EF4444" },
                lineStyle: { width: 4 },
            });
        }

        return result;
    }, [dataLPP, dataNonLPP, dataKeseluruhan]);

    useEffect(() => {
        if (!chartRef.current) return;

        const chartInstance = echarts.init(chartRef.current);

        const option: echarts.EChartsOption = {
            title: {
                text: title,
                left: "center",
                textStyle: { fontSize: 18, fontWeight: "bold", color: "#1F2937" },
            },
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(0,0,0,0.8)",
                borderRadius: 8,
                padding: 10,
                textStyle: { color: "#fff", fontSize: 12 },
                formatter: (params: any) => {
                    return params
                        .map(
                            (item: any) =>
                                `<span style="display:inline-block;width:10px;height:10px;margin-right:4px;background-color:${item.color}"></span> 
                                ${item.seriesName}: <b>Rp ${formatCurrency(item.value)}</b>`
                        )
                        .join("<br>");
                },
            },
            legend: {
                bottom: 10,
                itemGap: 20,
                textStyle: { fontSize: 12, color: "#374151" },
            },
            xAxis: {
                type: "category",
                data: categories,
                axisLabel: { fontSize: 12, color: "#6B7280" },
                axisLine: { lineStyle: { color: "#E5E7EB" } },
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    fontSize: 12,
                    color: "#6B7280",
                    formatter: formatCurrency,
                },
                splitLine: { lineStyle: { color: "#E5E7EB", type: "dashed" } },
            },
            series,
            grid: { left: "10%", right: "10%", top: "20%", bottom: "25%" },
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, [categories, series, title]);

    return (
        <div className="w-full h-72 bg-white rounded-xl shadow-lg p-4 mx-auto flex flex-col">
            <div className="flex justify-end mb-3">
                <div className="relative">
                    <select 
                    className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg px-4 py-2 pr-10 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    value={tahunAnggaran}
                    onChange={(e) => onTahunChange(Number(e.target.value))} 
                    >
                        <option value="" disabled selected>
                            Pilih Tahun  
                        </option>
                        {tahunOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {/* Ikon panah dropdown */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div ref={chartRef} className="w-full h-full"></div>
        </div>

    );
};

export default RealisasiBiayaChart;
