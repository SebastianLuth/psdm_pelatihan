"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  const [evaluationData, setEvaluationData] =
    useState<EvaluationDataLevel3 | null>(null);

  const training_id = useParams().training_id;
  const participan_id = useParams().participan_id;

  const fetchEvaluationData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/evaluation3/${training_id}/${participan_id}`,
      );
      console.log("API Response:", response.data.data);
      setEvaluationData(response.data.data);
    } catch (error) {
      console.error("Error fetching evaluation data:", error);
    }
  }, [training_id, participan_id]);

  const groupedQuestions = evaluationData?.pertanyaan.reduce(
    (acc: Record<string, Pertanyaan[]>, item) => {
      if (!acc[item.question_category]) acc[item.question_category] = [];
      acc[item.question_category].push(item);
      return acc;
    },
    {},
  );

  useEffect(() => {
    fetchEvaluationData();
  }, [fetchEvaluationData]);
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-24">
          {/* Header */}
          <header className="space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 bg-clip-text text-6xl font-extrabold tracking-wide text-transparent drop-shadow-lg">
              Detail Evaluation
            </h1>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Evaluasi untuk{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {evaluationData?.name || "Loading..."}
              </span>
            </p>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Pelatihan: {evaluationData?.pelatihan_title || "Loading..."}
            </p>
          </header>

          {/* Kategori Pertanyaan */}
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {groupedQuestions &&
              Object.entries(groupedQuestions).map(([category, questions]) => (
                <section
                  key={category}
                  className="relative rounded-3xl bg-gradient-to-r from-gray-50 to-gray-100 p-8 shadow-xl transition-transform duration-300 hover:scale-105 dark:from-gray-800 dark:to-gray-900 lg:p-12"
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
                        className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md transition-colors duration-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div>
                          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            {question.question_text}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {question.question_id}
                          </span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 font-semibold text-white shadow-lg">
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
