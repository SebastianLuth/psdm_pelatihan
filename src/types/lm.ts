export type LaporanManejemenType = {
  id_lm: number;
  bulan: string;
  tahun: string;
  created_at: string;
  updated_at: string;
};

export type ListUraianLM = {
  id: number;
  uraian_lm: string;
}

// "id_uraianlm": "12",
// "uraian_lm": "Biaya Kesehatan Karyawan Aktif",
// "jenis_pembayaran": "Cash",
// "is_cadangan": "0",
// "no_gl": "51101045",
// "realisasi_bulanini": "65709600",
// "rkap_bulanini": "5906781546",
// "realiasi_sd_bulanini": "65709600",
// "rkap_sd_bulanini": "5906781546",
// "real_db_bulanini_vs_rkap_db_bulanini": "98.89",
// "real_sd_bulanini_vs_rkap_sd_bulanini": "98.89",
// "bulan": "1",
// "tahun": "2023"

export type UraianLmType = {
  id_uraianlm: number;
  uraian_lm: string;
  jenis_pembayaran: string;
  is_cadangan: string;
  no_gl: string;
  realisasi_bulanini: string;
  rkap_bulanini: string;
  realiasi_sd_bulanini: string;
  rkap_sd_bulanini: string;
  real_db_bulanini_vs_rkap_db_bulanini: string;
  real_sd_bulanini_vs_rkap_sd_bulanini: string;
  bulan: string;
  tahun: string;
}
