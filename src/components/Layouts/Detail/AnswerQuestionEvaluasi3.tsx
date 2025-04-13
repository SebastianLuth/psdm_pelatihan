"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getQuestions3, submitAnswerEvaluation3 } from "@/service/evaluasi3";
import Swal from "sweetalert2";

export interface QuestionEvaluation3 {
  id: number;
  pertanyaan: string;
  kategori: string;
}


const AnswerQuestionEvaluasi3Component = () => {
  const router = useRouter();
  const trainingId = useParams().training_id;
  const userId = useParams().participan_id;

  const [questions, setQuestions] = useState<Record<string, QuestionEvaluation3[]>>({});
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getQuestions3(Number(trainingId));
      const groupedQuestions = result.reduce((acc: Record<string, QuestionEvaluation3[]>, question: QuestionEvaluation3) => {
        acc[question.kategori] = acc[question.kategori] || [];
        acc[question.kategori].push(question);
        return acc;
      }, {});

    setQuestions(groupedQuestions);
    setCurrentCategory(Object.keys(groupedQuestions)[0] || "");

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
      const result = await submitAnswerEvaluation3(
        Number(trainingId),
        Number(userId),
        answers,
      );
     if (result === true) {
        setAnswers({});
        Swal.fire({
          icon: "success",
          title: "Jawaban berhasil dikirim!",
          confirmButtonText: "Kembali kehalaman data evaluasi",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/training/evaluation_training2/");
          }
        });
      }
    } catch (error) {
      setError(true);
      Swal.fire({
        icon : "error",
        title : "Jawaban gagal dikirim!",
        confirmButtonText : "Kembali kehalaman data evaluasi dan kembali untuk menambahkan jawaban",
        confirmButtonColor : "#dc3545",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/training/evaluation_training2/");
        }
      });
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

  const currentQuestions = questions[currentCategory] || [];

  useEffect(() => {
    if (trainingId) fetchQuestions();
  }, [trainingId, fetchQuestions]);

  return (
    <div className="mx-auto max-w-4xl p-6">
    <h1 className="mb-6 text-2xl font-bold text-gray-800">
      {currentCategory === "pengetahuan"
        ? "Aspek Knowledge (Pengetahuan)" 
        : currentCategory === "kemampuan"
        ? "Aspek Skill (Kemampuan/Keahlian)"
        : currentCategory == "sikap"
        ? "Aspek Attitude (Sikap)"
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
          {currentCategory === "pengetahuan" ? (
            <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600"> Tidak Ada</span>
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
            <span className="text-sm text-gray-600">Sangat Banyak</span>
          </div>
          ) : currentCategory === "kemampuan" ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tidak Mampu/Terampil</span>
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
              <span className="text-sm text-gray-600">Sangat Mampu/Terampil</span>
            </div>
          ): (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rendah</span>
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
              <span className="text-sm text-gray-600">Sangat Tinggi</span>
            </div>
          )
         }
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handlePrevCategory}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          disabled={Object.keys(questions).indexOf(currentCategory) === 0}
        >
          Sebelumnya
        </button>
        <button
          type="button"
          onClick={handleNextCategory}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
        className="mt-4 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Kirim Jawaban
      </button>
    </form>
  </div>
  );
};

export default AnswerQuestionEvaluasi3Component;
