"use client";
import { FormAddDepartment } from "@/features/deparments/components/FormAddDepartment";
import FormSkeleton from "@/components/Skeleton/FormSkeleton";
import { getDetailUnitKerja, updateUnitKerja } from "@/service/department";
import { UnitKerja } from "@/types/department-type";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const UpdateDepartmentDataIdComponent = () => {
  const [newUnitKerja, setUnitKerja] = useState<string>("");
  const [detailUnitKerja, setDetailUnitKerja] = useState<UnitKerja[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState<boolean>(false);

  const { departmentId } = useParams();
  const fetchDetailUnitKerja = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getDetailUnitKerja(Number(departmentId));
      setDetailUnitKerja(response);
    } catch (error) {
      setError("Gagal memuat data unit kerja. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, [departmentId]);

  const handleUpdateUnitKerja = useCallback(
    async (newUnitKerjaInput: string) => {
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
    },
    [departmentId, fetchDetailUnitKerja],
  );

  useEffect(() => {
    fetchDetailUnitKerja();
  }, [fetchDetailUnitKerja]);

  return (
    <>
      {isLoading === true ? (
        <FormSkeleton />
      ) : (
        <FormAddDepartment
          mode="update"
          detailUnitKerja={detailUnitKerja}
          defaultValue={newUnitKerja}
          onUpdateUnitKerja={handleUpdateUnitKerja}
          success={success}
          error={error}
        />
      )}
    </>
  );
}