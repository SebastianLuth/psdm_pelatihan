'use client';
import { useAuth } from "@/context/AuthContext";
import { getDetailAllEvaluatorAndUserEvaluastion3 } from "@/service/evaluasi3";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface DetailUsersEvaluation3Status {
    training_id: number,
    training_title: string,
    rkap_training_type: string,
    start_date: string,
    end_date: string,
    evaluator_id: number,
    evaluator_name: string,
    evaluator_jabatan: string,
    evaluator_unit_kerja: string,
    user_id: number,
    user_name: string,
    user_unit_kerja: string
    evaluator_category: string
    is_completed: boolean
}


const DetailUsersEvaluation3Status = () => {
    const { userData } = useAuth();

      const [evaluasi3, setEvaluasi3] = useState<DetailUsersEvaluation3Status[]>(
        [],
      );
      const [loadng, setLoading] = useState(false);
      const [error, setError] = useState(false);

      const pelatihanId = useParams().training_id;

    const fetchDetailAllEvaluatorAndUserEvaluastion3 = useCallback (async () => {
        try {
          const result = await getDetailAllEvaluatorAndUserEvaluastion3(Number(pelatihanId));
          setEvaluasi3(result);
        } catch (error) {
          setError(true);
        }
      }, [pelatihanId]);

       useEffect(() => {
          if (userData?.role === "admin" || userData?.role === "super admin") fetchDetailAllEvaluatorAndUserEvaluastion3();
        }, [fetchDetailAllEvaluatorAndUserEvaluastion3, userData?.role]);

        return (
            <>
              <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                  Evaluasi Pelatihan lv 1
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Halaman ini untuk melihat Semua Evaluasi Pelatihan lv 1.
                </p>
          
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
                    <thead>
                      <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                        <th className="px-6 py-4">No</th>
                        <th className="px-6 py-4">Judul Pelatihan</th>
                        <th className="px-6 py-4">Nama Evaluator</th>
                        <th className="px-6 py-4">Jabatan Evaluator</th>
                        <th className="px-6 py-4">Nama Participant</th>
                        <th className="px-6 py-4">Unit Keja Participant</th>
                        <th className="px-6 py-4">Tanggal Acara</th>
                        <th className="px-6 py-4">Kategory Evaluator</th>
                        <th className="px-6 py-4">Status Evaluasi</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evaluasi3.length === 0 ? (
                        <tr>
                          <td colSpan={12} className="text-center py-4">
                            Tidak ada data
                          </td>
                        </tr>
                      ) : (
                        evaluasi3.map((training, key) => (
                          <tr
                            key={training.user_id}
                            className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <td className="px-6 py-4">{key + 1}</td>
                            <td className="px-6 py-4">{training.training_title}</td>
                            <td className="px-6 py-4">{training.evaluator_name}</td>
                            <td className="px-6 py-4">{training.evaluator_unit_kerja}</td>
                            <td className="px-6 py-4">{training.user_name}</td>
                            <td className="px-6 py-4">{training.evaluator_unit_kerja}</td>
                            <td className="px-6 py-4">
                              {training.start_date} - {training.end_date}
                            </td>
                            <td className="px-6 py-4">{training.evaluator_category}</td>
                            <td className="px-6 py-4">
                              {training.is_completed ? "Selesai" : "Belum Selesai"}
                            </td>
                            <td className="px-6 py-4">
                              <button className="mr-2 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 5h2m-1 14V5m9 4H4m5 0a1 1 0 000 2h6a1 1 0 000-2H9z"
                                  />
                                </svg>
                                <Link
                                  key={training.training_id}
                                  href={`/training/evaluation_training2/${training.training_id}/${training.user_id}/details`}
                                >
                                  <span>Detail</span>
                                </Link>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          );
          
};

export default DetailUsersEvaluation3Status;