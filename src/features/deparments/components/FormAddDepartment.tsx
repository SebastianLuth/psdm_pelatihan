import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { UnitKerja } from "@/types/department-type";

type FormAddDepartmentProps = {
  mode: "add" | "update";
  detailUnitKerja ?: UnitKerja[];
  defaultValue?: string;
  onAddUnitKerja?: (unitKerjaInput: string[]) => void;
  onUpdateUnitKerja?: (unitKerjaInput: string) => void;
  success?: boolean;
  error?: string | null;
};

export function FormAddDepartment({
  mode,
  defaultValue = "",
  detailUnitKerja = [],
  onAddUnitKerja,
  onUpdateUnitKerja,
  success,
  error,
}: FormAddDepartmentProps) {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (mode === "update" && defaultValue) {
      setInputValue(defaultValue);
    }
  }, [mode, defaultValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "add" && onAddUnitKerja) {
      const unitKerjaInput = inputValue.split(",").map((item) => item.trim());
      onAddUnitKerja(unitKerjaInput);
    }
    if (mode === "update" && onUpdateUnitKerja) {
      onUpdateUnitKerja(inputValue);
    }
    setInputValue("");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">{mode === "update" ? "Edit" : "Tambah"} Unit Kerja</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block font-medium text-gray-600 dark:text-white">
            Nama Unit Kerja
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder= {
                mode === "add"
                  ? "Contoh: Bagian Sumber Daya Manusia"
                  : `Masukkan nama baru unit kerja untuk ${detailUnitKerja[0]?.unit_kerja}`
              }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-7 inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          {mode === "add" ? "Simpan" : "Perbarui"}
        </button>
      </form>
      {success && (
        <p className="mt-4 text-green-500">
          {mode === "add"
            ? "Unit kerja berhasil ditambahkan!"
            : "Unit kerja berhasil diperbarui!"}
          cek di{" "}
          <Link href="/department/department_data" className="text-blue-500">
            {" "}
            daftar unit kerja
          </Link>
        </p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
