'use client'
import { use, useCallback, useEffect, useMemo, useState } from "react";
import ScrollableCards from "../CardScrollers";
import RealisasiBiayaChart from "../Chart/RealisasiBiayaLPPNLPP";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { DashboardUser } from "./DashboardUser";
import CardDataStats from "../CardDataStats";
import { PieChartRealisasiStatusEvaluasi } from "../Chart/PieChartRealisasiStatusEvaluasi";

interface CompanyData {
    id: number,
    nama: string,
    alamat: string,
    created_at: string,
    updated_at: string
}

interface EvaluasiLevel1 {
    anggaran_id : number;
    jenis_anggaran : string;
    total_participants : number;
    total_evaluated : number;
    total_not_evaluated : number;
    total_free_text_completed : number;
}

interface EvaluasiLevel3 {
    anggaran_id : number;
    jenis_anggaran : string;
    total_pelatihan : number;
    total_evaluated_level3 : number;
}

interface EvaluationData {
    label: string;
    data : {
        evaluasi_level1: EvaluasiLevel1[];
        evaluasi_level3: EvaluasiLevel3[];
    }
    
}

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

interface DataRealisasiAnggaranByCompany {
    label: string;
    data: {
        total_anggaran_LPP: number | string | null;
        total_anggaran_NONLPP: number | string | null;
        sisa_anggaran_LPP: number | string | null;
        sisa_anggaran_NONLPP: number | string | null;
    };
}

