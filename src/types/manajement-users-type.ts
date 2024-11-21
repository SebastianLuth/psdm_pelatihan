export const unitKerjaList = [
    { id: 1, name: "Bagian Sekretariat Perusahaan" },
    { id: 2, name: "Bagian Satuan Pengawasan Intern" },
    { id: 3, name: "Bagian Perencanaan & Sustainability"},
    { id: 4, name: "Bagian Tanaman"},
    { id: 5, name: "Bagian Teknik dan Pengolahan"},
    { id: 6, name: "Bagian Keuangan dan Akuntansi" },
    { id: 7, name: "Bagian Sumber Daya Manusia"},
    { id: 8, name: "Bagian Pengadaan dan Umum"},
    { id: 9, name: "Bagian Optimalisasi Anak Perusahaan dan Aset"},
    { id: 10, name: "Unit Group I"},
    { id: 11, name: "Unit Group II"},
    { id: 12, name: "Unit Group III"},
    { id: 13, name: "Bah Jambi"},
    { id: 14, name: "Marihat"},
    { id: 15, name: "Dolok Sinumbah"},
    { id: 16, name: "Tonduhan"},
    { id: 17, name: "Pasir Mandoge"},
    { id: 18, name: "Sei Kopas"},
    { id: 19, name: "Balimbingan"},
    { id: 20, name: "Gunung Bayu"},
    { id: 21, name: "Mayang"},
    { id: 22, name: "Bukit Lima"},
    { id: 23, name: "Pabrik Kelapa Sawit Bah Jambi"},
    { id: 24, name: "Pabrik Kelapa Sawit Pasir Mandoge"},
    { id: 25, name: "Pabrik Kelapa Sawit Gunung Bayu"},
    { id: 26, name: "Timur"},
    { id: 27, name: "Batang Laping"},
    { id: 28, name: "Plasma Madina"},
    { id: 29, name: "Air Batu"},
    { id: 30, name: "Pulu Raja"},
    { id: 31, name: "Berangir"},
    { id: 32, name: "Ajamu"},
    { id: 33, name: "Meranti Paham"},
    { id: 34, name: "Sosa"},
    { id: 35, name: "Panai Jaya"},
    { id: 36, name: "Pabrik Kelapa Sawit Timur"},
    { id: 37, name: "Pabrik Kelapa Sawit Berangir"}, 
    { id: 38, name: "Pabrik Kelapa Sawit Ajamu"},
    { id: 39, name: "Bah Birong Ulu"},
    { id: 40, name: "Marjandi"},
    { id: 41, name: "Tanah Itam Ulu"},
    { id: 42, name: "Dolok Ilir"},
    { id: 43, name: "Laras"},
    { id: 44, name: "Adolina"},
    { id: 45, name: "Pabatu"},
    { id: 46, name: "Tinjowan"},
    { id: 47, name: "Padang Matinggi"},
    { id: 48, name: "Sawit Langkat"},
    { id: 49, name: "Kebun Teh"},
    { id: 50, name: "Balai Benih Kelapa Sawit"},
    { id: 51, name: "Pabrik Kelapa Sawit Dolok Ilir"},
    { id: 52, name: "Pabrik Kelapa Sawit Pabatu"},
    { id: 53, name: "Pabrik Kelapa Sawit Tinjowan"},
    { id: 54, name: "Bagian Penugasan"},
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
