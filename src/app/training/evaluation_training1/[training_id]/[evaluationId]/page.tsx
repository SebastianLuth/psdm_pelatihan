"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailEvaluasiTraining1Component from "@/components/Layouts/Detail/DetailEvaluasition1";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT |Detail Evaluasi lv1 User",
  desription:
    "Detail evaluasi pelatihan level 1. Kumpulan dimana hasil dari jawaban dari user yang mengikuti pelatihan",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

export default function EditEvaluasiTraining1Page() {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <DetailEvaluasiTraining1Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
