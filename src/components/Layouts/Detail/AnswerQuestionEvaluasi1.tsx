"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getAllQuestionEvaluation1,
  submitAnswerEvaluation1,
} from "@/service/evaluation1";
import { QuestionEvaluation1 } from "@/types/evaluation1";

const EvaluasiTraining1Component = () => {
  const trainingId = useParams().training_id;
  const [questions, setQuestions] = useState<QuestionEvaluation1[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllQuestionEvaluation1(Number(trainingId));
      setQuestions(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [trainingId]);

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await submitAnswerEvaluation1(Number(trainingId), answers);
      if (result === true) {
        alert("Jawaban berhasil dikirim!");
        setAnswers({});
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trainingId) fetchQuestions();
  }, [trainingId, fetchQuestions]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Evaluasi Pelatihan
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((question) => (
          <div
            key={question.id}
            className="mb-6 rounded-lg border bg-white p-6 shadow"
          >
            <p className="mb-4 text-lg font-medium text-gray-800">
              {question.pertanyaan}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sangat Setuju</span>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label
                    key={value}
                    className="flex flex-col items-center text-gray-600"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={value}
                      className="peer hidden"
                      onChange={() =>
                        handleInputChange(question.id, value.toString())
                      }
                    />
                    <span className="h-8 w-8 rounded-full border border-gray-300 bg-gray-100 peer-checked:border-blue-500 peer-checked:bg-blue-500"></span>
                    <span className="mt-1 text-sm">{value}</span>
                  </label>
                ))}
              </div>
              <span className="text-sm text-gray-600">Sangat Tidak Setuju</span>
            </div>
          </div>
        ))}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Kirim Jawaban
        </button>
      </form>
    </div>
  );
};

export default EvaluasiTraining1Component;
