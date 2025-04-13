'use client'
import { useState } from "react";
import SelectUnitKerja from "../SelectGroup/SelectUnitKerja"
import TableDataUser from "../Tables/TableDataUser"

const UsersDataComponent = () => {
    const [selectedUnitKerja, setSelectedUnitKerja] = useState<string>("");
    return (
        <>
        <div className="m-10 mt-4">
          <SelectUnitKerja onUnitKerjaChange={setSelectedUnitKerja} />
        </div>
        <div className="m-10 mt-4">
          <TableDataUser selectedUnitKerja={selectedUnitKerja} />
        </div>
        </>
    )
}

export default UsersDataComponent