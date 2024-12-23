"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import ReactECharts from "echarts-for-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

type ParticipantType = {
  peserta_id: number;
  pelatihan_id: number;
  user_id: number;
  username: number;
  nama: string;
  nomor_hp: string;
  unit_kerja: number;
  jabatan: string;
  level: number;
  has_completed_evaluation: boolean | number;
};

type TrainingType = {
  id: number;
  judul: string;
  jenis: string;
  metode: string;
  lokasi: string;
  lembaga: string;
  kompetensi: string;
  jumlah_anggaran: string;
  rkap_type: string;
  jumlah_peserta: number;
  tgl_mulai: string;
  tgl_selesai: string;
  peserta: ParticipantType[];
};

type DetailCostType = {
  pelatihan_id: number;
  akomodasi: number;
  fasilitator_ex: number;
  perdiem: number;
  sekretariat: number;
  name: string;
  value: number;
};

type DetailCostTypeUpload = {
  akomodasi: number;
  fasilitator_ex: number;
  perdiem: number;
  sekretariat: number;
};

export default function TrainingDataId() {
  const [trainingData, setTrainingData] = useState<TrainingType>();
  const [detailTrainingCost, setDetailTrainingCost] = useState<
    DetailCostType[]
  >([]);
  const [modalUploadExcel, setModalUploadExcel] = useState(false);
  const [modalEditDetailCost, setModalEditDetailCost] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { trainingId } = useParams();

  const [updateDetailCost, setUpdateDetailCost] = useState<DetailCostType[]>();

  const fetchTrainingData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/training/${trainingId}`,
      );
      const { training, peserta } = response.data.data;
      setTrainingData({
        id: training?.id || 0,
        judul: training?.judul || "",
        jenis: training?.jenis || "",
        metode: training?.metode || "",
        lokasi: training?.lokasi || "",
        lembaga: training?.lembaga || "",
        kompetensi: training?.kompetensi || "",
        jumlah_anggaran: training?.jumlah_anggaran || "0",
        rkap_type: training?.rkap_type || "",
        jumlah_peserta: training?.jumlah_peserta || 0,
        tgl_mulai: training?.tgl_mulai || "",
        tgl_selesai: training?.tgl_selesai || "",
        peserta: peserta || [],
      });
    } catch (error) {
      console.error("Failed to fetch training data:", error);
    } finally {
      setLoading(false);
    }
  }, [trainingId]);

  const fetchDetailTrainingCost = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/training/${trainingId}/cost-details`,
      );
      console.log("ini detail cost response ", response.data.data);

      // Map the API response to a format suitable for chartOptions
      const mappedCostDetails = response.data.data
        .map((item: DetailCostType) => [
          { name: "Akomodasi", value: item.akomodasi },
          { name: "Fasilitator Eksternal", value: item.fasilitator_ex },
          { name: "Per Diem", value: item.perdiem },
          { name: "Sekretariat", value: item.sekretariat },
        ])
        .flat();
      setDetailTrainingCost(mappedCostDetails);
    } catch (error) {
      console.error("Error fetching training cost details:", error);
    }
  }, [trainingId]);

  const chartOptions = {
    title: {
      text: "Distribusi Biaya Pelatihan",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "0%",
    },
    series: [
      {
        name: "Biaya",
        type: "pie",
        radius: "50%",
        data: detailTrainingCost,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  useEffect(() => {
    fetchTrainingData();
  }, [fetchTrainingData]);

  useEffect(() => {
    fetchDetailTrainingCost();
  }, [fetchDetailTrainingCost]);

  if (!trainingData) {
    return <p>Loading...</p>;
  }

  const formatTanggalPelatihan = (startDate: string, endDate: string) => {
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const start = new Date(startDate);
    const end = new Date(endDate);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const monthName = bulan[start.getMonth()];
    const year = start.getFullYear();

    return `${startDay} - ${endDay} ${monthName} ${year}`;
  };

  const tanggalPelatihan = formatTanggalPelatihan(
    trainingData.tgl_mulai,
    trainingData.tgl_selesai,
  );

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadFile = async () => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }

      setLoading(true);
      const formData = new FormData();
      formData.append("detail_cost", file);

      const response = await axios.post(
        `http://localhost:5000/api/training/${trainingId}/cost-details`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setModalUploadExcel(false);
      fetchDetailTrainingCost();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    setUpdateDetailCost((prev) => {
      if (!prev) return prev;
      return prev.map((item, i) =>
        i === index ? { ...item, [name]: parseFloat(value) || 0 } : item,
      );
    });
  };

  const handleUpdateDetailCost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!updateDetailCost) {
        throw new Error("Data detail cost tidak tersedia.");
      }
      const payload: DetailCostTypeUpload = {
        akomodasi:
          updateDetailCost.find(
            (item) => item.name.toLowerCase() === "akomodasi",
          )?.value || 0,
        fasilitator_ex:
          updateDetailCost.find(
            (item) => item.name.toLowerCase() === "fasilitator eksternal",
          )?.value || 0,
        perdiem:
          updateDetailCost.find(
            (item) => item.name.toLowerCase() === "per diem",
          )?.value || 0,
        sekretariat:
          updateDetailCost.find(
            (item) => item.name.toLowerCase() === "sekretariat",
          )?.value || 0,
      };

      // Send the payload to the server
      await axios.put(
        `http://localhost:5000/api/training/${trainingId}/cost-details`,
        payload,
      );
      setModalEditDetailCost(false); // Tutup modal
      fetchDetailTrainingCost(); // Refresh data
    } catch (error) {
      console.error("Error updating detail cost:", error);
    }
  };

  const handleDeleteDetailCost = async() => {
    try {
      await axios.delete(`http://localhost:5000/api/training/${trainingId}/cost-details`);
      fetchDetailTrainingCost();
    } catch (error) {
      console.error("Error deleting detail cost:", error);
    }
  }

  const toggleModal = () => {
    setModalUploadExcel(!modalUploadExcel);
  };
  const toggleModalEdit = () => {
    if (!modalEditDetailCost) {
      setUpdateDetailCost(detailTrainingCost); // Copy data ke state untuk update
    }
    setModalEditDetailCost(!modalEditDetailCost);
  };

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="mx-auto space-y-8 p-6">
          <Breadcrumb pageName={trainingData.judul || ""}></Breadcrumb>
          {/* Section: Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Total Biaya</h3>
              <p className="text-2xl font-bold">
                Rp {trainingData?.jumlah_anggaran || 0}
              </p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Tanggal Pelatihan</h3>
              <p className="text-2xl font-bold">{tanggalPelatihan} </p>
              <p className="mt-2 text-sm">Lokasi : {trainingData?.lokasi}</p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Jenis & Metode</h3>
              <p className="text-2xl font-bold">
                Jenis : {trainingData?.jenis}
              </p>
              <p className="mt-2 text-sm">Metode: {trainingData?.metode}</p>
            </div>
          </div>

          {/* Section: Chart */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              Visualisasi Biaya Pelatihan
            </h3>
            <ReactECharts option={chartOptions} style={{ height: "400px" }} />
          </div>

          {/* Section: Detailed Info */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              Rincian Biaya Pelatihan
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {detailTrainingCost.length > 0 ? (
                detailTrainingCost.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-300 pb-2 dark:border-gray-700"
                  >
                    <p className="font-medium text-gray-800 dark:text-gray-300">
                      {item.name}
                    </p>
                    <p className="font-bold text-gray-800 dark:text-gray-100">
                      Rp {item.value.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Data tidak ditemukan.
                </p>
              )}
            </div>
          </div>

          {/* Section: Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={toggleModal}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Tambah Biaya
            </button>
            <button
              onClick={toggleModalEdit}
              className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            >
              Edit Biaya
            </button>
            <button onClick={()=> handleDeleteDetailCost()} className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              Hapus
            </button>
          </div>
        </div>

        {/* Modal For Upload */}
        {modalUploadExcel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="m-10 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upload Excel File</h2>
                <button
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && (
                  <div className="mt-4 text-sm text-gray-500">
                    <span>Selected file: </span>
                    <span className="font-semibold">{"ada"}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={toggleModal}
                  className="rounded-lg bg-gray-500 px-4 py-2 text-white"
                >
                  Close
                </button>
                <button
                  onClick={handleUploadFile}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {modalEditDetailCost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
              <h1 className="mb-4 text-2xl font-bold text-gray-800">
                Edit Training Cost Details
              </h1>
              <form className="space-y-4" onSubmit={handleUpdateDetailCost}>
                {(updateDetailCost?.length ?? 0) > 0 ? (
                  updateDetailCost?.map((item, index) => (
                    <div key={index}>
                      <label
                        htmlFor={`cost-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {item.name}
                      </label>
                      <input
                        type="number"
                        id={`cost-${index}`}
                        name="value"
                        value={item.value}
                        onChange={(e) => handleInputChange(e, index)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Data tidak ditemukan.</p>
                )}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={toggleModalEdit}
                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
          <h4 className="px-6 py-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            List Peserta Pelatihan Evaluasi Level 1
          </h4>
          <div className="overflow-x-auto">
            {/* Header Table */}
            <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">NIK SAP</th>
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Nomor Hp</th>
                  <th className="px-6 py-4">Unit Kerja</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {trainingData?.peserta.map((peserta, index) => (
                  <tr
                    key={peserta.peserta_id}
                    className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {peserta.username}
                    </td>
                    <td className="flex items-center px-6 py-4 align-middle text-gray-800 dark:text-gray-100">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                        <Image
                          width={112}
                          height={112}
                          src={"/images/user/user-01.png"}
                          alt="User"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-500">
                        {peserta.nama}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {peserta.nomor_hp}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {peserta.unit_kerja}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      <div className="relative grid select-none items-center whitespace-nowrap rounded-md bg-green-500/20 px-2 py-1 font-sans text-xs font-bold uppercase text-green-900">
                        <span className="">{peserta.has_completed_evaluation
                        ? "Telah Melakukan Evaluasi"
                        : "Belum Melakukan Evaluasi"}</span>
                      </div>
                    </td>
                    <td className="flex justify-end px-6 py-4">
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
                        <Link href={`/training/training_data/1`}>
                          {" "}
                          <span>Detail</span>
                        </Link>
                      </button>
                      <button className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}