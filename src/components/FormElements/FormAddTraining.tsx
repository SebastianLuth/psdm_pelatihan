// app/components/FormElements/FormAddTraining.tsx
import React from 'react';

const AddTraining = () => {
    return (
        <div className="mx-auto rounded-lg bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Tambah Data Pelatihan</h2>
            <p className="text-gray-500 mb-6">Halaman ini untuk tambah data pelatihan.</p>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Nama Pelatihan */}
                <div>
                    <label className="text-gray-700">Nama Pelatihan</label>
                    <input type="text" placeholder="Contoh: Capacity Building" className="w-full mt-1 p-2 border rounded-md"/>
                </div>

                {/* Jenis Pelatihan */}
                <div>
                    <label className="text-gray-700">Jenis Pelatihan</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                        <option>Pilih Jenis Pelatihan</option>
                        {/* Options here */}
                    </select>
                </div>

                {/* Metode Pelatihan */}
                <div>
                    <label className="text-gray-700">Metode Pelatihan</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                        <option>Pilih Metode Pelatihan</option>
                        {/* Options here */}
                    </select>
                </div>

                {/* Lokasi Pelatihan */}
                <div>
                    <label className="text-gray-700">Lokasi Pelatihan</label>
                    <input type="text" placeholder="Contoh: Medan / Webinar" className="w-full mt-1 p-2 border rounded-md"/>
                </div>

                {/* Lembaga Pelatihan */}
                <div>
                    <label className="text-gray-700">Lembaga Pelatihan</label>
                    <input type="text" placeholder="Contoh: LPP / NON LPP (GML, and other...)" className="w-full mt-1 p-2 border rounded-md"/>
                </div>

                {/* Kompetensi Pelatihan */}
                <div>
                    <label className="text-gray-700">Kompetensi Pelatihan</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                        <option>Pilih Kompetensi Pelatihan</option>
                        {/* Options here */}
                    </select>
                </div>

                {/* Jumlah Anggaran */}
                <div>
                    <label className="text-gray-700">Jumlah Anggaran</label>
                    <input className="w-full mt-1 p-2 border rounded-md" type='text'>
                    </input>
                </div>

              

                {/* RKAP Type */}
                <div>
                    <label className="text-gray-700">RKAP Type</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                        <option>Pilih Type</option>
                        {/* Options here */}
                    </select>
                </div>

                {/* Jumlah Peserta */}
                <div>
                    <label className="text-gray-700">Jumlah Peserta</label>
                    <input type="number" placeholder="Contoh: 25" className="w-full mt-1 p-2 border rounded-md"/>
                </div>

                {/* Tahun Anggaran */}
                <div>
                    <label className="text-gray-700">Tahun Anggaran</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                        <option>Pilih Tahun Anggaran</option>
                        {/* Options here */}
                    </select>
                </div>

                {/* Tanggal Mulai */}
                <div>
                    <label className="text-gray-700">Tanggal Mulai</label>
                    <input type="date" className="w-full mt-1 p-2 border rounded-md"/>
                </div>

                {/* Tanggal Selesai */}
                <div>
                    <label className="text-gray-700">Tanggal Selesai</label>
                    <input type="date" className="w-full mt-1 p-2 border rounded-md"/>
                </div>

                {/* Buttons */}
                <div className="col-span-1 md:col-span-3 flex justify-end space-x-4 mt-4">
                    <button type="reset" className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Reset Form</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Tambah Pelatihan</button>
                </div>
            </form>
        </div>
    );
};

export default AddTraining;
