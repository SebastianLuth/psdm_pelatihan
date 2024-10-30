export type Usia
  = {
    "26 - 30 Tahun": number;
    "31 - 35 Tahun": number;
    "36 - 40 Tahun": number;
    "41 - 45 Tahun": number;
    "46 - 50 Tahun": number;
    "< 26 Tahun": number;
    "> 50 Tahun": number;
  };

export type Jenkel
  = {
    "Total Pria": number;
    "Total Wanita": number;
  };

export type JobGrade
  = {
    "06": number;
    "07": number;
    "08": number;
    "09": number;
    "10": number;
    "PKWT": number;
  };

export type PersonGrade
  = {
    "06-01": number;
    "06-02": number;
    "07-01": number;
    "07-02": number;
    "08-01": number;
    "08-02": number;
    "09-00": number;
    "10-00": number;
    "NG-00": number;
  };

export type BulanOption = {
  value: number;
  label: string;
}

export const BulanOptions: BulanOption[] = [
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
  { value: 12, label: "Desember" },
];

export type TahunOption = {
  value: number;
  label: string;
}

export const TahunOptions : TahunOption[] = [
  { value: 2019, label: "2019" },
  { value: 2020, label: "2020" },
  { value: 2021, label: "2021" },
  { value: 2022, label: "2022" },
  { value: 2023, label: "2023" },
  { value: 2024, label: "2024" },
  { value: 2025, label: "2025" },
  { value: 2026, label: "2026" },
  { value: 2027, label: "2027" },
  { value: 2028, label: "2028" },
  { value: 2029, label: "2029" },
  { value: 2030, label: "2030" },
];