export interface budgetType {
  id?: number | undefined;
  niksap_anggaran?: number | null;
  jenis_anggaran: string;
  total_anggaran: number | null;
  sisa_anggaran?: number | null;
  lembaga?: string | null;
  tahun_anggaran: number;
  bulan_anggaran: number | string;
  nama_bulan_anggaran?: string;
  jum_peserta_anggaran: number | string;
  jum_jampel_anggaran: number | string
}

export interface SelectOption  {
  value: number;
  label: string;
}

export const bulanOptions: SelectOption [] = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" }, 
  { value: 12, label: "Desember" }

]

export const lembagaOptions: SelectOption [] = [
  { value: 1, label: "LPP" },
  { value: 2, label: "NON LPP" },
]

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
  { value: 1, label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pengembangan Direksi (BOD) & (BOM)" },
  { value: 2, label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompotensi Karyawan (Agro Wallet) - Karyawan Pimpinan - Soft Competency" },
  { value: 3, label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (Agro Wallet) - Karyawan Pimpinan - Hard Competency"},
  { value: 4, label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (Agro Wallet) - Millenial Leader Program"},
  { value: 5 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (Agro Wallet) - Women Leader Program"},
  {value: 6 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (Agro Wallet) - Karyawan Pelaksana - Soft Competency"},
  {value: 7 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (Agro Wallet) - Karyawan Pelaksana - Hard Competency"},
  {value: 8 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) - Karyawan Pimpinan - Soft Competency"},
  {value: 9 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) - Karyawan Pimpinan - Hard Competency"},
  {value: 10 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) - Millenial Leader Program"},
  {value: 11 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) - Women Leader Program"},
  {value: 12 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) - Karyawan Pelaksana - Soft Competency"},
  {value: 13  , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Pelatihan & Pengembangan Kompetensi Karyawan (In House Training) - Karyawan Pelaksana - Hard Competency"},
  {value: 14 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Kursus Jabatan (Leadership Development  ) - Karyawan Pimpinan; Talent Source - Plantation Leadership Development Program I (PLDP I)"},
  {value: 15 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Kursus Jabatan (Leadership Development Program) - Karyawan Pimpinan; Talent Source - Plantation Leadership Development Program II (PLDP II)"},
  {value: 16 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Kursus Jabatan (Leadership Development Program) - Karyawan Pimpinan; Talent Source - Plantation Leadership Development Program III (PLDP III)"},
  {value: 17, label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Kursus Jabatan (Leadership Development Program) - Karyawan Pimpinan; Talent Pool - Leadership Development Program I"},
  {value: 18 , label: "PEMBELAJARAN DAN PENGEMBANGAN SDM - Kursus Jabatan (Leadership Development Program) - Karyawan Pimpinan; Talent Pool - Leadership Development Program II" },
  {value:19 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Kursus Jabatan (Leadership Development Program) - Karyawan Pimpinan; Talent Pool - Leadership Development Program III"},
  {value: 20, label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Kursus Jabatan (Leadership Development Program) - Karyawan Pelaksana - PPKM (Kepemimpinan Mandor)"},
  {value:21 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Kursus Jabatan (Leadership Development Program) - Karyawan Pelaksana - PPTM (Teknis Mandor)"},
  {value: 22, label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Program Sertifikasi Kompetensi Khusus Jabatan - Karyawan Pimpinan"},
  {value: 23, label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Program Sertifikasi Kompetensi Khusus Jabatan - Karyawan Pelaksana"},
  {value:24 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Program Study Banding (Benchmarking) - Dalam Negeri"},
  {value:25 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Program Study Banding (Benchmarking) - Luar Negeri"},
  {value:26 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Perjalanan Dinas - Karyawan Pimpinan"},
  {value: 27, label:"ASSESSMENT - Karyawan Pimpinan"},
  {value:28 , label:"PEMBELAJARAN DAN PENGEMBANGAN SDM - Perjalanan Dinas - Karyawan Pelaksana"},
  {value: 29, label:"ASSESSMENT - Karyawan Pelaksana"},
  {value:30 , label:"REKRUTMEN - Karyawan Pimpinan"},
  {value: 31, label:"REKRUTMEN - Karyawan Pelaksana"},
  {value: 32, label:"REKRUTMEN - Program On Boarding Karyawan Baru - Karyawan Pimpinan"},
  {value:33 , label:"REKRUTMEN - Program On Boarding Karyawan Baru - Karyawan Pelaksana"},
  {value: 34, label:"BIAYA PROGRAM INTERNALISASI BUDAYA (CORPORATE CULTURE)"},
  {value: 35, label:"BIAYA KONSULTANSI PENGEMBANGAN SDM"},
  {value:36 , label:"BIAYA INOVASI DAN RISET"},
  {value: 37, label:"BIAYA PENGEMBANGAN SDM LAIN-LAIN"}
]

export const jenisPelatihanOptions : SelectOption [] = [
  { value: 1, label: "Pembelajaran Dasar Korporat" },
  { value: 2, label: "Pembelajaran Wajib Korporat"},
  { value: 3, label: "Pembelajaran Akademi - Strategic & Sustainablity Academy - Sekolah Transformasi Strategis" },
  { value: 4, label: "Pembelajaran Akademi - Strategic & Sustainablity Academy - Sekolah Transformasi Aset & Sustainability" },
  { value: 5, label: "Pembelajaran Akademi - Strategic & Sustainablity Academy - Sekolah Sekretariat Perusahaan"},
  { value: 6, label: "Pembelajaran Akademi - Strategic & Sustainablity Academy - Sekolah Audit Internal & Manajemen Resiko" },
  { value: 7, label: "Pembelajaran Akademi - Marketing Academy - Sekolah Strategi Pemasaran" },
  { value: 8, label: "Pembelajaran Akademi - Marketing Academy - Sekolah Pemasaran Komoditi" },
  { value: 9, label: "Pembelajaran Akademi - Marketing Academy - Sekolah Pemasran Retail" },
  { value: 10, label: "Pembelajaran Akademi - Production & Development Academy - Sekolah Operasional Tanaman Kelapa Sawit" },
  { value: 11, label: "Pembelajaran Akademi - Production & Development Academy - Sekolah Operasional Tanaman Karet" },
  { value: 12, label: "Pembelajaran Akademi - Production & Development Academy - Sekolah Operasional Tanaman Tebu" },
  { value: 13, label: "Pembelajaran Akademi - Production & Development Academy - Sekolah Operasional Tanaman Teh" },
  { value: 14, label: "Pembelajaran Akademi - Production & Development Academy - Sekolah Operasional Tanaman Kopi, Kakao & Tembakau" },
  { value: 15, label: "Pembelajaran Akademi - Finance Academy - Sekolah Akuntansi" },
  { value: 16, label: "Pembelajaran Akademi - Finance Academy - Sekolah Pembiayaan Korporasi" },
  { value: 17, label: "Pembelajaran Akademi - Genal Affairs Academy - Sekolah Hukum" },
  { value: 18, label: "Pembelajaran Akademi - Genaral Affaits Academy - Sekolah Pengadaan & umum"},
  { value: 19, label: "Pembelajaran Akademi - Human Capital Academy - Sekolah Strategi SDM"},
  { value: 20, label: "Pembelajaran Akademi - Human Capital Academy - Sekolah Tekologi Informasi"},
  { value: 21, label: "Pembelajaran Lintas Akademi - Agrobusiness Productivity Institute"},
  { value: 21, label: "Pembelajaran Lintas Akademi - Cost & Manajemen Institute"},
  { value: 21, label: "Pembelajaran Lintas Akademi - Innovation Institute"},
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