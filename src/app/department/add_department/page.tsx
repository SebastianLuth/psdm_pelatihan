'use client';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const AddDepartment = () => {
  const [unitKerja, setUnitKerja] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);


  const handleAddUnitKerja = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null);     
    setSuccess(false); 
    
    try { 
      const response = await axios.post('http://localhost:5000/api/unitkerja', 
        { unit_kerja: unitKerja },
        {
          withCredentials: true, 
        }
      );
      
      console.log('Response:', response.data);
      setSuccess(true);  
    } catch (error) {
      setError("Gagal menambahkan unit kerja. Silakan coba lagi.");
      console.error(error);
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
        {success && <p className="mt-4 text-green-500">Unit kerja berhasil ditambahkan!</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </DefaultLayout>
  );
};

export default AddDepartment;
