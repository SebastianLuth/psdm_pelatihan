'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type flDataType = {
  id: number;
  niksap: string | number;
  minggu1: string;
  minggu2: string;
  minggu3: string;
  minggu4: string;
  minggu5: string;
  minggu6: string;
  minggu7: string;
  minggu8: string;
  presentasi: string;
  presentasi2: string;
  created_at: string;
  updated_at: string;
  peserta_ckp_id: number;
  company_id: number;
  nama_peserta: string;
  status: string;
  corp_knowledge_id: number;
  field_learning_id: number;
  job_orientation_id: number;
  project_assignment_id: number;
};

type WeekItem = {
  name: string;
  url: string;
  dataField: keyof flDataType;
};

type CycleItem = {
  id: number;
  name: string;
  weeks: WeekItem[];
};

const FieldLearningPage = () => {
  const [flData, setFLData] = useState<flDataType[]>([]);
  const [activeCycle, setActiveCycle] = useState<number | null>(null);
  const [error, setError] = useState<string | null>("");

  const router = useRouter();
  const { userData } = useAuth();

  const fetchDataFL = useCallback(async () => {
    try {
      const result = await axios.get(
        `${baseUrl}/api/ckp/user/fl/${userData?.username}`,
        {
          withCredentials: true,
        },
      );
      setFLData(result.data.data);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data.");
    }
  }, [userData?.username]);

  const toggleCycle = (cycleNumber: number) => {
    setActiveCycle(activeCycle === cycleNumber ? null : cycleNumber);
  };

  const cycles: CycleItem[] = [
    {
      id: 1,
      name: "FL Siklus 1",
      weeks: [
        {
          name: "Minggu 1",
          url: "/plant/field-learning/siklus1/week1",
          dataField: "minggu1",
        },
        {
          name: "Minggu 2",
          url: "/plant/field-learning/siklus1/week2",
          dataField: "minggu2",
        },
        {
          name: "Minggu 3",
          url: "/plant/field-learning/siklus1/week3",
          dataField: "minggu3",
        },
        {
          name: "Minggu 4",
          url: "/plant/field-learning/siklus1/week4",
          dataField: "minggu4",
        },
        {
          name: "Presentasi",
          url: "/plant/field-learning/siklus1/presentation",
          dataField: "presentasi",
        },
      ],
    },
    {
      id: 2,
      name: "FL Siklus 2",
      weeks: [
        {
          name: "Minggu 1",
          url: "/plant/field-learning/siklus2/week1",
          dataField: "minggu5",
        },
        {
          name: "Minggu 2",
          url: "/plant/field-learning/siklus2/week2",
          dataField: "minggu6",
        },
        {
          name: "Minggu 3",
          url: "/plant/field-learning/siklus2/week3",
          dataField: "minggu7",
        },
        {
          name: "Minggu 4",
          url: "/plant/field-learning/siklus2/week4",
          dataField: "minggu8",
        },
        {
          name: "Presentasi",
          url: "/plant/field-learning/siklus2/presentation",
          dataField: "presentasi2",
        },
      ],
    },
  ];

  const handleFlLinkClick = (url: string) => {
    router.push(url);
  };

  const isWeekFilled = (dataField: keyof flDataType): boolean => {
    if (flData.length === 0) return false;
    const fieldValue = flData[0][dataField];
    return typeof fieldValue === 'string' && fieldValue.trim() !== "";
  };

  useEffect(() => {
    fetchDataFL();
  }, [fetchDataFL]);

  return (
    <ProtectedRoute>
      <DefaultLayout>
      {flData.length > 0 ? (
        flData[0].status === "aktif" ? (
          <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Field Learning
            </h4>
            <Breadcrumb />
          </div>
          <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
            Ini Halaman untuk menilai kemampuan karyawan pimpinan terhadap field learning, Segera isi
            semua nya
          </p>

          {/* Field Learning Menu */}
          <div className="space-y-4 p-4">
            {cycles.map((cycle) => (
              <div
                key={cycle.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
              >
                <button
                  onClick={() => toggleCycle(cycle.id)}
                  className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                >
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {cycle.name}
                  </h3>
                  {activeCycle === cycle.id ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>

                {/* Dropdown Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeCycle === cycle.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gray-200 p-5 dark:border-gray-700">
                    <ul className="space-y-3">
                      {cycle.weeks.map((week, index) => {
                        const isDisabled = isWeekFilled(week.dataField);
                        return (
                          <li key={index}>
                            <button
                              onClick={() => !isDisabled && handleFlLinkClick(week.url)}
                              disabled={isDisabled}
                              className={`w-full flex items-center rounded-lg p-3 transition-colors ${
                                index === cycle.weeks.length - 1
                                  ? "bg-green-50 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50"
                                  : "bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
                              } ${
                                isDisabled ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            >
                              <span
                                className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                                  index === cycle.weeks.length - 1
                                    ? "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-200"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200"
                                }`}
                              >
                                {index + 1}
                              </span>
                              <span className="font-medium">{week.name}</span>
                              {isDisabled && (
                                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                                  Sudah diisi
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        ) : flData[0].status === "selesai" ? (
          <>Anda Telah Menyelesaikan Field Learning Anda</>
        ) : (
          <>
          Anda Belum dapat Mengakses Halaman Ini
          </>
        )
      ) : (
            <>Loading Data</>
          
      )}
        
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default FieldLearningPage;