export type EvaluatorData = {
  user_id : number;
  user_username: number;
  user_name: string;
  user_phone: string;
  user_unit_kerja_id: number;
  user_unit_kerja: string;
  user_jabatan: string;
  evaluator_id: number;
  evaluator_username: number;
  evaluator_name: string;
  evaluator_phone: string;
  evaluator_unit_kerja_id: number;
  evaluator_unit_kerja: string;
  evaluator_jabatan: string;
}

export interface User {
  id: number;
  username: number;
  nama: string;
  nomor_hp: string;
  unit_kerja: string;
  unit_kerja_id : number;
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

export const RoleOptions: Role [] = [
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