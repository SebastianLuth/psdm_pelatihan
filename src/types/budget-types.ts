export interface budgetType {
  id?: number | undefined;
  niksap_anggaran: number;
  jenis_anggaran: string;
  total_anggaran: number;
  sisa_anggaran?: number;
  tahun_anggaran: number;
}

export interface SelectOption  {
  value: number;
  label: string;
}

export const metodePelatihanOptions: SelectOption [] = [
  { value: 1, label: "Offline" },
  { value: 2, label: "Online" },
];

export const kompetensiOptions: SelectOption [] = [
  { value: 1, label: "Hard Skill" },
  { value: 2, label: "Soft Skill" },
];

export const rkapTypeOptions : SelectOption [] = [
  { value: 1, label: "Pengembangan Direksi (BOD) & BOM" },
  { value: 2, label: "Pelatihan dan Pengembangan Kompentensi Karyawan (Agro Wallet)"},
  { value: 3, label: "Pelatihan dan Pengenmbangan Kompetensi Karyawan(In House Training)" },
  { value: 4, label: "Kursus Jabatan (Leadership Development)" },
  { value: 5, label: "Program Sertifikasi Kompetensi khusus jabatan"},
  { value: 6, label: "Program Studi Banding Benchmarking" },
  { value: 7, label: "Karyawan Pimpinan - Assessment" },
  { value: 8, label: "Karyawan Pelaksana - Assessment" },
  { value: 9, label: "Karyawan Pimpinan - Rekrutment" },
  { value: 10, label: "Karyawan Pelaksana - Rekrutment" },
  { value: 11, label: "Program on Boarding Karyawan Baru - Karyawan Pimpinan" },
  { value: 12, label: "Program on Boarding Karyawan Baru - Karyawan Pelaksana" },
  { value: 13, label: "Biaya Program Internalisasi Budaya (Corporate Culture)" },
  { value: 14, label: "Biaya Konsultasi Pengembangan SDM" },
  { value: 15, label: "Biaya Inovasi dan Riset" },
  { value: 16, label: "Biaya Pengemabagan SDM dan Lain-lain" }, 
];

export const tahunOptions : SelectOption [] = [
  { value: 2023, label: "2023" },
  { value: 2024, label: "2024" },
  { value: 2025, label: "2025" },
  { value: 2026, label: "2026" },
  { value: 2027, label: "2027" },
]