import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableDataAnggaran from "@/components/Tables/TableDataAnggaran"

const DataBudgetPage = () => {
    return (
        <>
        <ProtectedRoute>
        <DefaultLayout>
            <TableDataAnggaran/>
        </DefaultLayout>
        </ProtectedRoute>
        </>
    )
}
export default DataBudgetPage