"use client";
import { User } from "@/types/manajement-users-type";
import { ChangeEvent, useMemo, useState } from "react";

type CreateBawahanModalProps = {
  textJudul: string;
  dataAllUserByUnitKerja: User[];
  onClose: () => void;
  onAddBawahan: (evaluator_id: number, nama: string, kategori: string) => void;
  success?: boolean;
  error?: string | null | undefined;
};

export default function CreateBawahanModal({
  dataAllUserByUnitKerja,
  onClose,
  onAddBawahan,
  success,
  error,
  textJudul,
}: CreateBawahanModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  let kategori = "";
  if (textJudul === "Kolega") {
    kategori = "kolega";
  } else {
    kategori = "atasan";
  }

  // Handle perubahan input search
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat mencari
  };

  // Filter data berdasarkan query
  const filteredTrainingData = useMemo(() => {
    return dataAllUserByUnitKerja.filter(
      (training) =>
        training.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        training.username.toString().includes(searchQuery),
    );
  }, [searchQuery, dataAllUserByUnitKerja]);

  // Pagination berdasarkan hasil filter
  const totalEntries = filteredTrainingData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredTrainingData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 mb-2 mt-2 flex items-center justify-center"
        onClick={handleOverlayClick}
      >
        {/* Kontainer untuk menjaga modal tetap di tengah dan scrollable */}
        <div className="relative max-h-full w-full overflow-y-auto sm:max-w-sm md:max-w-md lg:max-w-3xl">
          <div className="relative flex flex-col rounded-lg bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-5">
              <h3 className="text-xl font-bold">Tambah {textJudul}</h3>
              <div className="flex gap-4">
                <input
                  onChange={handleSearchChange}
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="Search..."
                />
                <button
                  className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 hover:text-gray-700"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="p-6">
              <div className="relative overflow-x-auto">
                <table className="min-w-full table-auto text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                      <th className="px-4 py-2">Nama Karyawan</th>
                      <th className="px-4 py-2">NIKSAP</th>
                      <th className="px-4 py-2">Unit Kerja</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{user.nama}</td>
                        <td className="px-4 py-2">{user.username}</td>
                        <td className="px-4 py-2">{user.unit_kerja}</td>
                        <td className="px-4 py-2">{user.id}</td>
                        <td className="px-4 py-2">
                          <button
                            className="rounded bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600"
                            onClick={() =>
                              onAddBawahan(user.id, user.nama, kategori)
                            }
                          >
                            Tambah
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {success && (
                  <p className="mt-4 text-sm text-green-500">
                    Bawahan berhasil ditambahkan.
                  </p>
                )}
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>
                  {" "}
                  Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)}{" "}
                  of {totalEntries} entries
                </span>
                <div className="space-x-2">
                  <button
                    className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="flex justify-end border-t p-4">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={onClose}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Background overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
