import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FreeTextDetailComponent from "@/components/Layouts/Detail/AnswerFreetextByUser";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Answer Evaluasi Free Text Pelatihan",
  description:
    "Menjaawab Evaluasi Feedback Pelatihan di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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

const FreeTextDetailPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
       <FreeTextDetailComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default FreeTextDetailPage;