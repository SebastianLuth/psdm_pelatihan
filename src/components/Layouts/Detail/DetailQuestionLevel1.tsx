"use client";
import {
  getDetailQuestionLevel1,
  updateQuestionLevel1,
} from "@/service/question";
import { QuestionType, QuestionTypeLevel1Form } from "@/types/question-type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

const DetailQuestionLevel1Component = () => {
  const { questionId } = useParams();
  const [detailQuestion, setDetailQuestion] = useState<QuestionType[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<QuestionTypeLevel1Form>({
    pertanyaan: "",
    kategori: "",
  });

  const getDetailQuestion = useCallback(async () => {
    try {
      const result = await getDetailQuestionLevel1(Number(questionId));
      setDetailQuestion(result);
    } catch (error) {
      setError("Gagal memuat data pertanyaan.");
    }
  }, [questionId]);


  useEffect(() => {
    getDetailQuestion();
  }, [getDetailQuestion]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await updateQuestionLevel1(Number(questionId), formData.pertanyaan, formData.kategori);
      setSuccess(true);
    } catch (error) {
      setError("Gagal memperbarui pertanyaan.");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
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
            <option value="mutu materi">Mutu Materi</option>
            <option value="kesan">Kesan Terhadap Narasumber</option>
            <option value="sarana">Sarana yang disediakan Pelatihan</option>
            <option value="review materi">Review Implementasi Program Pembelajaran</option>
            <option value="kesimpulan">Comment</option>
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
            Pertanyaan berhasil diupdate, silahkan cek di{" "}
            <Link href="/question" className="text-blue-500">
              {" "}
              daftar Pertanyaan
            </Link>
          </p>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default DetailQuestionLevel1Component;
