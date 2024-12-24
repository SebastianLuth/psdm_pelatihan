import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableEvaluationTraining2 from "@/components/Tables/TableEvaluationTraining2";

export const metadata = {
  title: "N4TALENT | Data Evaluasi LV3",
  description:
    "Kumpulan Data setiap evaluasi level 3 yang dilakukan manajer kepada user yang mengikuti pelatihan",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const Training2Page = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <TableEvaluationTraining2 />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Training2Page;
