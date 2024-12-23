"use client";
import { addBudget } from "@/service/budget";
import { budgetType, rkapTypeOptions } from "@/types/budget-types";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

const FormAddBudget = () => {
  const [budgetData, setBudgetData] = useState<budgetType>({
    niksap_anggaran: null,
    jenis_anggaran: "",
    total_anggaran: null,
    tahun_anggaran: 2024,
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
        name === "tahun_anggaran" ||
        name === "niksap_anggaran"
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
        niksap_anggaran: 0,
        jenis_anggaran: "",
        total_anggaran: 0,
        tahun_anggaran: 0,
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data.message ||
        err.response?.data.error ||
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
    <div className="mx-auto rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Tambah Anggaran
      </h2>
      {success && (
        <p className="mb-4 text-green-600">Anggaran Berhasil Ditambahkan</p>
      )}
      <form onSubmit={handlePostBudget}>
        <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600">
            NIK-SAP Penanggung Jawab
          </label>
          <input
            type="text"
            name="niksap_anggaran"
            placeholder="Contoh : 499999"
            value={budgetData.niksap_anggaran ?? ""}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>
        <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600">
            Jenis RKAP Anggaran
          </label>
          <select
            name="jenis_anggaran"
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border p-2"
            defaultValue=""
          >
            <option value="" disabled>
              Pilih Type
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
          <label className="mb-1 block font-medium text-gray-600">
            Total Anggaran
          </label>
          <input
            type="number"
            name="total_anggaran"
            placeholder="Contoh : 20000000"
            value={budgetData.total_anggaran ?? ""}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>
        <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600">
            Tahun Anggaran
          </label>
          <input
            type="number"
            name="tahun_anggaran"
            placeholder="Contoh : 2024"
            value={budgetData.tahun_anggaran}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="reset"
            onClick={() =>
              setBudgetData({
                niksap_anggaran: 0,
                jenis_anggaran: "",
                total_anggaran: 0,
                tahun_anggaran: 0,
              })
            }
            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Tambah Anggaran
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddBudget;
