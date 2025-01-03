export interface ParticipantType {
  user_id: number;
  username: number;
  nama: string;
  nomor_hp: string;
  unit_kerja: string;
  jabatan: string;
  level: number;
}

export interface TrainingType {
  id?: number;
  judul: string;
  jenis: string;
  metode: string;
  lokasi: string;
  lembaga: string;
  kompetensi: string;
  jumlah_anggaran: number;
  rkap_type: string;
  jumlah_peserta: number;
  tgl_mulai: string;
  tgl_selesai: string;
  jam_pelajaran?: number;
  peserta: ParticipantType[];
}


export interface PelatihanResponseType {
  pelatihan_id: number;
  judul_pelatihan?: string;
  jenis_anggaran_pelatihan: string;
  metode_pelatihan: string;
  lokasi_pelatihan?: string;
  anggaran_pelatihan: number;
  jumlah_peserta_pelatihan: number;
  tanggal_mulai_pelatihan: string;
  lembaga_pelatihan : string;
  kompetensi_pelatihan : string;
  rkap_type_pelatihan : string;
  tanggal_selesai_pelatihan: string;
}

export interface UserTraining {
  user_id: number;
  name: string;
  username: number;
  phone_number: string;
  unit_kerja: number;
  jabatan: string;
  level: number;
  training_id: number;
  training_title: string;
  training_type: string;
  training_method: string;
  training_location: string;
  start_date: string; 
  end_date: string;   
  has_completed_evaluation: boolean | number; // 0 or 1 from the backend
}


export type ParticipantTypeDetail = {
  peserta_id: number;
  pelatihan_id: number;
  user_id: number;
  username: number;
  nama: string;
  nomor_hp: string;
  unit_kerja: number;
  jabatan: string;
  level: number;
  has_completed_evaluation: boolean | number;
};


export type TrainingTypeDetail = {
  id: number;
  judul: string;
  jenis: string;
  metode: string;
  lokasi: string;
  lembaga: string;
  kompetensi: string;
  jumlah_anggaran: string;
  rkap_type: string;
  jumlah_peserta: number;
  tgl_mulai: string;
  tgl_selesai: string;
  peserta: ParticipantTypeDetail[];
};

export type DetailCostType = {
  pelatihan_id: number;
  akomodasi: number;
  fasilitator_ex: number;
  perdiem: number;
  sekretariat: number;
  name: string;
  value: number;
};

export type DetailCostTypeUpload = {
  akomodasi: number;
  fasilitator_ex: number;
  perdiem: number;
  sekretariat: number;
};