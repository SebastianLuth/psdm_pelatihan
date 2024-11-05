"use client";
import { getUnitKerja } from "@/service/department";
import { UnitKerja } from "@/types/department-type";
import { useEffect, useState } from "react";

const TableDataUnitKerja = () => {
  const [dataAllUnitKerja, setDataAllUnitKerja] = useState<UnitKerja[]>([]);

  // Fungsi untuk mengambil data unit kerja dari API
  const fetchUnitKerjaData = async () => {
    try {
      const response = await getUnitKerja();
      setDataAllUnitKerja(response);
    } catch (error) {
      console.error("Error fetching unit kerja data:", error);
    }
  };

  // Memuat data 
  useEffect(() => {
    fetchUnitKerjaData(); 
  }, [dataAllUnitKerja]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Data Unit Kerja
      </h4>
      <div className="flex items-center justify-between py-4">
        {/* Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Show</span>
          <select className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="text-gray-700">entries</span>
        </div>

        {/* Search */}
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Search:</span>
          <input
            type="text"
            className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex flex-col">
        {/* Header Table */}
        <div className="grid grid-cols-3 rounded-sm bg-gray-200 dark:bg-meta-3">
          <div className="p-2.5 text-start xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No</h5>
          </div>
          <div className="p-2.5 text-start xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama
            </h5>
          </div>
          <div className="p-2.5 text-start xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {/* Data Rows */}
        {dataAllUnitKerja.map((unit, index) => (
          <div className="grid grid-cols-3" key={unit.id}>
            <div className="flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{index + 1}</p>
            </div>
            <div className="flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{unit.unit_kerja}</p>
            </div>
            <div className="flex items-center justify-start gap-4 p-2.5 xl:p-5">
              <button className="text-blue-500 hover:underline dark:text-blue-300">
                Edit
              </button>
              <button className="text-red-500 hover:underline dark:text-red-300">
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TableDataUnitKerja;
