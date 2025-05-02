import VendorDataPage from "@/features/budget/pages/VendorDataPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Data Vendor - PALAPA PTPN IV",
  description:
    "Halaman Data Vendor resmi Sistem PALAPA PT Perkebunan Nusantara IV. Akses Informasi lengkap tentang Data Vendor yang telah anda tambahkan di PALAPA PALMCO AFTER LEARNING APPLICATION",
  keywords: [
    "PALAPA DATA Data Vendor",
    "PALMCO After Learning Application",
    "RKAP pelatihan PALMCO",
    "aplikasi pembelajaran karyawan",
    "evaluasi PALMCO",
    "sistem pelatihan PALMCO",
    "Informasi lengkap anggaran",
  ],
  authors: [{ name: "PT Perkebunan Nusantara IV" }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default VendorDataPage;
