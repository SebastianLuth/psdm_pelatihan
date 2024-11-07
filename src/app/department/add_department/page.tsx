'use client';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { addUnitKerja } from "@/service/department";
import Link from "next/link";
import { useEffect, useState } from "react";

const AddDepartmentPage = () => {
  const [unitKerja, setUnitKerja] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddUnitKerja = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null);     
    setSuccess(false);
    try { 
      const result = await addUnitKerja(unitKerja); 
      if(result.success){
        setSuccess(true);  
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setUnitKerja([]);
    }
  }

  useEffect(() => {
    console.log(unitKerja);
  }, [unitKerja]);  

  return (
    <DefaultLayout>
      <div className="p-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleAddUnitKerja}>
          <div>
            <label className="mb-1 block font-medium text-gray-600">
              Nama Unit Kerja
            </label>
            <input
              type="text"
              onChange={(e) => setUnitKerja(e.target.value.split(","))}
              placeholder="Contoh : Staff Sub Bagian Persona"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <button 
            type="submit" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-7">
            Simpan
          </button>
        </form>
        {success && <p className="mt-4 text-green-500">Unit kerja berhasil ditambahkan! cek di 
          <Link href="/department/department_data" className="text-blue-500"> daftar unit kerja</Link>
          </p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </DefaultLayout>
  );
};

export default AddDepartmentPage;
