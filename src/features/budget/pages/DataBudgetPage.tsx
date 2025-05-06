import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/Layouts/ProtectedRoute"
import { TableDataAnggaran } from "../components/TableDataAnggaran";

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