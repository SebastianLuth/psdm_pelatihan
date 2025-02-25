export interface TrainingType {
  id?: number;
  judul: string;
  jenis: string;
  anggaran_id?: number;
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
  user_id?: number;
  telah_evaluasi?: boolean;
}

export interface trainingData {
  id: string;
  jam_pelajaran : number;
  rkap_type : string;
  judul : string;
  jumlah_anggaran : number;
  jumlah_peserta : number;
  kompetensi : string;
  lembaga : string;
  lokasi : string;
  metode : string;
  jenis : string;
  tgl_mulai : string;
  tgl_selesai : string;
}

export interface trainingFundAbsorption {
  user_id: number;
  judul_pelatihan : string;
  rkap_pelatiahn : string;
  metode_pelatihan : string;
  lokasi_pelatihan : string;
  total_anggaran_pelatihan : string;
  total_peserta: number;
  lembaga_pelatihan : string;
  kompetensi_pelatihan : string;
  jenis_pelatihan : string;
  tanggal_mulai_pelatihan : string;
  tanggal_selesai_pelatihan : string;
  jam_pelajaran_pelatihan: number;
  niksap_pelatihan: number;
  nama_peserta : string;
  unit_kerja_peserta  : string;
  jabatan_peserta: string;
  level_peserta  : string;
  biaya_per_user : string;
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
  konsumsi: number;
  fasilitator_ex: number;
  pesawat: number;
  penginapan: number;
  name: string;
  value: number;
};

export type DetailCostTypeUpload = {
  konsumsi: number;
  fasilitator_ex: number;
  pesawat: number;
  penginapan: number;
};