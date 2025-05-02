'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRef, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const CreateLearningWalletPage = () => {
    const [formData, setFormData] = useState({
        nama: "",
        judul: "",
        biaya: "",
        jpl : "",
        vendor: "",
        noVendor: ""
    });

    const [fileNames, setFileNames] = useState({
        fotoPelatihan: "",
        struk: "",
        materi: "",
        sertifikat: ""
    });

    const {userData} = useAuth();

    const getFile = (ref: React.RefObject<HTMLInputElement>) => {
        return ref.current?.files?.[0] || null;
    };
    
    const fotoPelatihanRef = useRef<HTMLInputElement>(null);
    const strukRef = useRef<HTMLInputElement>(null);
    const materiRef = useRef<HTMLInputElement>(null);
    const sertifikatRef = useRef<HTMLInputElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: keyof typeof fileNames
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") {
                alert("Hanya file PDF yang diperbolehkan.");
                e.target.value = ""; // reset input file
                setFileNames(prev => ({ ...prev, [key]: "" }));
                return;
            }
            setFileNames(prev => ({ ...prev, [key]: file.name }));
        }
    };
    

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append("nama", formData.nama);
        form.append("judul", formData.judul);
        form.append("biaya", formData.biaya);
        form.append("jpl", formData.jpl)
        form.append("vendor", formData.vendor);
        form.append("noVendor", formData.noVendor);

        const fotoPelatihan = getFile(fotoPelatihanRef);
        if (fotoPelatihan) form.append("foto_pelatihan", fotoPelatihan);

        const fotoStruk = getFile(strukRef);
        if (fotoStruk) form.append("foto_struk", fotoStruk)

        const fotoMateri = getFile(materiRef);
        if(fotoMateri) form.append("foto_materi", fotoMateri)

        const fotoSertifikat = getFile(sertifikatRef);
        if(fotoSertifikat) form.append("foto_sertifikat", fotoSertifikat)
    
        try {
            const res = await axios.post(`
                ${baseUrl}/api/learning-wallet/user/${userData?.username}
                `, 
                form, 
                {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials : true
            });
            console.log("Success:", res.data);
            alert("Pengajuan berhasil!");
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat mengirim data.");
        }
    };

    

    return (
        <ProtectedRoute>
            <DefaultLayout>
                <Breadcrumb />
                    <div className="mt-6 w-full mx-auto bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
                    <div className="p-4 ">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            Ajukan Learning Wallet Anda
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Judul Pelatihan</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan Judul Pelatihan Yang Telah Anda Ikuti"
                                        value={formData.judul}
                                        onChange={handleChange}
                                        name="judul"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Jam Pelajaran</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Total Jam Pelajaran Anda"
                                        value={formData.jpl}
                                        onChange={handleChange}
                                        name="jpl"
                                    />
                                </div>
                                <div className=" w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Biaya Pelatihan</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Biaya Yang Anda Keluarkan"
                                        value={formData.biaya}
                                        onChange={handleChange}
                                        name="biaya"
                                    />
                                </div>
                                
                                
                            </div>
                            
                            <div className="flex flex-wrap animate-slide-in-left gap-4 items-center">
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan Vendor Yang Anda Ikuti"
                                        value={formData.vendor}
                                        onChange={handleChange}
                                        name="vendor"
                                    />
                                </div>
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">No Vendor</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Masukkan No Telp Vendor Yang Dapat dihubungi"
                                        value={formData.noVendor}
                                        onChange={handleChange}
                                        name="noVendor"
                                    />
                                </div>
                                
                            </div>
                            

                            {/* File Inputs */}
                            <div className="flex justify-center space-x-4">
                                <div className="w-full animate-slide-in-left">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto Pelatihan Anda </label>
                                    <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all hover:shadow-md">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="foto_pelatihan"
                                            ref = {fotoPelatihanRef}
                                            onChange={(e) => handleFileChange(e, "fotoPelatihan")}
                                        />
                                        <label htmlFor="foto_pelatihan" className="cursor-pointer text-center">
                                            <span className="text-indigo-600 font-semibold">Upload a file</span> or drag and drop
                                            <p className="text-xs text-gray-500 mt-2"> PDF Only up to 10MB</p>
                                            {fileNames.fotoPelatihan && (
                                                <p className="text-sm mt-2 text-green-600">{fileNames.fotoPelatihan}</p>
                                            )}
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full animate-slide-in-right">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Struk Pembelian</label>
                                    <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all hover:shadow-md">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="foto_struk"
                                            ref = {strukRef}
                                            onChange={(e) => handleFileChange(e, "struk")}
                                        />
                                        <label htmlFor="foto_struk" className="cursor-pointer text-center">
                                            <span className="text-indigo-600 font-semibold">Upload a file</span> or drag and drop
                                            <p className="text-xs text-gray-500 mt-2"> PDF Only up to 10MB</p>
                                            {fileNames.struk && (
                                                <p className="text-sm mt-2 text-green-600">{fileNames.struk}</p>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <div className="w-full animate-slide-in-left">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Materi Pembelajaran Dalam 1 File</label>
                                    <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all hover:shadow-md">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="file_materi"
                                            ref = {materiRef}
                                            onChange={(e) => handleFileChange(e, "materi")}
                                        />
                                        <label htmlFor="file_materi" className="cursor-pointer text-center">
                                            <span className="text-indigo-600 font-semibold">Upload a file</span> or drag and drop
                                            <p className="text-xs text-gray-500 mt-2">PDF Only up to 10MB</p>
                                            {fileNames.materi && (
                                                <p className="text-sm mt-2 text-green-600">{fileNames.materi}</p>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className="w-full animate-slide-in-left">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Sertifikat</label>
                                    <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all hover:shadow-md">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="file_sertifikat"
                                            ref = {sertifikatRef}
                                            onChange={(e) => handleFileChange(e, "sertifikat")}
                                        />
                                        <label htmlFor="file_sertifikat" className="cursor-pointer text-center">
                                            <span className="text-indigo-600 font-semibold">Upload a file</span> or drag and drop
                                            <p className="text-xs text-gray-500 mt-2"> PDF Only up to 10MB</p>
                                            {fileNames.sertifikat && (
                                                <p className="text-sm mt-2 text-green-600">{fileNames.sertifikat}</p>
                                            )}
                                        </label>
                                    </div>
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

export default CreateLearningWalletPage;