export const DashboardComponent = () => {
    const userData = useAuth().userData;
    const [realisasiDataAnggaran, setRealisasiDataAnggaran] = useState<DataRealisasiAnggaran[]>([]);
    const [realisasiDataAnggaranByCompany, setRealisasiDataAnggaranByCompany] = useState<DataRealisasiAnggaranByCompany[]>([]);

    const [evaluationData, setEvaluationData] = useState<EvaluationData[] >([])
    const [tahunAnggaran, setTahunAnggaran] = useState(new Date().getFullYear());
    const [companyData, setCompanyData] = useState<CompanyData[]>([]);
    const [selectedPerusahaan, setSelectedPerusahaan] = useState(userData?.company_name);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const fetchCompanies = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/company`,
                {
                    withCredentials: true
                }
            )
            setCompanyData(response.data.data)
        } catch (error) {
            setError(true);
        }
    }

    const fetchAllEvaluationData = async(tahun : number) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `
                    http://localhost:5000/api/budget/dashboard/status_evaluation?tahun_anggaran=${tahun}
                `
            );
            setEvaluationData(response.data.data)

        } catch (error) {
            setError(true);
        }
    }

    const fetchRealisasiDataAnggaran = async (tahun : number ) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:5000/api/budget/dashboard/realisasi-biaya?tahun_anggaran=${tahun}`
            );
            setRealisasiDataAnggaran(response.data.data); 
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    const fetchRealisasiDataAngranByCompany = useCallback (async (tahun : number) => {
        setLoading(true);
        try {
            const companyId = userData?.company_id
            const response = await axios.get(
                `http://localhost:5000/api/budget/dashboard/realisasi-biaya/${companyId}?tahun_anggaran=${tahun}`
            );
            setRealisasiDataAnggaranByCompany(response.data.data); 
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    },[userData?.company_id])

    useEffect(() => {
        if(userData?.role === 'super admin'){
            fetchCompanies();
        }
      }, [userData?.role]);
      
      useEffect(() => {
        if (userData?.role === 'admin') {
          fetchRealisasiDataAngranByCompany(tahunAnggaran);
        }
      
        fetchRealisasiDataAnggaran(tahunAnggaran);
        fetchAllEvaluationData(tahunAnggaran);
      }, [fetchRealisasiDataAngranByCompany, tahunAnggaran, userData?.role]);
      

    //Chart Data For User
    const chartDataUser = useMemo(() => {
        if (!realisasiDataAnggaranByCompany.length) return { categories: [], dataLPP: [], dataNonLPP: [], dataKeseluruhan: [] };

        const categories = realisasiDataAnggaranByCompany.map((item) => item.label);
        const dataLPP = realisasiDataAnggaranByCompany.map((item) => Number(item.data.total_anggaran_LPP) || 0);
        const realisasiAnggaranDataLPP = realisasiDataAnggaranByCompany.map((item) => (
            Number(item.data.total_anggaran_LPP) || 0) - (Number(item.data.sisa_anggaran_LPP) || 0));
        const sisaAnggaranDataLpp = realisasiDataAnggaranByCompany.map((item) => (Number(item.data.sisa_anggaran_LPP) || 0));

        const dataNonLPP = realisasiDataAnggaranByCompany.map((item) => Number(item.data.total_anggaran_NONLPP) || 0);
        const realisasiAnggaranDataNONLPP =  realisasiDataAnggaranByCompany.map((item) => (
            Number(item.data.total_anggaran_NONLPP) || 0) - (Number(item.data.sisa_anggaran_NONLPP) || 0));
        const sisaAnggaranDataNonLpp = realisasiDataAnggaranByCompany.map((item) => (Number(item.data.sisa_anggaran_NONLPP) || 0));

        const dataKeseluruhan = realisasiDataAnggaranByCompany.map((item) => 
            (Number(item.data.total_anggaran_LPP) || 0) + (Number(item.data.total_anggaran_NONLPP) || 0)
        );

        return { categories, dataLPP, dataNonLPP, dataKeseluruhan, realisasiAnggaranDataLPP, sisaAnggaranDataLpp, realisasiAnggaranDataNONLPP, sisaAnggaranDataNonLpp};

    },[realisasiDataAnggaranByCompany])

    // Chart data for admin
    const chartData = useMemo(() => {
        if (!realisasiDataAnggaran.length) return { categories: [], dataLPP: [], dataNonLPP: [], dataKeseluruhan: [] };

        const categories = realisasiDataAnggaran.map((item) => item.label);
        const dataLPP = realisasiDataAnggaran.map((item) => Number(item.data.total_anggaran_LPP) || 0);
        const realisasiAnggaranDataLPP = realisasiDataAnggaran.map((item) => (
            Number(item.data.total_anggaran_LPP) || 0) - (Number(item.data.sisa_anggaran_LPP) || 0));
        const sisaAnggaranDataLpp = realisasiDataAnggaran.map((item) => (Number(item.data.sisa_anggaran_LPP) || 0));

        const dataNonLPP = realisasiDataAnggaran.map((item) => Number(item.data.total_anggaran_NONLPP) || 0);
        const realisasiAnggaranDataNONLPP =  realisasiDataAnggaran.map((item) => (
            Number(item.data.total_anggaran_NONLPP) || 0) - (Number(item.data.sisa_anggaran_NONLPP) || 0));
        const sisaAnggaranDataNonLpp = realisasiDataAnggaran.map((item) => (Number(item.data.sisa_anggaran_NONLPP) || 0));

        const dataKeseluruhan = realisasiDataAnggaran.map((item) => 
            (Number(item.data.total_anggaran_LPP) || 0) + (Number(item.data.total_anggaran_NONLPP) || 0)
        );

        return { categories, dataLPP, dataNonLPP, dataKeseluruhan, realisasiAnggaranDataLPP, sisaAnggaranDataLpp, realisasiAnggaranDataNONLPP, sisaAnggaranDataNonLpp};

    },[realisasiDataAnggaran])

    const filterDataStatusEvaluationData = useMemo(() => {
        if (!selectedPerusahaan) return [];
        return evaluationData?.filter((item) => item.label === selectedPerusahaan)
    },[evaluationData,selectedPerusahaan])

    const evaluation1TotalParticipant = useMemo(() => {
        if (!filterDataStatusEvaluationData || filterDataStatusEvaluationData.length === 0) return 0;
    
        // Sum the total_participant values from evaluasi_level1
        return filterDataStatusEvaluationData.reduce((total, item) => {
            if (item.data.evaluasi_level1) {
                return total + item.data.evaluasi_level1.reduce((sum, level1) => sum + (level1.total_participants || 0), 0);
            }
            return total;
        }, 0);
    }, [filterDataStatusEvaluationData]);

     const evaluation1TotalEvaluated = useMemo(() => {
        if (!filterDataStatusEvaluationData || filterDataStatusEvaluationData.length === 0) return 0;
    
        // Sum the total_participant values from evaluasi_level1
        return filterDataStatusEvaluationData.reduce((total, item) => {
            if (item.data.evaluasi_level1) {
                return total + item.data.evaluasi_level1.reduce((sum, level1) => sum + (level1.total_evaluated || 0), 0);
            }
            return total;
        }, 0);
    }, [filterDataStatusEvaluationData]);

     const evaluation1TotalFreetext =  useMemo(() => {
        if (!filterDataStatusEvaluationData || filterDataStatusEvaluationData.length === 0) return 0;
    
        // Sum the total_participant values from evaluasi_level1
        return filterDataStatusEvaluationData.reduce((total, item) => {
            if (item.data.evaluasi_level1) {
                return total + item.data.evaluasi_level1.reduce((sum, level1) => sum + (level1.total_free_text_completed || 0), 0);
            }
            return total;
        }, 0);
    }, [filterDataStatusEvaluationData]);

    const evaluation3TotalEvaluated = useMemo(() => {
        if (!filterDataStatusEvaluationData || filterDataStatusEvaluationData.length === 0) return 0;
    
        // Sum the total_participant values from evaluasi_level1
        return filterDataStatusEvaluationData.reduce((total, item) => {
            if (item.data.evaluasi_level3) {
                return total + item.data.evaluasi_level3.reduce((sum, level1) => sum + (level1.total_evaluated_level3 || 0), 0);
            }
            return total;
        }, 0);
    }, [filterDataStatusEvaluationData]);

    // Pie Chart Data 
    const filteredData = useMemo(() => {
        if (!selectedPerusahaan) return [];
        return realisasiDataAnggaran.filter((item) => item.label === selectedPerusahaan);
    }, [realisasiDataAnggaran, selectedPerusahaan]);

    
    const jumlahKeseluruhanJamPelajaran = filteredData.map((item) => (Number(item.data.jam_pelajaran_LPP) || 0) + Number(item.data.jam_pelajaran_NONLPP) || 0)

    const jumlahSisaJamPelajaran =  filteredData.map((item) => (Number(item.data.sisa_jampel_LPP) || 0) + Number(item.data.sisa_jampel_NONLPP) || 0)

    const realiasiJamPelajaran = jumlahKeseluruhanJamPelajaran[0] - jumlahSisaJamPelajaran[0]

    const jumlahKeseluruhanPeserta = filteredData.map((item) => (Number(item.data.jumlah_peserta_LPP) || 0) + Number(item.data.jumlah_peserta_NONLPP) || 0)

    const jumlahSisaPeserta = filteredData.map((item) => (Number(item.data.sisa_peserta_LPP) || 0) + Number(item.data.sisa_peserta_NONLPP) || 0)

    const realisasiPeserta = jumlahKeseluruhanPeserta[0] - jumlahSisaPeserta[0]

    if (userData?.role !== "super admin" && userData?.role !== "admin") {
        return <DashboardUser />;
    }

    return (
        <>
          <ScrollableCards />
      
          {userData?.role === "super admin" && (
            <div className="flex justify-end p-8 pb-0 pt-0">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 pl-2">
                  Pilih Perusahaan
                </label>
                <select
                  className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg px-4 py-2 pr-10 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  value={selectedPerusahaan}
                  onChange={(e) => setSelectedPerusahaan(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Perusahaan
                  </option>
                  {companyData.map((item, index) => (
                    <option key={index} value={item.nama}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
      
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
            <CardDataStats
              title="Jam Pelajaran"
              total={realiasiJamPelajaran ?? 0}
              colorClass="bg-gradient-to-br from-blue-100 to-blue-200"
            >
              <PieChartRealisasiStatusEvaluasi
                value={realiasiJamPelajaran}
                title="Realisasi Jam Pelajaran"
                color="#4caf50"
                total={jumlahKeseluruhanJamPelajaran[0]}
              />
            </CardDataStats>
            <CardDataStats
              title="Peserta"
              total={realisasiPeserta ?? 0}
              colorClass="bg-gradient-to-br from-purple-100 to-purple-200"
            >
              <PieChartRealisasiStatusEvaluasi
                value={realisasiPeserta}
                title="Jumlah Keseluruhan Peserta"
                color="#673ab7"
                total={jumlahKeseluruhanPeserta[0]}
              />
            </CardDataStats>
            <CardDataStats
              title="Evaluasi Level 1"
              total={evaluation1TotalEvaluated ?? 0}
              colorClass="bg-gradient-to-br from-orange-100 to-orange-200"
            >
              <PieChartRealisasiStatusEvaluasi
                value={evaluation1TotalEvaluated}
                title="Jumlah Yang telah Evaluasi Level 1"
                color="#ff9800"
                total={evaluation1TotalParticipant}
              />
            </CardDataStats>
            <CardDataStats
              title="Evaluasi Level 3"
              total={evaluation3TotalEvaluated ?? 0}
              colorClass="bg-gradient-to-br from-blue-100 to-blue-200"
            >
              <PieChartRealisasiStatusEvaluasi
                value={evaluation3TotalEvaluated}
                title="Jumlah Yang telah Evaluasi Level 3"
                color="#2196f3"
                total={evaluation1TotalParticipant * 2}
              />
            </CardDataStats>
            <CardDataStats
              title="Evaluasi Feedback"
              total={evaluation1TotalParticipant ?? 0}
              colorClass="bg-gradient-to-br from-red-100 to-red-200"
            >
              <PieChartRealisasiStatusEvaluasi
                value={evaluation1TotalFreetext}
                title="Jumlah Yang telah Evaluasi Feedback"
                color="#f44336"
                total={evaluation1TotalParticipant}
              />
            </CardDataStats>
          </div>
      
          <div className="flex w-full flex-col gap-4 p-4 md:flex-row">
            <RealisasiBiayaChart
              title="Realisasi Biaya Pengembangan SDM PER Entitas"
              categories={
                userData.role === "super admin"
                  ? chartData.categories
                  : chartDataUser.categories
              }
              realisasiAnggaranDataLpp={
                (userData.role === "super admin"
                  ? chartData.realisasiAnggaranDataLPP
                  : chartDataUser.realisasiAnggaranDataLPP) ?? []
              }
              sisaAnggaranDataLpp={
                (userData.role === "super admin"
                  ? chartData.sisaAnggaranDataLpp
                  : chartDataUser.sisaAnggaranDataLpp) ?? []
              }
              realisasiAnggaranDataNonLpp={
                (userData.role === "super admin"
                  ? chartData.realisasiAnggaranDataNONLPP
                  : chartDataUser.realisasiAnggaranDataNONLPP) ?? []
              }
              sisaAnggaranDataNonLpp={
                (userData.role === "super admin"
                  ? chartData.sisaAnggaranDataNonLpp
                  : chartDataUser.sisaAnggaranDataNonLpp) ?? []
              }
              tahunAnggaran={tahunAnggaran}
              onTahunChange={setTahunAnggaran}
            />
          </div>
        </>
    );
};
