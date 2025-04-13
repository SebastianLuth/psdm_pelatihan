"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getAllQuestionEvaluation1,
  submitAnswerEvaluation1,
} from "@/service/evaluation1";
import { QuestionEvaluation1 } from "@/types/evaluation1";
import Swal from "sweetalert2";

const AnswerEvaluasiTraining1Component = () => {
  const router = useRouter();
  const trainingId = useParams().training_id;
  const [questions, setQuestions] = useState<Record<string, QuestionEvaluation1[]>>({});
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllQuestionEvaluation1(Number(trainingId));
      const groupedQuestions = result.reduce((acc: Record<string, QuestionEvaluation1[]>, question: QuestionEvaluation1) => {
        acc[question.kategori] = acc[question.kategori] || [];
        acc[question.kategori].push(question);
        return acc;
      }, {});

      const sortedCategories = Object.keys(groupedQuestions).filter(
        (category) => category !== "review materi" && category !== "kesimpulan"
      );

      if (groupedQuestions["review materi"]) {
        sortedCategories.push("review materi");
      }
      if (groupedQuestions["kesimpulan"]) {
        sortedCategories.push("kesimpulan");
      }

      const sortedQuestions = sortedCategories.reduce(
        (acc: Record<string, QuestionEvaluation1[]>, category: string) => {
          acc[category] = groupedQuestions[category];
          return acc;
        },
        {}
      );

      setQuestions(sortedQuestions);
      setCurrentCategory(sortedCategories[0] || "");
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
        setAnswers({});
        Swal.fire({
          icon: "success",
          title: "Jawaban berhasil dikirim!",
          confirmButtonText: "Kembali kehalaman data evaluasi",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/training/evaluation_training1/");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Jawaban gagal dikirim!",
        confirmButtonText: "Kembali kehalaman data evaluasi",
        confirmButtonColor: "#dc3545",
      })
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNextCategory = () => {
    const categories = Object.keys(questions);
    const currentIndex = categories.indexOf(currentCategory);
    if (currentIndex < categories.length - 1) {
      setCurrentCategory(categories[currentIndex + 1]);
    }
  };

  const handlePrevCategory = () => {
    const categories = Object.keys(questions);
    const currentIndex = categories.indexOf(currentCategory);
    if (currentIndex > 0) {
      setCurrentCategory(categories[currentIndex - 1]);
    }
  };

  useEffect(() => {
    if (trainingId) fetchQuestions();
  }, [trainingId, fetchQuestions]);

  const currentQuestions = questions[currentCategory] || [];

  return (
    <>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          {currentCategory === "mutu materi"
            ? "Apakah Pendapat Anda mengenai Mutu isi Materi Pelatihan yang diberikan:" 
            : currentCategory === "kesan"
            ? "Apa Kesan Anda terhadap Narasumber/Fasilitator:"
            : currentCategory == "sarana"
            ? "Apa Pendapat Anda tentang Sarana Pelatihan:"
            : currentCategory == "review materi"
            ? "Reviu Implementasi Program Pembelajaran:"
            : currentCategory == "kesimpulan"
            ? "Kesimpulan:"
            : ""
          }
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {currentQuestions.map((question) => (
            <div
              key={question.id}
              className="mb-6 rounded-lg border bg-white p-6 shadow"
            >
              <p className="mb-4 text-lg font-medium text-gray-800">
                {question.pertanyaan}
              </p>
              {currentCategory === "review materi" ? (
                <div className="flex space-x-4">
                  {["Ya", "Tidak"].map((value) => (
                    <label
                      key={value}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={value}
                        className="peer hidden"
                        checked={answers[question.id] === value}
                        onChange={() => handleInputChange(question.id, value)}
                      />
                      <span className="h-8 w-8 rounded-full border border-gray-300 bg-gray-100 peer-checked:border-blue-500 peer-checked:bg-blue-500"></span>
                      <span className="text-sm">{value}</span>
                    </label>
                  ))}
                </div>
              ) : currentCategory === "mutu materi" || currentCategory === "sarana" || currentCategory === "kesan" ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sangat Tidak Memuaskan</span>
                  <div className="flex space-x-4">
                    {["1", "2", "3", "4"].map((value) => (
                      <label
                        key={value}
                        className="flex flex-col items-center text-gray-600"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={value}
                          className="peer hidden"
                          checked={answers[question.id] === value}
                          onChange={() =>
                            handleInputChange(question.id, value.toString())
                          }
                        />
                        <span className="h-8 w-8 rounded-full border border-gray-300 bg-gray-100 peer-checked:border-blue-500 peer-checked:bg-blue-500"></span>
                        <span className="mt-1 text-sm">{value}</span>
                      </label>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Sangat Memuaskan</span>
                </div>
              ) : (
                <textarea
                  className="w-full rounded border border-gray-300 p-2 resize-none"
                  rows={4}
                  placeholder="Tulis kesimpulan Anda..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                ></textarea>
              )}
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrevCategory}
              className={`rounded px-4 py-2 text-white transition
                ${Object.keys(questions).indexOf(currentCategory) === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
              disabled={Object.keys(questions).indexOf(currentCategory) === 0}
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={handleNextCategory}
              className={`rounded px-4 py-2 text-white transition ${
                Object.keys(questions).indexOf(currentCategory) ===
                Object.keys(questions).length - 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={
                Object.keys(questions).indexOf(currentCategory) ===
                Object.keys(questions).length - 1
              }
            >
              Selanjutnya
            </button>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`mt-4 w-full rounded px-4 py-2 text-white transition ${
              Object.keys(questions).indexOf(currentCategory) ===
              Object.keys(questions).length - 1
                ? "bg-green-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={
              Object.keys(questions).indexOf(currentCategory) !==
              Object.keys(questions).length - 1
            }
          >
            Kirim Jawaban
          </button>
        </form>
      </div>
    </>

  );
};

export default AnswerEvaluasiTraining1Component;
