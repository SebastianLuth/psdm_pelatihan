"use client";
import { budgetType } from "@/types/budget-types";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

const FormAddBudget = () => {
  // Initialize with an empty object matching budgetType
  const [budgetData, setBudgetData] = useState<budgetType>({
    niksap_anggaran: 0,
    jenis_anggaran: "",
    total_anggaran: 0,
    tahun_anggaran: 0,
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
      const result = await axios.post(
        `http://localhost:5000/api/budget`,
        budgetData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (result.status === 201) {
        setSuccess(true);
        await Swal.fire({
          title: "Success!",
          text: "Berhasil Menambahkan Anggaran",
          icon: "success",
          confirmButtonText: "OK",
        });
        window.location.reload();
      }
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
            value={budgetData.niksap_anggaran}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>
        <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600">
            Jenis Anggaran
          </label>
          <input
            type="text"
            name="jenis_anggaran"
            placeholder="Contoh : DIKLAT"
            value={budgetData.jenis_anggaran}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
          />
        </div>
        <div className="mb-5">
          <label className="mb-1 block font-medium text-gray-600">
            Total Anggaran
          </label>
          <input
            type="number"
            name="total_anggaran"
            placeholder="Contoh : 20000000"
            value={budgetData.total_anggaran}
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
