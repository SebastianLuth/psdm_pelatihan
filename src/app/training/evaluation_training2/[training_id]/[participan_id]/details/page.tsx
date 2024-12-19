'use client';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Pertanyaan {
    question_id: number;
    question_text: string;
    question_category: string;
    answer: string;
    evaluation_question_text: string;
}

interface EvaluationDataLevel3 {
    user_id: number;
    name: string;
    username: string;
    phone_number: string;
    unit_kerja: number;
    jabatan: string;
    pelatihan_id: number;
    pelatihan_title: string;
    pertanyaan: Pertanyaan[];
}

const DetailEvaluation3Page = () => {
    const [evaluationData, setEvaluationData] = useState<EvaluationDataLevel3 | null>(null);

    const training_id = useParams().training_id;
    const participan_id = useParams().participan_id;

    const fetchEvaluationData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/evaluation3/${training_id}/${participan_id}`
            );
            console.log("API Response:", response.data.data);
            setEvaluationData(response.data.data);
        } catch (error) {
            console.error("Error fetching evaluation data:", error);
        }
    };
    

    const groupedQuestions = evaluationData?.pertanyaan.reduce((acc: Record<string, Pertanyaan[]>, item) => {
        if (!acc[item.question_category]) acc[item.question_category] = [];
        acc[item.question_category].push(item);
        return acc;
    }, {});

    useEffect(() => {
        if (training_id && participan_id) {
            fetchEvaluationData();
        } else {
            console.error("Missing training_id or participan_id in the URL parameters.");
        }
    }, [training_id, participan_id]);

    return (
        <ProtectedRoute>
            <DefaultLayout>
                <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-24">
                    {/* Header */}
                    <header className="text-center space-y-4">
                        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 text-transparent bg-clip-text tracking-wide drop-shadow-lg">
                            Detail Evaluation
                        </h1>
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                            Evaluasi untuk{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {evaluationData?.name || "Loading..."}
                            </span>
                        </p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                            Pelatihan: {evaluationData?.pelatihan_title || "Loading..."}
                        </p>
                    </header>

                    {/* Kategori Pertanyaan */}
                    <div className="mt-12 grid gap-10 lg:grid-cols-2">
                        {groupedQuestions &&
                            Object.entries(groupedQuestions).map(([category, questions]) => (
                                <section
                                    key={category}
                                    className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl p-8 lg:p-12 hover:scale-105 transition-transform duration-300"
                                >
                                    {/* Kategori Header */}
                                    <header className="mb-6">
                                        <h2 className="text-3xl font-bold capitalize text-gray-800 dark:text-gray-200">
                                            {category}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {questions.length} Pertanyaan
                                        </p>
                                    </header>

                                    {/* Pertanyaan */}
                                    <ul className="space-y-6">
                                        {questions.map((question) => (
                                            <li
                                                key={question.question_id}
                                                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <div>
                                                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                                        {question.question_text}
                                                    </p>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        ID: {question.question_id}
                                                    </span>
                                                </div>
                                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-semibold shadow-lg">
                                                    {question.answer}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                    </div>
                </div>
            </DefaultLayout>
        </ProtectedRoute>
    );
};

export default DetailEvaluation3Page;
