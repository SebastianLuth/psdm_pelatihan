'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getDetailUnitKerja, updateUnitKerja } from "@/service/department";
import { UnitKerja } from "@/types/department-type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function DepartmentDataId() {
    const [newUnitKerja, setUnitKerja] = useState<string>("");
    const [detailUnitKerja, setDetailUnitKerja] = useState<UnitKerja[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    
    const {departmentId} = useParams();
    const featchDetailUnitKerja = useCallback(async () => {
        try {
            const response = await getDetailUnitKerja(Number(departmentId));
            setDetailUnitKerja(response);
        } catch (error) {   
            setError("Gagal memuat data unit kerja. Silakan coba lagi.");
            console.log(error);
        }
    }, [departmentId])
    
    const handleUpdateUnitKerja = async (e: React.FormEvent) => {
      e.preventDefault(); 
      setError(null);     
      setSuccess(false);
      try { 
        await updateUnitKerja(Number(departmentId), newUnitKerja);
        setSuccess(true);
        featchDetailUnitKerja(); 
      } catch (error) {
        setError("Gagal menambahkan unit kerja. Silakan coba lagi.");
        console.error(error);
      }finally{
        setUnitKerja("");
      }
    }
    useEffect(() => {
        featchDetailUnitKerja();
    }, [featchDetailUnitKerja])

    return (
      <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
            <div className="p-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleUpdateUnitKerja}>
          <div>
            <label className="mb-1 block font-medium text-gray-600">
              Nama Unit Kerja
            </label>
            <input
              type="text"
              onChange={(e) => setUnitKerja(e.target.value)}
              placeholder={detailUnitKerja[0]?.unit_kerja}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <button 
            type="submit" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-7">
            Simpan
          </button>
        </form>
        {success && <p className="mt-4 text-green-500">Unit kerja berhasil diUpdate! cek di 
          <Link href="/department/department_data" className="text-blue-500"> daftar unit kerja</Link>
          </p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
        </DefaultLayout>
        </ProtectedRoute>
    )
}