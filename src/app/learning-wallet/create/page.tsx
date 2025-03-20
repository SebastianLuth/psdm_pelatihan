import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const CreateLearningWalletPage = () => {
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
                        <form className="space-y-6 mt-4">
                                               
                        {/* Text Inputs */}
                            <div className="flex flex-wrap animate-slide-in-left gap-4 items-center">
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">NIKSAP</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Enter title"
                                    />
                                </div>
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Enter title"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap animate-slide-in-left gap-4 items-center">
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Judul Pelatihan</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Enter title"
                                    />
                                </div>
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Biaya Pelatihan</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Enter title"
                                    />
                                </div>
                                
                            </div>
                            
                            <div className="flex flex-wrap animate-slide-in-left gap-4 items-center">
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Enter title"
                                    />
                                </div>
                                <div className="w-[calc(50%-8px)]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">No Vendor</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
                                        placeholder="Enter title"
                                    />
                                </div>
                                
                            </div>
                            

                            {/* File Inputs */}
                            <div className="animate-slide-in-left">
                                <label className="block text-sm font-medium text-gray-700 mb-2">File 1</label>
                                <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all hover:shadow-md">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="file1"
                                    />
                                    <label htmlFor="file1" className="cursor-pointer text-center">
                                        <span className="text-indigo-600 font-semibold">Upload a file</span> or drag and drop
                                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, PDF up to 10MB</p>
                                    </label>
                                </div>
                            </div>
                            <div className="animate-slide-in-right">
                                <label className="block text-sm font-medium text-gray-700 mb-2">File 2</label>
                                <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all hover:shadow-md">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="file2"
                                    />
                                    <label htmlFor="file2" className="cursor-pointer text-center">
                                        <span className="text-indigo-600 font-semibold">Upload a file</span> or drag and drop
                                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, PDF up to 10MB</p>
                                    </label>
                                </div>
                            </div>
                            <div className="animate-slide-in-left">
                                <label className="block text-sm font-medium text-gray-700 mb-2">File 3</label>
                                <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all hover:shadow-md">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="file3"
                                    />
                                    <label htmlFor="file3" className="cursor-pointer text-center">
                                        <span className="text-indigo-600 font-semibold">Upload a file</span> or drag and drop
                                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, PDF up to 10MB</p>
                                    </label>
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