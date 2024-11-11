// src/components/SelectGroup/SelectUnitKerja.tsx
"use client"
import { getUnitKerja } from "@/service/department"
import axios from "axios"
import React, { useEffect, useState } from "react"

interface UnitKerja {
  id: number
  unit_kerja: string
}

interface SelectUnitKerjaProps {
  onUnitKerjaChange: (unitKerjaId: string) => void
}

const SelectUnitKerja: React.FC<SelectUnitKerjaProps> = ({ onUnitKerjaChange }) => {
  const [selectedOptionUnitKerja, setSelectedOptionUnitKerja] = useState<string>("")
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false)
  const [dataAllUnitKerja, setDataAllUnitKerja] = useState<UnitKerja[]>([])

  const changeTextColor = () => {
    setIsOptionSelected(true)
  }

  const fetchUnitKerjaData = async () => {
    try {
      const response = await getUnitKerja();
      setDataAllUnitKerja(response)
    } catch (error) {
      console.error("Error fetching unit kerja data:", error)
    }
  }

  useEffect(() => {
    fetchUnitKerjaData()
  }, [])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedOptionUnitKerja(value)
    onUnitKerjaChange(value) // Update selectedUnitKerja in parent
    changeTextColor()
  }

  return (
    <div className="p-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <label className="mb-2.5 block text-black dark:text-white">Unit Kerja</label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOptionUnitKerja}
          onChange={handleSelectChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Pilih Unit Kerja
          </option>
          {dataAllUnitKerja.map((unit) => (
            <option key={unit.id} value={unit.id} className="text-body dark:text-bodydark">
              {unit.unit_kerja}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectUnitKerja
