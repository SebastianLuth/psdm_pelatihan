// src/app/auth/signin/page.tsx
import { Metadata } from "next";
import LoginPage from "@/features/auth/pages/LoginPage";

export const metadata: Metadata = {
  title: "Login - PALAPA PTPN IV",
  description: "Halaman login resmi Sistem PALAPA PT Perkebunan Nusantara IV. Akses portal untuk manajemen informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
  keywords: ["PTPN IV", "PALAPA", "Login", "Sistem Informasi"],
  authors: [{ name: "PT Perkebunan Nusantara IV" }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "Login - PALAPA PTPN IV",
    description: "Sistem Informasi PALAPA - PT Perkebunan Nusantara IV",
    url: "/auth/signin",
    siteName: "PALAPA",
    images: [
      {
        url: "/images/logo/palapa.webp",
        width: 240,
        height: 120,
        alt: "Logo PTPN IV",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default LoginPage;