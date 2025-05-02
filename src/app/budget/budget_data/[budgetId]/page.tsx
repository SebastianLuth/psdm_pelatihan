import { Metadata } from "next";
import DetailBudgetDataByIdPage from "@/features/budget/pages/DetailBudgetDataByIdPage";

export const metadata: Metadata = {
  title: "Detail RKAP Anggaran - PALAPA PTPN IV ",
  description: "Halaman Detail RKAP Anggaran resmi Sistem PALAPA PT Perkebunan Nusantara IV. Akses Informasi lengkap tentang RKAP Anggaran yang telah anda tambahkan di PALAPA PALMCO AFTER LEARNING APPLICATION",
  keywords: [
    "PALAPA DATA RKAP Anggaran",
    "PALMCO After Learning Application",
    "RKAP pelatihan PALMCO",
    "aplikasi pembelajaran karyawan",
    "evaluasi PALMCO",
    "sistem pelatihan PALMCO",
    "Informasi lengkap anggaran"
  ],
  authors: [{ name: "PT Perkebunan Nusantara IV" }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default DetailBudgetDataByIdPage;