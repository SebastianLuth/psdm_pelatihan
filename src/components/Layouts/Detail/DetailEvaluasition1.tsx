"use client";
import { getEvaluationData } from "@/service/evaluation1";
import { EvaluationItem } from "@/types/evaluation1";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function DetailEvaluasiTraining1Component() {
  const trainingId = useParams().evaluationId;
  const userId = useParams().training_id;
  const [evaluationData, setEvaluationData] = useState<EvaluationItem[]>([]); // Specify type as an array of EvaluationItem

  // Fetch evaluation data from API
  const fetchEvaluationData = useCallback(async () => {
    try {
      const result = await getEvaluationData(
        Number(userId),
        Number(trainingId),
      );
      setEvaluationData(result);
    } catch (error) {
      console.error("Error fetching evaluation data:", error);
    }
  }, [trainingId, userId]);

  useEffect(() => {
    fetchEvaluationData();
  }, [fetchEvaluationData]);

  return (
        <div className="p-6">
          {/* Header */}
          <h1 className="mb-2 text-lg font-bold">
            Detail Data Penilaian Pelatihan {evaluationData[0]?.name} -{" "}
            {evaluationData[0]?.unit_kerja}
          </h1>
          <p className="mb-6 text-gray-600">
            Halaman ini untuk melihat detail data penilaian pada sebuah
            pelatihan.
          </p>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Tabel Penilaian */}
            <div className="rounded-lg bg-white p-4 shadow-md md:col-span-2">
              <h2 className="mb-4 border-b border-gray-300 pb-2 text-base font-semibold">
                Tabel Penilaian
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="p-2 text-left">No</th>
                    <th className="p-2 text-left">Soal</th>
                    <th className="p-2 text-left">Jawaban</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationData.map((item, index) => (
                    <tr
                      key={item.question_id}
                      className="border-b border-gray-200"
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">
                        {item.question_text === null
                          ? item.evaluation_question_text
                          : item.question_text}
                      </td>
                      <td className="p-2 text-center">
                        {item.answer || "Belum Diisi"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Keterangan Penilaian */}
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-4 border-b border-gray-300 pb-2 text-base font-semibold">
                Keterangan Penilaian
              </h2>
              <p className="mb-4">
                <span className="font-medium">Tanggal Penilaian:</span> 13
                October 2023
              </p>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="p-2 text-left">Angka</th>
                    <th className="p-2 text-left">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">1</td>
                    <td className="p-2">Sangat Tidak Setuju</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">2</td>
                    <td className="p-2">Tidak Setuju</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">3</td>
                    <td className="p-2">Setuju</td>
                  </tr>
                  <tr>
                    <td className="p-2">4</td>
                    <td className="p-2">Sangat Setuju</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  );
}
