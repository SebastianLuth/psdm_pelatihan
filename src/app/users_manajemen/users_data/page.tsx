// src/app/users_manajemen/users_data/page.tsx
'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import SelectUnitKerja from "@/components/SelectGroup/SelectUnitKerja"
import TableDataUser from "@/components/Tables/TableDataUser"
import { useState } from "react"

const usersData = () => {
    const [selectedUnitKerja, setSelectedUnitKerja] = useState<string>("")

    return (
        <DefaultLayout>
            <div className="m-10">
                <SelectUnitKerja onUnitKerjaChange={setSelectedUnitKerja} />
            </div>
            <div className="m-10">
                <TableDataUser selectedUnitKerja={selectedUnitKerja} />
            </div>
        </DefaultLayout>
    )
}

export default usersData
