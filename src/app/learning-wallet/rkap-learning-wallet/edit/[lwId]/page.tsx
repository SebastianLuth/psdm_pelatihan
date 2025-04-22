'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


const EditRKAPLWUser = () => {
    const [formData, setFormData] = useState({
        username : "",
        nama: "",
        biaya_rkap_lw: "",
        sisa_biaya_lw: "",
        rkap_jpl : "",
        sisa_jpl: "",
        rkap_tahun: ""
    });

    const [fileNames, setFileNames] = useState({
        fotoPelatihan: "",
        struk: "",
        materi: "",
        sertifikat: ""
    });

    const { lwId } = useParams();
    const {userData} = useAuth();


    const fetchDetailData = useCallback( async () => {
        try {
            const result = await axios.get(`${baseUrl}/api/learning-wallet/admin/rkaplw/${lwId}`,{
                withCredentials : true
            })
            if (Array.isArray(result.data.data) && result.data.data.length > 0) {
                const data = result.data.data[0];
                setFormData({
                    username : data.username || "",
                    nama: data.nama || "",
                    biaya_rkap_lw: data.biaya_rkap_lw || "",
                    sisa_biaya_lw: data.sisa_biaya_lw?.toString() || "",
                    rkap_jpl: data.rkap_jpl?.toString() || "",
                    sisa_jpl: data.sisa_jpl || "",
                    rkap_tahun: data.rkap_tahun || ""
                });
            }
            
        } catch (err) {
            console.error("Error:", err);
        }
    },[lwId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append("username", formData.username);
        form.append("nama", formData.nama);
        form.append("biaya_rkap_lw", formData.biaya_rkap_lw);
        form.append("sisa_biaya_lw", formData.sisa_biaya_lw);
        form.append("rkap_jpl", formData.rkap_jpl)
        form.append("sisa_jpl", formData.sisa_jpl);
        form.append("rkap_tahun", formData.rkap_tahun);
    
        try {
            const res = await axios.put(`
                ${baseUrl}/api/learning-wallet12312/user/${userData?.username}/lw/${lwId}
                `, 
                form, 
                {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials : true
            });
            alert("Pengajuan berhasil!");
        } catch (err) {
            alert("Terjadi kesalahan saat mengirim data.");
        }
    };

    useEffect(() => {
        fetchDetailData().catch(console.error)
    }, [fetchDetailData])
    


    return (
        <ProtectedRoute>
            <DefaultLayout>
                <Breadcrumb />
                    <div className="mt-6 w-full mx-auto bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                    <div className="p-4 ">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            Edit Pengajuan Learning Wallet Anda
                        </h2>

                        <p className="mt-2 text-gray-700 text-sm mt-5">Berikut ini cara untuk pengajuan:</p>

                        <ul className="mt-2 space-y-2 text-gray-600 list-disc list-inside text-sm">
                            <li>Isi semua inputan seperti nama, NIKSAP, dan lainnya.</li>
                            <li>Untuk inputan file, hanya format PDF yang diterima.</li>
                            <li>Kumpulkan semua foto struk belanja dalam satu file dan kirimkan sebagai PDF.</li>
                        </ul>
                    </div>
                        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
                                               
                        {/* Text Inputs */}
                            <div className="flex flex-wrap animate-slide-in-left gap-4 items-center">
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">NIKSAP</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan NIKSAP Pegawai"
                                        value={formData.username}
                                        onChange={handleChange}
                                        name="username"
                                    />
                                </div>
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan Nama Anda"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        name="nama"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap animate-slide-in-left gap-4 items-center">
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Biaya RKAP LW</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan Biaya RKAP LW Pegawai"
                                        value={formData.biaya_rkap_lw}
                                        onChange={handleChange}
                                        name="biaya_rkap_lw"
                                    />
                                </div>
                                <div className=" w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sisa Biaya LW</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan Biaya Sisa LW Pegawai"
                                        value={formData.sisa_biaya_lw}
                                        onChange={handleChange}
                                        name="sisa_biaya_lw"
                                    />
                                </div>
                                
                                
                            </div>
                            
                            <div className="flex flex-wrap animate-slide-in-left gap-4 items-center">
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">RKAP Jam Pelajaran</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan Vendor Yang Anda Ikuti"
                                        value={formData.rkap_jpl}
                                        onChange={handleChange}
                                        name="rkap_jpl"
                                    />
                                </div>
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sisa Jam Pelajaran</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan No Telp Vendor Yang Dapat dihubungi"
                                        value={formData.sisa_jpl}
                                        onChange={handleChange}
                                        name="sisa_jpl"
                                    />
                                </div>
                                
                            </div>      

                            <div className="flex flex-wrap animate-slide-in-left gap-4 items-center">
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tahun RKAP LW</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan Vendor Yang Anda Ikuti"
                                        value={formData.rkap_tahun}
                                        onChange={handleChange}
                                        name="rkap_tahun"
                                    />
                                </div>                                
                            </div>                          

                            {/* Submit Button */}
                            <div className="text-center animate-fade-in">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform hover:scale-105 hover:shadow-lg"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
            </DefaultLayout>
        </ProtectedRoute>
    );
};

export default EditRKAPLWUser;