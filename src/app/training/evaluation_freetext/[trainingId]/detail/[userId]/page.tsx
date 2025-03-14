import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailFreeTextFromUserComponent from "@/components/Layouts/Detail/DetailAnswerFreeTextUser";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Detail Evaluasi Free Text Pelatihan",
  description:
    "Informasi lengkap Detail Jawaban Evaluasi Feedback Pelatihan yang telah diikuti karyawam di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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


const DetailFreeTextFromUserPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
       <DetailFreeTextFromUserComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DetailFreeTextFromUserPage;
