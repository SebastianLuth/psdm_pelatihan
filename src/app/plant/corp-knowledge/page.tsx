"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import {
  BookmarkCheck,
  Building,
  Dumbbell,
  FoldersIcon,
  Gavel,
  MapPinCheck,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type CKLData = {
  id: number;
  niksap: string;
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

const CORPKnowledgePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [cklData, setCklData] = useState<CKLData[]>([]);

  const { userData } = useAuth();

  const fetchDataCKL = useCallback(async () => {
    try {
      const result = await axios.get(
        `
        http://localhost:8080/api/ckp/user/ckl/${userData?.username}
        `, {
          withCredentials: true
        },
      );
      setCklData(result.data.data);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data.");
    }
  }, [userData?.username]);

  useEffect(() => {
    fetchDataCKL();
  }, [fetchDataCKL]);

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <>
          {cklData.length > 0 ? (
            cklData[0].status === "aktif" ? (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      Corporate Knowledge Learnning
                    </h4>
                    <Breadcrumb />
                  </div>
                  <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
                    Ini Halaman untuk menilai kemampuan karyawan pimpinan,
                    Segera isi semua nya
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Dumbbell />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Corporate Knowledge Learning Bintalfisdis
                      </p>
                    </div>
                    {cklData[0].ckl_bintalfisdis === null ? (
                      <Link
                        href={"/plant/corp-knowledge/bintalfisdis"}
                        className="text-sm font-semibold text-blue-500"
                      >
                        Kerjakan
                      </Link>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-green-600">
                          Anda Telah Mengerjakannya
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Building />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Corporate Knowledge Learnning Holding
                      </p>
                    </div>
                    {cklData[0].ckl_holding === null ? (
                      <Link
                        href={"/plant/corp-knowledge/holding"}
                        className="text-sm font-semibold text-blue-500"
                      >
                        Kerjakan
                      </Link>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-green-600">
                          Anda Telah Mengerjakannya
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Gavel />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Corporate Knoledge Learnning Direksi
                      </p>
                    </div>
                    {cklData[0].ckl_direksi === null ? (
                      <Link
                        href={"/plant/corp-knowledge/direksi"}
                        className="text-sm font-semibold text-blue-500"
                      >
                        Kerjakan
                      </Link>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-green-600">
                          Anda Telah Mengerjakannya
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <FoldersIcon />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Corporate Knowledge Learning Direktorat
                      </p>
                    </div>
                    {cklData[0].ckl_direktorat === null ? (
                      <Link
                        href={"/plant/corp-knowledge/direktorat"}
                        className="text-sm font-semibold text-blue-500"
                      >
                        Kerjakan
                      </Link>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-green-600">
                          Anda Telah Mengerjakannya
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <UserCheck />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Corporate Knowledge Learnning Kepemimpinan
                      </p>
                    </div>
                    {
                      cklData[0].ckl_kepemimpinan === null ? (
                        <Link
                          href={"/plant/corp-knowledge/kepemimpinan"}
                          className="text-sm font-semibold text-blue-500"
                        >
                          Kerjakan
                        </Link>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-green-600">
                            Anda Telah Mengerjakannya
                          </span>
                        </>
                      )
                    }
                    
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <BookmarkCheck />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Corporate Knowledge Learning Bidang Tugas
                      </p>
                    </div>
                    {
                      cklData[0].ckl_bidang === null ? (
                        <Link
                          href={"/plant/corp-knowledge/bidang"}
                          className="text-sm font-semibold text-blue-500"
                        >
                          Kerjakan
                        </Link>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-green-600">
                            Anda Telah Mengerjakannya
                          </span>
                        </>
                      )
                    }
                    
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <MapPinCheck />
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        Corporate Knowledge Learning Studi Lapangan
                      </p>
                    </div>
                    {
                      cklData[0].ckl_studi_lapangan === null ? (
                        <Link
                          href={"/plant/corp-knowledge/studi-lapangan"}
                          className="text-sm font-semibold text-blue-500"
                        >
                          Kerjakan
                        </Link>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-green-600">
                            Anda Telah Mengerjakannya
                          </span>
                        </>
                      )
                    }
                  </div>
                </div>
              </>
            ) : cklData[0].status === "selesai" ? (
              <>Anda Telah Selesai Melaksanakan Proses CKP Terimakasih</>
            ) : (
              <>Anda belum dapat mengakses halaman ini</>
            )
          ) : (
            <>Loading Data</>
          )}
        </>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default CORPKnowledgePage;
