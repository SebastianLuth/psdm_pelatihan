'use client'
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const categories = ["HO", "Regional 2", "Regional 3", "Regional 4", "Regional 5", "Regional 6", "Regional 7"];

const dataLPP = [140_000_000, 180_000_000, 50_000_000, 160_000_000, 120_000_000, 1_700_000_000, 2_000_000_000]; // Contoh: ratusan juta - milyaran
const dataNonLPP = [130_000_000, 150_000_000, 2_200_000_000, 70_000_000, 100_000_000, 1_400_000_000, 1_200_000_000];

const formatCurrency = (value: number): string => {
    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(1)} M`; // Miliar (contoh: 2.5 M)
    } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(0)} JT`; // Jutaan (contoh: 150 JT)
    }
    return value.toString(); // Jika kurang dari 1 juta, tampilkan angka asli
};

const RealisasiBiayaChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chartInstance = echarts.init(chartRef.current);

        const option: echarts.EChartsOption = {
            title: {
                text: "Realisasi Biaya LPP / NON LPP Keseluruhan",
                left: "center",
                textStyle: { fontSize: 18, fontWeight: "bold", color: "#1F2937" }, // Warna lebih gelap & elegan
            },
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(0,0,0,0.8)", // Tooltip transparan gelap
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
                textStyle: { fontSize: 12, color: "#374151" }, // Warna teks lebih soft
            },
            xAxis: {
                type: "category",
                data: categories,
                axisLabel: { fontSize: 12, color: "#6B7280" }, // Warna abu-abu elegan
                axisLine: { lineStyle: { color: "#E5E7EB" } }, // Garis bawah sumbu lebih halus
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    fontSize: 12,
                    color: "#6B7280",
                    formatter: formatCurrency, // Format otomatis sesuai nilai
                },
                splitLine: { lineStyle: { color: "#E5E7EB", type: "dashed" } }, // Garis grid lebih soft
            },
            series: [
                {
                    name: "LPP",
                    type: "bar",
                    data: dataLPP,
                    itemStyle: { 
                        color: "#3B82F6", // Warna biru yang lebih modern
                        borderRadius: [6, 6, 0, 0], // Bar lebih smooth
                    },
                    barWidth: 24,
                },
                {
                    name: "Non LPP",
                    type: "bar",
                    data: dataNonLPP,
                    itemStyle: { 
                        color: "#10B981", // Warna hijau modern
                        borderRadius: [6, 6, 0, 0], // Bar lebih smooth
                    },
                    barWidth: 24,
                },
            ],
            grid: { left: "5%", right: "5%", top: "20%", bottom: "20%" },
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return (
        <div className="w-full h-72 bg-white rounded-xl shadow-lg p-4">
            <div ref={chartRef} className="w-full h-full"></div>
        </div>
        
    );
};

export default RealisasiBiayaChart;
