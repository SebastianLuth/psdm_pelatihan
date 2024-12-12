"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { QuestionType } from "@/types/question-type";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

const QuestionIdPage = () => {
  const { questionId } = useParams();
  const [detailQuestion, setDetailQuestion] = useState<QuestionType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getDetailQuestion = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/evaluation/question/${questionId}`,
      );
      setDetailQuestion(response.data.data);
    } catch (error) {
      setError("Gagal memuat data pertanyaan.");
      console.error(error);
    }
  }, [questionId]);

  useEffect(() => {
    getDetailQuestion();
  }, [getDetailQuestion]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await axios.put(
        `http://localhost:5000/api/evaluation/question/${questionId}`,
        {
          pertanyaan: inputValue,
        },
      );
      setSuccess(true);
    } catch (error) {
      setError("Gagal memperbarui pertanyaan.");
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Pertanyaan
              </label>
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={detailQuestion[0]?.pertanyaan}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              className="mt-7 inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Update
            </button>
          </form>
          {success && (
            <p className="mt-4 text-green-500">
              Pertanyaan berhasil diubah, silahkan cek di{" "}
              <Link href="/question" className="text-blue-500">
                {" "}
                daftar Pertanyaan
              </Link>
            </p>
          )}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionIdPage;
