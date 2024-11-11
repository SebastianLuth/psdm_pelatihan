"use client";
import { FormAddDepartment } from "@/components/FormElements/FormAddDepartment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getDetailUnitKerja, updateUnitKerja } from "@/service/department";
import { UnitKerja } from "@/types/department-type";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function DepartmentDataId() {
  const [newUnitKerja, setUnitKerja] = useState<string>("");
  const [detailUnitKerja, setDetailUnitKerja] = useState<UnitKerja[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { departmentId } = useParams();
  const fetchDetailUnitKerja = useCallback(async () => {
    try {
      const response = await getDetailUnitKerja(Number(departmentId));
      setDetailUnitKerja(response);
    } catch (error) {
      setError("Gagal memuat data unit kerja. Silakan coba lagi.");
      console.log(error);
    }
  }, [departmentId]);

  const handleUpdateUnitKerja = useCallback(async (newUnitKerjaInput: string) => {
    setError(null);
    setSuccess(false);
    try {
      await updateUnitKerja(Number(departmentId), newUnitKerjaInput);
      setSuccess(true);
      fetchDetailUnitKerja();
    } catch (error) {
      setError("Gagal menambahkan unit kerja. Silakan coba lagi.");
      console.error(error);
    } finally {
      setUnitKerja("");
    }
  }, [departmentId, fetchDetailUnitKerja]);

  useEffect(() => {
    fetchDetailUnitKerja();
  }, [fetchDetailUnitKerja]);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <FormAddDepartment
          mode="update"
          detailUnitKerja={detailUnitKerja}
          defaultValue={newUnitKerja}
          onUpdateUnitKerja={handleUpdateUnitKerja}
          success={success}
          error={error}
        />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
