'use client';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


type RealisaiProps = {
    jumlahKeseluruhanJamPelajaran ?: number  ;
    jumlahKeseluruhanPeserta ?: number ;

    realiasiJamPelajaran? : number;
    realisasiPeserta? : number;

    title  : string;
}

const RealisasiJamPelAndPeserta = ({
    jumlahKeseluruhanJamPelajaran , 
    jumlahKeseluruhanPeserta , 
    realiasiJamPelajaran,  
    realisasiPeserta,
    title
    }: RealisaiProps) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: title,
                left: 'center',
                top: 10,
                textStyle: {
                    fontSize: 12, // Ukuran font lebih kecil
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
                data: ['Realisasi', 'Rencana'],
                textStyle: {
                    fontSize: 10 // Ukuran font legend lebih kecil
                }
            },
            series: [
                {
                    name: 'Peserta',
                    type: 'pie',
                    radius: ['30%', '50%'], // Radius lebih kecil
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{b}: {c} ({d}%)',
                        fontSize: 10 // Ukuran font label lebih kecil
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 10, // Ukuran font emphasis lebih kecil
                            fontWeight: 'semibold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: realiasiJamPelajaran? realiasiJamPelajaran : realisasiPeserta, name: 'Realisasi' },
                        { value: jumlahKeseluruhanJamPelajaran? jumlahKeseluruhanJamPelajaran : jumlahKeseluruhanPeserta, name: 'Rencana' }
                    ]
                }
            ]
        };

        chart.setOption(option);

        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            chart.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, [jumlahKeseluruhanJamPelajaran, jumlahKeseluruhanPeserta, realiasiJamPelajaran, realisasiPeserta, title]);

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-[300px] mx-auto"> 
            <div ref={chartRef} style={{ width: '100%', height: '200px' }} /> 
        </div>
    )
};

export default RealisasiJamPelAndPeserta;