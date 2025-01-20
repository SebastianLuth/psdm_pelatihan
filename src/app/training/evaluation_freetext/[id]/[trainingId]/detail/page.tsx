'use client';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaCalendarAlt, FaChalkboardTeacher, FaUser, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
interface FreeTextEvaluationForAdmin {
  pelatihan_id: number;
  judul_pelatihan: string;
  metode_pelatihan: string;
  lembaga_pelatihan: string;
  lokasi_pelatihan: string;
  anggaran_pelatihan: string | undefined;
  kompetensi_pelatihan: string;
  rkap_type_pelatihan: string;
  jenis_pelatihan: string;
  tgl_mulai_pelatihan: string;
  tgl_selesai_pelatihan: string;
  jam_pelajaran_pelatihan: number;
  user_id: number;
  niksap_peserta: number;
  nama_peserta: string;
  unit_kerja_peserta  : string;
  jabatan_peserta: string;
  level_peserta: number;
  konseptualiasasi_pembelajaran: string;
  rencana_tindak_lanjut: string;
  narasumber: string;
}
const DetailFreeTextFromUserPage = () => {
  const [detailDataFreeTextUser, setDetailDataFreeTextUser] = useState<FreeTextEvaluationForAdmin | null>(null);

  const user_id = useParams().id;
  const training_id = useParams().trainingId;

  const fetchDetailDataFreeTextUser = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/evaluation/freetext/${user_id}/${training_id}`,{
        withCredentials: true
      });
      const data = result.data.data[0] || {};
      setDetailDataFreeTextUser(data);
    } catch (error) {
      console.error("Error fetching detail data free text user:", error);
    }
  },[user_id,training_id])

  useEffect(() => {
    fetchDetailDataFreeTextUser();
  }, [fetchDetailDataFreeTextUser, user_id, training_id]);
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <div className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-2xl">
          <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-12">Detail Pelatihan</h1>

          {/* Informasi Pelatihan */}
          <section className="mb-12">
            <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
                <FaChalkboardTeacher className="mr-3 text-blue-500" /> Informasi Pelatihan
              </h2>
              <div className="grid grid-cols-2 gap-6 text-gray-600">
                <p><span className="font-bold">Judul Pelatihan:</span> {detailDataFreeTextUser?.judul_pelatihan}</p>
                <p><span className="font-bold">Metode:</span> {detailDataFreeTextUser?.metode_pelatihan}</p>
                <p><span className="font-bold">Lembaga:</span> {detailDataFreeTextUser?.lembaga_pelatihan}</p>
                <p><span className="font-bold">Lokasi:</span> {detailDataFreeTextUser?.lokasi_pelatihan}</p>
                <p><span className="font-bold">Anggaran:</span> Rp {detailDataFreeTextUser?.anggaran_pelatihan
    ? parseInt(detailDataFreeTextUser.anggaran_pelatihan).toLocaleString()
    : "0"}</p>
                <p><span className="font-bold">Kompetensi:</span> {detailDataFreeTextUser?.kompetensi_pelatihan}</p>
                <p><span className="font-bold">Jenis:</span> {detailDataFreeTextUser?.jenis_pelatihan}</p>
                <p><span className="font-bold">RKAP Type:</span> {detailDataFreeTextUser?.rkap_type_pelatihan}</p>
                <p><span className="font-bold">Tanggal Mulai:</span> {new Date(detailDataFreeTextUser?.tgl_mulai_pelatihan ? detailDataFreeTextUser.tgl_mulai_pelatihan : "").toLocaleDateString()}</p>
                <p><span className="font-bold">Tanggal Selesai:</span> {new Date(detailDataFreeTextUser?.tgl_selesai_pelatihan ? detailDataFreeTextUser.tgl_selesai_pelatihan : "").toLocaleDateString()}</p>
                <p><span className="font-bold">Durasi:</span> {detailDataFreeTextUser?.jam_pelajaran_pelatihan} jam</p>
              </div>
            </div>
          </section>

          {/* Informasi Peserta */}
          <section className="mb-12">
            <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
                <FaUser className="mr-3 text-green-500" /> Informasi Peserta
              </h2>
              <div className="grid grid-cols-2 gap-6 text-gray-600">
                <p><span className="font-bold">NIKSAP:</span> {detailDataFreeTextUser?.niksap_peserta}</p>
                <p><span className="font-bold">Nama:</span> {detailDataFreeTextUser?.nama_peserta}</p>
                <p><span className="font-bold">Unit Kerja:</span> {detailDataFreeTextUser?.unit_kerja_peserta}</p>
                <p><span className="font-bold">Jabatan:</span> {detailDataFreeTextUser?.jabatan_peserta}</p>
                <p><span className="font-bold">Level:</span> {detailDataFreeTextUser?.level_peserta}</p>
              </div>
            </div>
          </section>

          {/* Feedback Peserta */}
          <section>
            <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
                <FaCalendarAlt className="mr-3 text-purple-500" /> Feedback Peserta
              </h2>
              <div className="space-y-6 text-gray-600">
                <div>
                  <h3 className="font-bold">Konseptualisasi Pembelajaran:</h3>
                  <p>{detailDataFreeTextUser?.konseptualiasasi_pembelajaran}</p>

                </div>
                <p><span className="font-bold">Rencana Tindak Lanjut:</span> {detailDataFreeTextUser?.rencana_tindak_lanjut}</p>
                <p><span className="font-bold">Narasumber:</span> {detailDataFreeTextUser?.narasumber}</p>
              </div>
            </div>
          </section>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DetailFreeTextFromUserPage;
