"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { use, useCallback, useEffect, useState } from "react";

interface trainingData {
  id: string;
  jam_pelajaran : number;
  rkap_type : string;
  judul : string;
  jumlah_anggaran : number;
  jumlah_peserta : number;
  kompetensi : string;
  lembaga : string;
  lokasi : string;
  metode : string;
  jenis : string;
  tgl_mulai : string;
  tgl_selesai : string;
}

interface freetextData {
  konseptualiasasi_pembelajaran : string;
  rencana_tindak_lanjut : string;
  narasumber : string;
}

const FreeTextDetailPage: React.FC = () => {
  const userId = useAuth()?.userData?.id;
  const [trainingData, setTrainingData] = useState<trainingData | null>(null);
  const [formData, setFormData] = useState<freetextData>({
    konseptualiasasi_pembelajaran : "",
    rencana_tindak_lanjut : "",
    narasumber : "",
  });
  const pelatihanId = useParams().id
  const fetchTrainingById = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/training/${pelatihanId}`)
      const data = result.data.data.training
      setTrainingData(data)
    } catch (error) {
      console.error("Error fetching training data:", error);
    }
  },[pelatihanId])

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await axios.post(`http://localhost:5000/api/evaluation/freetext/start/${pelatihanId}`, {
        konseptualiasasi_pembelajaran : formData.konseptualiasasi_pembelajaran,
        rencana_tindak_lanjut : formData.rencana_tindak_lanjut,
        narasumber : formData.narasumber,
      }, {
        withCredentials: true
      })
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchTrainingById()
  }, [fetchTrainingById, pelatihanId])
  
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="m-10 mt-5 flex flex-col rounded-lg bg-white p-20 pt-10 shadow-lg dark:bg-black dark:bg-opacity-50 dark:text-white">
          <h2 className="p-2 text-2xl font-semibold text-blue-500">
            FREE TEXT
          </h2>

          <form onSubmit={handleSubmit}>
          {/* started */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr>
                  <td className="w-1/4 p-2 text-left">
                    <label className="mb-2">Tempat Pelatihan</label>
                  </td>
                  <td className="p-2">:</td>
                  <td className="w-3/4 p-2">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-500 outline-none focus:border-blue-500 focus:ring-0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 p-2 text-left">
                    <label className="mb-2">Jadwal Pelatihan</label>
                  </td>
                  <td className="p-2">:</td>
                  <td className="w-3/4 p-2">
                    <input

                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-500 outline-none focus:border-blue-500 focus:ring-0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 p-2 text-left">
                    <label className="mb-2">Total Peserta</label>
                  </td>
                  <td className="p-2">:</td>
                  <td className="w-3/4 p-2">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-500 outline-none focus:border-blue-500 focus:ring-0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 p-2 text-left">
                    <label className="mb-2">Asal Institusi Peserta</label>
                  </td>
                  <td className="p-2">:</td>
                  <td className="w-3/4 p-2">
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-500 outline-none focus:border-blue-500 focus:ring-0"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-1/4 p-2 text-left">
                    <label className="mb-2">Nama Narasumber</label>
                  </td>
                  <td className="p-2">:</td>
                  <td className="w-3/4 p-2">
                    <input
                      name = "narasumber"
                      type="text"
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-500 outline-none focus:border-blue-500 focus:ring-0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Textarea */}
          <div className="mt-10">
            <h4 className="ml-2">Konseptualisasi Pembelajaran: </h4>
            <div className="  w-full rounded-lg border-2 border-gray-300 p-4 focus-within:border-blue-500 focus-within:shadow-lg">
              <div>
                <label className="w-full border-none text-lg text-sm font-medium outline-none">
                Tuliskan apa saja yang telah Anda pelajari dan pahami setelah mengikuti kegiatan pelatihan ini?
                </label>
              </div>
              <div>
                <textarea
                  name = "konseptualiasasi_pembelajaran"
                  placeholder="Write a description..."
                  onChange={handleInputChange}
                  className="mt-2 w-full resize-none overflow-y-auto border-none text-gray-500 outline-none"
                  rows={4}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="mt-10">
          <h4 className="ml-2">Rencana Tindak Lanjut: </h4>
          <div className="w-full rounded-lg border-2 border-gray-300 p-4 focus-within:border-blue-500 focus-within:shadow-lg">
              <div>
                <label className="w-full border-none text-lg text-sm font-medium outline-none">
                Tuliskan rencana jangka panjang yang bisa anda lakukan dan terapkan kedalam pekerjaan harian setelah mengikuti kegiatan pelatihan ini
                </label>
              </div>
              <div>
                <textarea
                  name="rencana_tindak_lanjut"
                  placeholder="Write a description..."
                  onChange={handleInputChange}
                  className="mt-2 w-full resize-none overflow-y-auto border-none text-gray-500 outline-none"
                  rows={4}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
              Submit
            </button>
          </div>

          </form>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default FreeTextDetailPage;
