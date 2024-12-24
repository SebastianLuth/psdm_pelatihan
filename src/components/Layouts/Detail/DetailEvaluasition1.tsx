'use client';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Define the interface for evaluation data
interface EvaluationItem {
    user_id: number;
    name: string;
    username: number;
    phone_number: string;
    unit_kerja: number;
    jabatan: string;
    training_id: number;
    training_title: string;
    question_id: number;
    question_text: string;
    answer: string | null;
    evaluation_question_text?: string | null;
}

export default function DetailEvaluasiTraining1Component() {
    const trainingId = useParams().evaluationId; // Ambil trainingId dari parameter URL
    const userId = useParams().training_id; // Ambil userId dari parameter URL
    const [evaluationData, setEvaluationData] = useState<EvaluationItem[]>([]); // Specify type as an array of EvaluationItem
    
    // Fetch evaluation data from API
    const fetchEvaluationData = useCallback(async () => {
        try {
            const response = await axios.get<{ data: EvaluationItem[] }>(
                `http://localhost:5000/api/evaluation/${userId}/${trainingId}`
            );
            console.log(response.data.data);
            setEvaluationData(response.data.data); // Set the data using the response
        } catch (error) {
            console.error("Error fetching evaluation data:", error);
        }
    }, [trainingId, userId]);

    useEffect(() => {
        fetchEvaluationData();
    }, [fetchEvaluationData]);

    return (
        <ProtectedRoute>
            <DefaultLayout>
                <div className="p-6">
                    {/* Header */}
                    <h1 className="text-lg font-bold mb-2">
                        Detail Data Penilaian Pelatihan {evaluationData[0]?.name} - {evaluationData[0]?.unit_kerja}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Halaman ini untuk melihat detail data penilaian pada sebuah pelatihan.
                    </p>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Tabel Penilaian */}
                        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-base font-semibold border-b border-gray-300 pb-2 mb-4">
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
                                        <tr key={item.question_id} className="border-b border-gray-200">
                                            <td className="p-2">{index + 1}</td>
                                            <td className="p-2">{item.question_text === null ? item.evaluation_question_text : item.question_text }</td>
                                            <td className="p-2 text-center">{item.answer || "Belum Diisi"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Keterangan Penilaian */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-base font-semibold border-b border-gray-300 pb-2 mb-4">
                                Keterangan Penilaian
                            </h2>
                            <p className="mb-4">
                                <span className="font-medium">Tanggal Penilaian:</span> 13 October 2023
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
            </DefaultLayout>
        </ProtectedRoute>
    );
}
