"use client";
import { useState } from "react";

const FormAddBudget = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <>
      <div className="mx-auto rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Tambah Anggaran
        </h2>
        <form>
          <div className="mb-5">
            <div className="mb-5">
              <label className="mb-1 block font-medium text-gray-600">
                Nama
              </label>
              <input
                type="text"
                placeholder="Contoh : Muhammad Fikri Haikal"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            <div className="mb-5">
              <label className="mb-1 block font-medium text-gray-600">
                NIK-SAP
              </label>
              <input
                type="text"
                placeholder="Contoh : 499999"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            <div className="mb-5">
              <label className="mb-1 block font-medium text-gray-600">
                Unit Kerja
              </label>
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  changeTextColor();
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                  isOptionSelected ? "text-black dark:text-white" : ""
                }`}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Pilih Unit Kerja
                </option>
                <option value="USA" className="text-body dark:text-bodydark">
                  USA
                </option>
                <option value="UK" className="text-body dark:text-bodydark">
                  UK
                </option>
                <option value="Canada" className="text-body dark:text-bodydark">
                  Canada
                </option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="reset"
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
    </>
  );
};

export default FormAddBudget;
