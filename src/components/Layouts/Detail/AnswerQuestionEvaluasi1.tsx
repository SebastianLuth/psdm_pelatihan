"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Question {
  id: number;
  pertanyaan: string;
}

const EvaluasiTraining1Component = () => {
  const trainingId = useParams().training_id;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `http://localhost:5000/api/evaluation/start/${trainingId}`,
        {
          withCredentials: true,
        },
      );
      console.log(result.data.data);
      setQuestions(result.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
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
      const answerArray = Object.entries(answers).map(([id, jawaban]) => ({
        pertanyaan_id: Number(id),
        jawaban,
      }));
      await axios.post(
        `http://localhost:5000/api/evaluation/submit/${trainingId}`,
        { answers: answerArray },
        {
          withCredentials: true,
        },
      );
      alert("Jawaban berhasil dikirim!");
      setAnswers({});
    } catch (error) {
      console.error("Error submitting answers:", error);
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
