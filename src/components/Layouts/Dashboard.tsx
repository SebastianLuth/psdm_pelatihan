'use client'
import { useEffect, useMemo, useState } from "react";
import ScrollableCards from "../CardScrollers";
import RealisasiBiayaChart from "../Chart/RealisasiBiayaLPPNLPP";
import StatusEvaluation from "../Chart/StatusEvaluation";
import axios from "axios";
import RealisasiJamPelAndPeserta from "../Chart/RealisasiJamPembelajara";
import { tahunOptions } from "@/types/budget-types";

interface DataRealisasiAnggaran {
    label: string;
    data: {
        total_anggaran_LPP: number | string | null;
        total_anggaran_NONLPP: number | string | null;
        jumlah_peserta_LPP: number | string | null;
        jumlah_peserta_NONLPP: number | string | null;
        jam_pelajaran_LPP: number | string | null;
        jam_pelajaran_NONLPP: number | string | null;
        sisa_anggaran_LPP: number | string | null;
        sisa_anggaran_NONLPP: number | string | null;
        sisa_peserta_LPP: number | string | null;
        sisa_peserta_NONLPP: number | string | null;
        sisa_jampel_LPP: number | string | null;
        sisa_jampel_NONLPP: number | string | null;
    };
}

export const DashboardComponent = () => {
    const [realisasiDataAnggaran, setRealisasiDataAnggaran] = useState<DataRealisasiAnggaran[]>([]);
    const [tahunAnggaran, setTahunAnggaran] = useState(new Date().getFullYear()); // Tambahkan state tahun
    const [selectedPerusahaan, setSelectedPerusahaan] = useState("HO");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const fetchRealisasiDatAnggaran = async (tahun : number ) => {
        setLoading(true);
        setError(true);
        try {
            const response = await axios.get(
                `http://localhost:5000/api/budget/dashboard/realisasi-biaya?tahun_anggaran=${tahun}`
            );
            setRealisasiDataAnggaran(response.data.data); // Sesuaikan dengan format API
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRealisasiDatAnggaran(tahunAnggaran);
    }, [tahunAnggaran]);

    const chartData = useMemo(() => {
        if (!realisasiDataAnggaran.length) return { categories: [], dataLPP: [], dataNonLPP: [], dataKeseluruhan: [] };

        const categories = realisasiDataAnggaran.map((item) => item.label);
        const dataLPP = realisasiDataAnggaran.map((item) => Number(item.data.total_anggaran_LPP) || 0);
        const dataNonLPP = realisasiDataAnggaran.map((item) => Number(item.data.total_anggaran_NONLPP) || 0);
        const dataKeseluruhan = realisasiDataAnggaran.map((item) => 
            (Number(item.data.total_anggaran_LPP) || 0) + (Number(item.data.total_anggaran_NONLPP) || 0)
        );

        return { categories, dataLPP, dataNonLPP, dataKeseluruhan};

    },[realisasiDataAnggaran])


    // Pie Chart Data 
    const filteredData = useMemo(() => {
        if (!selectedPerusahaan) return [];
        return realisasiDataAnggaran.filter((item) => item.label === selectedPerusahaan);
    }, [realisasiDataAnggaran, selectedPerusahaan]);

    
    const jumlahKeseluruhanJamPelajaran = filteredData.map((item) => (Number(item.data.jam_pelajaran_LPP) || 0) + Number(item.data.jam_pelajaran_NONLPP) || 0)

    const jumlahSisaJamPelajaran =  filteredData.map((item) => (Number(item.data.sisa_jampel_LPP) || 0) + Number(item.data.sisa_jampel_NONLPP) || 0)

    const realiasiJamPelajaran = jumlahKeseluruhanJamPelajaran[0] - jumlahSisaJamPelajaran[0]
    console.log("ini realiasiJamPelajaran",realiasiJamPelajaran)


    const jumlahKeseluruhanPeserta = filteredData.map((item) => (Number(item.data.jumlah_peserta_LPP) || 0) + Number(item.data.jumlah_peserta_NONLPP) || 0)

    const jumlahSisaPeserta = filteredData.map((item) => (Number(item.data.sisa_peserta_LPP) || 0) + Number(item.data.sisa_peserta_NONLPP) || 0)

    const realisasiPeserta = jumlahKeseluruhanPeserta[0] - jumlahSisaPeserta[0]
    // Pie Chart Data END

  return (
    <>
      <ScrollableCards />
      <div className="flex w-full flex-col gap-4 p-4 md:flex-row">
        {/*  RealisasiBiayaChart yang ini memakan 60%*/}
        <div className="w-full md:w-3/5">
          <RealisasiBiayaChart
            title="Realisasi Biaya LPP & NLPP"
            categories={chartData.categories}
            dataLPP={chartData.dataLPP}
            dataNonLPP={chartData.dataNonLPP}
            tahunAnggaran={tahunAnggaran} // Kirim tahun ke komponen
            onTahunChange={setTahunAnggaran} // Fungsi untuk ubah tahun
          />
        </div>
        {/* ini 40% */}
        <div className="w-full md:w-2/5">
          <StatusEvaluation />
        </div>
      </div>

      <div className="mt-5 flex w-full flex-col gap-4 p-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full md:w-1/2 bg-white rounded-lg">
            <div className="flex justify-end mt-2">
                <div className="flex gap-2 relative">
                    <select 
                        className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg px-4 py-2 pr-10 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        value={selectedPerusahaan}
                        onChange={(e) => setSelectedPerusahaan(e.target.value)}
                    >
                        <option value="" disabled>Pilih Perusahaan</option>
                        {realisasiDataAnggaran.map((item, index) => (
                            <option key={index} value={item.label}>
                                {item.label}
                            </option>
                        ))}
                    </select>

                    <select 
                        className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg px-4 py-2 pr-10 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        value={tahunAnggaran}
                        onChange={(e) => setTahunAnggaran(Number(e.target.value))}
                    >
                        {tahunOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {/* Ikon panah dropdown */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className = "flex gap-4">
                    {selectedPerusahaan && (
                            <>
                                <RealisasiJamPelAndPeserta
                                    jumlahKeseluruhanJamPelajaran = {jumlahKeseluruhanJamPelajaran[0]}
                                    realiasiJamPelajaran = {realiasiJamPelajaran}
                                    title="Realisasi Jam Pelajaran"
                                />
                                <RealisasiJamPelAndPeserta
                                    jumlahKeseluruhanPeserta = {jumlahKeseluruhanPeserta[0]}
                                    realisasiPeserta ={realisasiPeserta}
                                    title="Realisasi Peserta"
                                />
                            </>
                    )}
            </div>
            
        </div>
        {/* RealisasiBiayaChart ini memakan setengah atau 50% */}
        <div className="w-full md:w-1/2">
          <RealisasiBiayaChart
            title="Realisai Data Keseluruhan"
            categories={chartData.categories}
            dataKeseluruhan={chartData.dataKeseluruhan}
            tahunAnggaran={tahunAnggaran}
            onTahunChange={setTahunAnggaran}
          />
        </div>
      </div>
    </>
  );
};
