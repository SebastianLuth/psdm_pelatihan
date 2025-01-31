"use client";
import { addBudget } from "@/service/budget";
import { budgetType, lembagaOptions, rkapTypeOptions } from "@/types/budget-types";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

const FormAddBudget = () => {
  const [budgetData, setBudgetData] = useState<budgetType>({
    lembaga: "",
    jenis_anggaran: "",
    total_anggaran: null,
    tahun_anggaran: 2025,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setBudgetData((prevData) => ({
      ...prevData,
      [name]:
        name === "total_anggaran" ||
        name === "tahun_anggaran"
          ? +value
          : value,
    }));
  };

  const handlePostBudget = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await addBudget(budgetData);
      setSuccess(true);
      setBudgetData({
        lembaga: "",
        jenis_anggaran: "",
        total_anggaran: 0,
        tahun_anggaran: 0,
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data.message ||
        err.response?.data.error ||
        err.response?.error||
        "Failed to submit budget.";
      await Swal.fire({
        title: "Gagal!",
        text: `${errorMessage}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
        Tambah Anggaran
      </h2>
      {success && (
        <p className="mb-4 text-green-600">Anggaran Berhasil Ditambahkan</p>
      )}
      <form onSubmit={handlePostBudget}>

      <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600 dark:text-white">
            Jenis Lembaga Anggaran
          </label>
          <select
            name="lembaga"
            onChange={handleInputChange}
            value={budgetData.lembaga || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled>
              Pilih Jenis Lembaga Anggaran
            </option>     
            {/* Options here */}
            {lembagaOptions.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600 dark:text-white">
            Jenis RKAP Anggaran
          </label>
          <select
            name="jenis_anggaran"
            onChange={handleInputChange}
            value={budgetData.jenis_anggaran || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled>
              Pilih Jenis RKAP Anggaran
            </option>
            {/* Options here */}
            {rkapTypeOptions.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600 dark:text-white">
            Total Anggaran
          </label>
          <input
            type="number"
            name="total_anggaran"
            placeholder="Contoh : 20000000"
            value={budgetData.total_anggaran ?? ""}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600 dark:text-white">
            Tahun Anggaran
          </label>
          <input
            type="number"
            name="tahun_anggaran"
            placeholder="Contoh : 2024"
            value={budgetData.tahun_anggaran}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Tambah Anggaran
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default FormAddBudget;
