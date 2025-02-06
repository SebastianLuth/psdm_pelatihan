export const unitKerjaList = [
    { id: 1, name: "AKUNTANSI DAN KEUANGAN" },
    { id: 2, name: "DIVISI SATUAN PENGAWASAN INTERN" },
    { id: 3, name: "DIVISI SISTEM MANAJEMEN DAN SUSTAINABILITY"},
    { id: 4, name: "PENGADAAN DAN TEKNOLOGI INFORMASI"},
    { id: 5, name: "SDM DAN SISTEM MANAJEMEN"},
    { id: 6, name: "SEKRETARIAT DAN HUKUM" },
    { id: 7, name: "SEKRETARIAT PERUSAHAAN"},
    { id: 8, name: "TANAMAN"},
    { id: 9, name: "TEKNIK DAN PENGOLAHAN"},
    { id: 10, name: "BENIH"},
    { id: 11, name: "INDUK ANAK PERUSAHAAN ASOSIASI AFILIASI PLASMA"},
    { id: 12, name: "KEBUN AJAMU"},
    { id: 13, name: "KEBUN BAH BIRONG ULU"},
    { id: 14, name: "KEBUN BAH JAMBI"},
    { id: 15, name: "KEBUN BALIMBINGAN"},
    { id: 16, name: "KEBUN BATANG LAPING"},
    { id: 17, name: "KEBUN BERANGIR"},
    { id: 18, name: "KEBUN BUKIT LIMA"},
    { id: 19, name: "KEBUN DAN PABRIK ADOLINA"},
    { id: 20, name: "KEBUN DAN PABRIK AIR BATU"},
    { id: 21, name: "KEBUN DAN PABRIK DOLOK SINUMBAH"},
    { id: 22, name: "KEBUN DAN PABRIK MAYANG"},
    { id: 23, name: "KEBUN DAN PABRIK PULU RAJA"},
    { id: 24, name: "KEBUN DAN PABRIK SAWIT LANGKAT"},
    { id: 25, name: "KEBUN DAN PABRIK SOSA"},
    { id: 26, name: "KEBUN DAN PABRIK TEH"},
    { id: 27, name: "KEBUN DOLOK ILIR"},
    { id: 28, name: "KEBUN GUNUNG BAYU"},
    { id: 29, name: "KEBUN LARAS"},
    { id: 30, name: "KEBUN MARIHAT"},
    { id: 31, name: "KEBUN MARJANDI"},
    { id: 32, name: "KEBUN MERANTI PAHAM"},
    { id: 33, name: "KEBUN PABATU"},
    { id: 34, name: "KEBUN PADANG MATINGGI"},
    { id: 35, name: "KEBUN PANAI JAYA"},
    { id: 36, name: "KEBUN PASIR MANDOGE"},
    { id: 37, name: "KEBUN PLASMA MADINA"}, 
    { id: 38, name: "KEBUN SEI KOPAS"},
    { id: 39, name: "KEBUN TANAH ITAM ULU"},
    { id: 40, name: "KEBUN TIMUR"},
    { id: 41, name: "KEBUN TINJOWAN"},
    { id: 42, name: "KEBUN TONDUHAN"},
    { id: 43, name: "PKS AJAMU"},
    { id: 44, name: "PKS BAH JAMBI"},
    { id: 45, name: "PKS BERANGIR"},
    { id: 46, name: "PKS DOLOK ILIR"},
    { id: 47, name: "PKS GUNUNG BAYU"},
    { id: 48, name: "PKS PABATU"},
    { id: 49, name: "PKS PASIR MANDOGE"},
    { id: 50, name: "PKS TIMUR"},
    { id: 51, name: "PKS TINJOWAN"},
    { id: 52, name: "UNIT GROUP I"},
    { id: 53, name: "UNIT GROUP II"},
    { id: 54, name: "UNIT GROUP III"},
];

export interface User {
  id: number;
  username: number;
  nama: string;
  nomor_hp: string;
  unit_kerja: string;
  jabatan: string;
  level: number;
  role: string;
  biaya_pelatihan_user: number;
  foto_profil: string;
  token : string;
  refresh_token: string;
  }

  export interface UserDataToAdd{
    nama: string
    username: number | string,
    nomor_hp: string,
    jabatan: string,
    unit_kerja: number | string,
    level: number | string,
    role: string,
    password: string,
  }

export interface BawahanUser {
    bawahan_username: number;
    nama: string;
}

export interface UnitKerja {
  id: number;
  unit_kerja: string;
}

export interface LevelJabatan {
  label: string;
  value: number;
}

export interface Role {
  label: string;
  value: string;
}

export const RoleOptions: Role[] = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

export const LevelJabatanOptions: LevelJabatan[] = [
  { value: 1, label: "BOD-1" },
  { value: 2, label: "BOD-2" },
  { value: 3, label: "BOD-3" },
  { value: 4, label: "BOD-4" },
  { value: 5, label: "BOD-5" },
  { value: 6, label: "BOD-6" },
];

export type FinalData = {
  nama: string | undefined;
  jabatan: string | undefined;
  nomor_hp: string | undefined ;
  level: number | undefined;
  role: string | undefined ;
  unit_kerja: string | number | null;
};