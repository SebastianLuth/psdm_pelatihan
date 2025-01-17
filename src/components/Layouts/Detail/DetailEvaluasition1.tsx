"use client";
import { getEvaluationData } from "@/service/evaluation1";
import { EvaluationItem } from "@/types/evaluation1";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function DetailEvaluasiTraining1Component() {
  const trainingId = useParams().evaluationId;
  const userId = useParams().training_id;
  const [evaluationData, setEvaluationData] = useState<EvaluationItem[]>([]);
  const [error, setError] = useState<boolean>(false);

  const fetchEvaluationData = useCallback(async () => {
    try {
      const result = await getEvaluationData(
        Number(userId),
        Number(trainingId),
      );

      setEvaluationData(result);
    } catch (error) {
      setError(true);
    }
  }, [trainingId, userId]);

  useEffect(() => {
    fetchEvaluationData();
  }, [fetchEvaluationData]);

  const groupByCategory = (
    data: EvaluationItem[],
  ): Record<string, EvaluationItem[]> => {
    return data.reduce(
      (acc, item) => {
        if (!acc[item.question_category]) {
          acc[item.question_category] = [];
        }
        acc[item.question_category].push(item);
        return acc;
      },
      {} as Record<string, EvaluationItem[]>,
    );
  };

  const groupedData = groupByCategory(evaluationData);

  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="mb-2 text-lg font-bold">
        Detail Data Penilaian Pelatihan {evaluationData[0]?.name} -{" "}
        {evaluationData[0]?.unit_kerja}
      </h1>
      <p className="mb-6 text-gray-600">
        Halaman ini untuk melihat detail data penilaian pada sebuah pelatihan.
      </p>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Tabel Penilaian */}
        <div className="rounded-lg bg-white p-4 shadow-md md:col-span-2">
          <h2 className="mb-4 border-b border-gray-300 pb-2 text-base font-semibold">
            Tabel Penilaian
          </h2>
          {Object.entries(groupedData).map(
            ([category, items], categoryIndex) => (
              <div key={categoryIndex} className="mb-6">
                <h3 className="mb-2 text-lg font-semibold">
                  {category === "mutu materi"
                    ? "Pendapat peserta mengenai Mutu isi Materi Pelatihan yang diberikan"
                    : category === "kesan"
                      ? "Kesan peserta terhadap Narasumber/Fasilitator"
                      : category == "sarana"
                        ? "Pendapat peserta tentang Sarana Pelatihan"
                        : category == "review materi"
                          ? "Reviu Implementasi Program Pembelajaran"
                          : category == "kesimpulan"
                            ? "Kesimpulan penilaian secara umum "
                            : ""}
                </h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="p-2 text-left">No</th>
                      <th className="p-2 text-left">Soal</th>
                      <th className="p-2 text-left">Jawaban</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr
                        key={item.question_id}
                        className="border-b border-gray-200"
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          {item.question_text || item.evaluation_question_text}
                        </td>
                        <td className="p-2 text-center">
                          {item.answer || "Belum Diisi"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          )}
        </div>

        {/* Keterangan Penilaian */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-4 border-b border-gray-300 pb-2 text-base font-semibold">
            Keterangan Penilaian
          </h2>
          <p className="mb-4">
            <span className="font-medium">Tanggal Penilaian:</span> 13 October
            2023
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
