"use client";
import { FormAddDepartment } from "@/components/FormElements/FormAddDepartment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { addUnitKerja } from "@/service/department";
import { useState } from "react";

const AddDepartmentComponent = () => {
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

export default AddDepartmentComponent;
