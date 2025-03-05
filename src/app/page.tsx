import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ScrollableCards from "@/components/CardScrollers";
import ProtectedRoute from "@/components/ProtectedRoute";
import MyCalendar from "@/components/calendar/page";
import StatusEvaluation from "@/components/Chart/StatusEvaluation";
import RealisasiBiayaChart from "@/components/Chart/RealisasiBiayaLPPNLPP";
import RealisasiJamPeserta from "@/components/Chart/RealisasiJamPembelajara";

export const metadata = {
  title: "N4TALENT | Dashboard PSDM Pelatihan Karyawan",
  description:
    "Dashboard PSDM untuk manajemen dan pelatihan karyawan. Lihat jadwal pelatihan, perkembangan kompetensi, dan banyak lagi di N4TALENT.",
  keywords:
    "N4TALENT, dashboard PSDM, pelatihan karyawan, manajemen karyawan, kalender pelatihan, kompetensi karyawan",
  author: "N4TALENT",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
};

export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          <ScrollableCards />
          {/* <MyCalendar /> */}
          <div className="flex justify-center gap-4 ml-4 w-full">
            <div className="flex-1 basis-3/4">
                <RealisasiBiayaChart />
            </div>
            <div className="basis-1/4">
                <StatusEvaluation />
            </div>
        </div>

        <div className="flex justify-center gap-4 ml-4 w-full mt-5">
            <div className="w-1/4 p-2">
                <RealisasiJamPeserta />
            </div>
            <div className="w-1/4 p-2">
                <RealisasiJamPeserta />
            </div>
            <div className="w-1/2 p-2">
                <RealisasiBiayaChart />
            </div>
        </div>
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
}
