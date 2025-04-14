"use client";
import React, { useEffect, useRef, useMemo } from "react";
import * as echarts from "echarts";
import { tahunOptions } from "@/types/budget-types";

type RealisasiBiayaChartProps = {
    sisaAnggaranDataLpp : number[];
    realisasiAnggaranDataLpp : number[];
    sisaAnggaranDataNonLpp : number[];
    realisasiAnggaranDataNonLpp: number[];
    title : string ;
    categories: string[];
    tahunAnggaran: number;
    onTahunChange: (tahun: number) => void; 
};

const formatNumber = (value: number) => {
    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(1)}m`; // Format miliar (1.000.000.000 -> 1m)
    } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}jt`; // Format juta (1.000.000 -> 1jt)
    } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}rb`; // Format ribu (1.000 -> 1rb)
    } else {
        return value.toString(); // Biarkan angka asli jika di bawah 1.000
    }
};

const RealisasiBiayaChart = ({ tahunAnggaran, onTahunChange, title, categories, sisaAnggaranDataLpp, realisasiAnggaranDataLpp , sisaAnggaranDataNonLpp, realisasiAnggaranDataNonLpp }: RealisasiBiayaChartProps) => {
    const singkatKategori = (kategori: string): string => {
        if (kategori.startsWith('PTPN 4 Regional')) {
          return 'R' + kategori.replace('PTPN 4 Regional ', '');
        }
      
        const mapLainnya: { [key: string]: string } = {
          'PT AGRO SINERGI NUSANTARA': 'ASN',
          'PT SINERGI PERKEBUNAN NUSANTARA': 'SPN',
          'PT PRIMA MEDIKA NUSANTARA': 'PMN',
          'PT NUSA LIMA MEDIKA': 'NLM',
          'PT KALIMANTAN MEDIKA NUSANTARA': 'KMN',
          'PT ALAM LESTARI NUSANTARA': 'ALN',
          'PT NUSANTARA BATU LICIN': 'NBL',
          'PT INDUSTRI NABATI LESTARI': 'INL',
          'PTPN4 Head Office': 'HO',
        };
      
        return mapLainnya[kategori] || kategori;
      };

      const kategoriSingkat = categories.map(singkatKategori); // pastikan pakai nama fungsi yang benar
      

    const chartRef = useRef<HTMLDivElement>(null);
     const rawData = [
       
        realisasiAnggaranDataLpp,
        sisaAnggaranDataLpp
    ];

    const rawData2 = [
        
        realisasiAnggaranDataNonLpp,
        sisaAnggaranDataNonLpp
    ];

    const totalData = [];
    for (let i = 0; i < rawData[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.length; ++j) {
            sum += rawData[j][i];
        }
        totalData.push(sum);
    }

    const grid = {
        left: '5%',
        right: '5%',
        top: '15%',
        bottom: '20%'
    };

    const series = [
        'Realisasi Anggaran LPP',
        'Sisa Anggaran LPP',
    ].map((name, sid) => {
        return {
            name,
            type: 'bar',
            stack: 'total',
            barWidth: '40%',
            label: {
                show: true,
                position: 'inside',
                formatter: (params: any) => formatNumber(params.value) // Format label di dalam bar
            },
            data: rawData[sid]
        };
    });

    const series2 = [
        'Realisasi Anggaran NON LPP',
        'Sisa Anggaran NON LPP',
    ].map((name, sid) => {
        return {
            name,
            type: 'bar',
            stack: 'total2',
            barWidth: '40%',
            label: {
                show: true,
                position: 'inside',
                formatter: (params: any) => formatNumber(params.value) // Format label di dalam bar

            },
            data: rawData2[sid]
        };
    });

    const doubleSeries = series.concat(series2);

    const option = {
        tooltip: {
            trigger: 'axis', // Munculkan tooltip saat hover ke axis (batang bar)
            axisPointer: {
                type: 'shadow' // Tampilkan shadow untuk memperjelas batang yang dihover
            },
            formatter: (params: any) => {
                let tooltipText = '';
                params.forEach((param: any) => {
                    tooltipText += `
                        <div style="margin-bottom: 5px;">
                            <strong>${param.seriesName}</strong>: ${param.value.toLocaleString()}
                        </div>
                    `;
                });
                return tooltipText;
            }
        },
        legend: {
            selectedMode: false
        },
        grid,
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: (value: number) => formatNumber(value)
            }
        },
        xAxis: {
            type: 'category',
            data: kategoriSingkat,
        },
        series: doubleSeries
    };

    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        chart.setOption(option);

        // Bersihkan chart saat komponen di-unmount
        return () => {
            chart.dispose();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tahunAnggaran, categories]);    
    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg p-4 mx-auto flex flex-col">
            <h2 className="text-center text-2xl font-semibold mb-4">{title}</h2>
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
            <div ref={chartRef} className="w-full min-h-[400px]"></div>
        </div>

    );
};

export default RealisasiBiayaChart;
