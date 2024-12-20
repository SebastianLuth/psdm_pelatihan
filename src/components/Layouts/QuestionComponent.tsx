"use client";
import {
  deleteQuestionLevel1,
  getQuestionLevel1,
  submitQuestionLevel1,
} from "@/service/question";
import { QuestionType } from "@/types/question-type";
import { useEffect, useState } from "react";
import CreateQuestionLevel1 from "../Modal/CreateQuestionLevel1";

const QuestionComponent = () => {
  const [questionData, setQuestionData] = useState<QuestionType[]>([]);
  const [pertanyaan, setPertanyaan] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleEdit = (id: number) => {
    window.location.href = `/question/${id}`;
    setOpenDropdownId(null);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteQuestionLevel1(id);
      fetchQuestion();
    } catch (error) {
      setError(true);
    } finally {
      setOpenDropdownId(null);
      setLoading(false);
    }
  };

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const result = await getQuestionLevel1();
      setQuestionData(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPertanyaan(e.target.value);
  };

  const submitQuestion = async () => {
    setLoading(true);
    try {
      await submitQuestionLevel1(pertanyaan);
      setOpen(false);
      fetchQuestion();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);
  useEffect(() => {}, [openDropdownId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mx-auto min-w-full max-w-6xl p-4 dark:border-gray-700 dark:bg-gray-900/70">
        <div className="mx-auto mb-4 block border-b border-slate-300 pb-2">
          <p className="block w-full px-4 py-2 text-center text-slate-700 transition-all dark:text-gray-100">
            Kumpulan Pertanyaan Pada <b>N4TALENT</b> Evaluasi 1.
          </p>
        </div>

        <div className="relative flex h-full w-full flex-col rounded-xl bg-white bg-clip-border text-slate-700 shadow-md">
          <div className="relative mx-4 mt-4 overflow-hidden rounded-none text-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 dark:text-gray-300">Show</span>
                <select className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="text-gray-700 dark:text-gray-300">
                  entries
                </span>
              </div>
              <div className="flex flex-grow items-center">
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="Search..."
                />
              </div>
              <button
                className="flex items-center gap-2 rounded bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:shadow-lg focus:opacity-85 focus:shadow-none active:opacity-85"
                type="button"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path d="M19.5 2.25H4.5A2.25 2.25 0 002.25 4.5v15A2.25 2.25 0 004.5 21.75h15a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25zm-6.75 14.25a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0v1.5zm1.5-5.25a3.001 3.001 0 01-3 3 .75.75 0 010-1.5 1.5 1.5 0 001.5-1.5c0-.414-.336-.75-.75-.75H12a.75.75 0 01-.75-.75v-.375a2.25 2.25 0 114.5 0 .75.75 0 01-1.5 0 0.75 0 00-1.5 0v.375a.75.75 0 00.75.75h.75c.828 0 1.5.672 1.5 1.5z" />
                </svg>
                Tambahkan Soal
              </button>
            </div>
          </div>

          <div className="overflow-y-auto p-4">
            <table className="mt-5 w-full min-w-max table-auto border-collapse text-left text-left text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <th className="cursor-pointer border-y border-slate-200 p-4 transition-colors hover:bg-indigo-600/70">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-white">
                      No
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 p-4 transition-colors hover:bg-indigo-600/70">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-white">
                      Pertanyaan
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 p-4 transition-colors hover:bg-indigo-600/70">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-white"></p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {questionData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="w-[10%] border-b border-slate-200 p-4">
                      <p className="font-base text-sm text-slate-700">
                        {index + 1}
                      </p>
                    </td>
                    <td className="border-b border-slate-200 p-4">
                      <p className="font-base text-sm text-slate-700">
                        {item.pertanyaan}
                      </p>
                    </td>
                    <td className="relative w-[10%] border-b border-slate-200 p-4 text-right">
                      {/* Button to toggle dropdown */}
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20"
                        type="button"
                        onClick={() => toggleDropdown(item.id)}
                      >
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                          </svg>
                        </span>
                      </button>

                      {/* Dropdown menu */}
                      {openDropdownId == item.id && (
                        <>
                          <div
                            className={`absolute ${
                              index === questionData.length - 1
                                ? "bottom-full mb-2"
                                : "mt-2"
                            } right-0 z-50 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                          >
                            <div className="py-1">
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(item.id);
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="z-0 flex items-center justify-between p-3">
            <p className="block text-sm text-slate-500">Page 1 of 10</p>
            <div className="flex gap-1">
              <button
                className="rounded border border-slate-300 px-3 py-2.5 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Previous
              </button>
              <button
                className="rounded border border-slate-300 px-3 py-2.5 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <CreateQuestionLevel1 setOpen={setOpen} handleInputChange={handleInputChange} submitQuestion={submitQuestion} />
      )}
    </>
  );
};

export default QuestionComponent;