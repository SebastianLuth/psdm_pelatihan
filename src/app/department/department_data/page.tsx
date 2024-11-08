'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableDataUnitKerja from "@/components/Tables/TableDataUnitKerja"


const DataDepartmentPage = () => {
  
    return (
        <ProtectedRoute>
        <DefaultLayout>
            <TableDataUnitKerja/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}

export default DataDepartmentPage