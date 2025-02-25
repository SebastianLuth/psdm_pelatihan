"use client";
import { getAllEvaluationData } from "@/service/evaluasi3";
import { EvaluationDataLevel3, Pertanyaan3 } from "@/types/evaluasi3";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const DetailEvaluation3Component = () => {
  const [evaluationDataKolega, setEvaluationDataKolega] =
    useState<EvaluationDataLevel3 | null>(null);

  const [evaluationDataAtasan, setEvaluationDataAtasan] =
    useState<EvaluationDataLevel3 | null>(null);

  const [error, setError] = useState<boolean>(false);
  const training_id = useParams().training_id;
  const participan_id = useParams().participan_id;

  const fetchEvaluationData = useCallback(async () => {
    try {
      const result = await getAllEvaluationData(
        Number(training_id),
        Number(participan_id),
      );

      // Pastikan result.data bertipe array dari EvaluationDataLevel3[]
      const evaluationData: EvaluationDataLevel3[] = result;

      // Filter berdasarkan evaluator_category
      const kolegaEvaluations = evaluationData.filter(
        (item: EvaluationDataLevel3) => item.evaluator_category === "kolega"
      );

      const atasanEvaluations = evaluationData.filter(
        (item: EvaluationDataLevel3) => item.evaluator_category === "atasan"
      );

      setEvaluationDataKolega(kolegaEvaluations.length > 0 ? kolegaEvaluations[0] : null);
      setEvaluationDataAtasan(atasanEvaluations.length > 0 ? atasanEvaluations[0] : null);


    } catch (error) {
      setError(true);
    }
  }, [training_id, participan_id]);

  // Gunakan useMemo untuk menghindari perhitungan ulang setiap render
  const groupedQuestions = useMemo(() => {
    if (!evaluationDataKolega) return null;

    return evaluationDataKolega.pertanyaan.reduce(
      (acc: Record<string, Pertanyaan3[]>, item) => {
        if (!acc[item.question_category]) acc[item.question_category] = [];
        acc[item.question_category].push(item);
        return acc;
      },
      {}
    );
  }, [evaluationDataKolega]);

  useEffect(() => {
    fetchEvaluationData();
  }, [fetchEvaluationData]);
  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:py-8 lg:py-12">
      <div>
        {/* Header */}
      <header className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 bg-clip-text text-4xl font-extrabold tracking-wide text-transparent drop-shadow-lg">
          Detail Evaluation  {evaluationDataKolega?.name || "Loading..."}
        </h1>
        <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
          Pelatihan: {evaluationDataKolega?.pelatihan_title || "Loading..."}
        </p>
      </header>

      <p className="mt-5 text-left text-2xl font-medium text-gray-600 dark:text-gray-400">
          Dievaluasi Oleh{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
          {evaluationDataKolega?.evaluator_category || "Loading..."}
          </span>
        </p>

      {/* Kategori Pertanyaan */}
      <div className="mt-5 grid gap-10 lg:grid-cols-2">
        {groupedQuestions &&
          Object.entries(groupedQuestions).map(([category, questions]) => (
            <section
              key={category}
              className="relative rounded-3xl bg-gradient-to-r from-gray-50 to-gray-100 p-6 shadow-xl transition-transform duration-300 hover:scale-105 dark:from-gray-800 dark:to-gray-900 lg:p-10"
            >
              {/* Kategori Header */}
              <header className="mb-6">
                <h2 className="text-xl font-bold capitalize text-gray-800 dark:text-gray-200">
                  {category}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {questions.length} Pertanyaan
                </p>
              </header>

              {/* Pertanyaan */}
              <ul className="space-y-4">
                {questions.map((question) => (
                  <li
                    key={question.question_id}
                    className="flex items-center justify-between rounded-lg bg-white p-5 shadow-md transition-colors duration-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div>
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {question.question_text}
                      </p>
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
      
      <div className="mt-10">
        
        <p className="text-left text-2xl font-medium text-gray-600 dark:text-gray-400">
          Dievaluasi oleh {" "}
          <span className="font-semibold text-gray-900 dark:text-white">
          {evaluationDataAtasan?.evaluator_category || "Loading..."}
          </span>
        </p>
      {/* Kategori Pertanyaan */}
      <div className="mt-5 grid gap-10 lg:grid-cols-2">
        {groupedQuestions &&
          Object.entries(groupedQuestions).map(([category, questions]) => (
            <section
              key={category}
              className="relative rounded-3xl bg-gradient-to-r from-gray-50 to-gray-100 p-6 shadow-xl transition-transform duration-300 hover:scale-105 dark:from-gray-800 dark:to-gray-900 lg:p-10"
            >
              {/* Kategori Header */}
              <header className="mb-6">
                <h2 className="text-xl font-bold capitalize text-gray-800 dark:text-gray-200">
                  {category}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {questions.length} Pertanyaan
                </p>
              </header>

              {/* Pertanyaan */}
              <ul className="space-y-4">
                {questions.map((question) => (
                  <li
                    key={question.question_id}
                    className="flex items-center justify-between rounded-lg bg-white p-5 shadow-md transition-colors duration-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div>
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {question.question_text}
                      </p>
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
    </div>
  );
};

export default DetailEvaluation3Component;
