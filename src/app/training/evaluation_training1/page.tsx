import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableEvaluationTraining1 from "@/components/Tables/TableEvaluationTraining1";

export const metadata = {
  title: "N4TALENT | Data Evaluasi Level 1",
  description: "Kumpulan Data Evaluasi Pelatihan Level 1 ",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const Training1Page = () => {
  return (
    <>
      <ProtectedRoute >
        <DefaultLayout>
          <TableEvaluationTraining1 />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default Training1Page;
