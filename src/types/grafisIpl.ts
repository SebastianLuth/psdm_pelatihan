export type GrafisIplType = {
  bulan: string;
  tahun: string;
  pers_sub_area_desc: string;
  total_lembur: number;
  total_insentif: number;
  total_premi_panen: number;
  total_premi_olah: number;
  total_premi_pemeliharaan: number;
  total_premi_lain: number;
  total_seluruh_premi: number;
};

export type GrafisBiayaSDMType = {
  data: {
    jumlah: number;
    tahun: string;
  }[];
}

export type ListJabatan = {
  jabatan: string;
  value: string;
};

export type ListKantorDireksi = {
  position_name: string;
  value: string;
  pers_sub_area_desc: string;
  organization_name: string;
  bulan: string;
  tahun: string;
};

export type GrafisIplByBagianType = {
  bulan: number;
  tahun: string;
  pers_sub_area_desc: string;
  kantor: {
    kantor: string;
    total_lembur: number;
    total_insentif: number;
    total_premi_panen: number;
    total_premi_olah: number;
    total_premi_pemeliharaan: number;
    total_premi_lain: number;
    total_seluruh_premi: number;
  }[];
};

export type GrafisIplUserJabatanType = {
  id_ipl: number;
  niksap: string;
  bulan: number;
  tahun: string;
  nama: string;
  jabatan: string;
  kantor: string;
  pers_sub_area_desc: string;
  insentif_kerja: number;
  insentif_irregular: number;
  harga_perjam: number;
  jam_lembur: number,
  total_lembur: number;
  total_insentif: number;
  total_premi_panen: number;
  total_premi_olah: number;
  total_premi_pemeliharaan: number;
  total_premi_lain: number;
  total_seluruh_premi: number;
  total_IPL: number;
}

export type ListKantor = {
  kantor: string;
  value: string;
  pers_sub_area_desc: string;
  bulan: number;
  tahun: string;
}
