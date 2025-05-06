"use client";
import {
  getDetailQuestionLevel3,
  updateQuestionLevel3,
} from "@/service/question";
import { QuestionTypeLevel3Form } from "@/types/question-type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const EditQuestionLevel3DetailComponent = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [detailQuestion, setDetailQuestion] = useState<
    QuestionTypeLevel3Form[]
  >([]);
  const [formData, setFormData] = useState<QuestionTypeLevel3Form>({
    pertanyaan: "",
    kategori: "",
  });

  const questionId = useParams().questionId;

  const fetchDetailQuestion = useCallback(async () => {
    try {
      const response = await getDetailQuestionLevel3(Number(questionId));
      setDetailQuestion(response);
    } catch (error) {
      setError("Gagal memuat data pertanyaan.");
      console.error(error);
    }
  }, [questionId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await updateQuestionLevel3(
        Number(questionId),
        formData.pertanyaan,
        formData.kategori,
      );
      setSuccess(true);
    } catch (error) {
      setError("Gagal memperbarui pertanyaan.");
    }
  };

  useEffect(() => {
    fetchDetailQuestion();
  }, [fetchDetailQuestion]);
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <form className="mx-auto w-full bg-white p-10" onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Kategori
          </label>
          <select
            onChange={handleInputChange}
            name="kategori"
            value={formData.kategori}
            id="countries"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Pilih Kategori</option>
            <option value="pengetahuan">Pengetahuan</option>
            <option value="kemampuan">Kemampuan</option>
            <option value="sikap">Sikap</option>
          </select>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Pertanyaan
          </label>
          <input
            type="text"
            placeholder={detailQuestion[0]?.pertanyaan}
            name="pertanyaan"
            value={formData.pertanyaan}
            onChange={handleInputChange}
            className="mb-5 h-18 w-full rounded border border-gray-200 bg-white p-5 shadow-sm"
          ></input>

          <div className="flex flex-row items-center justify-end rounded-bl-lg rounded-br-lg border-t border-gray-200 bg-white p-5">
            <button className="rounded bg-blue-500 px-4 py-2 font-semibold text-white">
              Save
            </button>
          </div>
        </form>
        {success && (
          <p className="mt-4 text-green-500">
            Pertanyaan berhasil diubah, silahkan cek di{" "}
            <Link href="/question_level3" className="text-blue-500">
              {" "}
              daftar Pertanyaan
            </Link>
          </p>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default EditQuestionLevel3DetailComponent;
