"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type AnswerData = {
  id: number;
  niksap: string;
  nama_peserta: string;
  status: string;
  created_at: string;
  updated_at: string;
  corp_knowledge_id: number;
  field_learning_id: number;
  job_orientation_id: number;
  project_assignment_id: number;
  company_id: number;
  corp_knowledge: {
    id_ckl: number;
    ckl_bintalfisdis: string;
    ckl_holding: string;
    ckl_direksi: string;
    ckl_direktorat: string;
    ckl_direktorat2: string;
    ckl_direktorat3: string;
    ckl_direktorat4: string;
    ckl_direktorat5: string;
    ckl_direktorat6: string;
    ckl_direktorat7: string;
    ckl_kepemimpinan: string;
    ckl_bidang: string;
    ckl_studi_lapangan: string;
  };
  field_learning: {
    id_fl: number;
    minggu1: string;
    minggu2: string;
    minggu3: string;
    minggu4: string;
    presentasi: string;
    minggu5: string;
    minggu6: string;
    minggu7: string;
    minggu8: string;
    presentasi2: string;
  };
  job_orientation: {
    id_jo: number;
    url: string;
  };
  project_assignment: {
    id_pa: number;
    implementasi: string;
    ide: string;
  };
  company_name: string;
};

const parseHTML = (html: string) => {
  return { __html: html };
};

export const ReviewAnswerCKPComponent = () => {
  const [answerData, setAnswerData] = useState<AnswerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const fetchAllAnswer = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${baseUrl}/api/ckp/super-admin/${id}`,
      );
      setAnswerData(result.data.data);
    } catch (err) {
      console.error("Error fetching answer data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAllAnswer();
  }, [fetchAllAnswer]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded border border-red-400 bg-red-100 p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (!answerData) {
    return (
      <div className="rounded border border-yellow-400 bg-yellow-100 p-4 text-yellow-700">
        No data available
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Review Answer CKP</h1>
        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Participant Information
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{answerData.nama_peserta}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">NIK SAP</p>
              <p className="font-medium">{answerData.niksap}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-medium">{answerData.company_name}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Corporate Knowledge
        </h2>

        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Bintalfisdis</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_bintalfisdis,
              )}
            />
          </div>

           <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Holding</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_holding,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Direksi</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_direksi,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Direktorat 1</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_direktorat,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Direktorat 2</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_direktorat2,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Direktorat 3</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_direktorat3,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Direktorat 4</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_direktorat4,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Direktorat 5</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_direktorat5,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Direktorat 6</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_direktorat6,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Direktorat 7</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_direktorat7,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Kepemimpinan</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_kepemimpinan,
              )}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Bidang</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_bidang,
              )}
            />
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Studi Lapangan</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.corp_knowledge.ckl_studi_lapangan,
              )}
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Field Learning Siklus 1
        </h2>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((week) => {
            const weekContent =
              answerData.field_learning[
                `minggu${week}` as keyof typeof answerData.field_learning
              ];
            return (
              <div key={week} className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-3 text-lg font-semibold">Week {week}</h3>
                {typeof weekContent === "string" ? (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={parseHTML(weekContent)}
                  />
                ) : (
                  <p>No content available for week {week}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Presentasi Tahap 1</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.field_learning.presentasi,
              )}
            />
          </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Field Learning Siklus 2
        </h2>
        <div className="space-y-6">
          {[5, 6, 7, 8].map((week) => {
            const weekContent =
              answerData.field_learning[
                `minggu${week}` as keyof typeof answerData.field_learning
              ];
            return (
              <div key={week} className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-3 text-lg font-semibold">Week {week}</h3>
                {typeof weekContent === "string" ? (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={parseHTML(weekContent)}
                  />
                ) : (
                  <p>No content available for week {week}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Presentasi Tahap 2</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.field_learning.presentasi2,
              )}
            />
          </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Project Assignment
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Ide</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.project_assignment.ide,
              )}
            />
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">Implementasi</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={parseHTML(
                answerData.project_assignment.implementasi,
              )}
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Job Orientation
        </h2>
        <div className="rounded-lg bg-white p-6 shadow">
          <a
            href={answerData.job_orientation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Job Orientation Document
          </a>
        </div>
      </section>
    </div>
  );
};
