import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import EvaluastionFreeTextComponent from "@/components/Tables/TableDataEvaluasiFreeText";

export const metadata = {
  title: "N4TALENT | Evaluasi Free Text Pelatihan",
  description: "Kumpulan data pelatihan yang telah diikuti untuk melakukan free text",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const EvaluastionFreeTextPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <EvaluastionFreeTextComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluastionFreeTextPage;
