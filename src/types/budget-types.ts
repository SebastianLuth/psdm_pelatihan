export interface budgetType {
  id?: number | undefined;
  niksap_anggaran: number | null;
  jenis_anggaran: string;
  total_anggaran: number | null;
  sisa_anggaran?: number | null;
  tahun_anggaran: number;
}

export interface SelectOption  {
  value: number;
  label: string;
}

export const metodePelatihanOptions: SelectOption [] = [
  { value: 1, label: "Offline" },
  { value: 2, label: "Online" },
  { value: 3, label: "Hybrid" },
  { value: 4, label: "E Learning" },
];

export const kompetensiOptions: SelectOption [] = [
  { value: 1, label: "Hard Skill" },
  { value: 2, label: "Soft Skill" },
];

export const rkapTypeOptions: SelectOption [] = [
  { value: 1, label: "Pengembangan Direksi (BOD) & (BOM)" },
  { value: 2, label: "Pelatihan & Pengembangan Kompotensi Karyawan (Agro Wallet) Karyawan Pimpinan" },
  { value: 3, label: "Pelatihan & Pengembangan Kompotensi Karyawan (Agro Wallet) Millenial Leader Program" },
  { value: 4, label: "Pelatihan & Pengembangan Kompotensi Karyawan (Agro Wallet) Woman Leader Program" },
  { value: 5, label: "Pelatihan & Pengembangan Kompotensi Karyawan (Agro Wallet) Karyawan Pelaksana" },
  { value: 7, label: "Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) Karyawan Pimpinan" },
  { value: 8, label: "Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) Millenial Leader Program" },
  { value: 9, label: "Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) Woman Leader Program" },
  { value: 10, label: "Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) Karyawan Pelaksana" },
  { value: 11, label: "Kursus Jabatan (Leadership Development Program) Karywan Pimpinan PLDP"},
  { value: 12, label: "Kursus Jabatan (Leadership Development Program) Karyawan Pimpinan Leadership Development Program"},
  { value : 13, label: "Kursus Jabatan (Leadership Development Program) Karyawan Pelaksana (PPKM & PPTM)"},
  { value : 14, label: "Program Sertifikasi Kompentensi Khusus Jabatan"},
  { value : 15, label: "Program Study Banding"},
  { value: 16, label: "Karyawan Pimpinan - Assesment"},
  { value: 17, label: "Karyawan Pelaksana - Assesment"}, 
  { value: 18, label: "Karyawan Pimpinan - Recruitment"},
  { value: 19, label: "Karyawan Pelaksana - Recruitment"},
  { value: 20, label: "Biaya Program Internalisasi Budaya"},
  { value: 21, label: "Biaya Konsultasi Pengembangan SDM"},
  { value: 22, label: "Biaya Inovasi dan Riset"},
  { value: 23, label: "Biaya Pengembangan SDM lain-lain"},
]

export const jenisPelatihanOptions : SelectOption [] = [
  { value: 1, label: "Sekolah Transformasi Strategis - Strategic & Sustainability Academy" },
  { value: 2, label: "Sekolah Optimalisasi Aset & Sustainability - Strategic & Sustainability Academy"},
  { value: 3, label: "Sekolah Sekretariat Perusahaan - Strategic & Sustainability Academy" },
  { value: 4, label: "Sekolah Audit Internal & Manajemen Risiko - Strategic & Sustainability Academy" },
  { value: 5, label: "Sekolah Strategi Pemasaran - Marketing Academy"},
  { value: 6, label: "Sekolah Pemasaran Komoditi - Marketing Academy" },
  { value: 7, label: "Sekolah Pemasaran Retail - Marketing Academy" },
  { value: 8, label: "Sekolah Operasional Tanaman Kelapa Sawit - Production & Development Academy" },
  { value: 9, label: "Sekolah Operasional Tanaman Karet - Production & Development Academy" },
  { value: 10, label: "Sekolah Operasional Tanaman Tebu - Production & Development Academy" },
  { value: 11, label: "Sekolah Operasional Tanaman Teh - Production & Development Academy" },
  { value: 12, label: "Sekolah Operasional Tanaman Kopi, Kakao & Tembakau - Production & Development Academy" },
  { value: 13, label: "Sekolah Keuangan & Akutansi - Finance Academy" },
  { value: 14, label: "Sekolah Pembiayaan Korporasi - Finance Academy" },
  { value: 15, label: "Sekolah Hukum - Genaral Affairs Academy" },
  { value: 16, label: "Sekolah Pengadaan & Umum - Genaral Affairs Academy" },
  { value: 17, label: "Sekolah Strategi SDM - Human Capital Academy" },
  { value: 18, label: "Sekolah Teknologi Informasi - Human Capital Academy"},
  { value: 19, label: "Agrobusiness Productivity Institute - Pembelajaran Lintas Akademi"},
  { value: 20, label: "Cost & Management Institute - Pembelajaran Lintas Akademi"},
  { value: 21, label: "Innovation Institute - Pembelajaran Lintas Akademi"},
];

export const tahunOptions : SelectOption [] = [
  { value: 2023, label: "2023" },
  { value: 2024, label: "2024" },
  { value: 2025, label: "2025" },
  { value: 2026, label: "2026" },
  { value: 2027, label: "2027" },
  { value: 2028, label: "2028" },
  { value: 2029, label: "2029" },
]