"use client";
import { deleteUnitKerja, getUnitKerja } from "@/service/department";
import { UnitKerja } from "@/types/department-type";
import Swal from "sweetalert2";
import Link from "next/link";
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

  //handle delete unit kerja
  const handleDeleteUnitKerja = async (unitKerjaId: number) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Unit kerja ini akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await deleteUnitKerja(unitKerjaId);
        await Swal.fire("Terhapus!", "Unit kerja telah dihapus.", "success");
      }
      fetchUnitKerjaData();
    } catch (error) {
      console.error("Gagal menghapus unit kerja:", error);
      await Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat menghapus unit kerja.",
        "error",
      );
    }
  };

  // Memuat data
  useEffect(() => {
    fetchUnitKerjaData();
  }, []);

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
        <div className="grid grid-cols-1 rounded-sm bg-gray-200 dark:bg-meta-3 sm:grid-cols-3 md:grid-cols-6">
          <div className="col-span-1 p-2.5 text-start xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No</h5>
          </div>
          <div className="col-span-1 p-2.5 text-start sm:col-span-2 md:col-span-3 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nama
            </h5>
          </div>
          <div className="col-span-1 p-2.5 text-start sm:col-span-1 md:col-span-2 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {/* Data Rows */}
        {dataAllUnitKerja.map((unit, index) => (
          <div
            className="grid grid-cols-1 border-b dark:border-meta-4 sm:grid-cols-3 md:grid-cols-6"
            key={unit.id}
          >
            <div className="col-span-1 flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{index + 1}</p>
            </div>
            <div className="col-span-1 flex items-center justify-start p-2.5 sm:col-span-2 md:col-span-3 xl:p-5">
              <p className="text-black dark:text-white">{unit.unit_kerja}</p>
            </div>
            <div className="col-span-1 flex items-center justify-start gap-4 p-2.5 sm:col-span-1 md:col-span-2 xl:p-5">
              <Link
                href={`/department/department_data/${unit.id}`}
                className="text-blue-500 hover:underline dark:text-blue-300"
              >
                Edit
              </Link>
              <button
                className="text-red-500 hover:underline dark:text-red-300"
                onClick={() => handleDeleteUnitKerja(unit.id)}
              >
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