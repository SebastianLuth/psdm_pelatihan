"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Building, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type PADataType = {
  id: 10;
  niksap: number | string;
  ide: string;
  implementasi: string;
  created_at: string;
  updated_at: string;
  peserta_ckp_id: number;
  company_id: number;
  nama_peserta: string;
  status: "aktif";
  corp_knowledge_id: number;
  field_learning_id: number;
  job_orientation_id: number;
  project_assignment_id: number;
};

const ProjectAssigmentPage = () => {
  const [paData, setPAData] = useState<PADataType[]>([]);
  const [error, setError] = useState<string | null>("");

  const { userData } = useAuth();

  const fetchDataPA = useCallback(async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/ckp/user/pa/${userData?.username}`,
        {
          withCredentials: true,
        },
      );
      setPAData(result.data.data);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data.");
    }
  }, [userData?.username]);

  useEffect(() => {
    fetchDataPA();
  }, [fetchDataPA]);

  return (
    <ProtectedRoute>
      <DefaultLayout>
        {paData.length > 0 ? (
          paData[0].status === "aktif" ? (
            <>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Project Assignment
                  </h4>
                  <Breadcrumb />
                </div>
                <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
                  Ini Halaman untuk menilai kemampuan karyawan pimpinan terhadap
                  field learning, Segera isi semua nya
                </p>
                {/* Next Content */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Lightbulb />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Ide Inovasi
                      </p>
                    </div>
                    {paData[0].ide === null ? (
                      <Link
                        href={"/plant/project-assignment/ide-inovasi"}
                        className="text-sm font-semibold text-blue-500"
                      >
                        Kerjakan
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-green-600">
                        Sudah di kerjakan
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Building />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Implementasi Inovasi
                      </p>
                    </div>
                    {
                      paData[0].implementasi === null ? (
                        <Link
                          href={"/plant/project-assignment/implementasi"}
                          className="text-sm font-semibold text-blue-500"
                        >
                          Kerjakan
                        </Link>
                      ) : (
                        <span className="text-sm font-semibold text-green-600">
                          Sudah di kerjakan
                        </span>
                      )
                    }
                    
                  </div>
                </div>
              </div>
            </>
          ) : paData[0].status === "selesai" ? (
            <>Anda Telah Selesai Melaksanakan Proses CKP Terimakasih</>
          ) : (
            <>Anda belum dapat mengakses halaman ini</>
          )
        ) : (
          <>Loading Data</>
        )}
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default ProjectAssigmentPage;
