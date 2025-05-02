import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import AnswerEvaluasiTraining1Component from "@/components/Layouts/Detail/AnswerQuestionEvaluasi1";

export const metadata = {
  title: "PALAPA | Jawab Evaluasi Level 1 Pelatihan",
  description:
    "Menjaawab Evaluasi level 1 Pelatihan di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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


const EvaluasiTraining1Page = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <AnswerEvaluasiTraining1Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluasiTraining1Page;
