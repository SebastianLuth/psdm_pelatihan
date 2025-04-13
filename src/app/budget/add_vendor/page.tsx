import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormAddDataVendorComponent from "@/components/FormElements/FormAddDataVendorComponent"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"

export const metadata = {
    title: "PALAPA | Tambah RKAP Anggaran",
    description: "Tambah RKAP Anggaran Anda di PALAPA (PALMCO After Learning Application) untuk realisasi anggaran anda nantinya ",
    keywords: [
      "PALAPA Tambah RKAP Anggaran",
      "PALMCO After Learning Application",
      "RKAP pelatihan PALMCO",
      "aplikasi pembelajaran karyawan",
      "evaluasi PALMCO",
      "sistem pelatihan PALMCO",
    ],
    author : "PTPN 4 PALMCO",
    robots: "index, follow",
  };
  
const AddVendorPage = () => {
    return (
        <ProtectedRoute allowedRoles={['admin', 'super admin']}>
            <DefaultLayout>
                <Breadcrumb/>
                <FormAddDataVendorComponent/>
            </DefaultLayout>
        </ProtectedRoute>
    )
}

export default AddVendorPage