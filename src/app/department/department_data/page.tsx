'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import TableDataUnitKerja from "@/components/Tables/TableDataUnitKerja"
import axios from "axios"
import { useEffect, useState } from "react"

const DataDepartment = () => {
  
    return (
        <DefaultLayout>
            <TableDataUnitKerja/>
        </DefaultLayout>
    )
}

export default DataDepartment