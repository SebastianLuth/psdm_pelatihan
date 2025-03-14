import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AnswerQuestionEvaluasi3Component from "@/components/Layouts/Detail/AnswerQuestionEvaluasi3";

export const metadata = {
  title: "PALAPA | Detail  Jawaban Evaluasi Pelatihan Lv 3",
  description:
    "Detail Jawaban Evaluasi Pelatihan Lv 3 di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
  keywords: [
    "export RKAP anggaran PALAPA",
    "PALMCO After Learning Application",
    "RKAP pelatihan PALMCO",
    "aplikasi pembelajaran karyawan",
    "evaluasi PALMCO",
    "sistem pelatihan PALMCO",
    "manajemen anggaran pelatihan",
    "data RKAP PALMCO",
    "export data anggaran",
  ],
  author: "PTPN 4 PALMCO",
  robot : "index, follow",
};

const Evaluasia3TrainingPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <AnswerQuestionEvaluasi3Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Evaluasia3TrainingPage;
