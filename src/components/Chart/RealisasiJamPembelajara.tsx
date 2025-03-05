'use client';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const RealisasiJamPeserta = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;
        
        const chart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: 'Realisasi Jumlah Peserta',
                left: 'center',
                top: 10,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'horizontal',
                bottom: 5,
                data: ['Realisasi', 'Rencana']
            },
            series: [
                {
                    name: 'Peserta',
                    type: 'pie',
                    radius: ['25%', '45%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{b}: {c} ({d}%)',
                        fontSize: 12
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '10',
                            fontWeight: 'semibold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 320, name: 'Realisasi' },
                        { value: 500, name: 'Rencana' }
                    ]
                }
            ]
        };

        chart.setOption(option);

        window.addEventListener('resize', () => chart.resize());
        return () => {
            chart.dispose();
            window.removeEventListener('resize', () => chart.resize());
        };
    }, []);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-md w-[450px]">
            <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
        </div>
    )
};

export default RealisasiJamPeserta;