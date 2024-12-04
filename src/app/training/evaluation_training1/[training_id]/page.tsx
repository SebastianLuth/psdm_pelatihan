"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Question {
  id: number;
  pertanyaan: string;
}

const EvaluasiTraining1Page = () => {
  const { userData } = useAuth();
  const trainingId = useParams().training_id;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTrainingCompleted, setIsTrainingCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `http://localhost:5000/api/evaluation/start/${trainingId}`,
        {
          withCredentials: true,
        }
      );
      console.log(result.data.data);
      setQuestions(result.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

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
        }
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
  }, [trainingId]);

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div>
          <h2 className="text-xl font-bold">Evaluasi Pelatihan</h2>
          {loading && <p>Loading...</p>}
          {!loading && questions.length > 0 ? (
            <form onSubmit={(e) => e.preventDefault()}>
              {questions.map((question) => (
                <div key={question.id} className="my-4">
                  <p className="mb-2 font-medium">{question.pertanyaan}</p>
                  <input
                    type="text"
                    placeholder="Jawaban Anda"
                    value={answers[question.id] || ""}
                    onChange={(e) =>
                      handleInputChange(question.id, e.target.value)
                    }
                    className="w-full rounded border p-2"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                disabled={loading}
              >
                Kirim Jawaban
              </button>
            </form>
          ) : (
            <p>Tidak ada pertanyaan tersedia.</p>
          )}
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluasiTraining1Page;
