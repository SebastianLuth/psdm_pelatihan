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
    <div className="rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block font-medium text-gray-600">
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
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
