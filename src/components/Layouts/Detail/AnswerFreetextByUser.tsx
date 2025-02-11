"use client";
import { useAuth } from "@/context/AuthContext";
import { freetextData } from "@/types/freetext-type";
import { trainingData } from "@/types/training-types";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getTrainingById } from "@/service/training";
import { submitFreeTextEvaluation } from "@/service/free-text";
import FormSkeleton from "@/components/Skeleton/FormSkeleton";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";


const formatTanggal = (tgl_mulai: string , tgl_selesai: string) => {
  if (!tgl_mulai || !tgl_selesai) return "-"; 

  const mulai = format(new Date(tgl_mulai), "d MMMM yyyy", { locale: localeID });
  const selesai = format(new Date(tgl_selesai), "d MMMM yyyy", { locale: localeID });

  return mulai.split(" ")[1] === selesai.split(" ")[1]
    ? `${mulai.split(" ")[0]} - ${selesai}`
    : `${mulai} - ${selesai}`;
};

const FreeTextDetailComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userData = useAuth().userData;
  const [trainingData, setTrainingData] = useState<trainingData | null>(null);
  const [formData, setFormData] = useState<freetextData>({
    konseptualiasasi_pembelajaran : "",
    rencana_tindak_lanjut : "",
    narasumber : "",
  });
  const { id: pelatihanId } = useParams<{ id: string }>();

  const fetchTrainingById = useCallback(async () => {
    if (!pelatihanId) return;
    try {
      setIsLoading(true);
      const result = await getTrainingById(Number(pelatihanId))
      console.log("ini result", result)
      setTrainingData(result.data.training);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  },[pelatihanId])

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await submitFreeTextEvaluation(Number(pelatihanId), formData.konseptualiasasi_pembelajaran, formData.rencana_tindak_lanjut, formData.narasumber);
      Swal.fire("Berhasil", "Data berhasil disimpan!", "success");
      window.location.href = `/training/evaluation_freetext/`
    } catch (error) {
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan data.");
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsError(false);
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
  
  if (isLoading) return <><FormSkeleton/></>
  if (isError) return <>Maaf Sedang Ada Kendala Sistem</>
  return (
        <div className="m-10 mt-5 flex flex-col rounded-lg bg-white p-20 pt-10 shadow-lg dark:bg-black dark:bg-opacity-50 dark:text-white">
          <h2 className="p-2 text-2xl font-semibold text-blue-500">
            Feedback Peserta
          </h2>
          <p className="p-2 text-sm text-muted-foreground">Mohon Untuk Mengisi Form Dibawah ini</p>

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
                      value={trainingData?.lokasi ?? ""}
                      readOnly
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
                      value={formatTanggal(trainingData?.tgl_mulai ?? "", trainingData?.tgl_selesai ?? "")}
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-500 outline-none focus:border-blue-500 focus:ring-0"
                      readOnly
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
                      readOnly
                      type="text"
                      className="w-full border-b-2 border-gray-300 p-2 text-gray-500 outline-none focus:border-blue-500 focus:ring-0"
                      value={trainingData?.jumlah_peserta}
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
                      value={userData?.company_name ?? ""}
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
  );
};

export default FreeTextDetailComponent;
