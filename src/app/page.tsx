import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DashboardComponent } from "@/components/Layouts/Dashboard";

export const metadata = {
  title: "PALAPA | Dashboard PSDM Pelatihan Karyawan",
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
         <DashboardComponent/> 
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
}