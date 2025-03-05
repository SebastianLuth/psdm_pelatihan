"use client";
import { getDetailDataFreeTextUser } from "@/service/free-text";
import { FreeTextEvaluationForAdmin } from "@/types/freetext-type";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUser,
} from "react-icons/fa";

const DetailFreeTextFromUserComponent = () => {
  const [detailDataFreeTextUser, setDetailDataFreeTextUser] =
    useState<FreeTextEvaluationForAdmin | null>(null);

  const user_id = useParams().userId;
  const training_id = useParams().trainingId;

  const fetchDetailDataFreeTextUser = useCallback(async () => {
    try {
      const result = await getDetailDataFreeTextUser( Number(training_id), Number(user_id));
      setDetailDataFreeTextUser(result);
    } catch (error) {
      console.error("Error fetching detail data free text user:", error);
    }
  }, [user_id, training_id]);

  useEffect(() => {
    fetchDetailDataFreeTextUser();
  }, [fetchDetailDataFreeTextUser, user_id, training_id]);
  return (
    <div className="mx-auto max-w-7xl rounded-lg bg-gradient-to-r from-blue-50 to-white p-8 shadow-2xl">
      <h1 className="mb-12 text-center text-5xl font-extrabold text-blue-700">
        Detail Pelatihan
      </h1>

      {/* Informasi Pelatihan */}
      <section className="mb-12">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="mb-8 flex items-center text-3xl font-semibold text-gray-800">
            <FaChalkboardTeacher className="mr-3 text-blue-500" /> Informasi
            Pelatihan
          </h2>
          <div className="grid grid-cols-2 gap-6 text-gray-600">
            <p>
              <span className="font-bold">Judul Pelatihan:</span>{" "}
              {detailDataFreeTextUser?.judul_pelatihan}
            </p>
            <p>
              <span className="font-bold">Metode:</span>{" "}
              {detailDataFreeTextUser?.metode_pelatihan}
            </p>
            <p>
              <span className="font-bold">Lembaga:</span>{" "}
              {detailDataFreeTextUser?.lembaga_pelatihan}
            </p>
            <p>
              <span className="font-bold">Lokasi:</span>{" "}
              {detailDataFreeTextUser?.lokasi_pelatihan}
            </p>
            <p>
              <span className="font-bold">Anggaran:</span> Rp{" "}
              {detailDataFreeTextUser?.anggaran_pelatihan
                ? parseInt(
                    detailDataFreeTextUser.anggaran_pelatihan,
                  ).toLocaleString()
                : "0"}
            </p>
            <p>
              <span className="font-bold">Kompetensi:</span>{" "}
              {detailDataFreeTextUser?.kompetensi_pelatihan}
            </p>
            <p>
              <span className="font-bold">Jenis:</span>{" "}
              {detailDataFreeTextUser?.jenis_pelatihan}
            </p>
            <p>
              <span className="font-bold">RKAP Type:</span>{" "}
              {detailDataFreeTextUser?.rkap_type_pelatihan}
            </p>
            <p>
              <span className="font-bold">Tanggal Mulai:</span>{" "}
              {new Date(
                detailDataFreeTextUser?.tgl_mulai_pelatihan
                  ? detailDataFreeTextUser.tgl_mulai_pelatihan
                  : "",
              ).toLocaleDateString()}
            </p>
            <p>
              <span className="font-bold">Tanggal Selesai:</span>{" "}
              {new Date(
                detailDataFreeTextUser?.tgl_selesai_pelatihan
                  ? detailDataFreeTextUser.tgl_selesai_pelatihan
                  : "",
              ).toLocaleDateString()}
            </p>
            <p>
              <span className="font-bold">Durasi:</span>{" "}
              {detailDataFreeTextUser?.jam_pelajaran_pelatihan} jam
            </p>
          </div>
        </div>
      </section>

      {/* Informasi Peserta */}
      <section className="mb-12">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="mb-8 flex items-center text-3xl font-semibold text-gray-800">
            <FaUser className="mr-3 text-green-500" /> Informasi Peserta
          </h2>
          <div className="grid grid-cols-2 gap-6 text-gray-600">
            <p>
              <span className="font-bold">NIKSAP:</span>{" "}
              {detailDataFreeTextUser?.niksap_peserta}
            </p>
            <p>
              <span className="font-bold">Nama:</span>{" "}
              {detailDataFreeTextUser?.nama_peserta}
            </p>
            <p>
              <span className="font-bold">Unit Kerja:</span>{" "}
              {detailDataFreeTextUser?.unit_kerja_peserta}
            </p>
            <p>
              <span className="font-bold">Jabatan:</span>{" "}
              {detailDataFreeTextUser?.jabatan_peserta}
            </p>
            <p>
              <span className="font-bold">Level:</span>{" "}
              {detailDataFreeTextUser?.level_peserta}
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Peserta */}
      <section>
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="mb-8 flex items-center text-3xl font-semibold text-gray-800">
            <FaCalendarAlt className="mr-3 text-purple-500" /> Feedback Peserta
          </h2>
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="font-bold">Konseptualisasi Pembelajaran:</h3>
              <p>{detailDataFreeTextUser?.konseptualiasasi_pembelajaran}</p>
            </div>
            <p>
              <span className="font-bold">Rencana Tindak Lanjut:</span>{" "}
              {detailDataFreeTextUser?.rencana_tindak_lanjut}
            </p>
            <p>
              <span className="font-bold">Narasumber:</span>{" "}
              {detailDataFreeTextUser?.narasumber}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailFreeTextFromUserComponent;
