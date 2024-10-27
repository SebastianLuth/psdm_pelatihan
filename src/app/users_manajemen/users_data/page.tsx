'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import SelectUnitKerja from "@/components/SelectGroup/SelectUnitKerja"
import TableDataUser from "@/components/Tables/TableDataUser"

const usersData = () => {
    return (
        <>
        <DefaultLayout>
            <div className="m-10">
            <SelectUnitKerja/>
            </div>
            <div className="m-10">
            <TableDataUser />
            </div>
        </DefaultLayout>
        </>
    )
}

export default usersData