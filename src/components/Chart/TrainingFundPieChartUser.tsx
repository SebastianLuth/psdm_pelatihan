import React, { useState, useCallback, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { trainingFundAbsorption } from "@/types/training-types";

interface trainingFundAbsorptionProps {
  trainingFundAbsorption: trainingFundAbsorption[];
} 

const IntegratedComponent: React.FC<trainingFundAbsorptionProps> = ({trainingFundAbsorption}) => {
  const [selectedTraining, setSelectedTraining] = useState<trainingFundAbsorption | null>(null);  

  const chartData = trainingFundAbsorption.map((item) => ({
    value: parseFloat(item.total_anggaran_pelatihan),
    name: item.judul_pelatihan,
    rawData: item,
  }));

  const options = {
    title: {
      text: "Penyerapan Anggaran Pelatihan Anda",
      subtext: "Distribusi Anggaran",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: "0%",
    },
    series: [
      {
        name: "Anggaran",
        type: "pie",
        radius: ["35%", "60%"],
        data: chartData,
        label: {
          formatter: "{b}\n{d}%",
          fontSize: 12,
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 2,
        },
      },
    ],
  };

  const handleChartClick = (params: any) => {
    if (params.data?.rawData) {
      setSelectedTraining(params.data.rawData);
    }
  };

  return (
    <div className="min-h-screen mt-10">
      <div className="container mx-auto grid grid-cols-12 gap-8">
        {/* Left Section: Chart */}
        <div className="col-span-5 bg-white shadow-lg rounded-xl p-6">
          <ReactECharts
            option={options}
            style={{ height: 400 }}
            onEvents={{
              click: handleChartClick,
            }}
          />
        </div>

        {/* Right Section: Training Details */}
        <div className="col-span-7 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {selectedTraining ? "Detail Pelatihan" : "Klik Pelatihan Untuk Melihat Detailnya"}
          </h2>
          {selectedTraining ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700">Judul Pelatihan</h3>
                <p className="text-gray-600">{selectedTraining.judul_pelatihan}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700">Metode</h3>
                <p className="text-gray-600">{selectedTraining.metode_pelatihan}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700">Lokasi</h3>
                <p className="text-gray-600">{selectedTraining.lokasi_pelatihan}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700">Biaya Pelatihan Perorang</h3>
                <p className="text-gray-600">
                  Rp {parseFloat(selectedTraining.biaya_per_user).toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700">Total Peserta</h3>
                <p className="text-gray-600">{selectedTraining.total_peserta}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700">Lembaga</h3>
                <p className="text-gray-600">{selectedTraining.lembaga_pelatihan}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Klik Sebuah Bagian Untuk Melihat Detail Pelatihan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegratedComponent;
