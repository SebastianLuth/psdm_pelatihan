"use client";
import useSWR from "swr";
import { deleteUnitKerja, getUnitKerja } from "@/service/department";
import { UnitKerja } from "@/types/department-type";
import Swal from "sweetalert2";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import SkeletonTable from "../Skeleton/SkeletonTable";
import Link from "next/link";

const fetcher = async () => {
  return await getUnitKerja();
};

const TableDataUnitKerja = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(100);
  const [isLoading, setIsLoading] = useState(true);

  const { data, error, mutate } = useSWR<UnitKerja[]>("/unitKerja", fetcher, {
    refreshInterval: 10800000,
  });

  const router = useRouter();

   // Set loading menjadi false setelah data berhasil diambil
   useEffect(() => {
    if (data || error) {
      setIsLoading(false);
    }
  }, [data, error]);

  console.log(data);

  if (error) return <div>Error loading data...</div>;
  if (isLoading) return <SkeletonTable title="Unit Kerja"/>;

  // Fungsi Hapusan unit kerja
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

        // Memperbarui cache SWR setelah penghapusan
        mutate();
      }
    } catch (error) {
      console.error("Gagal menghapus unit kerja:", error);
      await Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat menghapus unit kerja.",
        "error",
      );
    }
  };

  const handleEditUnitKerja = (unitKerjaId: number) => {
    router.push(`/department/department_data/${unitKerjaId}`);
  };

  const debouncedSearch = (query: string) => {
    setSearchQuery(query);
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  }

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
  }

  // Data yang akan ditampilkan
  const filteredUnitKerjaData = data
  ? data.filter((unit) => unit.unit_kerja.toLowerCase().includes(searchQuery.toLowerCase()))
  : [];

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
      <div className="px-6 py-5">
        <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Data Unit Kerja
        </h4>
        <div className="flex items-center justify-between py-4 space-x-4">
          {/* Dropdown */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 dark:text-gray-300">Show</span>
            <select
              className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              onChange={handleLimitChange}
              value={limit}
              defaultValue={100}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          {/* Search */}
          <div className="flex-grow items-center">
            <input
              onChange={handleSearchChange}
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              placeholder="Search..."
            />
          </div>
          <Link
            href={"/department/add_department"}
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-700 hover:shadow-md"
          >
            Tambahkan Unit Kerja
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
        <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUnitKerjaData?.map((unit, index) => (
              <tr
                key={unit.id}
                className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                  {unit.unit_kerja}
                </td>
                <td className="px-6 py-4 text-right">
                  
                  <button 
                  onClick={() => handleEditUnitKerja(unit.id)}
                  className="mr-2 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5h2m-1 14V5m9 4H4m5 0a1 1 0 000 2h6a1 1 0 000-2H9z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUnitKerja(unit.id)}
                    className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 mb-4 mr-4 flex items-center justify-between text-sm text-gray-500">
          <span>
          {/* {" "}
          Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)}{" "}
          of {totalEntries} entries */}
          </span>
          <div className="space-x-2">
            <button
              className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
              // onClick={handlePreviousPage}
              // disabled={currentPage === 1}
              >
                Previous
            </button>
            <button
              className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
              // onClick={handleNextPage}
              // disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TableDataUnitKerja;
