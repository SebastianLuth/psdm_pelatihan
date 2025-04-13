import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableDataAnggaran from "@/components/Tables/TableDataAnggaran"

export const metadata = {
    title: "PALAPA | Data RKAP Anggaran",
    description: "Informasi lengkap tentang RKAP Anggaran yang telah anda tambahkan di PALAPA PALMCO AFTER LEARNING APPLICATION ",
    keywords: [
      "PALAPA DATA RKAP Anggaran",
      "PALMCO After Learning Application",
      "RKAP pelatihan PALMCO",
      "aplikasi pembelajaran karyawan",
      "evaluasi PALMCO",
      "sistem pelatihan PALMCO",
      "Informasi lengkap anggaran"
    ],
    author : "PTPN 4 PALMCO",
    robots: "index, follow",
  };

const DataBudgetPage = () => {
    return (
        <>
        <ProtectedRoute allowedRoles={['admin', 'super admin']}>
          <DefaultLayout>
            <Breadcrumb/>
            <TableDataAnggaran/>
          </DefaultLayout>
        </ProtectedRoute>
        </>
    )
}
export default DataBudgetPage