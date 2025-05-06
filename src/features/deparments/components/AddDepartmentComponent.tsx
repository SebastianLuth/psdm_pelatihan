"use client";
import { FormAddDepartment } from "@/features/deparments/components/FormAddDepartment";
import { addUnitKerja } from "@/service/department";
import { useState } from "react";

export const AddDepartmentComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddUnitKerja = async (unitKerjaInput: string[]) => {
    setError(null);
    setSuccess(false);
    try {
      const result = await addUnitKerja(unitKerjaInput);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error(error);
      setError("Terjadi kesalahan saat menambahkan unit kerja.");
    }
  };

  return (
    <FormAddDepartment
      mode="add"
      onAddUnitKerja={handleAddUnitKerja}
      success={success}
      error={error}
    />
  );
};
